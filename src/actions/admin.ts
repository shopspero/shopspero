'use server';

import { auth } from '@/lib/auth';
import {
  Order,
  addOrder,
  getOrder as libGetOrder,
  getOrders as libGetOrders,
  upsertOrder as libUpsertOrder,
} from '@/lib/order';
import {
  Product,
  getProducts as libGetProducts,
  upsertProduct as libUpsertProduct,
  deleteProduct as libDeleteProduct,
  reserveInventory,
} from '@/lib/product';

export async function getProducts() {
  const session = await auth();
  if (!session) {
    return [];
  }
  return libGetProducts();
}

export async function upsertProduct(product: Product) {
  const session = await auth();
  if (!session) {
    return false;
  }
  return libUpsertProduct(product);
}

export async function deleteProduct(productId: string) {
  const session = await auth();
  if (!session) {
    return false;
  }
  return libDeleteProduct(productId);
}

export async function getOrders() {
  const session = await auth();
  if (!session) {
    return [];
  }
  return libGetOrders();
}

export async function getOrder(orderId: string) {
  const session = await auth();
  if (!session) {
    return undefined;
  }
  const { order } = await libGetOrder(orderId);
  return order;
}

export async function upsertOrder(order: Order) {
  const session = await auth();
  if (!session) {
    return false;
  }
  return libUpsertOrder(order);
}

export async function manuallyLogOrder(
  order: Order
): Promise<{ orderId?: string; status: 'success' | 'out of stock' | 'error' }> {
  const session = await auth();
  if (
    !session ||
    !order.product_id ||
    !order.fulfillment_option ||
    !order.email
  ) {
    return { status: 'error' };
  }

  // Reserve inventory and get priceId
  const { status: inventoryStatus } = await reserveInventory(order.product_id);
  if (inventoryStatus === 'out of stock') {
    return { status: 'out of stock' };
  } else if (inventoryStatus !== 'success') {
    return { status: 'error' };
  }

  // Record order
  let dbOrder = { ...order };
  dbOrder.created = Date.now() / 1000;
  dbOrder.payment_status = 'unpaid';
  dbOrder.fulfillment_status = 'unfulfilled';
  const { orderId, status: addStatus } = await addOrder(dbOrder);
  if (addStatus !== 'success' || !orderId) {
    return { status: 'error' };
  }
  return { orderId, status: 'success' };
}
