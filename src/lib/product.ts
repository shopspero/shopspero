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

export interface Product {
  id: string;
  priceId: string;
  stock: number;
}

export async function getProducts(): Promise<Product[]> {
  const session = await auth();
  if (!session) {
    return [];
  }
  return (await db.collection('products').get()).docs.map((doc) => {
    return {
      id: doc.id,
      priceId: doc.get('price_id') as string,
      stock: doc.get('stock') as number,
    };
  });
}

export async function upsertProduct(product: Product) {
  const session = await auth();
  if (!session) {
    return false;
  }
  try {
    await db.collection('products').doc(product.id).set({
      price_id: product.priceId,
      stock: product.stock,
    });
    return true;
  } catch (e) {
    console.error(`upsertProduct on ${product} failed: ${e}`);
    return false;
  }
}

export async function deleteProduct(productId: string) {
  const session = await auth();
  if (!session) {
    return;
  }
  await db.collection('products').doc(productId).delete();
}
