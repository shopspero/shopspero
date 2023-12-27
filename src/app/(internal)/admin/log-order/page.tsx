import { Center, Container, Heading } from '@chakra-ui/react';
import LogForm from '@/app/(internal)/admin/log-order/LogForm';

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
