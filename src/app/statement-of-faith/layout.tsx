'use client';

import { Container } from '@chakra-ui/react';

export default function StatementOfFaithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container maxWidth={900}>{children}</Container>;
}
