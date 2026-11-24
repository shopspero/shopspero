'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { hasPermission } from '@/lib/permissions';
import type { Permission } from '@/lib/users';

interface NavLink {
  title: string;
  href: string;
  permission?: Permission;
}

// Old dashboard tabs (Finances, Drop Orders, Online Orders, Exec) are archived
// in src/archive/admin. The admin section is just Dashboards + Finance for now,
// both backed by MongoDB (which isn't populated yet).
const allNavLinks: NavLink[] = [
  { title: 'DASHBOARDS', href: '/admin' },
  { title: 'FINANCE', href: '/admin/finance', permission: 'general' },
];
const signOutLink: NavLink = { title: 'SIGN OUT', href: '/admin/sign-out' };

function Login({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return;
  } else if (status === 'authenticated' && session) {
    const navLinks = allNavLinks.filter(
      (link) => !link.permission || hasPermission(session, link.permission)
    );
    return (
      <div className="admin-layout">
        <AdminSidebar links={navLinks} signOutLink={signOutLink} />
        <main className="admin-content">{children}</main>
      </div>
    );
  } else {
    signIn();
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Login>{children}</Login>
    </SessionProvider>
  );
}
