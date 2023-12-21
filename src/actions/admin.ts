'use server';

import { auth } from '@/lib/auth';
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
