import { getDb } from './mongodb';
import { logger } from './discordLogger';

// One line item from a drop's order log (same shape across drops, modeled on
// the "Heirs" sheet in the Fall 2026 Financials Google Sheet: revenue, cost,
// who, fulfilled?, paid to, size, in bank, notes — plus `drop` and `date`
// since most other drop sheets also carry those).
//
// Populated by scripts/import-drop-records.mjs from the Google Sheet into the
// `dropRecords` collection — see that script for the sheet -> field mapping.
export interface DropRecord {
  id: string;
  drop: string;
  date?: string;
  item?: string;
  size?: string;
  revenue?: number;
  shipping?: number;
  cost?: number;
  who?: string;
  fulfilled?: boolean;
  paidTo?: string;
  fulfilledBy?: string;
  inBank?: boolean;
  notes?: string;
}

interface DropRecordDoc {
  drop: string;
  date?: string;
  item?: string;
  size?: string;
  revenue?: number;
  shipping?: number;
  cost?: number;
  who?: string;
  fulfilled?: boolean;
  paidTo?: string;
  fulfilledBy?: string;
  inBank?: boolean;
  notes?: string;
}

export async function getDropRecords(): Promise<DropRecord[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<DropRecordDoc>('dropRecords')
      .find()
      .toArray();
    return docs.map((doc) => ({
      id: doc._id.toString(),
      drop: doc.drop,
      date: doc.date,
      item: doc.item,
      size: doc.size,
      revenue: doc.revenue,
      shipping: doc.shipping,
      cost: doc.cost,
      who: doc.who,
      fulfilled: doc.fulfilled,
      paidTo: doc.paidTo,
      fulfilledBy: doc.fulfilledBy,
      inBank: doc.inBank,
      notes: doc.notes,
    }));
  } catch (e) {
    logger.error(`getDropRecords() failed: ${e}`);
    return [];
  }
}
