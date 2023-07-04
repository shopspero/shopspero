'use client';

import designData from '@/app/designs/design-data';
import {
  Box,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Designs() {
  return (
    <Box>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Designs
        </Heading>
      </Center>
      <Container maxWidth={900} p={5} textAlign="center">
        <VStack spacing={5} pt={5} pb={5}></VStack>
      </Container>
    </Box>
  );
}
