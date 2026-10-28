import { google, sheets_v4 } from 'googleapis';
import { unstable_cache } from 'next/cache';
import { logger } from './discordLogger';

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID ?? '';

const throwNotConfigured = (): never => {
  throw new Error(
    'GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY or GOOGLE_SHEETS_SPREADSHEET_ID is not set or invalid'
  );
};

let _sheets: sheets_v4.Sheets;

try {
  const key = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY;
  if (!key || !SPREADSHEET_ID) throw new Error('missing');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(key),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  _sheets = google.sheets({ version: 'v4', auth });
} catch {
  _sheets = new Proxy({} as sheets_v4.Sheets, {
    get: throwNotConfigured,
  });
}

export interface SheetOrder {
  date?: string;
  buyer?: string;
  drop?: string;
  item?: string;
  size?: string;
  qty?: number;
  amount?: number;
  moneyWith?: string;
  delivered?: string;
  notes?: string;
}

export interface SheetCost {
  date?: string;
  drop?: string;
  what?: string;
  amount?: number;
  paidBy?: string;
  notes?: string;
}

export interface SheetDrop {
  drop: string;
  semester?: string;
  unitsMade?: number;
  price?: number;
  donated?: number;
  charity?: string;
  status?: string;
}

function parseNumber(value: unknown): number | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined;
  const n = Number(value.replace(/[^0-9.-]/g, ''));
  return Number.isNaN(n) ? undefined : n;
}

async function getRange(range: string): Promise<string[][]> {
  const { data } = await _sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });
  return (data.values as string[][]) ?? [];
}

async function fetchOrdersSheet(): Promise<SheetOrder[]> {
  try {
    const rows = await getRange('Orders!A2:J');
    return rows
      .filter((row) => row.some((cell) => cell))
      .map((row) => ({
        date: row[0] || undefined,
        buyer: row[1] || undefined,
        drop: row[2] || undefined,
        item: row[3] || undefined,
        size: row[4] || undefined,
        qty: parseNumber(row[5]),
        amount: parseNumber(row[6]),
        moneyWith: row[7] || undefined,
        delivered: row[8] || undefined,
        notes: row[9] || undefined,
      }));
  } catch (e) {
    logger.error(`fetchOrdersSheet() failed: ${e}`);
    return [];
  }
}

async function fetchCostsSheet(): Promise<SheetCost[]> {
  try {
    const rows = await getRange('Costs!A2:F');
    return rows
      .filter((row) => row.some((cell) => cell))
      .map((row) => ({
        date: row[0] || undefined,
        drop: row[1] || undefined,
        what: row[2] || undefined,
        amount: parseNumber(row[3]),
        paidBy: row[4] || undefined,
        notes: row[5] || undefined,
      }));
  } catch (e) {
    logger.error(`fetchCostsSheet() failed: ${e}`);
    return [];
  }
}

async function fetchDropsSheet(): Promise<SheetDrop[]> {
  try {
    const rows = await getRange('Drops!A2:G');
    return rows
      .filter((row) => row[0])
      .map((row) => ({
        drop: row[0],
        semester: row[1] || undefined,
        unitsMade: parseNumber(row[2]),
        price: parseNumber(row[3]),
        donated: parseNumber(row[4]),
        charity: row[5] || undefined,
        status: row[6] || undefined,
      }));
  } catch (e) {
    logger.error(`fetchDropsSheet() failed: ${e}`);
    return [];
  }
}

// Cached ~1 minute so repeated page loads/pagination don't re-hit the Sheets API quota.
export const getOrdersSheet = unstable_cache(fetchOrdersSheet, ['sheets-orders'], {
  revalidate: 60,
});
export const getCostsSheet = unstable_cache(fetchCostsSheet, ['sheets-costs'], {
  revalidate: 60,
});
export const getDropsSheet = unstable_cache(fetchDropsSheet, ['sheets-drops'], {
  revalidate: 60,
});
