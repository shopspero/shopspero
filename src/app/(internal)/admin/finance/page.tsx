import FinanceTable from './FinanceTable';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Finance - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={1200}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Finance
        </Heading>
      </Center>
      <FinanceTable />
    </Container>
  );
}
