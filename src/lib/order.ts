'use server';

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { auth } from '@/lib/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}

const db = getFirestore();

export interface Order {
  id: string;
  product_id: string;
  created: number;
  payment_status: 'unpaid' | 'unpaid';
  fulfillment_status: 'unfulfilled' | 'fulfilled';
  checkout_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
}

export async function addOrder(order: Order) {
  try {
    const { id, ...rest } = order;
    await db.collection('orders').add(rest);
    return true;
  } catch (e) {
    console.error(`addOrder(${order}) failed: ${e}`);
    return false;
  }
}
