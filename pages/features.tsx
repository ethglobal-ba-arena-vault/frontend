import { Container, Title, Text, Button } from '@mantine/core';
import { Features } from '../components';

export default function FeaturesPage() {
  return (
    <>
      <Container size="xl" py={80}>
        <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
          Features
        </Title>
        <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
          Discover all the powerful features that make POLYARENA the best platform for Polymarket predictions.
        </Text>
      </Container>
      <Features />
    </>
  );
}
