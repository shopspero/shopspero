'use client';

import {
  Box,
  Container,
  Heading,
  Image,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  Center,
  Button,
  HStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Inter } from 'next/font/google';
import { SPERO_BACKGROUND_RECESSED } from '@/lib/colors';

const inter = Inter({ subsets: ['latin'] });

export default function AboutPage() {
  return (
    <Box bg="white">
      <Box mb={16}>
        <Image
          src="/images/home/team.jpg"
          alt="Spero Team"
          width="100%"
          height="500px"
          objectFit="cover"
        />
        <Box bg={SPERO_BACKGROUND_RECESSED} py={12}>
          <Container maxW="container.lg">
            <VStack spacing={6} textAlign="center" className={inter.className}>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="bold"
                color="black"
                lineHeight="1.1"
              >
                We are Spero
              </Heading>
              <VStack spacing={2}>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="black"
                  fontStyle="italic"
                  fontWeight="normal"
                >
                  a team of college students with a heart to share the gospel with biblically empowered apparel.
                </Text>
              </VStack>
            </VStack>
          </Container>
        </Box>
      </Box>

      {/* Mission Section */}
      <Box bg="white" py={16}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            {/* Left Image */}
            <Center>
              <Image
                src="/images/home/confidence-1.jpg"
                alt="Confidence Design"
                borderRadius="md"
                objectFit="contain"
                maxHeight="400px"
                maxWidth="100%"
              />
            </Center>

            {/* Right Text */}
            <Flex height="400px" alignItems="center">
              <VStack align="start" spacing={6} className={inter.className}>
                <Text fontSize="lg" color="black" lineHeight="1.6">
                  We&apos;re dedicated to bridging{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    fashion and mission.
                  </Text>{' '}
                  As a Christian organization, our heart is to advance the gospel
                  through apparel that is empowered by biblical truth and vision.
                  We aim to produce intentional designs that spark hope through
                  everyday wear and conversation. 30% of all profits are donated
                  to various{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    social-good organizations
                  </Text>{' '}
                  both in and outside of the Bay Area such as Compassion International, Imago Dei Clinic,
                  Laundry Love, and Hands and Feet.
                </Text>
              </VStack>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Vision Section */}
      <Box bg="white" py={16}>
        <Container maxW="container.lg">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            {/* Left Text */}
            <Flex height="400px" alignItems="center">
              <VStack align="start" spacing={6} className={inter.className}>
                <Text fontSize="lg" color="black" lineHeight="1.6">
                  In Latin, the word &ldquo;spero&rdquo; means{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    &ldquo;to hope.&rdquo;
                  </Text>{' '}
                  Our vision is inspired by Matthew 10:29-31, where something as
                  insignificant as a sparrow will be remembered and cared for. We
                  want to expose the poverty in these neglected communities
                  through an innovative medium.{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    The goal of Spero is to bring hope to the hopeless and light into the darkness.
                  </Text>
                </Text>
              </VStack>
            </Flex>

            {/* Right Image */}
            <Center>
              <Image
                src="/images/home/flowers-1.jpg"
                alt="Flowers Design"
                borderRadius="md"
                objectFit="contain"
                maxHeight="400px"
                maxWidth="100%"
              />
            </Center>
          </SimpleGrid>
        </Container>
      </Box>

      {/* PastorGPT Section */}
      <Box bg={SPERO_BACKGROUND_RECESSED} py={16}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center" className={inter.className}>
            <Heading
              as="h2"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color="black"
              lineHeight="1.2"
            >
              Curious about learning more about Christianity?
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="black"
              maxW="600px"
              lineHeight="1.6"
            >
              Talk to PastorGPT and ask all your questions!
            </Text>
            <Button
              as="a"
              href="https://chatgpt.com/g/g-A1ojXxmox-pastor-gpt"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              bg="black"
              color="white"
              _hover={{
                bg: "gray.800",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="medium"
              borderRadius="md"
            >
              <HStack spacing={2}>
                <Text>Chat with PastorGPT</Text>
                <ExternalLinkIcon boxSize={4} />
              </HStack>
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Bottom Border */}
      <Box height="2px" bg="blue.500" width="100%" />
    </Box>
  );
}
