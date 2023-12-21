import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
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
      success_url: `${process.env.NEXTAUTH_URL!}/shop?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL!}/shop`,
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
    console.error(`constructEvent(${request}) failed: ${e}`);
    return { status: 'error' };
  }
}
