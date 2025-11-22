import { Container, Title, Text, Card, Group, Badge, Avatar } from '@mantine/core';

export default function ForumsPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Community Forums
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Join discussions, share insights, and connect with other prediction market enthusiasts.
      </Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Group justify="space-between" mb="xs">
          <Title order={4}>Welcome to POLYARENA Forums</Title>
          <Badge color="green" variant="light">Active</Badge>
        </Group>
        <Text size="sm" c="dimmed" mb="sm">
          Introduce yourself and get started with the community.
        </Text>
        <Group gap="xs">
          <Avatar color="blue" radius="xl">JD</Avatar>
          <Text size="sm">Last post by JohnDoe • 2 hours ago</Text>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Group justify="space-between" mb="xs">
          <Title order={4}>Prediction Strategies</Title>
          <Badge color="blue" variant="light">Popular</Badge>
        </Group>
        <Text size="sm" c="dimmed" mb="sm">
          Discuss and share your prediction strategies and techniques.
        </Text>
        <Group gap="xs">
          <Avatar color="grape" radius="xl">AS</Avatar>
          <Text size="sm">Last post by AliceSmith • 5 hours ago</Text>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Title order={4}>Market Analysis</Title>
          <Badge color="orange" variant="light">Trending</Badge>
        </Group>
        <Text size="sm" c="dimmed" mb="sm">
          Deep dive into market trends and analysis.
        </Text>
        <Group gap="xs">
          <Avatar color="teal" radius="xl">BJ</Avatar>
          <Text size="sm">Last post by BobJohnson • 1 day ago</Text>
        </Group>
      </Card>
    </Container>
  );
}
