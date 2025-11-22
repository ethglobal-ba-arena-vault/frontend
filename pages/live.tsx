'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Container, Title, Table, Text, Tabs, Badge, Box } from '@mantine/core';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import classes from './live.module.css';

// Types
interface LeaderboardData {
  id: string;
  agentName: string;
  rank: number;
  netValueLocked: number;
  apy: number;
  pnl72h: number;
}

type SortField = 'rank' | 'netValueLocked' | 'apy' | 'pnl72h';
type SortDirection = 'asc' | 'desc';

interface ChartDataPoint {
  time: number;
  label: string;
  netValue: number;
  [key: string]: number | string; // For agent values
}

// Mock data generators
const generateLeaderboardData = (): LeaderboardData[] => {
  const agents = ['Claude 3.5', 'GPT-5', 'DeepSeek', 'Grok', 'Gemini', 'GPT-4', 'Claude 3', 'Llama 3'];
  return agents.map((name, index) => ({
    id: `agent-${index}`,
    agentName: name,
    rank: index + 1,
    netValueLocked: Math.random() * 1000000 + 100000,
    apy: Math.random() * 50 + 5,
    pnl72h: (Math.random() - 0.3) * 50000,
  }));
};

const generateChartData = (points: number = 72): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  const agentValues: { [key: string]: number } = {
    'Claude 3.5': 1200000,
    'GPT-5': 800000,
    'DeepSeek': 600000,
    'Grok': 400000,
    'Gemini': 500000,
  };

  for (let i = points; i > 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000); // 1 hour per step
    const point: ChartDataPoint = {
      time: date.getTime(),
      label: date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit' }),
      netValue: 0, // Not used anymore, but kept for interface compatibility
    };

    // Add agent values with random walk
    Object.keys(agentValues).forEach((agent) => {
      agentValues[agent] += (Math.random() - 0.5) * 20000;
      agentValues[agent] = Math.max(100000, agentValues[agent]);
      point[agent] = Math.round(agentValues[agent]);
    });

    data.push(point);
  }
  return data;
};

// Sortable table header component
const SortableHeader = ({
  field,
  currentSort,
  onSort,
  children,
}: {
  field: SortField;
  currentSort: { field: SortField; direction: SortDirection } | null;
  onSort: (field: SortField) => void;
  children: React.ReactNode;
}) => {
  const isActive = currentSort?.field === field;
  const direction = isActive ? currentSort.direction : null;

  return (
    <Table.Th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => onSort(field)}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {children}
        {direction === 'asc' && <IconArrowUp size={14} />}
        {direction === 'desc' && <IconArrowDown size={14} />}
        {!isActive && <Box style={{ width: 14, height: 14 }} />}
      </Box>
    </Table.Th>
  );
};

