'use client';

import { Container, Title, Table, Badge, Text } from '@mantine/core';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { usePredictions } from './usePredictions';
import classes from './LatestPredictions.module.css';

export interface PredictionData {
  id: string;
  name: string;
  activity: { time: number; value: number }[];
  revenue: { time: number; value: number }[];
  txns: number;
  market: string;
  decision: 'Buy' | 'Sell';
  price: number;
  amount: number;
}

// Mini chart component for Activity and Revenue
const MiniChart = ({ data, color = '#22c55e' }: { data: { time: number; value: number }[]; color?: string }) => {
  return (
    <div className={classes.miniChart}>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Line
            type="linear"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Tooltip content={() => null} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export function LatestPredictions() {
  const { rows, fadingInId } = usePredictions();

  const tableRows = rows.map((prediction, _index) => {
    // Safety check for data
    if (!prediction || !prediction.activity) {
      return null;
    }
    
    const isFadingIn = fadingInId === prediction.id;
    
    const className = isFadingIn 
      ? classes.fadeIn 
      : '';
    
    return (
    <Table.Tr 
      key={prediction.id}
      className={className}
    >
      <Table.Td>
        <Text fw={500} size="sm">
          {prediction.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <MiniChart data={prediction.activity} color="#22c55e" />
      </Table.Td>
      <Table.Td>
        <Text size="sm">{prediction.txns.toLocaleString()}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed" lineClamp={1} style={{ maxWidth: 300 }}>
          {prediction.market}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500}>
          {prediction.price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {prediction.amount.toLocaleString()}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge
          color={prediction.decision === 'Buy' ? 'green' : 'red'}
          variant="light"
          size="lg"
          radius="xl"
        >
          {prediction.decision}
        </Badge>
      </Table.Td>
    </Table.Tr>
    );
  }).filter(Boolean);

  return (
    <Container size="xl" className={classes.wrapper}>
      <Title order={2} className={classes.title} mb="xl">
        Latest Predictions
      </Title>
      
      <div className={classes.tableWrapper}>
        <Table.ScrollContainer minWidth={900}>
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Activity</Table.Th>
                <Table.Th>Txns</Table.Th>
                <Table.Th>Market</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Decision</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{tableRows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </Container>
  );
}

