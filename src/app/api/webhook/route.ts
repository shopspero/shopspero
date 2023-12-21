import {
  cancelOrder,
  getOrderIdFromCheckoutId,
  upsertOrder,
} from '@/lib/order';
import { constructEvent } from '@/lib/stripe';
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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'content-type, stripe-signature',
};

/**
 * For successful payment, update the order.
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { orderId, status } = await getOrderIdFromCheckoutId(session.id);
  if (status !== 'success' || !orderId) {
    return false;
  }

  const name = session.customer_details?.name;
  const email = session.customer_details?.email;
  const phone = session.customer_details?.phone;
  const line1 = session.customer_details?.address?.line1;
  const line2 = session.customer_details?.address?.line2;
  const city = session.customer_details?.address?.city;
  const state = session.customer_details?.address?.state;
  const country = session.customer_details?.address?.country;
  const postal_code = session.customer_details?.address?.postal_code;

  return await upsertOrder({
    id: orderId,
    payment_status: 'paid',
    name: name ? name : undefined,
    email: email ? email : undefined,
    phone: phone ? phone : undefined,
    address: {
      line1: line1 ? line1 : undefined,
      line2: line2 ? line2 : undefined,
      city: city ? city : undefined,
      state: state ? state : undefined,
      country: country ? country : undefined,
      postal_code: postal_code ? postal_code : undefined,
    },
  });
}

/**
 * For failed payment, update stock and delete the order.
 */
async function handleFailedPayment(session: Stripe.Checkout.Session) {
  const { orderId, status } = await getOrderIdFromCheckoutId(session.id);
  if (status !== 'success' || !orderId) {
    return false;
  }
  return await cancelOrder(orderId);
}

export async function POST(request: NextRequest) {
  // Verify request signature
  const { event, status } = await constructEvent(request);
  if (status !== 'success' || !event) {
    return new NextResponse('Webhook error', {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Handle event
  let success: boolean;
  switch (event.type) {
    case 'checkout.session.completed':
    // Fall through
    case 'checkout.session.async_payment_succeeded':
      success = await handleSuccessfulPayment(
        event.data.object as Stripe.Checkout.Session
      );
      break;
    case 'checkout.session.expired':
    // Fall through
    case 'checkout.session.async_payment_failed':
      success = await handleFailedPayment(
        event.data.object as Stripe.Checkout.Session
      );
      break;
    default:
      success = false;
      console.error(`Unhandled event type ${event.type} in /api/webhook`);
      break;
  }

  if (!success) {
    console.error(`Failed to handle ${event} in /api/webhook`);
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
