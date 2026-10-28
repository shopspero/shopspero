const { test } = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');

test('successful payment confirmation renders customer input as text, not HTML', async () => {
  const messages = [];
  const order = { id: 'order-1', name: '<img src=x onerror=alert(1)>', email: 'buyer@example.test', product_id: 'shirt', payment_status: 'paid' };
  const html = load('src/lib/html.ts');
  const { POST } = load('src/app/api/webhook/route.ts', {
    '@/lib/html': html,
    '@/lib/order': {
      getOrderIdFromCheckoutId: async () => ({ orderId: order.id, status: 'success' }),
      upsertOrder: async () => true,
      getOrder: async () => ({ order, status: 'success' }),
    },
    '@/lib/discordLogger': { logger: { error() {} }, sendPurchaseEmbed: async () => {} },
    '@/lib/stripe': { constructEvent: async () => ({ status: 'success', event: { type: 'checkout.session.completed', data: { object: { id: 'session-1' } } } }) },
    'next/server': { NextResponse: Response },
    nodemailer: { default: { createTransport: () => ({ sendMail: async (message) => messages.push(message) }) } },
  });
  assert.equal((await POST({})).status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].to, order.email);
  assert.ok(messages[0].html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.equal(messages[0].html.includes(order.name), false);
  assert.ok(messages[0].html.includes('order-1'));
});
