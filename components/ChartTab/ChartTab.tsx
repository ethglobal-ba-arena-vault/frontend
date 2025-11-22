'use client';

import { useState, useEffect, useRef } from 'react';
import { Title, Box, Text } from '@mantine/core';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import classes from './ChartTab.module.css';

// Types
export interface ChartDataPoint {
  time: number;
  label: string;
  netValue: number;
  [key: string]: number | string; // For agent values
}

// Mock data generator
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

// Utility function
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Custom Tooltip component
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

// Chart Tab Component
export function ChartTab() {
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
}

