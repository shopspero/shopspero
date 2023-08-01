'use client';

import { Box, Center, Container, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Shop() {
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
      <Center>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeDLK6WAOCNxaUBoiOCjinPYjplGcTVz-Mfr1fhEUNmsOwKyw/viewform?embedded=true"
          width="640"
          height="2451"
        >
          Loading…
        </iframe>
      </Center>
    </Container>
  );
}
