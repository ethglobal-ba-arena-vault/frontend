'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Group,
  Avatar,
  Button,
  Card,
  Stack,
  Text,
  TextInput,
  Progress,
  Badge,
  SimpleGrid,
  Divider,
} from '@mantine/core';
import { useRouter } from 'next/router';
import {
  IconChartBar,
  IconCalendar,
  IconPlayerPlay,
  IconTrendingUp,
  IconTrendingDown,
  IconTarget,
  IconCoins,
  IconBuildingBank,
  IconCurrencyBitcoin,
  IconWorld,
  IconDeviceDesktop,
  IconBallFootball,
  IconFlag,
} from '@tabler/icons-react';
import classes from './backtest.module.css';

// Generate agent name from ID
function getAgentNameFromId(agentId?: string): string {
  if (!agentId) return 'Agent';
  
  const match = agentId.match(/coin-(\d+)/);
  if (!match) return agentId;
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  const name = `${names[nameIndex]}${index >= names.length ? ` ${Math.floor(index / names.length)}` : ''}`.trim();
  
  return name;
}

// Generate agent image URL from ID
function getAgentImageFromId(agentId?: string): string {
  if (!agentId) return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  
  const match = agentId.match(/coin-(\d+)/);
  if (!match) return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${names[nameIndex]}`;
}

interface CategoryConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'politics', label: 'Politics', icon: IconFlag },
  { id: 'sports', label: 'Sports', icon: IconBallFootball },
  { id: 'finance', label: 'Finance', icon: IconBuildingBank },
  { id: 'crypto', label: 'Crypto', icon: IconCurrencyBitcoin },
  { id: 'geopolitics', label: 'Geopolitics', icon: IconWorld },
  { id: 'tech', label: 'Tech', icon: IconDeviceDesktop },
];

interface BacktestResult {
  expectedPNL: number;
  winRate: number;
  totalProfit: number;
  totalLoss: number;
  categoryBreakdown: Record<string, {
    expectedPNL: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
  }>;
}

export default function BacktestPage() {
  const router = useRouter();
  const { id } = router.query;
  const agentId = typeof id === 'string' ? id : undefined;
  const agentName = getAgentNameFromId(agentId);
  const agentImage = getAgentImageFromId(agentId);

  // Get default date range (last 30 days)
  const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  };

  const getDefaultEndDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BacktestResult | null>(null);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRun = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Simulate backtest progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // Simulate API call - replace with actual backend call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    clearInterval(interval);
    setProgress(100);

    // Mock backtest results
    const mockResults: BacktestResult = {
      expectedPNL: 12450.75,
      winRate: 68.5,
      totalProfit: 45600.25,
      totalLoss: -33149.5,
      categoryBreakdown: {
        politics: {
          expectedPNL: 3200.5,
          winRate: 72.3,
          totalProfit: 12000.0,
          totalLoss: -8799.5,
        },
        sports: {
          expectedPNL: 2100.25,
          winRate: 65.8,
          totalProfit: 8500.0,
          totalLoss: -6399.75,
        },
        finance: {
          expectedPNL: 1800.0,
          winRate: 70.1,
          totalProfit: 9200.0,
          totalLoss: -7400.0,
        },
        crypto: {
          expectedPNL: 2500.0,
          winRate: 66.7,
          totalProfit: 11000.0,
          totalLoss: -8500.0,
        },
        geopolitics: {
          expectedPNL: 1500.0,
          winRate: 64.2,
          totalProfit: 6800.0,
          totalLoss: -5300.0,
        },
        tech: {
          expectedPNL: 1350.0,
          winRate: 69.5,
          totalProfit: 7100.25,
          totalLoss: -5750.25,
        },
      },
    };

    setResults(mockResults);
    setIsRunning(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const StatCard = ({
    label,
    value,
    icon: Icon,
    color = 'pumpGreen',
  }: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ size?: number }>;
    color?: string;
  }) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Text size="sm" c="dimmed" fw={500}>
            {label}
          </Text>
          <Icon size={20} style={{ color: `var(--mantine-color-${color}-5)` }} />
        </Group>
        <Text size="xl" fw={700} c="white">
          {typeof value === 'number' && label.includes('PNL')
            ? formatCurrency(value)
            : typeof value === 'number' && label.includes('Rate')
            ? `${value.toFixed(1)}%`
            : typeof value === 'number'
            ? formatCurrency(value)
            : value}
        </Text>
      </Stack>
    </Card>
  );

  return (
    <Container size="xl" className={classes.wrapper}>
      <Group gap="md" mb="xl">
        <Avatar src={agentImage} alt={agentName} size="lg" radius="xl" />
        <Title order={1} className={classes.title}>
          {agentName}
        </Title>
      </Group>

      {/* Date Range and Categories */}
      <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7" mb="xl">
        <Stack gap="lg">
          <div>
            <Text size="lg" fw={600} c="white" mb="sm">
              Backtest Configuration
            </Text>
            <Text size="sm" c="dimmed">
              Select a date range and categories to run backtesting analysis.
            </Text>
          </div>

          {/* Date Range */}
          <div>
            <Group gap="md" align="flex-end">
              <div style={{ flex: 1 }}>
                <Text size="sm" c="dimmed" mb="xs">
                  Start Date
                </Text>
                <TextInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={isRunning}
                  leftSection={<IconCalendar size={18} />}
                  className={classes.dateInput}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Text size="sm" c="dimmed" mb="xs">
                  End Date
                </Text>
                <TextInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  disabled={isRunning}
                  leftSection={<IconCalendar size={18} />}
                  className={classes.dateInput}
                />
              </div>
            </Group>
          </div>

          {/* Categories */}
          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Categories
            </Text>
            <Group gap="sm">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                return (
                  <Button
                    key={category.id}
                    leftSection={<Icon size={18} />}
                    onClick={() => toggleCategory(category.id)}
                    disabled={isRunning}
                    variant={isSelected ? 'filled' : 'outline'}
                    color={isSelected ? 'pumpGreen' : 'gray'}
                    size="md"
                  >
                    {category.label}
                  </Button>
                );
              })}
            </Group>
            {selectedCategories.length === 0 && (
              <Text size="xs" c="dimmed" mt="xs">
                Select at least one category to run backtest
              </Text>
            )}
          </div>

          {/* Run Button */}
          <Button
            leftSection={<IconPlayerPlay size={18} />}
            onClick={handleRun}
            disabled={
              isRunning ||
              !startDate ||
              !endDate ||
              selectedCategories.length === 0
            }
            color="pumpGreen"
            variant="filled"
            size="lg"
            fullWidth
          >
            {isRunning ? 'Running Backtest...' : 'Run Backtest'}
          </Button>
        </Stack>
      </Card>

      {/* Progress Bar */}
      {isRunning && (
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7" mb="xl">
          <Stack gap="md">
            <Group justify="space-between">
              <Text size="md" fw={600} c="white">
                Backtest Progress
              </Text>
              <Text size="md" fw={600} c="pumpGreen">
                {Math.round(progress)}%
              </Text>
            </Group>
            <Progress
              value={progress}
              color="pumpGreen"
              size="lg"
              radius="md"
              animated
            />
          </Stack>
        </Card>
      )}

      {/* Results */}
      {results && !isRunning && (
        <Stack gap="xl">
          {/* Overall Results */}
          <div>
            <Text size="xl" fw={700} c="white" mb="lg">
              Overall Results
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              <StatCard
                label="Expected PNL"
                value={results.expectedPNL}
                icon={IconTrendingUp}
                color={results.expectedPNL >= 0 ? 'green' : 'red'}
              />
              <StatCard
                label="Win Rate"
                value={results.winRate}
                icon={IconTarget}
                color="pumpGreen"
              />
              <StatCard
                label="Total Profit"
                value={results.totalProfit}
                icon={IconCoins}
                color="green"
              />
              <StatCard
                label="Total Loss"
                value={results.totalLoss}
                icon={IconTrendingDown}
                color="red"
              />
            </SimpleGrid>
          </div>

          {/* Category Breakdown */}
          <div>
            <Text size="xl" fw={700} c="white" mb="lg">
              Category Breakdown
            </Text>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {selectedCategories.map((categoryId) => {
                const category = CATEGORIES.find((c) => c.id === categoryId);
                const breakdown = results.categoryBreakdown[categoryId];
                if (!category || !breakdown) return null;

                return (
                  <Card
                    key={categoryId}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    bg="dark.7"
                  >
                    <Stack gap="md">
                      <Group gap="xs">
                        <category.icon size={20} style={{ color: 'var(--mantine-color-pumpGreen-5)' }} />
                        <Text size="lg" fw={600} c="white">
                          {category.label}
                        </Text>
                      </Group>
                      <Divider />
                      <SimpleGrid cols={2} spacing="md">
                        <StatCard
                          label="Expected PNL"
                          value={breakdown.expectedPNL}
                          icon={IconTrendingUp}
                          color={breakdown.expectedPNL >= 0 ? 'green' : 'red'}
                        />
                        <StatCard
                          label="Win Rate"
                          value={breakdown.winRate}
                          icon={IconTarget}
                          color="pumpGreen"
                        />
                        <StatCard
                          label="Total Profit"
                          value={breakdown.totalProfit}
                          icon={IconCoins}
                          color="green"
                        />
                        <StatCard
                          label="Total Loss"
                          value={breakdown.totalLoss}
                          icon={IconTrendingDown}
                          color="red"
                        />
                      </SimpleGrid>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          </div>
        </Stack>
      )}
    </Container>
  );
}

