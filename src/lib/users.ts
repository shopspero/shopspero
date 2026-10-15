import { getDb } from './mongodb';

export type Permission = 'general' | 'exec';

export interface AppUser {
  email: string;
  name?: string;
  // Personal blurb shown on the user's own admin home page, e.g. their role/title.
  title?: string;
  permissions: Permission[];
}

interface UserDoc {
  email: string;
  name?: string;
  title?: string;
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
    title: doc.title,
    permissions: doc.permissions,
  };
}
