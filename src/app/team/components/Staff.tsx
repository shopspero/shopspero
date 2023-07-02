'use client';

import {
  Container,
  Flex,
  Text,
  VStack,
  Heading,
  HStack,
  Box,
  useBoolean,
} from '@chakra-ui/react';
import Image from 'next/image';

export interface StaffInfo {
  name: string;
  role: string;
  bio: string;
  img: string;
  hovImg: string;
}

export default function Staff(staff: StaffInfo) {
  const [hover, setHover] = useBoolean();

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
            src={hover ? staff.hovImg : staff.img}
            width={250}
            height={250}
            alt={staff.name}
            style={{ borderRadius: '50%' }}
            onMouseEnter={setHover.on}
            onMouseLeave={setHover.off}
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
