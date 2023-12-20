'use client';

import { AbsoluteCenter, Button, Heading } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { SessionProvider, signIn, useSession } from 'next-auth/react';

const navLinks = [
  { title: 'ADMIN', href: '/admin' },
  { title: 'ORDERS', href: '/admin/orders' },
  { title: 'PRODUCTS', href: '/admin/products' },
  { title: 'SIGN OUT', href: '/admin/sign-out' },
];

function Login({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return;
  } else if (status === 'authenticated' && session) {
    return (
      <>
        <NavBar links={navLinks} />
        {children}
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
