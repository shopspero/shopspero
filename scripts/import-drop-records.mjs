// One-time (repeatable) import: reads the "Fall 2026 Financials Spero"
// Google Sheet — exported to .xlsx so every tab comes along in one file —
// and loads it into MongoDB's `dropRecords` collection, which the admin
// Data tab (src/app/(internal)/admin/data) reads from.
//
// To get the .xlsx: open the sheet in Google Sheets > File > Download >
// Microsoft Excel (.xlsx), then run:
//   node --env-file=.env.local scripts/import-drop-records.mjs path/to/file.xlsx
//
// Requires MONGODB_URI (and optionally MONGODB_DB) in the environment.
//
// NOTE: this REPLACES the entire `dropRecords` collection on every run
// (deleteMany then insertMany) — it's a one-way sync from the sheet, not a
// merge. Any edits made directly in MongoDB will be wiped on the next import.
//
// Only the per-drop order-log tabs are imported. The "2025" and "2026" tabs
// are excluded — they're just a combined view of the same rows that already
// live in the per-drop tabs (Justified/2BWY/Surpassing/Calling and
// Lux Aeterna/Miscellaneous 2026, respectively), so importing them too would
// double-count every order. "Operation Costs 2025" is a cost-ledger-by-vendor
// sheet, not a line-item order log, so it's excluded too.

import ExcelJS from 'exceljs';
import { MongoClient } from 'mongodb';

