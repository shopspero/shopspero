'use client';

import {
  Box,
  Center,
  Heading,
  Container,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import Staff from '@/app/team/components/Staff';
import staffData from '@/app/team/staff-data';

export default function Team() {
  return (
    <Box>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Our Team
        </Heading>
      </Center>
      <Container maxWidth={900} p={5}>
        <Text>
          Spero is comprised of a diverse group of Christians who all choose to
          use their talents and skills to glorify God through their work on this
          team. This staff strives to sharpen one another and inspire others to
          carry out God&apos;s mission. Meet the staff that makes Spero a
          reality.
        </Text>
        <VStack spacing={5} pt={5} pb={5}>
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
      </Container>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Join Us
        </Heading>
      </Center>
      <Container maxWidth={900} p={5}>
        Interesting in working with an amazingly creative team who loves God?
        We&apos;re always looking for new members! If you&apos;re excited about
        using your creative talents to design apparel and merchandise that
        glorifies God, shoot us an email at{' '}
        <Link
          as={NextLink}
          href="mailto:shopspero@gmail.com"
          variant="underline"
          isExternal
        >
          shopspero@gmail.com
        </Link>{' '}
        or send us a message on{' '}
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
        </Link>
        . We currently have a design team, marketing team, operations team, and
        web development team.
      </Container>
    </Box>
  );
}
