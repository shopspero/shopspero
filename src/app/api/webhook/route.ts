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
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'content-type, stripe-signature',
};

/**
 * On success, update the order.
 */
async function handleSuccess(session: Stripe.Checkout.Session) {
  try {
    await db.collection('orders').doc(session.id).update({
      customer_details: session.customer_details,
      shipping_details: session.shipping_details,
      payment_status: session.payment_status,
    });
  } catch (e) {
    console.error(
      `Failed to record successful checkout ${session.id} in /api/webhook: ${e}`
    );
    throw e;
  }
}

/**
 * On failure, update stock and delete the order.
 */
async function handleFailure(session: Stripe.Checkout.Session) {
  try {
    const orderRef = db.collection('orders').doc(session.id);
    await db.runTransaction(async (t) => {
      // Get order doc
      const orderDoc = await t.get(orderRef);

      // Get product doc
      const productRef = db
        .collection('products')
        .doc(orderDoc.get('product_id'));
      const productDoc = await t.get(productRef);

      // Restore inventory and delete order
      t.update(productRef, { stock: productDoc.get('stock') + 1 });
      t.delete(orderRef);
    });
  } catch (e) {
    console.error(
      `Failed to record failed checkout ${session.id} in /api/webhook: ${e}`
    );
    throw e;
  }
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');

  // Verify request signature
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      sig!,
      webhookSecret
    );
  } catch (e) {
    return new NextResponse(`Webhook Error: ${e}`, {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Handle event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
      // Fall through
      case 'checkout.session.async_payment_succeeded':
        await handleSuccess(event.data.object as Stripe.Checkout.Session);
        break;
      case 'checkout.session.expired':
      // Fall through
      case 'checkout.session.async_payment_failed':
        await handleFailure(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        console.error(`Unhandled event type ${event.type} in /api/webhook`);
        break;
    }
  } catch (e) {
    return new NextResponse(`Webhook Error: ${e}`, {
      status: 500,
      headers: corsHeaders,
    });
  }

  return NextResponse.json(
    { received: true },
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
