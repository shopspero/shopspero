import {
  Box,
  Flex,
  Heading,
  Link,
  Container,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Slideshow from "@/components/Slideshow";

export default function Page() {
  return (
    <>
      {/* Newest Drop Section */}
      <Box position="relative">
        <Slideshow />

        {/* Overlay with Text */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          color="white"
          textAlign="center"
          p={4}
          position="absolute"
          width="100%"
          top={0}
          zIndex={1}
        >
          <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={4}>
            JUSTIFIED BY GRACE
          </Heading>
          <Link
            as={NextLink}
            href="/shop"
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            textDecoration="underline"
            _hover={{ color: "gray.300", textDecoration: "none" }}
          >
            SHOP
          </Link>
        </Flex>
      </Box>

      {/* Campus Section */}
      <Container maxWidth="1200px" py={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* UC Irvine */}
        <VStack spacing={4}>
          <Box width="400px" height="600px" overflow="hidden" borderRadius="8px">
            <Image
              src="/images/team/uci_team.webp"
              alt="UC Irvine"
              width={400}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
          <Heading as="h3" size="lg">UC Irvine</Heading>
        </VStack>

        {/* UC Berkeley */}
        <VStack spacing={4}>
          <Box width="400px" height="600px" overflow="hidden" borderRadius="8px">
            <Image
              src="/images/team/BERK_team.webp"
              alt="UC Berkeley"
              width={400}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
          <Heading as="h3" size="lg">UC Berkeley</Heading>
        </VStack>

        {/* Northeastern */}
        <VStack spacing={4}>
          <Box width="400px" height="600px" overflow="hidden" borderRadius="8px">
            <Image
              src="/images/team/NE_team.webp"
              alt="Northeastern"
              width={400}
              height={600}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Box>
          <Heading as="h3" size="lg">Northeastern</Heading>
        </VStack>
      </SimpleGrid>
    </Container>
    </>
  );
}