// Each sheet's real columns, left to right, starting right after its header
// row. Extra columns to the right (stats boxes, sell-through %, stock
// counts, etc., often crammed into the same rows) are ignored.
const SHEET_DEFS = [
  { drop: 'Justified', sheet: 'Justified', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who'] },
  { drop: '2BWY', sheet: '2BWY', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who'] },
  { drop: 'Surpassing', sheet: 'Surpassing', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who'] },
  { drop: 'Calling', sheet: 'Calling', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who', 'fulfilled', 'paidTo'] },
  { drop: 'Lux Aeterna', sheet: 'Lux Aeterna', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who', 'fulfilled', 'paidTo', 'inBank'] },
  { drop: 'Abba X Spero Love Shirt', sheet: 'Abba X Spero Love Shirt', headerRow: 2,
    columns: ['date', 'item', 'revenue', 'shipping', 'who', 'fulfilled', 'paidTo', 'notes', 'inBank'] },
  { drop: 'Born Again', sheet: 'Born Again', headerRow: 2,
    columns: ['revenue', 'cost', 'who', 'fulfilled', 'paidTo', 'size', 'inBank', 'fulfilledBy', 'notes'] },
  { drop: 'Heirs', sheet: 'Heirs', headerRow: 2,
    columns: ['revenue', 'cost', 'who', 'fulfilled', 'paidTo', 'size', 'inBank', 'fulfilledBy', 'notes'] },
  { drop: 'Forever.', sheet: 'Forever.', headerRow: 2,
    columns: ['revenue', 'cost', 'who', 'fulfilled', 'paidTo', 'size', 'inBank', 'fulfilledBy', 'notes'] },
  // No Shipping column, and some multi-item orders only fill in Date/Price/
  // Fulfilled?/Paid To on the first item's row, leaving them blank on the
  // continuation rows for the other items in that same order.
  { drop: 'Stickers', sheet: 'Stickers', headerRow: 3,
    columns: ['date', 'item', 'revenue', 'who', 'fulfilled', 'paidTo', 'notes'] },
  { drop: 'Miscellaneous 2025', sheet: 'Miscellaneous 2025', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who'] },
  { drop: 'Miscellaneous 2026', sheet: 'Miscellaneous 2026', headerRow: 1,
    columns: ['date', 'item', 'revenue', 'shipping', 'who', 'fulfilled', 'paidTo', 'notes', 'inBank'] },
];

function cellValue(cell) {
  let v = cell.value;
  if (v && typeof v === 'object') {
    if (v instanceof Date) return v;
    if ('result' in v) return v.result; // formula / sharedFormula
    if ('richText' in v) return v.richText.map((t) => t.text).join('');
    if ('text' in v) return v.text; // hyperlink etc.
    return null; // unresolved formula with no cached result, or unknown shape
  }
  return v;
}

function parseStr(raw) {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  return trimmed || undefined;
}

function parseMoney(raw) {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') {
    const n = parseFloat(raw.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function parseYesNo(raw) {
  if (typeof raw !== 'string') return undefined;
  const lower = raw.trim().toLowerCase();
  if (lower === 'yes') return true;
  if (lower === 'no') return false;
  return undefined;
}

// The "in bank" column is usually yes/no, but a few rows have stray text in
// it instead (e.g. a literal "In bank" label, or a one-off note like "Free
// stickers throw in"). Any non-empty value there means "yes" in practice;
// anything that isn't literally yes/no/"in bank" gets kept as a note instead
// of silently dropped.
function parseInBank(raw) {
  if (typeof raw !== 'string') return { inBank: undefined };
  const trimmed = raw.trim();
  if (!trimmed) return { inBank: undefined };
  const lower = trimmed.toLowerCase();
  if (lower === 'yes' || lower === 'in bank') return { inBank: true };
  if (lower === 'no') return { inBank: false };
  return { inBank: true, extraNote: trimmed };
}

function parseDate(raw) {
  if (raw instanceof Date) {
    return raw.toISOString().slice(0, 10);
  }
  if (typeof raw === 'string') {
    const iso = raw.match(/^(\d{4}-\d{2}-\d{2})/);
    if (iso) return iso[1];
    const mdy = raw.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
    if (mdy) {
      const [, m, d, yRaw] = mdy;
      const y = yRaw.length === 2 ? `20${yRaw}` : yRaw;
      return `${y.padStart(4, '0')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }
  }
  return undefined;
}

function extractSheet(workbook, def) {
  const ws = workbook.getWorksheet(def.sheet);
  if (!ws) {
    throw new Error(`Sheet not found in workbook: ${def.sheet}`);
  }
  const requireField = def.columns.includes('item') ? 'item' : 'who';
  const records = [];

  for (let r = def.headerRow + 1; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const raw = {};
    def.columns.forEach((name, i) => {
      raw[name] = cellValue(row.getCell(i + 1));
    });

    // Skip blank padding rows and the sheet's own "Total" row (its Revenue
    // cell is a real formula total, not an order).
    if (requireField === 'item') {
      const item = typeof raw.item === 'string' ? raw.item.trim() : '';
      if (!item || item.toLowerCase() === 'total') continue;
    } else {
      const who = typeof raw.who === 'string' ? raw.who.trim() : '';
      if (!who) continue;
    }

    const record = { drop: def.drop };
    const notesParts = [];

    for (const name of def.columns) {
      const value = raw[name];
      if (name === 'date') record.date = parseDate(value);
      else if (name === 'item') record.item = parseStr(value);
      else if (name === 'size') record.size = parseStr(value);
      else if (name === 'revenue') record.revenue = parseMoney(value);
      else if (name === 'shipping') record.shipping = parseMoney(value);
      else if (name === 'cost') record.cost = parseMoney(value);
      else if (name === 'who') record.who = parseStr(value);
      else if (name === 'fulfilled') record.fulfilled = parseYesNo(value);
      else if (name === 'paidTo') record.paidTo = parseStr(value);
      else if (name === 'fulfilledBy') record.fulfilledBy = parseStr(value);
      else if (name === 'notes') {
        const n = parseStr(value);
        if (n) notesParts.push(n);
      } else if (name === 'inBank') {
        const { inBank, extraNote } = parseInBank(value);
        record.inBank = inBank;
        if (extraNote) notesParts.push(extraNote);
      }
    }
    if (notesParts.length) record.notes = notesParts.join('; ');

    // Drop undefined keys so Mongo docs stay clean.
    Object.keys(record).forEach((k) => record[k] === undefined && delete record[k]);
    records.push(record);
  }

  return records;
}

async function main() {
  const xlsxPath = process.argv[2];
  if (!xlsxPath) {
    console.error(
      'Usage: node --env-file=.env.local scripts/import-drop-records.mjs <path-to-exported-xlsx>'
    );
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  const dbName = process.env.MONGODB_DB ?? 'spero';

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(xlsxPath);

  const allRecords = [];
  for (const def of SHEET_DEFS) {
    const records = extractSheet(workbook, def);
    console.log(`${def.drop}: ${records.length} records`);
    allRecords.push(...records);
  }
  console.log(`Total: ${allRecords.length} records`);

  if (process.env.DRY_RUN) {
    const filterDrop = process.env.SAMPLE_DROP;
    const sample = filterDrop
      ? allRecords.filter((r) => r.drop === filterDrop)
      : allRecords.slice(0, 5);
    console.log('DRY_RUN set — not writing to MongoDB. Sample records:');
    console.log(JSON.stringify(sample, null, 2));
    return;
  }

  const client = new MongoClient(uri);
  await client.connect();
  try {
    const collection = client.db(dbName).collection('dropRecords');
    const { deletedCount } = await collection.deleteMany({});
    console.log(`Cleared ${deletedCount} existing record(s) from ${dbName}.dropRecords`);
    if (allRecords.length) {
      await collection.insertMany(allRecords);
    }
    console.log(`Imported ${allRecords.length} record(s) into ${dbName}.dropRecords`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
