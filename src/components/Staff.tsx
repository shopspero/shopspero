'use client';

import { StaffInfo } from '@/app/(external)/team/staff-data';
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function Staff(staff: Readonly<StaffInfo>) {
  return (
    <Container maxWidth={700}>
      <HStack spacing={5}>
        <Box
          style={{
            justifySelf: 'flex-start',
            flex: '0 1 40%',
          }}
        >
          <Image
            src={staff.img}
            width={250}
            height={250}
            alt={staff.name}
            style={{
              borderRadius: '50%',
            }}
          />
        </Box>
        <VStack align="flex-start" flex="1 1 60%">
          <Heading as="h2" size="lg">
            {staff.name}
          </Heading>
          <Text fontWeight={600}>{staff.role}</Text>
          <Text>{staff.bio}</Text>
        </VStack>
      </HStack>
    </Container>
  );
}
