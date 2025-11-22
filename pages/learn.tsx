import { Container, Title, Text, SimpleGrid, Card, Button } from '@mantine/core';

export default function LearnPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Learn
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Learn how to make better predictions with our comprehensive guides and tutorials.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Getting Started</Title>
          <Text size="sm" c="dimmed" mb="md">
            Learn the basics of prediction markets and how to get started with POLYARENA.
          </Text>
          <Button variant="light" fullWidth>Read Guide</Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Advanced Strategies</Title>
          <Text size="sm" c="dimmed" mb="md">
            Master advanced prediction strategies and improve your accuracy.
          </Text>
          <Button variant="light" fullWidth>Read Guide</Button>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="md">Market Analysis</Title>
          <Text size="sm" c="dimmed" mb="md">
            Learn how to analyze market trends and make informed decisions.
          </Text>
          <Button variant="light" fullWidth>Read Guide</Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
