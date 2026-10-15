import { getCurrentUserProfile } from '@/actions/admin';
import { Center, Container, Heading, Text } from '@chakra-ui/react';

export const metadata = {
  title: 'Admin - Spero',
};

export default async function Page() {
  const profile = await getCurrentUserProfile();

  return (
    <Container maxWidth={1000} textAlign="center">
      <Center flexDirection="column" p={10} gap={2}>
        <Heading as="h1" size="2xl">
          Welcome{profile?.name ? `, ${profile.name}` : ''}
        </Heading>
        {profile?.title && (
          <Text fontSize="lg" color="gray.600">
            {profile.title}
          </Text>
        )}
      </Center>
    </Container>
  );
}
