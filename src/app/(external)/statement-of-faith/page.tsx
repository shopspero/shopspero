import StatementOfFaith from '@/app/(external)/statement-of-faith/statement-of-faith.mdx';
import { Container } from '@chakra-ui/react';

export const metadata = {
  title: 'Statement of Faith - Spero',
};

export default function Page() {
  return (
    <Container maxWidth={900}>
      <StatementOfFaith />
    </Container>
  );
}
