export const metadata = {
  title: 'Designs - Spero',
};

import designData from '@/app/(external)/designs/design-data';
import DesignThumbnail from '@/components/DesignThumbnail';
import { Center, Container, Grid, GridItem, Heading } from '@chakra-ui/react';

export default function Page() {
  return (
    <Container maxWidth={1300}>
      <Center pt={10} pb={10} pl={5} pr={5}>
        <Heading as="h1" size="2xl" textAlign="center">
          Designs
        </Heading>
      </Center>
      <Center mt={5} mb={5}>
        <Grid
          gap={3}
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)',
          }}
        >
          {designData.map((design) => (
            <GridItem key={design.id}>
              <DesignThumbnail {...design} />
            </GridItem>
          ))}
        </Grid>
      </Center>
    </Container>
  );
}
