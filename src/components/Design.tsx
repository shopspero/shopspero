'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface DesignInfo {
  name: string;
  description: ReactNode;
  imgs: string[];
}

export default function Design(design: DesignInfo) {
  return (
    <Box textAlign="left">
      <Heading as="h2" size="lg">
        {design.name}
      </Heading>
      {design.description}
    </Box>
  );
}
