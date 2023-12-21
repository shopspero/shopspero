import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  });
}

const db = getFirestore();

export interface Order {
  id?: string;
  created?: number;
  product_id?: string;
  payment_status?: 'unpaid' | 'paid';
  fulfillment_option?: 'pickup' | 'delivery';
  fulfillment_status?: 'unfulfilled' | 'fulfilled';
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

export async function upsertOrder(order: Order) {
  try {
    const { id, ...rest } = order;
    await db.collection('orders').doc(id!).set(rest, { merge: true });
    return true;
  } catch (e) {
    console.error(`upsertOrder(${order}) failed: ${e}`);
    return false;
  }
}

export async function cancelOrder(orderId: string) {
  try {
    const orderRef = db.collection('orders').doc(orderId);
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
    return true;
  } catch (e) {
    console.error(`cancelOrder(${orderId}) failed: ${e}`);
    return false;
  }
}

export async function getOrderIdFromCheckoutId(
  checkoutId: string
): Promise<{ orderId?: string; status: 'success' | 'error' }> {
  try {
    const snapshot = await db
      .collection('orders')
      .where('checkout_id', '==', checkoutId)
      .get();
    if (snapshot.docs.length < 1) {
      return { status: 'error' };
    }
    return { orderId: snapshot.docs[0].id, status: 'success' };
  } catch (e) {
    console.error(`getOrderIdFromCheckoutId(${checkoutId}) failed: ${e}`);
    return { status: 'error' };
  }
}
