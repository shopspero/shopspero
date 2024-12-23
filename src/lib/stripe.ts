import Stripe from 'stripe';
import { logger } from './discordLogger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function createCheckoutSession(
  priceId: string,
  includeShipping: boolean
): Promise<{
  session?: Stripe.Checkout.Session;
  status: 'success' | 'error';
}> {
  let session: Stripe.Checkout.Session;
  try {
    let sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      phone_number_collection: {
        enabled: true,
      },
      currency: 'usd',
      success_url: `${process.env.NEXTAUTH_URL!}/shop?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL!}/shop`,
      expires_at: Math.floor(Date.now() / 1000) + 1860,
    };
    if (includeShipping) {
      // sessionParams.shipping_address_collection = { allowed_countries: ['US'] };
      sessionParams.shipping_options = [
        { shipping_rate: process.env.SHIPPING_RATE },
      ];
    }
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (e) {
    logger.error(
      `createCheckoutSession(${priceId}, ${includeShipping}) failed: ${e}`
    );
    return { status: 'error' };
  }
  if (!session) {
    return { status: 'error' };
  }
  return { session, status: 'success' };
}

export async function constructEvent(
  request: Request
): Promise<{ event?: Stripe.Event; status: 'success' | 'error' }> {
  const sig = request.headers.get('stripe-signature');
  try {
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      sig!,
      webhookSecret
    );
    return { event, status: 'success' };
  } catch (e) {
    logger.error(`constructEvent(${request}) failed: ${e}`);
    return { status: 'error' };
  }
}
