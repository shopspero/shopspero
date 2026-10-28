const { test } = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const logger = { error() {} };

function sheets(get) {
  return load('src/lib/sheets.ts', {
    googleapis: { google: { auth: { GoogleAuth: class {} }, sheets: () => ({ spreadsheets: { values: { get } } }) } },
    'next/cache': { unstable_cache: (fetch) => fetch },
    './discordLogger': { logger },
  });
}

test('Sheets failures propagate instead of becoming successful empty financial data', async () => {
  const previous = { key: process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY, id: process.env.GOOGLE_SHEETS_SPREADSHEET_ID };
  process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY = '{}';
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = 'test-sheet';
  try {
    const failure = new Error('Service unavailable');
    const source = sheets(async () => { throw failure; });
    for (const read of [source.getOrdersSheet, source.getCostsSheet, source.getDropsSheet]) {
      await assert.rejects(read, failure);
    }
    const empty = sheets(async () => ({ data: {} }));
    assert.deepEqual(await empty.getOrdersSheet(), []);
  } finally {
    for (const [name, value] of [['GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY', previous.key], ['GOOGLE_SHEETS_SPREADSHEET_ID', previous.id]]) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
});

test('Sheet currency parsing preserves zero and negatives without inventing values for placeholders', async () => {
  const oldKey = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY;
  const oldId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY = '{}';
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = 'test-sheet';
  try {
    const source = sheets(async () => ({ data: { values: ['N/A', '$', '$1,234.50', '-20', '0'].map((amount) => ['2026-01-01', 'Drop', 'Cost', amount]) } }));
    assert.deepEqual((await source.getCostsSheet()).map((cost) => cost.amount), [undefined, undefined, 1234.5, -20, 0]);
  } finally {
    if (oldKey === undefined) delete process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY; else process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_KEY = oldKey;
    if (oldId === undefined) delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID; else process.env.GOOGLE_SHEETS_SPREADSHEET_ID = oldId;
  }
});

test('pagination sorts newest first and clamps invalid and out-of-range pages', async () => {
  const orders = [{ date: '2026-01-01', buyer: 'Older' }, { date: '2026-02-01', buyer: 'Newer' }, { buyer: 'Undated' }];
  const { getPaginatedOrders } = load('src/lib/finances.ts', { './sheets': { getOrdersSheet: async () => orders } });
  assert.equal((await getPaginatedOrders(1, 2)).orders[0].buyer, 'Newer');
  const last = await getPaginatedOrders(999, 2);
  assert.equal(last.page, 2);
  assert.equal(last.orders[0].buyer, 'Undated');
  for (const page of [0, -1, NaN, Infinity, .5]) {
    const result = await getPaginatedOrders(page, 0);
    assert.equal(result.page, 1);
    assert.equal(result.pageSize, 20);
  }
  assert.equal(orders[0].buyer, 'Older');
});

test('empty order pagination always has a valid first page', async () => {
  const { getPaginatedOrders } = load('src/lib/finances.ts', { './sheets': { getOrdersSheet: async () => [] } });
  assert.deepEqual(await getPaginatedOrders(999, 20), { orders: [], total: 0, page: 1, pageSize: 20 });
});

test('inventory reservation never updates missing, empty, or malformed products', async () => {
  for (const product of [null, { stock: 0, price_id: 'price' }, { stock: -1, price_id: 'price' }, { stock: 1.5, price_id: 'price' }, { stock: '2', price_id: 'price' }, { stock: 2, price_id: '' }, { price_id: 'price' }]) {
    let writes = 0;
    const db = {
      collection: () => ({ doc: () => ({}) }),
      runTransaction: (run) => run({ get: async () => ({ exists: !!product, get: (key) => product?.[key] }), update: () => { writes++; } }),
    };
    const { reserveInventory } = load('src/lib/product.ts', { '@/lib/firebase': { db }, './discordLogger': { logger } });
    const result = await reserveInventory('item');
    assert.equal(writes, 0);
    assert.notEqual(result.status, 'success');
  }
});

test('inventory reservation decrements one unit and returns the Stripe price', async () => {
  const product = { stock: 2, price_id: 'price_123' };
  const db = {
    collection: () => ({ doc: () => ({}) }),
    runTransaction: (run) => run({ get: async () => ({ exists: true, get: (key) => product[key] }), update: (_, data) => Object.assign(product, data) }),
  };
  const { reserveInventory } = load('src/lib/product.ts', { '@/lib/firebase': { db }, './discordLogger': { logger } });
  assert.deepEqual(await reserveInventory('item'), { status: 'success', priceId: 'price_123' });
  assert.equal(product.stock, 1);
});

test('order edits require an ID and preserve merge semantics', async () => {
  const writes = [];
  const db = { collection: () => ({ doc: (id) => ({ set: async (data, options) => writes.push({ id, data, options }) }) }) };
  const { upsertOrder } = load('src/lib/order.ts', { '@/lib/firebase': { db }, './discordLogger': { logger } });
  assert.equal(await upsertOrder({ notes: 'test' }), false);
  assert.equal(await upsertOrder({ id: '   ' }), false);
  assert.equal(writes.length, 0);
  assert.equal(await upsertOrder({ id: 'order-1', notes: 'Updated' }), true);
  assert.deepEqual(writes, [{ id: 'order-1', data: { notes: 'Updated' }, options: { merge: true } }]);
});

test('confirmation email text escapes markup and quoted attributes', () => {
  const { escapeHtml } = load('src/lib/html.ts');
  assert.equal(escapeHtml('<img src="x" onerror=\'bad\'> &'), '&lt;img src=&quot;x&quot; onerror=&#39;bad&#39;&gt; &amp;');
  assert.equal(escapeHtml(undefined), '');
  assert.equal(escapeHtml('Spero order 123'), 'Spero order 123');
});
