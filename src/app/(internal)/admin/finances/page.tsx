import FinancesView from './FinancesView';
import { Center, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Finances - Spero',
};

export default function Page() {
  return (
    <Container maxWidth="content">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Finances
        </Heading>
      </Center>
      <FinancesView />
    </Container>
  );
}