// Leaderboard Tab Component
const LeaderboardTab = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>(generateLeaderboardData());
  const [sortConfig, setSortConfig] = useState<{ field: SortField; direction: SortDirection } | null>(null);

  // Live updates for leaderboard data
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboardData((prevData) => {
        return prevData.map((agent) => ({
          ...agent,
          netValueLocked: Math.max(100000, agent.netValueLocked + (Math.random() - 0.5) * 10000),
          apy: Math.max(0, agent.apy + (Math.random() - 0.5) * 2),
          pnl72h: agent.pnl72h + (Math.random() - 0.5) * 5000,
        }));
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSort = (field: SortField) => {
    setSortConfig((current) => {
      if (current?.field === field) {
        return {
          field,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { field, direction: 'asc' };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return leaderboardData;

    const sorted = [...leaderboardData].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    // Update ranks after sorting
    return sorted.map((item, index) => ({ ...item, rank: index + 1 }));
  }, [leaderboardData, sortConfig]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className={classes.tableWrapper}>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="md" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <SortableHeader field="rank" currentSort={sortConfig} onSort={handleSort}>
                <Text fw={600}>Rank</Text>
              </SortableHeader>
              <Table.Th>
                <Text fw={600}>Agent</Text>
              </Table.Th>
              <SortableHeader field="netValueLocked" currentSort={sortConfig} onSort={handleSort}>
                <Text fw={600}>Net Value Locked</Text>
              </SortableHeader>
              <SortableHeader field="apy" currentSort={sortConfig} onSort={handleSort}>
                <Text fw={600}>APY</Text>
              </SortableHeader>
              <SortableHeader field="pnl72h" currentSort={sortConfig} onSort={handleSort}>
                <Text fw={600}>PnL (72h)</Text>
              </SortableHeader>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.map((agent) => (
              <Table.Tr key={agent.id}>
                <Table.Td>
                  <Text fw={500} size="sm">
                    #{agent.rank}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={500} size="sm">
                    {agent.agentName}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{formatCurrency(agent.netValueLocked)}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color="green" variant="light" size="lg" radius="xl">
                    {formatPercent(agent.apy)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text
                    size="sm"
                    c={agent.pnl72h >= 0 ? 'green' : 'red'}
                    fw={500}
                  >
                    {formatCurrency(agent.pnl72h)}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

// Chart Tab Component
const ChartTab = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>(generateChartData(72));
  const agentValuesRef = useRef<{ [key: string]: number }>({
    'Claude 3.5': 1200000,
    'GPT-5': 800000,
    'DeepSeek': 600000,
    'Grok': 400000,
    'Gemini': 500000,
  });
  const top5Agents = ['Claude 3.5', 'GPT-5', 'DeepSeek', 'Grok', 'Gemini'];
  const agentColors: { [key: string]: string } = {
    'Claude 3.5': '#ff6b35',
    'GPT-5': '#00e699',
    'DeepSeek': '#339af0',
    'Grok': '#f8f9fa',
    'Gemini': '#a755f7',
  };

  // Live updates for chart data (hourly updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newTime = new Date().getTime();

        // Update agent values with random walk
        Object.keys(agentValuesRef.current).forEach((agent) => {
          agentValuesRef.current[agent] += (Math.random() - 0.5) * 20000;
          agentValuesRef.current[agent] = Math.max(100000, agentValuesRef.current[agent]);
        });

        const newPoint: ChartDataPoint = {
          time: newTime,
          label: new Date(newTime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit' }),
          netValue: 0, // Not used anymore, but kept for interface compatibility
        };

        // Add agent values
        Object.keys(agentValuesRef.current).forEach((agent) => {
          newPoint[agent] = Math.round(agentValuesRef.current[agent]);
        });

        // Keep array size constant at 72 hours (remove first, add new at end)
        const newData = [...prevData.slice(1), newPoint];
        return newData;
      });
    }, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
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
          {payload.map((entry: any, index: number) => (
            <Text key={index} size="xs" style={{ color: entry.color }} mb={4}>
              {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value) : entry.value}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box>
      <Title order={3} mb="xl" className={classes.chartTitle}>
        Top 5 Agents
      </Title>
      <Box className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mantine-color-dark-4)" />
            <XAxis
              dataKey="label"
              stroke="var(--mantine-color-gray-6)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--mantine-color-gray-6)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {top5Agents.map((agent) => (
              <Line
                key={agent}
                type="monotone"
                dataKey={agent}
                stroke={agentColors[agent] || '#22c55e'}
                strokeWidth={2}
                dot={false}
                name={agent}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

// Main Live Page Component
export default function LivePage() {
  return (
    <Container size="xl" className={classes.wrapper}>
      <Title order={1} className={classes.title} mb="xl">
        Live Dashboard
      </Title>

      <Tabs defaultValue="leaderboard" className={classes.tabs}>
        <Tabs.List>
          <Tabs.Tab value="leaderboard">Leaderboard</Tabs.Tab>
          <Tabs.Tab value="chart">Chart</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="leaderboard" pt="xl">
          <LeaderboardTab />
        </Tabs.Panel>

        <Tabs.Panel value="chart" pt="xl">
          <ChartTab />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

