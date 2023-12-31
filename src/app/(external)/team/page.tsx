export const metadata = {
  title: 'Team - Spero',
};

import Staff from '@/components/Staff';
import staffData from '@/app/(external)/team/staff-data';
import {
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Page() {
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
          <Staff {...staff} key={staff.img} />
        ))}
      </VStack>
      <Center p={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Join Us
        </Heading>
      </Center>
      <Text mb={5}>
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
        . We have roles in design, marketing, operations, and web development.
      </Text>
    </Container>
  );
}
