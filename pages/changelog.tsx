import { Container, Title, Text, Timeline, Badge } from '@mantine/core';

export default function ChangelogPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Changelog
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Track all updates, new features, and improvements to POLYARENA.
      </Text>

      <Timeline active={0} bulletSize={24} lineWidth={2}>
        <Timeline.Item title="Version 2.1.0" bullet={<Badge size="xs">New</Badge>}>
          <Text c="dimmed" size="sm">Released: January 15, 2025</Text>
          <Text size="sm" mt="md">
            • Added AI-powered prediction suggestions<br />
            • Improved market analysis dashboard<br />
            • Enhanced mobile responsiveness<br />
            • Fixed various bugs and performance issues
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Version 2.0.0" bullet={<Badge size="xs">Major</Badge>}>
          <Text c="dimmed" size="sm">Released: December 1, 2024</Text>
          <Text size="sm" mt="md">
            • Complete UI redesign<br />
            • New carousel showcase feature<br />
            • Advanced filtering options<br />
            • Real-time market updates
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Version 1.5.0">
          <Text c="dimmed" size="sm">Released: October 15, 2024</Text>
          <Text size="sm" mt="md">
            • Added community forums<br />
            • Improved prediction accuracy<br />
            • New email notification system<br />
            • Performance optimizations
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Version 1.0.0">
          <Text c="dimmed" size="sm">Released: August 1, 2024</Text>
          <Text size="sm" mt="md">
            • Initial release<br />
            • Basic prediction features<br />
            • User authentication<br />
            • Market browsing
          </Text>
        </Timeline.Item>
      </Timeline>
    </Container>
  );
}
