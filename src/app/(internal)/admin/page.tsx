import DashboardView from './DashboardView';
import { Box, Container, Heading } from '@chakra-ui/react';

export const metadata = {
  title: 'Dashboards - Spero',
};

// See src/app/(internal)/admin/finance for the per-order table.
export default function Page() {
  return (
    <Container maxWidth={{ base: '100%', md: '50%' }} mx={0}>
      <Box py={10}>
        <Heading as="h1" size="2xl">
          Dashboards
        </Heading>
      </Box>
      <DashboardView />
    </Container>
  );
}
