'use client';

import Staff from '@/components/Staff';
import staffData from '@/app/team/staff-data';
import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Team() {
  return (
    <Container maxWidth={900}>
      <Center p={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Our Team
        </Heading>
      </Center>
      <Text mb={5}>
        Spero is comprised of a diverse group of Christians who all choose to
        use their talents and skills to glorify God through their work on this
        team. This staff strives to sharpen one another and inspire others to
        carry out God&apos;s mission. Meet the staff that makes Spero a reality.
      </Text>
      <VStack spacing={5} mt={5} mb={5}>
        {staffData.map((staff) => (
          <Staff
            key={staff.img}
            name={staff.name}
            role={staff.role}
            bio={staff.bio}
            img={staff.img}
            hovImg={staff.hovImg}
          />
        ))}
      </VStack>
      <Center p={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Join Us
        </Heading>
      </Center>{' '}
      <Text mb={5}>
        Interested in working with an amazingly creative team who loves God?
        We&apos;re recruiting for Fall 2023! If you&apos;re excited about using
        your creative talents to design apparel and merchandise that glorifies
        God, fill out our interest form{' '}
        <Link as={NextLink} href="/interest" variant="underline" isExternal>
          here
        </Link>
        , and we&apos;ll reach out with more information when our application
        opens. We have roles in design, marketing, operations, and web
        development.
      </Text>
    </Container>
  );
}
