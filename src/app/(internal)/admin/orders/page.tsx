import OrdersTable from '@/app/(internal)/admin/orders/OrdersTable';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Orders - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Orders
        </Heading>
      </Center>
      <OrdersTable />
    </Container>
  );
}
