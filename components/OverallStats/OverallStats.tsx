'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  Group,
  Stack,
  Text,
  Select,
  Container,
  TextInput,
  Button,
} from '@mantine/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  IconReceipt,
  IconCoin,
  IconShoppingCart,
  IconShoppingBag,
  IconSearch,
} from '@tabler/icons-react';
import classes from './OverallStats.module.css';

type TimeRange = '24h' | '7d' | 'all';

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

// Mock data generator for time-series
const generateTimeSeriesData = (range: TimeRange) => {
  const now = new Date();
  const data: Array<{ time: string; value: number; label: string }> = [];
  
  let points = 24; // Default to 24 hours
  let intervalHours = 1;
  
  if (range === '7d') {
    points = 7;
    intervalHours = 24;
  } else if (range === 'all') {
    points = 30;
    intervalHours = 24;
  }
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(date.getHours() - (i * intervalHours));
    
    // Generate random values with some variation
    const baseValue = range === '24h' ? 1500 : range === '7d' ? 12000 : 50000;
    const variation = Math.random() * 0.3 - 0.15; // ±15% variation
    const value = Math.floor(baseValue * (1 + variation));
    
    const timeLabel = range === '24h' 
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    data.push({
      time: timeLabel,
      value,
      label: date.toISOString(),
    });
  }
  
  return data;
};

// Mock stats based on time range
const getStatsForRange = (range: TimeRange) => {
  const baseStats = {
    '24h': {
      transactions: '1,234',
      volume: '$45.2K',
      buyers: '892',
      sellers: '156',
    },
    '7d': {
      transactions: '8,456',
      volume: '$312.5K',
      buyers: '2,341',
      sellers: '234',
    },
    'all': {
      transactions: '45,678',
      volume: '$1.8M',
      buyers: '5,432',
      sellers: '456',
    },
  };
  
  return baseStats[range];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Card
        shadow="xl"
        padding="xs"
        radius="md"
        withBorder
        bg="dark.8"
        style={{
          borderColor: '#373A40',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(20,20,20,0.9)',
        }}
      >
        <Text size="xs" c="dimmed" mb={5}>
          {data.payload.label ? new Date(data.payload.label).toLocaleString() : data.payload.time}
        </Text>
        <Group gap="xs" justify="space-between" style={{ minWidth: 100 }}>
          <Text size="xs" c="gray.3">
            Transactions
          </Text>
          <Text size="xs" fw={700} c="white" style={{ fontFamily: 'monospace' }}>
            {data.value.toLocaleString()}
          </Text>
        </Group>
      </Card>
    );
  }
  return null;
};

export function OverallStats() {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [searchQuery, setSearchQuery] = useState('');
  
  const chartData = useMemo(() => generateTimeSeriesData(timeRange), [timeRange]);
  const stats = useMemo(() => getStatsForRange(timeRange), [timeRange]);
  
  return (
    <Container size="xl" className={classes.wrapper}>
      {/* Search Bar */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'var(--mantine-color-dark-7)', 
          border: '1px solid var(--mantine-color-dark-4)', 
          borderRadius: '8px', 
          padding: '4px',
          marginBottom: '24px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '12px', color: 'var(--mantine-color-gray-5)' }}>
          <IconSearch size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search server, resource, address, and more... ⌘K" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('Searching for:', searchQuery);
            }
          }}
          style={{ 
            flex: 1, 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: 'white', 
            padding: '12px', 
            fontSize: '16px', 
            outline: 'none',
            minWidth: 0
          }}
        />
        <Button 
          onClick={() => console.log('Searching for:', searchQuery)}
          color="pumpGreen"
          size="md"
          radius="md"
          style={{ 
            flexShrink: 0,
            height: '42px',
            fontSize: '14px',
            fontWeight: 600,
            padding: '0 24px',
            color: 'white'
          }}
        >
          Search
        </Button>
      </div>
      
      <Group justify="space-between" mb="xl" align="center">
        <Text size="xl" fw={700} c="white" className={classes.title}>
          Overall Stats
        </Text>
        <Select
          value={timeRange}
          onChange={(value) => setTimeRange(value as TimeRange)}
          data={[
            { value: '24h', label: 'Past 24 Hour' },
            { value: '7d', label: 'Past 7 Days' },
            { value: 'all', label: 'All Time' },
          ]}
          size="sm"
          radius="md"
          style={{ width: 150 }}
          styles={{
            input: {
              backgroundColor: 'var(--mantine-color-dark-7)',
              borderColor: 'var(--mantine-color-dark-4)',
              color: 'white',
            },
            dropdown: {
              backgroundColor: 'var(--mantine-color-dark-7)',
              borderColor: 'var(--mantine-color-dark-4)',
            },
            option: {
              color: 'white',
              '&[data-selected]': {
                backgroundColor: 'var(--mantine-color-pumpGreen-5)',
              },
            },
          }}
        />
      </Group>
      
      {/* Stat Cards */}
      <Group gap="md" mb="xl" grow>
        <StatCard
          label="Transactions"
          value={stats.transactions}
          icon={IconReceipt}
        />
        <StatCard
          label="Volume"
          value={stats.volume}
          icon={IconCoin}
        />
        <StatCard
          label="Buyers"
          value={stats.buyers}
          icon={IconShoppingCart}
        />
        <StatCard
          label="Sellers"
          value={stats.sellers}
          icon={IconShoppingBag}
        />
      </Group>
      
      {/* Bar Chart */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        bg="dark.7"
        className={classes.chartCard}
      >
        <Text size="sm" c="dimmed" mb="md" fw={500}>
          Transaction Activity
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1A1A1A"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="#868E96"
              tick={{ fill: '#868E96', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#868E96"
              tick={{ fill: '#868E96', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="var(--mantine-color-pumpGreen-5)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
}

