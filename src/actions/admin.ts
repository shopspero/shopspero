'use server';

import { auth } from '@/lib/auth';
import {
  Order,
  getOrder as libGetOrder,
  getOrders as libGetOrders,
  upsertOrder as libUpsertOrder,
  cancelOrder as libCancelOrder,
} from '@/lib/order';
import {
  Product,
  getProducts as libGetProducts,
  upsertProduct as libUpsertProduct,
  deleteProduct as libDeleteProduct,
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

export async function cancelOrder(orderId: string) {
  const session = await auth();
  if (!session) {
    return false;
  }
  return libCancelOrder(orderId);
}
