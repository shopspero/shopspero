import { db } from '@/lib/firebase';
import { logger } from './discordLogger';

export interface Product {
  id: string;
  price_id: string;
  stock: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    return (await db.collection('products').get()).docs.map((doc) => {
      return {
        id: doc.id,
        price_id: doc.get('price_id') as string,
        stock: doc.get('stock') as number,
      };
    });
  } catch (e) {
    logger.error(`getProducts() failed: ${e}`);
    return [];
  }
}

export async function upsertProduct(product: Product) {
  try {
    const { id, ...rest } = product;
    await db.collection('products').doc(product.id).set(rest, { merge: true });
    return true;
  } catch (e) {
    logger.error(`upsertProduct(${product}) failed: ${e}`);
    return false;
  }
}

export async function deleteProduct(productId: string) {
  try {
    await db.collection('products').doc(productId).delete();
    return true;
  } catch (e) {
    logger.error(`deleteProduct(${productId}) failed: ${e}`);
    return false;
  }
}

export async function reserveInventory(productId: string): Promise<{
  priceId?: string;
  status: 'success' | 'out of stock' | 'error';
}> {
  let priceId: string | null;
  try {
    const productRef = db.collection('products').doc(productId);
    priceId = await db.runTransaction(async (t) => {
      const productDoc = await t.get(productRef);
      if (!productDoc.exists) return null;
      const priceId = productDoc.get('price_id');
      const stock = productDoc.get('stock');
      if (
        typeof priceId !== 'string' || !priceId.trim() ||
        !Number.isSafeInteger(stock) || stock < 0
      ) {
        throw new Error('Product has invalid price or stock');
      }
      if (stock <= 0) {
        return null;
      }
      t.update(productRef, { stock: stock - 1 });
      return priceId;
    });
  } catch (e) {
    logger.error(`reserveInventory(${productId}) failed: ${e}`);
    return { status: 'error' };
  }
  if (!priceId) {
    return { status: 'out of stock' };
  }
  return { priceId, status: 'success' };
}
