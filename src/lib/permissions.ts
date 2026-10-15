import type { Session } from 'next-auth';
import type { Permission } from './users';

export function hasPermission(
  session: Session | null | undefined,
  permission: Permission
): boolean {
  const permissions = session?.user?.permissions ?? [];
  // exec is a superset: exec users pass every check, including general-gated ones.
  return permissions.includes('exec') || permissions.includes(permission);
}
