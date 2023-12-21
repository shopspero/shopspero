'use server';

import { auth } from '@/lib/auth';
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
  const { session, status } = await createCheckoutSession(
    priceId,
    includeShipping
  );
  if (status !== 'success' || !session) {
    return { status: 'error' };
  }

  // Record order with checkout session's id
  const success = await addOrder({
    product_id: productId,
    created: session.created,
    payment_status: 'unpaid',
    fulfillment_status: 'unfulfilled',
    checkout_id: session.id,
  });
  if (!success) {
    return { status: 'error' };
  }
  return { checkoutUrl: session.url!, status: 'success' };
}

export async function checkoutManually(productId: string) {
  const session = await auth();
  if (!session) {
    return false;
  }
}
