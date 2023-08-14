import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}

const db = getFirestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  // Check that request includes productId
  if (
    typeof requestBody !== 'object' ||
    requestBody['productId'] === undefined ||
    typeof requestBody['productId'] !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Request must include a productId' },
      { status: 400 }
    );
  }

  // Check that request includes includeShipping
  if (
    requestBody['includeShipping'] === undefined ||
    typeof requestBody['includeShipping'] !== 'boolean'
  ) {
    return NextResponse.json(
      { error: 'Request must specify includeShipping' },
      { status: 400 }
    );
  }

  // Reserve inventory and get priceId
  let priceId: string;
  try {
    const inventoryRef = db.collection('inventory').doc(requestBody.productId);
    priceId = await db.runTransaction(async (t) => {
      const inventoryDoc = await t.get(inventoryRef);
      const priceId = inventoryDoc.get('price_id');
      const stock = inventoryDoc.get('stock');
      if (stock <= 0) {
        return null;
      }
      t.update(inventoryRef, { stock: stock - 1 });
      return priceId;
    });
  } catch (e) {
    console.error(`Reserving inventory in /api/checkout failed: ${e}`);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
  if (priceId === null) {
    return NextResponse.json({ error: 'Out of stock' }, { status: 200 });
  }

  // Get checkout session and return its URL
  let session: Stripe.Checkout.Session;
  try {
    let sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `http://${request.headers.get('host')}/shop?success=true`,
      cancel_url: `http://${request.headers.get('host')}/shop`,
      expires_at: Math.floor(Date.now() / 1000) + 2700,
    };
    if (requestBody.includeShipping) {
      sessionParams.shipping_address_collection = { allowed_countries: ['US'] };
      sessionParams.shipping_options = [
        { shipping_rate: 'shr_1NaU2fJqn5r7n3JRwn7bfhIc' },
      ];
    }
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (e) {
    console.error(`Creating a checkout session in /api/checkout failed: ${e}`);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
  if (session.url === null) {
    console.error(`Checkout session missing URL in /api/checkout`);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }

  // Record checkout session
  try {
    await db.collection('orders').doc(session.id).set({
      created: session.created,
      product_id: requestBody.productId,
      payment_status: 'unpaid',
    });
  } catch (e) {
    console.error(
      `Failed to checkout session ${session.id} in /api/checkout: ${e}`
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }

  // Return checkout URL
  return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
}
