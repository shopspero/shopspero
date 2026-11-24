import { Center, Container, Heading } from '@chakra-ui/react';
import LogForm from './LogForm';

export const metadata = {
  title: 'Log Order - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={900}>
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Log Order
        </Heading>
      </Center>
      <LogForm />
    </Container>
  );
}
