import usersData from './users.json';

export type Permission = 'orders' | 'products' | 'log-order' | '*';

export interface AppUser {
  email: string;
  name?: string;
  permissions: Permission[];
}

type UsersFile = Record<string, { name?: string; permissions: Permission[] }>;

const users = usersData as UsersFile;

/**
 * Static JSON-backed user allowlist. Swap this implementation for a
 * MongoDB lookup later — callers only depend on this function's signature.
 */
export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const entry = users[email.toLowerCase()];
  if (!entry) {
    return null;
  }
  return {
    email: email.toLowerCase(),
    name: entry.name,
    permissions: entry.permissions,
  };
}
