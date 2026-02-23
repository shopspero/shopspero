import designData from '@/app/(external)/designs/design-data-with-mdx';
import { designIds, designNames } from '@/app/(external)/designs/design-data';
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
  return [...designIds];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const name = designNames[id];
  if (name === undefined) {
    notFound();
  }
  return {
    title: `${name} - Spero`,
  };
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const design = designData.find((d) => d.id === id);
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
