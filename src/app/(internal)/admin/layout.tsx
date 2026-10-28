'use client';

import { Box } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { hasPermission } from '@/lib/permissions';
import type { Permission } from '@/lib/users';
import { useEffect } from 'react';

interface NavLink {
  title: string;
  href?: string;
  children?: { title: string; href: string }[];
  permission?: Permission;
}

// Order drives NavBar's left/right split (first half left, rest right).
const allNavLinks: NavLink[] = [
  { title: 'ADMIN', href: '/admin' },
  { title: 'FINANCES', href: '/admin/finances', permission: 'general' },
  { title: 'DROP ORDERS', href: '/admin/finances/orders', permission: 'general' },
  {
    title: 'ONLINE ORDERS',
    permission: 'general',
    children: [
      { title: 'ORDERS', href: '/admin/orders' },
      { title: 'LOG ORDER', href: '/admin/log-order' },
      { title: 'PRODUCTS', href: '/admin/products' },
    ],
  },
  { title: 'EXEC', href: '/admin/exec', permission: 'exec' },
  { title: 'SIGN OUT', href: '/admin/sign-out' },
];

function Login({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') void signIn();
  }, [status]);

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
  }
  return null;
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
