import { Container, Title, Text, Card, List, Button, ThemeIcon } from '@mantine/core';
import { IconBrandGithub, IconCode, IconBug, IconBooks } from '@tabler/icons-react';

export default function ContributePage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Contribute
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Help us build the future of prediction markets. There are many ways you can contribute to POLYARENA.
      </Text>

      <Card shadow="sm" padding="xl" radius="md" withBorder mb="xl">
        <IconBrandGithub size={48} style={{ marginBottom: 16 }} />
        <Title order={3} mb="md">Open Source Contributions</Title>
        <Text size="sm" c="dimmed" mb="md">
          POLYARENA is open source! Contribute code, fix bugs, or improve documentation.
        </Text>
        <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} leftSection={<IconBrandGithub size={16} />}>
          View on GitHub
        </Button>
      </Card>

      <Title order={2} mb="lg">Ways to Contribute</Title>
      <List
        spacing="lg"
        size="md"
        icon={
          <ThemeIcon color="blue" size={32} radius="xl">
            <IconCode size={18} />
          </ThemeIcon>
        }
      >
        <List.Item>
          <strong>Code Contributions:</strong> Submit pull requests, implement new features, or optimize existing code.
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="red" size={32} radius="xl">
              <IconBug size={18} />
            </ThemeIcon>
          }
        >
          <strong>Bug Reports:</strong> Found a bug? Report it on our GitHub issues page.
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="teal" size={32} radius="xl">
              <IconBooks size={18} />
            </ThemeIcon>
          }
        >
          <strong>Documentation:</strong> Help improve our docs, write tutorials, or translate content.
        </List.Item>
      </List>
    </Container>
  );
}
