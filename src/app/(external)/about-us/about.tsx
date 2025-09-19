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
import { Inter } from 'next/font/google';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
                  Spero is a{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    gospel-centered clothing brand
                  </Text>{' '}
                  dedicated to creating scripture-based streetwear that serves as
                  both a statement of faith and a tool for evangelism. Our mission
                  is to{' '}
                  <Text as="span" fontWeight="bold" color="black">
                    spread the Word of God
                  </Text>{' '}
                  by incorporating Bible verses into every design and producing
                  intentional designs that spark hope through everyday wear, spark
                  conversations with both unbelievers and believers, and
                  encouraging wearers to live boldly in their faith. As Romans
                  1:16 states, &ldquo;
                  <Text as="span" fontWeight="bold" color="black">
                    It is the power of God that brings salvation.
                  </Text>
                  &rdquo; We believe that fashion can be a vessel for faith,
                  allowing those who wear our clothing to carry the Gospel
                  wherever they go. 30% of all profits are donated to
                  Gospel-centered organizations and missionaries that focus on
                  planting churches in third world countries. Our focus this year
                  is to support church planting in Haiti!
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
                  In Latin, the word &ldquo;spero&rdquo; means &ldquo;
                  <Text as="span" fontWeight="bold" color="black">
                    to hope
                  </Text>
                  .&rdquo; Our vision is deeply rooted in Matthew 10:29–31, where
                  something as insignificant as a sparrow, worth only a penny, is
                  valued much greater and cared for by God. This reminds us that
                  we hope in the living hope, who bridged the gap that once
                  separated us from Him. We also look up to see sparrows, the
                  same way we strive to look up to Christ daily as we navigate
                  through our lives.
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
