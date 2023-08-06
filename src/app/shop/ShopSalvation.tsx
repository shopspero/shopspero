'use client';

import {
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Shop() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch('/api/checkout', {
        method: 'post',
        body: JSON.stringify({
          productId: 'salvation-navy-m',
          includeShipping: true,
        }),
        headers: { 'content-type': 'application/json' },
      });
      const responseBody = await response.json();
      if (responseBody['checkoutUrl'] !== undefined) {
        router.push(responseBody['checkoutUrl']);
      } else if (responseBody['error'] !== undefined) {
        console.error(responseBody['error']);
      } else {
        throw Error('Checkout request failed');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container maxWidth={900} textAlign="center">
      <Center p={10}>
        <Heading as="h1" size="2xl">
          Shop
        </Heading>
      </Center>
      <Text mb={5}>
        Fill out the form below to order our Salvation Crewneck!
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </Container>
  );
}
