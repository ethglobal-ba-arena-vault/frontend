'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Group,
  Avatar,
  TextInput,
  NumberInput,
  Select,
  Button,
  Card,
  Stack,
  Text,
  Badge,
  Loader,
  Code,
  ScrollArea,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { IconRocket, IconCheck, IconX } from '@tabler/icons-react';
import classes from './prediction.module.css';

// Generate agent name from ID (matches the logic in AgentList)
function getAgentNameFromId(agentId?: string): string {
  if (!agentId) {
    return 'Agent';
  }
  
  const match = agentId.match(/coin-(\d+)/);
  if (!match) {
    return agentId;
  }
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  const name = `${names[nameIndex]}${index >= names.length ? ` ${Math.floor(index / names.length)}` : ''}`.trim();
  
  return name;
}

// Generate agent image URL from ID
function getAgentImageFromId(agentId?: string): string {
  if (!agentId) {
    return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  }
  
  const match = agentId.match(/coin-(\d+)/);
  if (!match) {
    return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  }
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${names[nameIndex]}`;
}

interface PredictionResult {
  reasoning: string;
  decision: 'buy' | 'sell';
  confidence: number;
  marketInfo?: {
    title: string;
    currentPrice: number;
    volume: string;
  };
}

export default function PredictionPage() {
  const router = useRouter();
  const { id } = router.query;
  const agentId = typeof id === 'string' ? id : undefined;
  const agentName = getAgentNameFromId(agentId);
  const agentImage = getAgentImageFromId(agentId);

  const [polymarketUrl, setPolymarketUrl] = useState('');
  const [temperature, setTemperature] = useState<number | string>(0.7);
  const [thinkMode, setThinkMode] = useState<string | null>('fast');
  const [isRunning, setIsRunning] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [userAction, setUserAction] = useState<'buy' | 'sell' | null>(null);

  const handleRun = async () => {
    if (!polymarketUrl.trim()) {
      return;
    }

    setIsRunning(true);
    setPredictionResult(null);
    setUserAction(null);

    // Simulate API call - replace with actual backend call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock prediction result - replace with actual API response
    const mockResult: PredictionResult = {
      reasoning: `After analyzing the Polymarket event "${polymarketUrl}", I've evaluated multiple factors:

1. **Market Sentiment**: The current market shows moderate bullish sentiment with 17% probability of a ceasefire agreement.

2. **Historical Patterns**: Similar geopolitical events have shown volatility in the final months, suggesting potential for price movement.

3. **Risk Assessment**: The market has high volume ($34M+) indicating strong interest, but the low probability suggests higher risk/reward ratio.

4. **Technical Analysis**: Current pricing suggests the market is undervalued relative to recent news cycles and diplomatic movements.

5. **Expected Value**: Based on my analysis, the expected value calculation shows a positive return potential if the probability increases even slightly.

**Conclusion**: Given the current market conditions and risk profile, I recommend a BUY position with moderate position sizing to capitalize on potential upward movement while managing downside risk.`,
      decision: 'buy',
      confidence: 72,
      marketInfo: {
        title: 'Russia x Ukraine ceasefire in 2025?',
        currentPrice: 0.17,
        volume: '$34,398,369',
      },
    };

    setPredictionResult(mockResult);
    setIsRunning(false);
  };

  const handleBuy = () => {
    setUserAction('buy');
    // TODO: Implement actual buy logic
  };

  const handleSell = () => {
    setUserAction('sell');
    // TODO: Implement actual sell logic
  };

  return (
    <Container size="xl" className={classes.wrapper}>
      <Group gap="md" mb="xl">
        <Avatar src={agentImage} alt={agentName} size="lg" radius="xl" />
        <Title order={1} className={classes.title}>
          {agentName}
        </Title>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7" mb="xl">
        <Stack gap="md">
          <div>
            <Text size="lg" fw={600} c="white" mb="sm">
              Prediction
            </Text>
            <Text size="sm" c="dimmed" mb="md">
              Provide a Polymarket URL to analyze and get a prediction from this agent.
            </Text>
          </div>

          <TextInput
            placeholder="https://polymarket.com/event/russia-x-ukraine-ceasefire-in-2025?tid=1763837499961"
            value={polymarketUrl}
            onChange={(e) => setPolymarketUrl(e.target.value)}
            size="md"
            disabled={isRunning}
            className={classes.urlInput}
          />

          <Group grow>
            <NumberInput
              label="Temperature"
              placeholder="0.7"
              value={temperature}
              onChange={setTemperature}
              min={0}
              max={2}
              step={0.1}
              size="md"
              disabled={isRunning}
              decimalScale={1}
              styles={{
                label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
              }}
            />
            <Select
              label="Think Mode"
              placeholder="Select mode"
              value={thinkMode}
              onChange={setThinkMode}
              data={[
                { value: 'fast', label: 'Fast' },
                { value: 'deep', label: 'Deep Think' },
              ]}
              size="md"
              disabled={isRunning}
              styles={{
                label: { color: 'var(--mantine-color-white)', marginBottom: '8px' },
                input: { backgroundColor: 'var(--mantine-color-dark-8)', color: 'var(--mantine-color-white)' },
              }}
            />
          </Group>

          <Button
            leftSection={<IconRocket size={18} />}
            onClick={handleRun}
            disabled={!polymarketUrl.trim() || isRunning}
            color="pumpGreen"
            variant="filled"
            size="md"
            fullWidth
          >
            {isRunning ? 'Running Prediction...' : 'Run'}
          </Button>
        </Stack>
      </Card>

      {isRunning && (
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7" mb="xl">
          <Group justify="center" gap="md">
            <Loader size="lg" color="pumpGreen" />
            <Text size="lg" c="white">
              Analyzing market and generating prediction...
            </Text>
          </Group>
        </Card>
      )}

      {predictionResult && !isRunning && (
        <Stack gap="md">
          {predictionResult.marketInfo && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
              <Stack gap="sm">
                <Text size="lg" fw={600} c="white">
                  Market Information
                </Text>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Market:
                  </Text>
                  <Text size="sm" c="white" fw={500}>
                    {predictionResult.marketInfo.title}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Current Price:
                  </Text>
                  <Badge color="pumpGreen" variant="light" size="lg">
                    {(predictionResult.marketInfo.currentPrice * 100).toFixed(1)}%
                  </Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Volume:
                  </Text>
                  <Text size="sm" c="white" fw={500}>
                    {predictionResult.marketInfo.volume}
                  </Text>
                </Group>
              </Stack>
            </Card>
          )}

          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Text size="lg" fw={600} c="white">
                  Agent Decision
                </Text>
                <Badge
                  color={predictionResult.decision === 'buy' ? 'green' : 'red'}
                  variant="light"
                  size="lg"
                  leftSection={
                    predictionResult.decision === 'buy' ? (
                      <IconCheck size={16} />
                    ) : (
                      <IconX size={16} />
                    )
                  }
                >
                  {predictionResult.decision.toUpperCase()}
                </Badge>
              </Group>
              <Group>
                <Text size="sm" c="dimmed">
                  Confidence:
                </Text>
                <Badge color="pumpGreen" variant="outline">
                  {predictionResult.confidence}%
                </Badge>
              </Group>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <Text size="lg" fw={600} c="white" mb="md">
              Full Reasoning
            </Text>
            <ScrollArea h={400}>
              <Code block className={classes.reasoningCode}>
                {predictionResult.reasoning}
              </Code>
            </ScrollArea>
          </Card>

          {!userAction && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
              <Stack gap="md">
                <Text size="lg" fw={600} c="white">
                  Execute Trade
                </Text>
                <Text size="sm" c="dimmed">
                  Based on the agent's prediction, choose whether to buy or sell:
                </Text>
                <Group grow>
                  <Button
                    leftSection={<IconCheck size={18} />}
                    onClick={handleBuy}
                    color="green"
                    variant="filled"
                    size="lg"
                  >
                    Buy
                  </Button>
                  <Button
                    leftSection={<IconX size={18} />}
                    onClick={handleSell}
                    color="red"
                    variant="filled"
                    size="lg"
                  >
                    Sell
                  </Button>
                </Group>
              </Stack>
            </Card>
          )}

          {userAction && (
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
              <Group gap="md">
                <Badge
                  color={userAction === 'buy' ? 'green' : 'red'}
                  variant="light"
                  size="xl"
                  leftSection={
                    userAction === 'buy' ? (
                      <IconCheck size={20} />
                    ) : (
                      <IconX size={20} />
                    )
                  }
                >
                  {userAction.toUpperCase()} Order Placed
                </Badge>
                <Text size="sm" c="dimmed">
                  Your {userAction} order has been submitted based on the agent's prediction.
                </Text>
              </Group>
            </Card>
          )}
        </Stack>
      )}
    </Container>
  );
}

