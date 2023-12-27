import { getOrder } from '@/actions/admin';
import OrderDetails from './OrderDetails';
import { notFound } from 'next/navigation';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Inspect Order - Spero',
};

export default async function Page({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  if (!order) {
    notFound();
  }
  return (
    <Container maxWidth={1000} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Inspect Order
        </Heading>
      </Center>
      <OrderDetails order={order} />
    </Container>
  );
}
