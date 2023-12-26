import {
  Order,
  cancelOrder,
  getOrderIdFromCheckoutId,
  upsertOrder,
} from '@/lib/order';
import { constructEvent } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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

  let order: Order = { id: orderId, payment_status: 'paid' };
  if (session.customer_details?.name) {
    order.name = session.customer_details.name;
  }
  if (session.customer_details?.email) {
    order.email = session.customer_details.email;
  }
  if (session.customer_details?.phone) {
    order.phone = session.customer_details.phone;
  }
  if (session.shipping_details?.address) {
    order.address = {};
    if (session.shipping_details.address.line1) {
      order.address.line1 = session.shipping_details.address.line1;
    }
    if (session.shipping_details.address.line2) {
      order.address.line2 = session.shipping_details.address.line2;
    }
    if (session.shipping_details.address.city) {
      order.address.city = session.shipping_details.address.city;
    }
    if (session.shipping_details.address.state) {
      order.address.state = session.shipping_details.address.state;
    }
    if (session.shipping_details.address.country) {
      order.address.country = session.shipping_details.address.country;
    }
    if (session.shipping_details.address.postal_code) {
      order.address.postal_code = session.shipping_details.address.postal_code;
    }
  }

  return await upsertOrder(order);
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
      success = await handleSuccessfulPayment(event.data.object);
      break;
    case 'checkout.session.expired':
    // Fall through
    case 'checkout.session.async_payment_failed':
      success = await handleFailedPayment(event.data.object);
      break;
    default:
      success = false;
      console.error(`Unhandled event type ${event.type} in /api/webhook`);
      break;
  }

  if (!success) {
    console.error(
      `Failed to handle checkout session in /api/webhook: ${
        event.data.object as Stripe.Checkout.Session
      }`
    );
    return new NextResponse('Webhook error', {
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
