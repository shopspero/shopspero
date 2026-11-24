import ProductsTable from './ProductsTable';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Products - Spero',
};

export default async function Page() {
  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Products
        </Heading>
      </Center>
      <ProductsTable />
    </Container>
  );
}
