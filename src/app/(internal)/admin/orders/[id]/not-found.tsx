import { Center, Container, Heading, Text } from '@chakra-ui/react';

export const metadata = {
  title: 'Order Not Found - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={900} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Order Not Found
        </Heading>
      </Center>
      <Text mb={5}>Looks like that order doesn&apos;t exist :(</Text>
    </Container>
  );
}
