import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}

const db = getFirestore();

export interface Product {
  id: string;
  price_id: string;
  stock: number;
}

export async function getProducts(): Promise<Product[]> {
  return (await db.collection('products').get()).docs.map((doc) => {
    return {
      id: doc.id,
      price_id: doc.get('price_id') as string,
      stock: doc.get('stock') as number,
    };
  });
}

export async function upsertProduct(product: Product) {
  try {
    const { id, ...rest } = product;
    await db.collection('products').doc(product.id).set(rest);
    return true;
  } catch (e) {
    console.error(`upsertProduct(${product}) failed: ${e}`);
    return false;
  }
}

export async function deleteProduct(productId: string) {
  try {
    await db.collection('products').doc(productId).delete();
    return true;
  } catch (e) {
    console.error(`deleteProduct(${productId}) failed: ${e}`);
    return false;
  }
}

export async function reserveInventory(productId: string): Promise<{
  priceId?: string;
  status: 'success' | 'out of stock' | 'error';
}> {
  let priceId: string;
  try {
    const productRef = db.collection('products').doc(productId);
    priceId = await db.runTransaction(async (t) => {
      const productDoc = await t.get(productRef);
      const priceId = productDoc.get('price_id');
      const stock = productDoc.get('stock');
      if (stock <= 0) {
        return null;
      }
      t.update(productRef, { stock: stock - 1 });
      return priceId;
    });
  } catch (e) {
    console.error(`reserveInventory(${productId}) failed: ${e}`);
    return { status: 'error' };
  }
  if (!priceId) {
    return { status: 'out of stock' };
  }
  return { priceId, status: 'success' };
}
