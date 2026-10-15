'use server';

import { auth } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import type { Permission } from '@/lib/users';
import {
  Order,
  addOrder,
  getOrder as libGetOrder,
  getOrders as libGetOrders,
  upsertOrder as libUpsertOrder,
  deleteOrder as libDeleteOrder
} from '@/lib/order';
import {
  Product,
  getProducts as libGetProducts,
  upsertProduct as libUpsertProduct,
  deleteProduct as libDeleteProduct,
  reserveInventory,
} from '@/lib/product';

export interface UserProfile {
  name?: string;
  title?: string;
  permissions: Permission[];
}

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return {
    name: session.user.name ?? undefined,
    title: session.user.title,
    permissions: session.user.permissions ?? [],
  };
}

export interface ExecOverview {
  totalOrders: number;
  paidOrders: number;
  unfulfilledOrders: number;
  totalProducts: number;
  totalStock: number;
}

// Exec-only aggregate stats. Returns null for anyone without the exec permission,
// so the exec dashboard page has nothing to render for a general user.
export async function getExecOverview(): Promise<ExecOverview | null> {
  const session = await auth();
  if (!hasPermission(session, 'exec')) {
    return null;
  }
  const [orders, products] = await Promise.all([libGetOrders(), libGetProducts()]);
  return {
    totalOrders: orders.length,
    paidOrders: orders.filter((o) => o.payment_status === 'paid').length,
    unfulfilledOrders: orders.filter((o) => o.fulfillment_status === 'unfulfilled').length,
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + (p.stock ?? 0), 0),
  };
}

export async function getProducts() {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return [];
  }
  return libGetProducts();
}

export async function upsertProduct(product: Product) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return false;
  }
  return libUpsertProduct(product);
}

export async function deleteProduct(productId: string) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return false;
  }
  return libDeleteProduct(productId);
}

export async function getOrders() {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return [];
  }
  return libGetOrders();
}

export async function getOrder(orderId: string) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return undefined;
  }
  const { order } = await libGetOrder(orderId);
  return order;
}

export async function upsertOrder(order: Order) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return false;
  }
  return libUpsertOrder(order);
}

export async function deleteOrder(orderId: string) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return false;
  }
  return libDeleteOrder(orderId);
}

export async function manuallyLogOrder(
  order: Order
): Promise<{ orderId?: string; status: 'success' | 'out of stock' | 'error' }> {
  const session = await auth();
  if (
    !hasPermission(session, 'general') ||
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
