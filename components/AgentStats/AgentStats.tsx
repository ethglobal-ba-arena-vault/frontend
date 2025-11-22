'use client';

import { useState, useMemo, useEffect } from 'react';
import { Tabs, Card, Box, Text } from '@mantine/core';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import classes from './AgentStats.module.css';

type StatType = 'pnl' | 'x402Buys' | 'accountBalance' | 'transactions';

interface ChartDataPoint {
  time: string;
  value: number;
  label: string;
}

// Seeded random number generator for consistent data per agent
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Mock data generator for time-series
const generateTimeSeriesData = (type: StatType, points: number = 72, agentId?: string): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  // Use agentId as seed for consistent data, or use default seed
  const seed = agentId 
    ? agentId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + type.charCodeAt(0)
    : 12345 + type.charCodeAt(0);
  const random = seededRandom(seed);
  
  let baseValue = 0;
  let valueKey = '';
  
  switch (type) {
    case 'pnl':
      baseValue = 50000;
      valueKey = 'PNL';
      break;
    case 'x402Buys':
      baseValue = 150;
      valueKey = 'x402 Buys';
      break;
    case 'accountBalance':
      baseValue = 100000;
      valueKey = 'Balance';
      break;
    case 'transactions':
      baseValue = 50;
      valueKey = 'Transactions';
      break;
  }
  
  let currentValue = baseValue;
  
  for (let i = points; i > 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000); // 1 hour per step
    
    // Seeded random walk for value
    const change = (random() - 0.5) * (baseValue * 0.05);
    currentValue += change;
    
    // Keep values within reasonable bounds
    if (type === 'pnl') {
      currentValue = Math.max(-100000, Math.min(200000, currentValue));
    } else if (type === 'x402Buys' || type === 'transactions') {
      currentValue = Math.max(0, currentValue);
    } else if (type === 'accountBalance') {
      currentValue = Math.max(50000, currentValue);
    }
    
    data.push({
      time: date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit' }),
      value: Math.round(currentValue),
      label: date.toISOString(),
    });
  }
  
  return data;
};

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label, statType }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    let formattedValue: string;
    
    if (statType === 'pnl' || statType === 'accountBalance') {
      formattedValue = typeof value === 'number'
        ? value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })
        : String(value);
    } else {
      formattedValue = typeof value === 'number'
        ? value.toLocaleString('en-US')
        : String(value);
    }
    
    return (
      <Box
        style={{
          backgroundColor: 'var(--mantine-color-dark-7)',
          border: '1px solid var(--mantine-color-dark-4)',
          borderRadius: 'var(--mantine-radius-md)',
          padding: '12px',
        }}
      >
        <Text size="xs" c="dimmed" mb={8}>
          {label}
        </Text>
        <Text size="xs" style={{ color: payload[0].color }} mb={4}>
          {payload[0].name}: {formattedValue}
        </Text>
      </Box>
    );
  }
  return null;
};

// Chart component for each stat type
function StatChart({ type, agentId }: { type: StatType; agentId?: string }) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setChartData(generateTimeSeriesData(type, 72, agentId));
  }, [type, agentId]);
  
  const chartConfig = {
    pnl: {
      name: 'PNL',
      color: '#22c55e',
      formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
    },
    x402Buys: {
      name: 'x402 Buys',
      color: '#ff6b35',
      formatter: (value: number) => value.toString(),
    },
    accountBalance: {
      name: 'Account Balance',
      color: '#339af0',
      formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
    },
    transactions: {
      name: 'Transactions',
      color: '#a755f7',
      formatter: (value: number) => value.toString(),
    },
  };
  
  const config = chartConfig[type];
  
  // Don't render chart until mounted to avoid hydration mismatch
  if (!isMounted || chartData.length === 0) {
    return (
      <Box className={classes.chartContainer}>
        <Text c="dimmed" ta="center" py="xl">
          Loading chart data...
        </Text>
      </Box>
    );
  }
  
  return (
    <Box className={classes.chartContainer}>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--mantine-color-dark-4)" />
          <XAxis
            dataKey="time"
            stroke="var(--mantine-color-gray-6)"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="var(--mantine-color-gray-6)"
            style={{ fontSize: '12px' }}
            tickFormatter={config.formatter}
          />
          <Tooltip content={<CustomTooltip statType={type} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={config.color}
            strokeWidth={2}
            dot={false}
            name={config.name}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

interface AgentStatsProps {
  agentId?: string;
}

export function AgentStats({ agentId }: AgentStatsProps) {
  const [activeTab, setActiveTab] = useState<StatType>('pnl');

  // TODO: Replace with actual data fetching using agentId
  // const { data, isLoading } = useAgentStats(agentId);

  return (
    <div className={classes.wrapper}>
      <Text size="xl" fw={700} c="white" mb="lg" className={classes.title}>
        Stats
      </Text>

      <Tabs value={activeTab} onChange={(value) => setActiveTab(value as StatType)}>
        <Tabs.List>
          <Tabs.Tab value="pnl">PNL</Tabs.Tab>
          <Tabs.Tab value="x402Buys">Number of x402 Buys</Tabs.Tab>
          <Tabs.Tab value="accountBalance">Account Balance</Tabs.Tab>
          <Tabs.Tab value="transactions">Number of Txns</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pnl" pt="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <StatChart type="pnl" agentId={agentId} />
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="x402Buys" pt="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <StatChart type="x402Buys" agentId={agentId} />
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="accountBalance" pt="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <StatChart type="accountBalance" agentId={agentId} />
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="transactions" pt="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.7">
            <StatChart type="transactions" agentId={agentId} />
          </Card>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

