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
} from '@chakra-ui/react';

export default function AboutPage() {
  return (
    <Box bg="white" py={10}>
      <Container maxW="container.lg" mb={10}>
        <Heading
          as="h1"
          textAlign="center"
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="bold"
          mb={10}
        >
          Spero is a team of college students with a heart to share the gospel
          with biblically empowered apparel.
        </Heading>

        {/* Team Image */}
        <Box textAlign="center" mb={10}>
          <Image
            src="/images/home/team.jpg"
            alt="Team Group"
            borderRadius="md"
            objectFit="contain" /* Ensure the image shrinks without cropping */
            maxHeight="600px"
            maxWidth="100%"
            margin="0 auto"
          />
        </Box>
      </Container>

      {/* Mission Section */}
      <Container maxW="container.lg" mb={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Left Image */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/images/home/confidence-1.jpg"
              alt="Back T-Shirt"
              borderRadius="md"
              objectFit="contain" /* Shrink the image instead of cropping */
              maxHeight="300px"
              maxWidth="100%"
            />
          </Box>

          {/* Right Text */}
          <Flex height="300px" alignItems="center">
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" color="gray.700">
                We&apos;re dedicated to bridging{' '}
                <Text as="b" color="black">
                  fashion and mission.
                </Text>{' '}
                As a Christian organization, our heart is to advance the gospel
                through apparel that is empowered by biblical truth and vision.
                We aim to produce intentional designs that spark hope through
                everyday wear and conversation. 30% of all profits are donated
                to various social-good organizations both in and outside of the
                Bay Area such as Compassion International, Imago Dei Clinic,
                Laundry Love, and Hands and Feet.
              </Text>
            </VStack>
          </Flex>
        </SimpleGrid>
      </Container>

      {/* Vision Section */}
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Left Text */}
          <Flex height="300px" alignItems="center">
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" color="gray.700">
                In Latin, the word &ldquo;spero&rdquo; means{' '}
                <Text as="b" color="black">
                  &ldquo;to hope.&rdquo;
                </Text>{' '}
                Our vision is inspired by Matthew 10:29-31, where something as
                insignificant as a sparrow will be remembered and cared for. We
                want to expose the poverty in these neglected communities
                through an innovative medium.{' '}
                <Text as="b" color="black">
                  The goal of Spero is to bring hope to the hopeless and light
                  into darkness.
                </Text>
              </Text>
            </VStack>
          </Flex>

          {/* Right Image */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/images/home/flowers-1.jpg"
              alt="Front T-Shirt"
              borderRadius="md"
              objectFit="contain" /* Shrink the image without cropping */
              maxHeight="300px"
              maxWidth="100%"
            />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
