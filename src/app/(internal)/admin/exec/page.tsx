import { getExecOverview } from '@/actions/admin';
import { notFound } from 'next/navigation';
import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

export const metadata = {
  title: 'Exec Dashboard - Spero',
};

export default async function Page() {
  const overview = await getExecOverview();
  if (!overview) {
    notFound();
  }

  return (
    <Container maxWidth={1000}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Exec Dashboard
        </Heading>
      </Center>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
        <Stat>
          <StatLabel>Total orders</StatLabel>
          <StatNumber>{overview.totalOrders}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Paid orders</StatLabel>
          <StatNumber>{overview.paidOrders}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Unfulfilled orders</StatLabel>
          <StatNumber>{overview.unfulfilledOrders}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Products</StatLabel>
          <StatNumber>{overview.totalProducts}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total stock</StatLabel>
          <StatNumber>{overview.totalStock}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Container>
  );
}
