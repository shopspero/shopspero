'use client';

import { Box } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { hasPermission } from '@/lib/permissions';
import type { Permission } from '@/lib/users';

const allNavLinks: { title: string; href: string; permission?: Permission }[] = [
  { title: 'ADMIN', href: '/admin' },
  { title: 'ORDERS', href: '/admin/orders', permission: 'general' },
  { title: 'LOG ORDER', href: '/admin/log-order', permission: 'general' },
  { title: 'PRODUCTS', href: '/admin/products', permission: 'general' },
  { title: 'FINANCES', href: '/admin/finances', permission: 'general' },
  { title: 'DROP ORDERS', href: '/admin/finances/orders', permission: 'general' },
  { title: 'EXEC', href: '/admin/exec', permission: 'exec' },
  { title: 'SIGN OUT', href: '/admin/sign-out' },
];

function Login({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return;
  } else if (status === 'authenticated' && session) {
    const navLinks = allNavLinks.filter(
      (link) => !link.permission || hasPermission(session, link.permission)
    );
    return (
      <>
        <NavBar links={navLinks} />
        {children}
        <Box p={5} />
      </>
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
