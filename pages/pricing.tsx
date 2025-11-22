import { Container, Title, Text, SimpleGrid, Card, Button, List, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export default function PricingPage() {
  return (
    <Container size="xl" py={80}>
      <Title order={1} mb="xl" style={{ textAlign: 'center' }}>
        Pricing
      </Title>
      <Text size="lg" c="dimmed" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }} mb={60}>
        Choose the plan that fits your prediction needs.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="md">Free</Title>
          <Title order={1} mb="md">$0</Title>
          <Text size="sm" c="dimmed" mb="xl">per month</Text>
          <List
            spacing="sm"
            size="sm"
            mb="xl"
            icon={
              <ThemeIcon color="teal" size={20} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
          >
            <List.Item>Basic predictions</List.Item>
            <List.Item>Community access</List.Item>
            <List.Item>Market insights</List.Item>
          </List>
          <Button variant="default" fullWidth>Get Started</Button>
        </Card>

        <Card shadow="md" padding="xl" radius="md" withBorder style={{ borderColor: 'var(--mantine-color-blue-6)', borderWidth: 2 }}>
          <Title order={3} mb="md">Pro</Title>
          <Title order={1} mb="md">$29</Title>
          <Text size="sm" c="dimmed" mb="xl">per month</Text>
          <List
            spacing="sm"
            size="sm"
            mb="xl"
            icon={
              <ThemeIcon color="blue" size={20} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
          >
            <List.Item>Advanced analytics</List.Item>
            <List.Item>AI predictions</List.Item>
            <List.Item>Priority support</List.Item>
            <List.Item>Custom strategies</List.Item>
          </List>
          <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} fullWidth>Get Started</Button>
        </Card>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title order={3} mb="md">Enterprise</Title>
          <Title order={1} mb="md">Custom</Title>
          <Text size="sm" c="dimmed" mb="xl">contact us</Text>
          <List
            spacing="sm"
            size="sm"
            mb="xl"
            icon={
              <ThemeIcon color="grape" size={20} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
          >
            <List.Item>Unlimited predictions</List.Item>
            <List.Item>Dedicated support</List.Item>
            <List.Item>API access</List.Item>
            <List.Item>Custom integrations</List.Item>
          </List>
          <Button variant="outline" fullWidth>Contact Sales</Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
