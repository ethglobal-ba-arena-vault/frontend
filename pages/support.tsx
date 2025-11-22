import { Container, Title, Text, SimpleGrid, Card, Button } from '@mantine/core';
import { IconMail, IconBrandDiscord, IconBook, IconQuestionMark } from '@tabler/icons-react';

export default function SupportPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Support
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Need help? We are here for you. Choose how you would like to get support.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <IconMail size={48} style={{ marginBottom: 16 }} />
          <Title order={3} mb="md">Email Support</Title>
          <Text size="sm" c="dimmed" mb="md">
            Get help via email. We typically respond within 24 hours.
          </Text>
          <Button variant="light" fullWidth>Contact via Email</Button>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <IconBrandDiscord size={48} style={{ marginBottom: 16 }} />
          <Title order={3} mb="md">Discord Community</Title>
          <Text size="sm" c="dimmed" mb="md">
            Join our Discord server for community support and discussions.
          </Text>
          <Button variant="light" fullWidth>Join Discord</Button>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <IconBook size={48} style={{ marginBottom: 16 }} />
          <Title order={3} mb="md">Documentation</Title>
          <Text size="sm" c="dimmed" mb="md">
            Browse our comprehensive documentation and guides.
          </Text>
          <Button variant="light" fullWidth>View Docs</Button>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <IconQuestionMark size={48} style={{ marginBottom: 16 }} />
          <Title order={3} mb="md">FAQ</Title>
          <Text size="sm" c="dimmed" mb="md">
            Find answers to frequently asked questions.
          </Text>
          <Button variant="light" fullWidth>View FAQ</Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
