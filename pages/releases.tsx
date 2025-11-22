import { Container, Title, Text, Card, Group, Badge, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

export default function ReleasesPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Releases
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Download the latest versions of POLYARENA and view release notes.
      </Text>

      <Card shadow="md" padding="xl" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
          <div>
            <Group gap="sm" mb="xs">
              <Title order={3}>Version 2.1.0</Title>
              <Badge color="green" variant="light">Latest</Badge>
            </Group>
            <Text size="sm" c="dimmed">Released: January 15, 2025</Text>
          </div>
          <Button leftSection={<IconDownload size={16} />} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
            Download
          </Button>
        </Group>
        <Text size="sm" mt="md">
          This release includes AI-powered predictions, improved dashboard, and enhanced mobile experience.
        </Text>
      </Card>

      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
          <div>
            <Group gap="sm" mb="xs">
              <Title order={3}>Version 2.0.0</Title>
              <Badge color="blue" variant="light">Stable</Badge>
            </Group>
            <Text size="sm" c="dimmed">Released: December 1, 2024</Text>
          </div>
          <Button leftSection={<IconDownload size={16} />} variant="default">
            Download
          </Button>
        </Group>
        <Text size="sm" mt="md">
          Major update with complete UI redesign and new features.
        </Text>
      </Card>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Group gap="sm" mb="xs">
              <Title order={3}>Version 1.5.0</Title>
              <Badge color="gray" variant="light">Archive</Badge>
            </Group>
            <Text size="sm" c="dimmed">Released: October 15, 2024</Text>
          </div>
          <Button leftSection={<IconDownload size={16} />} variant="default">
            Download
          </Button>
        </Group>
        <Text size="sm" mt="md">
          Community forums and improved prediction features.
        </Text>
      </Card>
    </Container>
  );
}
