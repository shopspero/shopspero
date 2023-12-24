import { db } from '@/lib/firebase';

export interface Order {
  id?: string;
  created?: number;
  product_id?: string;
  payment_status?: 'unpaid' | 'paid';
  fulfillment_option?: 'pickup' | 'delivery';
  fulfillment_status?: 'unfulfilled' | 'fulfilled' | 'canceled';
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
  notes?: string;
}

export async function getOrders(): Promise<Order[]> {
  try {
    return (await db.collection('orders').get()).docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Order;
    });
  } catch (e) {
    console.error(`getOrders() failed: ${e}`);
    return [];
  }
}

export async function getOrder(orderId: string): Promise<{
  order?: Order;
  status: 'success' | 'error';
}> {
  try {
    const doc = await db.collection('orders').doc(orderId).get();
    if (doc.exists) {
      return {
        order: { id: doc.id, ...doc.data() } as Order,
        status: 'success',
      };
    }
    return { order: undefined, status: 'success' };
  } catch (e) {
    console.error(`getOrder(${orderId}) failed: ${e}`);
    return { status: 'error' };
  }
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

      // Make cancellation idempotent
      if (orderDoc.get('fulfillment_status') === 'canceled') {
        return;
      }

      // Get product doc
      const productRef = db
        .collection('products')
        .doc(orderDoc.get('product_id'));
      const productDoc = await t.get(productRef);

      // Set order to canceled and restore inventory
      t.update(orderRef, { fulfillment_status: 'canceled' });
      t.update(productRef, { stock: productDoc.get('stock') + 1 });
    });
    return true;
  } catch (e) {
    console.error(`cancelOrder(${orderId}) failed: ${e}`);
    return false;
  }
}

export async function uncancelOrder(orderId: string) {
  try {
    const orderRef = db.collection('orders').doc(orderId);
    return await db.runTransaction(async (t) => {
      // Get order doc
      const orderDoc = await t.get(orderRef);

      // Make uncancellation idempotent
      if (orderDoc.get('fulfillment_status') !== 'canceled') {
        return false;
      }

      // Get product doc
      const productRef = db
        .collection('products')
        .doc(orderDoc.get('product_id'));
      const productDoc = await t.get(productRef);

      // Cannot uncancel if no stock
      if (productDoc.get('stock') < 1) {
        return false;
      }

      // Set order to canceled and restore inventory
      t.update(orderRef, { fulfillment_status: 'unfulfilled' });
      t.update(productRef, { stock: productDoc.get('stock') - 1 });

      return true;
    });
  } catch (e) {
    console.error(`uncancelOrder(${orderId}) failed: ${e}`);
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
