'use server';

import { auth } from '@/lib/auth';
import { reserveInventory } from '@/lib/product';
import Stripe from 'stripe';
import { addOrder } from './order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function checkoutWithStripe(
  productId: string,
  includeShipping: boolean
): Promise<{
  checkoutUrl?: string;
  status: 'success' | 'out of stock' | 'error';
}> {
  // Reserve inventory and get priceId
  const { priceId, status } = await reserveInventory(productId);
  if (status === 'out of stock') {
    return { status: 'out of stock' };
  } else if (status === 'error' || !priceId) {
    return { status: 'error' };
  }

  // Get checkout session and its URL
  let session: Stripe.Checkout.Session;
  try {
    let sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/shop?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/shop`,
      expires_at: Math.floor(Date.now() / 1000) + 2700,
    };
    if (includeShipping) {
      sessionParams.shipping_address_collection = { allowed_countries: ['US'] };
      sessionParams.shipping_options = [
        { shipping_rate: 'shr_1NaU2fJqn5r7n3JRwn7bfhIc' },
      ];
    }
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (e) {
    console.error(
      `checkoutWithStripe(${productId}, ${includeShipping}) failed: ${e}`
    );
    return { status: 'error' };
  }

  // Record order with checkout session's id
  const success = await addOrder({
    id: 'unassigned',
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
