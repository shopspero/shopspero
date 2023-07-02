'use client';

import {
  Box,
  Container,
  Heading,
  Center,
  Text,
  HStack,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Home() {
  return (
    <>
      <Box p={5}>
        <Container
          maxWidth={1300}
          height={{ base: 400, sm: 600, md: 800 }}
          position="relative"
        >
          <Heading
            as="h1"
            position="absolute"
            top={0}
            right={0}
            width="80%"
            textAlign="right"
            zIndex="overlay"
            size={{ base: 'md', sm: 'xl' }}
          >
            Spero is a team of Cal students with a heart to share the Gospel
            with Biblically empowered apparel.
          </Heading>
          <Image
            src="/images/home/fullness-1.jpg"
            width={250}
            height={375}
            alt="Fullness hoodie"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              maxWidth: '30vw',
            }}
          />
          <Image
            src="/images/home/team.jpg"
            width={900}
            height={600}
            alt="Team"
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translateX(-50%) translateY(-60%)',
              maxWidth: '80vw',
            }}
          />
          <Image
            src="/images/home/139.jpg"
            width={250}
            height={250}
            alt="Psalm 139 shirt"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              maxWidth: '30vw',
            }}
          />
        </Container>
      </Box>

      <Box p={5}>
        <Container maxWidth={900}>
          <HStack spacing={5}>
            <Box width="50%">
              <Center>
                <Image
                  src="/images/home/salvation.jpg"
                  width={350}
                  height={525}
                  alt="Salvation crewneck"
                />
              </Center>
            </Box>
            <Text width="50%">
              We're dedicated to bridging{' '}
              <Text as="b">fashion and mission</Text>. As a Christian
              organization, our heart is to advance the gospel through apparel
              that is empowered by Biblical truth and vision. We aim to produce
              intentional designs that spark hope through everyday wear and
              conversation. 30% of all profits are donated to various
              social-good organizations both in and outside of the Bay Area such
              as Compassion International, Imago Dei Clinic, Laundry Love, and
              Hands and Feet.
            </Text>
          </HStack>
        </Container>
      </Box>
      <Box p={5}>
        <Container maxWidth={900} mt={5} mb={5}>
          <HStack spacing={5}>
            <Text width="50%">
              In Latin, the word "spero" means <Text as="b">"to hope"</Text>.
              Our vision is inspired by Matthew 10:29-31, where something as
              insignificant as a sparrow will be remembered and cared for. We
              want to expose the poverty in these neglected communities through
              an innovative medium.{' '}
              <Text as="b">
                The goal of Spero is to bring hope to the hopeless and light
                into darkness.
              </Text>
            </Text>
            <Box width="50%">
              <Center>
                <Image
                  src="/images/home/fullness-2.jpg"
                  width={350}
                  height={525}
                  alt="Fullness hoodie"
                />
              </Center>
            </Box>
          </HStack>
        </Container>
      </Box>
      <Box bg="gray.100" pt={20} pb={20} pl={10} pr={10}>
        <Container maxWidth={900}>
          <Heading as="h2" textAlign="center">
            Read our{' '}
            <Link as={NextLink} href="/statement-of-faith" variant="underline">
              Statement of Faith
            </Link>
            .
          </Heading>
        </Container>
      </Box>
    </>
  );
}
