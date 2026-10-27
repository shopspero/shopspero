import SheetOrdersTable from './SheetOrdersTable';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Drop Orders - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Drop Orders
        </Heading>
      </Center>
      <SheetOrdersTable />
    </Container>
  );
}
