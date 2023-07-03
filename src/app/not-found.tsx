'use client';

import { Box, Container, Center, Heading } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Box>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Uh oh, 404.
        </Heading>
      </Center>
      <Container maxWidth={900} p={5} textAlign="center">
        Looks like we couldn&apos;t find the page you were looking for :(
      </Container>
    </Box>
  );
}
