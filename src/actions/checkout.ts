'use server';

import { addOrder } from '../lib/order';
import { reserveInventory } from '@/lib/product';
import { createCheckoutSession } from '@/lib/stripe';

export async function checkoutWithStripe(
  productId: string,
  includeShipping: boolean
): Promise<{
  checkoutUrl?: string;
  status: 'success' | 'out of stock' | 'error';
}> {
  // Reserve inventory and get priceId
  const { priceId, status: inventoryStatus } = await reserveInventory(
    productId
  );
  if (inventoryStatus === 'out of stock') {
    return { status: 'out of stock' };
  } else if (inventoryStatus === 'error' || !priceId) {
    return { status: 'error' };
  }

  // Get Stripe checkout session
  const { session, status: stripeStatus } = await createCheckoutSession(
    priceId,
    includeShipping
  );
  if (stripeStatus !== 'success' || !session) {
    return { status: 'error' };
  }

  // Record order with checkout session's id
  const { status: addStatus } = await addOrder({
    product_id: productId,
    created: session.created,
    payment_status: 'unpaid',
    fulfillment_option: includeShipping ? 'delivery' : 'pickup',
    fulfillment_status: 'unfulfilled',
    checkout_id: session.id,
  });
  if (addStatus !== 'success') {
    return { status: 'error' };
  }
  return { checkoutUrl: session.url!, status: 'success' };
}
