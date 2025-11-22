import { Container, Title, Text, SimpleGrid, Card, Badge, Button } from '@mantine/core';

export default function AcademyPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Academy
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Take your prediction skills to the next level with our structured courses and certifications.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Badge color="blue" variant="light" mb="md">Beginner</Badge>
          <Title order={3} mb="md">Prediction Markets 101</Title>
          <Text size="sm" c="dimmed" mb="md">
            A comprehensive introduction to prediction markets, covering the fundamentals and basic strategies.
          </Text>
          <Text size="sm" fw={500} mb="md">Duration: 2 weeks</Text>
          <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} fullWidth>Enroll Now</Button>
        </Card>

        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Badge color="orange" variant="light" mb="md">Intermediate</Badge>
          <Title order={3} mb="md">Advanced Market Analysis</Title>
          <Text size="sm" c="dimmed" mb="md">
            Learn advanced techniques for analyzing prediction markets and improving your win rate.
          </Text>
          <Text size="sm" fw={500} mb="md">Duration: 4 weeks</Text>
          <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} fullWidth>Enroll Now</Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
