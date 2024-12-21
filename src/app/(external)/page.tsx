import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function Page() {
  return (
    <>
      <Box p={4}>
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
            Spero is a team of college students with a heart to share the gospel
            with biblically empowered apparel.
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
            priority
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
            quality={50}
            priority
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
            priority
          />
        </Container>
      </Box>

      <Container maxWidth={900} mt={5} mb={5}>
        <HStack spacing={5}>
          <Box width="50%">
            <Center>
              <Image
                src="/images/designs/flowers-1.jpg"
                width={350}
                height={525}
                alt="Trust T-Shirt"
              />
            </Center>
          </Box>
          <Text width="50%">
            We&apos;re dedicated to bridging{' '}
            <Text as="b">fashion and mission</Text>. As a Christian
            organization, our heart is to advance the gospel through apparel
            that is empowered by biblical truth and vision. We aim to produce
            intentional designs that spark hope through everyday wear and
            conversation. 30% of all profits are donated to various social-good
            organizations both in and outside of the Bay Area such as Compassion
            International, Imago Dei Clinic, Laundry Love, and Hands and Feet.
          </Text>
        </HStack>
      </Container>
      <Container maxWidth={900} mt={5} mb={5}>
        <HStack spacing={5}>
          <Text width="50%">
            In Latin, the word &ldquo;spero&rdquo; means{' '}
            <Text as="b">&ldquo;to hope&rdquo;</Text>. Our vision is inspired by
            Matthew 10:29-31, where something as insignificant as a sparrow will
            be remembered and cared for. We want to expose the poverty in these
            neglected communities through an innovative medium.{' '}
            <Text as="b">
              The goal of Spero is to bring hope to the hopeless and light into
              darkness.
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
      <Box bg="gray.100" mt={10} pt={20} pb={20} pl={4} pr={4}>
        <Heading as="h2" textAlign="center" size={{ base: 'md', sm: 'xl' }}>
          Read our{' '}
          <Link as={NextLink} href="/statement-of-faith" variant="underline">
            Statement of Faith
          </Link>
          .
        </Heading>
      </Box>
    </>
  );
}
