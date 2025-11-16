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
  const ORDER_FORM = "https://forms.gle/FrJFo7nuFoG2GWxV6";
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
            THE CALLING
          </Heading>
          <Link
            as={NextLink}
            href={ORDER_FORM}
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
      <Container maxWidth="1400px" py={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} alignItems="center">
        {/* UC Irvine */}
        <Box position="relative" width="450px" height="600px" overflow="hidden">
          <Image
            src="/images/team/uci_team.webp"
            alt="UC Irvine"
            width={450}
            height={600}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <Heading
            as="h3"
            size="lg"
            color="white"
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            fontWeight="bold"
            fontSize="2xl"
          >
            UC Irvine
          </Heading>
        </Box>

        {/* UC Berkeley */}
        <Box position="relative" width="450px" height="600px" overflow="hidden">
          <Image
            src="/images/team/BERK_team.webp"
            alt="UC Berkeley"
            width={450}
            height={600}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <Heading
            as="h3"
            size="lg"
            color="white"
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            fontWeight="bold"
            fontSize="2xl"
          >
            UC Berkeley
          </Heading>
        </Box>

        {/* Northeastern */}
        <Box position="relative" width="450px" height="600px" overflow="hidden">
          <Image
            src="/images/team/NE_team.webp"
            alt="Northeastern"
            width={450}
            height={600}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <Heading
            as="h3"
            size="lg"
            color="white"
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            fontWeight="bold"
            fontSize="2xl"
          >
            Northeastern
          </Heading>
        </Box>
      </SimpleGrid>
    </Container>
    </>
  );
}
