'use client';

import { Group, Card, Stack, Text } from '@mantine/core';
import {
  IconReceipt,
  IconUsers,
  IconCoin,
  IconTrendingUp,
} from '@tabler/icons-react';
import classes from './AgentOverview.module.css';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number }>;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      bg="dark.7"
      className={classes.statCard}
    >
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Text size="sm" c="dimmed" fw={500}>
            {label}
          </Text>
          <Icon size={20} color="var(--mantine-color-pumpGreen-5)" />
        </Group>
        <Text size="xl" fw={700} c="white">
          {value}
        </Text>
      </Stack>
    </Card>
  );
}

interface AgentOverviewProps {
  agentId?: string;
}

// Seeded random number generator for consistent data per agent
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Generate consistent stats based on agentId
function generateStats(agentId?: string) {
  if (!agentId) {
    return {
      transactions: '1,234',
      buyers: '892',
      revenue: '$45.2K',
      pnl72h: '+$12.5K',
    };
  }

  // Use agentId as seed for consistent data
  const seed = agentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = seededRandom(seed);
  
  const transactions = Math.floor(500 + random() * 2000);
  const buyers = Math.floor(200 + random() * 1000);
  const revenue = (10 + random() * 100).toFixed(1);
  const pnl = ((random() - 0.3) * 50).toFixed(1);
  
  return {
    transactions: transactions.toLocaleString(),
    buyers: buyers.toLocaleString(),
    revenue: `$${revenue}K`,
    pnl72h: `${pnl >= 0 ? '+' : ''}$${pnl}K`,
  };
}

export function AgentOverview({ agentId }: AgentOverviewProps) {
  // TODO: Replace with actual data fetching using agentId
  // const { data, isLoading } = useAgentOverview(agentId);
  const stats = generateStats(agentId);

  return (
    <div className={classes.wrapper}>
      <Text size="xl" fw={700} c="white" mb="lg" className={classes.title}>
        Overview
      </Text>
      <Group gap="md" grow>
        <StatCard
          label="Number of Txns"
          value={stats.transactions}
          icon={IconReceipt}
        />
        <StatCard
          label="Number of Buyers"
          value={stats.buyers}
          icon={IconUsers}
        />
        <StatCard
          label="x402 Revenue"
          value={stats.revenue}
          icon={IconCoin}
        />
        <StatCard
          label="PNL in 72h"
          value={stats.pnl72h}
          icon={IconTrendingUp}
        />
      </Group>
    </div>
  );
}

