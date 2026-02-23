import {
  Box,
  Flex,
  Heading,
  Link,
  Container,
  SimpleGrid,
  VStack,
  Button,
  AspectRatio,
} from '@chakra-ui/react';
import Image from "next/image";
import NextLink from "next/link";
import Slideshow from "@/components/Slideshow";
import { Lexend_Deca } from 'next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Page() {
  const ORDER_FORM = "https://forms.gle/FrJFo7nuFoG2GWxV6";

  return (
    <Box className={lexendDeca.className}>
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
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            mb={4}
          >
            THE CALLING
          </Heading>
          <NextLink
            href="/shop"
            style={{
              fontSize: "1.125rem",
              color: "white",
              textDecoration: "underline",
              fontFamily: lexendDeca.style.fontFamily,
            }}
          >
            SHOP
          </NextLink>
        </Flex>
      </Box>

      <Container maxWidth="1550px" py={10}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} alignItems="center">
        {/* Trust Drop */}
        <DropPreview
          imagePath={'/images/designs/the-calling-1.jpg'}
          altText={'calling'}
          header={'The Calling'}
          buttonText={'Order Now'}
          path={'/shop'}
          verse={"Ephesians 4:1"}
        />

          {/* Surpassing Worth Drop */}
          <DropPreview
            imagePath={'/images/designs/surpassing-worth-2.jpg'}
            altText={'surpassing worth'}
            header={'Surpassing Worth'}
            path={'/designs/surpassing-worth'}
            verse={"Philippians 3:8"}
          />

          {/* Justified Drop */}
          <DropPreview
            imagePath={'/images/home/currentdrop.jpg'}
            altText={'justified'}
            header={'Justified'}
            path={'/designs/justified'}
            verse={"Romans 3:24-26"}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

interface DropProps {
  imagePath: string;
  altText: string;
  header: string;
  path: string;
  buttonText?: string;
  verse: string;
}

function DropPreview({ imagePath, altText, header, path, buttonText, verse }: DropProps) {
  return (
    <AspectRatio ratio={5 / 7} width="100%">
      <Box position="relative" overflow="hidden">
        <Image
          src={imagePath}
          alt={altText}
          width={450}
          height={600}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="50%"
          bgGradient="linear(to-t, rgba(0,0,0,0.7), rgba(0,0,0,0))"
          pointerEvents="none"
        />
        <Box position="absolute" bottom="20px" left="20px">
          <Heading
            as="p"
            color={"#cccccc"}
            fontWeight="400"
            fontSize="md"
            mb={2}
            fontFamily={lexendDeca.style.fontFamily}
          >
            {verse}
          </Heading>
          <Heading
            as="h3"
            size="lg"
            color="white"
            fontWeight="bold"
            fontSize="2xl"
            mb={5}
            fontFamily={lexendDeca.style.fontFamily}
          >
            {header}
          </Heading>
          <Link href={path}>
            <Button fontFamily={lexendDeca.style.fontFamily}>
              {buttonText ?? "Learn More"}
            </Button>
          </Link>
        </Box>
      </Box>
    </AspectRatio>
  );
}
