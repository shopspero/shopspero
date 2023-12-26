import designData from '@/app/(external)/designs/design-data';
import { notFound } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';
import {
  Box,
  Center,
  Container,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const sizes = {
  base: 310,
  sm: 440,
  md: 600,
};
export const dynamicParams = false;

export function generateStaticParams() {
  return designData;
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return {
    title: `${design.name} - Spero`,
  };
}

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  const design = designData.find((design) => design.id === params.id);
  if (design === undefined) {
    notFound();
  }
  return (
    <Container maxWidth={1300}>
      <Center p={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          {design.name}
        </Heading>
      </Center>
      <Wrap
        spacing={10}
        direction="row"
        align="center"
        justify="center"
        mt={5}
        mb={5}
      >
        <WrapItem>
          <ImageCarousel width={sizes} srcs={design.imgs} />
        </WrapItem>
        <WrapItem maxWidth={600}>
          <Box>{design.description}</Box>
        </WrapItem>
      </Wrap>
    </Container>
  );
}
