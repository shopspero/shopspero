import { getDb } from './mongodb';

export type Permission = 'orders' | 'products' | 'log-order' | '*';

export interface AppUser {
  email: string;
  name?: string;
  permissions: Permission[];
}

interface UserDoc {
  email: string;
  name?: string;
  permissions: Permission[];
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const db = await getDb();
  const doc = await db
    .collection<UserDoc>('users')
    .findOne({ email: email.toLowerCase() });
  if (!doc) {
    return null;
  }
  return {
    email: doc.email,
    name: doc.name,
    permissions: doc.permissions,
  };
}
