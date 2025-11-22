'use client';

import { Card, Stack, Text, Group, Badge, Code, ScrollArea } from '@mantine/core';
import { IconBrain, IconSettings, IconPlug } from '@tabler/icons-react';
import classes from './AgentPrompt.module.css';

interface AgentPromptProps {
  agentId?: string;
}

// Generate consistent prompt data based on agentId
function generatePromptData(agentId?: string) {
  // TODO: Replace with actual data fetching using agentId
  // const { data, isLoading } = useAgentPrompt(agentId);
  
  // Default mock data
  const prompt = `You are an expert Polymarket betting agent. Your goal is to analyze market conditions and make profitable predictions.

Key strategies:
1. Analyze historical market data and trends
2. Consider news events and sentiment
3. Evaluate probability distributions
4. Execute trades when expected value is positive
5. Manage risk through position sizing

Always provide reasoning for your decisions and maintain a long-term profitable strategy.`;

  const modelParams = {
    temperature: 0.7,
    frequency: 'hourly',
    baseModel: 'gpt-5',
  };

  const mcpEndpoints = [
    'polymarket-api',
    'price-oracle',
    'news-aggregator',
    'sentiment-analysis',
  ];

  return { prompt, modelParams, mcpEndpoints };
}

export function AgentPrompt({ agentId }: AgentPromptProps) {
  const { prompt, modelParams, mcpEndpoints } = generatePromptData(agentId);

  return (
    <div className={classes.wrapper}>
      <Text size="xl" fw={700} c="white" mb="lg" className={classes.title}>
        Prompt
      </Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7" mb="md">
        <Group gap="xs" mb="md">
          <IconBrain size={20} color="var(--mantine-color-pumpGreen-5)" />
          <Text size="sm" fw={600} c="white">
            Main Prompt
          </Text>
        </Group>
        <ScrollArea h={200}>
          <Code block className={classes.promptCode}>
            {prompt}
          </Code>
        </ScrollArea>
      </Card>

      <Group gap="md" grow>
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
          <Group gap="xs" mb="md">
            <IconSettings size={20} color="var(--mantine-color-pumpGreen-5)" />
            <Text size="sm" fw={600} c="white">
              Model Parameters
            </Text>
          </Group>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Temperature
              </Text>
              <Badge color="pumpGreen" variant="light">
                {modelParams.temperature}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Frequency
              </Text>
              <Badge color="pumpGreen" variant="light">
                {modelParams.frequency}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Base Model
              </Text>
              <Badge color="pumpGreen" variant="light">
                {modelParams.baseModel}
              </Badge>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
          <Group gap="xs" mb="md">
            <IconPlug size={20} color="var(--mantine-color-pumpGreen-5)" />
            <Text size="sm" fw={600} c="white">
              MCP Endpoints
            </Text>
          </Group>
          <Stack gap="xs">
            {mcpEndpoints.map((endpoint) => (
              <Badge
                key={endpoint}
                color="pumpGreen"
                variant="outline"
                size="lg"
                fullWidth
                style={{ justifyContent: 'flex-start' }}
              >
                {endpoint}
              </Badge>
            ))}
          </Stack>
        </Card>
      </Group>
    </div>
  );
}

