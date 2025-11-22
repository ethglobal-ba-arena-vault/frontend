'use client';

import { useState, useMemo, useEffect } from 'react';
import { Table, Text, Badge, Box } from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import classes from './LeaderboardTab.module.css';

// Types
export interface LeaderboardData {
  id: string;
  agentName: string;
  rank: number;
  netValueLocked: number;
  apy: number;
  pnl72h: number;
}

export type SortField = 'rank' | 'netValueLocked' | 'apy' | 'pnl72h';
export type SortDirection = 'asc' | 'desc';

// Mock data generator
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

// Utility functions
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
export function LeaderboardTab() {
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
}

