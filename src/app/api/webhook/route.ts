import {
  Order,
  cancelOrder,
  getOrderIdFromCheckoutId,
  getOrder,
  upsertOrder,
} from '@/lib/order';
import { constructEvent } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'content-type, stripe-signature',
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a neat confirmation email with HTML content.
 */
async function sendConfirmationEmail(orderId: string) {
  const orderRes = await getOrder(orderId);
  if (orderRes.status === "error" || !orderRes.order) {
    return;
  }
  const order: Order = orderRes.order;
  try {
    const emailHtml = `
      <div style="font-family: 'Arial', sans-serif; color: #333; background-color: #F9FAFB; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${process.env.NEXTAUTH_URL}/images/logo.png" alt="Spero Logo" style="max-width: 150px; margin-bottom: 10px;" />
          <h1 style="color: #222; font-size: 24px; font-weight: 600;">Thank you for your purchase, ${order.name}!</h1>
          <p style="font-size: 16px; color: #555;">
            We have received your payment and your order is being processed. We are grateful for your support and thank you for being a part of the Spero community!
          </p>
        </div>
        <div style="background-color: #FFF; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h2 style="color: #222; font-size: 20px; margin-bottom: 10px;">Order Details</h2>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; color: #555;">
            <li style="margin-bottom: 8px;"><strong>Order ID:</strong> ${order.id}</li>
            <li style="margin-bottom: 8px;"><strong>Product ID:</strong> ${order.product_id}</li>
            <li style="margin-bottom: 8px;"><strong>Payment Status:</strong> ${order.payment_status}</li>
            <li style="margin-bottom: 8px;"><strong>Fulfillment Option:</strong> ${order.fulfillment_option || 'Not specified'}</li>
            ${order.email ? `<li style="margin-bottom: 8px;"><strong>Email:</strong> ${order.email}</li>` : ''}
            ${order.phone ? `<li style="margin-bottom: 8px;"><strong>Phone:</strong> ${order.phone}</li>` : ''}
          </ul>
        </div>
        <p style="font-size: 16px; color: #555; margin-top: 20px;">
          We will be in contact with additional information or follow-ups regarding your order. If you have any questions, feel free to contact us at 
          <a href="mailto:${process.env.EMAIL_USER}" style="color: #007BFF; text-decoration: none;">${process.env.EMAIL_USER}</a>.
        </p>
        <p style="font-size: 16px; color: #555; text-align: center; margin-top: 30px;">
          In Christ,<br />
          <strong>Spero</strong>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Shop Spero" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: 'Your Order Confirmation',
      html: emailHtml,
    });
  } catch (err) {
    console.error(`Couldn't send confirmation email to ${order.email}:`, err);
  }
}

/**
 * For successful payment, update the order.
 */
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  console.log("Here in backend!");
  console.log(session);
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

  const res = await upsertOrder(order);

  await sendConfirmationEmail(orderId);

  return res;
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
