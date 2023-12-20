'use client';

import { AbsoluteCenter, Button } from '@chakra-ui/react';
import NavBar from '@/components/NavBar';
import { SessionProvider, signIn, useSession } from 'next-auth/react';

const navLinks = [
  { title: 'INVENTORY', href: 'admin/inventory' },
  { title: 'ORDERS', href: 'admin/orders' },
  { title: 'SIGN OUT', href: '/admin/sign-out' },
];

function Login({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <NavBar title={'ADMIN'} links={navLinks} />
        {children}
      </>
    );
  } else {
    return (
      <AbsoluteCenter>
        <Button onClick={() => signIn()}>Sign in</Button>
      </AbsoluteCenter>
    );
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
