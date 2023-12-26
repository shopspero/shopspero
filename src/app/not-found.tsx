import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Box, Center, Container, Heading, Text } from '@chakra-ui/react';

export const metadata = {
  title: 'Not Found - Spero',
};

const navLinks = [
  { title: 'SPERO', href: '/' },
  { title: 'TEAM', href: '/team' },
  { title: 'DESIGNS', href: '/designs' },
  { title: 'SHOP', href: '/shop' },
];

export default function Page() {
  return (
    <>
      <NavBar links={navLinks} />
      <main>
        <Box>
          <Container maxWidth={900} textAlign="center">
            <Center p={10}>
              <Heading as="h1" size="2xl">
                Uh oh, 404.
              </Heading>
            </Center>
            <Text mb={5}>
              Looks like we couldn&apos;t find the page you were looking for :(
            </Text>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
