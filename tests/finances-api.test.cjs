const { test } = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const { hasPermission } = load('src/lib/permissions.ts');

for (const [file, service] of [
  ['src/app/api/finances/dashboard/route.ts', 'getFinancesDashboard'],
  ['src/app/api/finances/orders/route.ts', 'getPaginatedOrders'],
]) {
  function route(permissions, read) {
    return load(file, {
      '@/lib/auth': { auth: async () => permissions === null ? null : { user: { permissions } } },
      '@/lib/permissions': { hasPermission },
      '@/lib/finances': { [service]: read },
      '@/lib/discordLogger': { logger: { error() {} } },
      'next/server': { NextResponse: Response },
    });
  }

  test(`${service}: unauthenticated and unprivileged requests cannot read finances`, async () => {
    for (const permissions of [null, []]) {
      const { GET } = route(permissions, () => { throw new Error('Must not read data'); });
      const response = await GET({ nextUrl: new URL('https://example.test/api?page=1') });
      assert.equal(response.status, 403);
      assert.deepEqual(await response.json(), { error: 'Forbidden' });
    }
  });

  test(`${service}: both general and exec can read data`, async () => {
    for (const permissions of [['general'], ['exec']]) {
      const result = { orders: [], total: 0 };
      const { GET } = route(permissions, async () => result);
      const response = await GET({ nextUrl: new URL('https://example.test/api?page=1') });
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), result);
    }
  });

  test(`${service}: upstream failure returns 503 without leaking service errors`, async () => {
    const { GET } = route(['general'], async () => { throw new Error('private credential details'); });
    const response = await GET({ nextUrl: new URL('https://example.test/api?page=1') });
    assert.equal(response.status, 503);
    const data = await response.json();
    assert.ok(data.error);
    assert.equal(JSON.stringify(data).includes('private credential details'), false);
  });
}
