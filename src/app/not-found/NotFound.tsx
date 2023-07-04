'use client';

import { Box, Center, Container, Heading, Text } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Box>
      <Container maxWidth={900} textAlign="center">
        <Center p={10}>
          <Heading as="h1" size="2xl">
            Uh oh, 404.
          </Heading>
        </Center>
        <Text mb={5}>
          Looks like we couldn&apos;t find the page you were looking for :(
        </Text>
      </Container>
    </Box>
  );
}
