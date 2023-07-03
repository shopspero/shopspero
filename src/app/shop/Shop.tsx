'use client';

import { Box, Center, Container, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Shop() {
  return (
    <Box>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Shop
        </Heading>
      </Center>
      <Container maxWidth={900} p={5} textAlign="center">
        <Text>
          Our shop is currently closed, but follow us on{' '}
          <Link
            as={NextLink}
            href="https://www.instagram.com/shopspero/"
            variant="underline"
            isExternal
          >
            Instagram
          </Link>{' '}
          or{' '}
          <Link
            as={NextLink}
            href="https://www.facebook.com/shopspero/"
            variant="underline"
            isExternal
          >
            Facebook
          </Link>{' '}
          for updates on our next drop!
        </Text>
      </Container>
    </Box>
  );
}
