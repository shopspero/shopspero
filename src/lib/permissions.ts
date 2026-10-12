import type { Session } from 'next-auth';
import type { Permission } from './users';

export function hasPermission(
  session: Session | null | undefined,
  permission: Permission
): boolean {
  const permissions = session?.user?.permissions ?? [];
  return permissions.includes('*') || permissions.includes(permission);
}
