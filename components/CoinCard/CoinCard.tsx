import { Card, Image, Text, Badge, Group, Stack, Avatar } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import classes from './CoinCard.module.css';

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  isLive?: boolean;
  isFeatured?: boolean;
}

interface CoinCardProps {
  coin: CoinData;
}

const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  }
  return `$${price.toFixed(2)}`;
};

const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  }
  if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  }
  return `$${marketCap.toFixed(2)}`;
};

export function CoinCard({ coin }: CoinCardProps) {
  const isPositive = coin.priceChange24h >= 0;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      style={{ borderColor: 'var(--mantine-color-dark-4)' }}
    >
      <Card.Section className={classes.imageSection}>
        <Group justify="space-between" p="md">
          <Group gap="xs">
            <Avatar src={coin.image} alt={coin.name} size="md" radius="xl" />
            <Stack gap={2}>
              <Text fw={700} size="sm" c="white">
                {coin.name}
              </Text>
              <Text size="xs" c="dimmed">
                {coin.symbol}
              </Text>
            </Stack>
          </Group>
          <Group gap="xs">
            {coin.isLive && (
              <Badge color="red" variant="dot" size="sm">
                LIVE
              </Badge>
            )}
            {coin.isFeatured && (
              <Badge color="pumpGreen" variant="light" size="sm">
                ⭐
              </Badge>
            )}
          </Group>
        </Group>
      </Card.Section>

      <Stack gap="sm" mt="md">
        <Group justify="space-between">
          <Text size="lg" fw={700} c="white">
            {formatPrice(coin.price)}
          </Text>
          <Group gap={4}>
            {isPositive ? (
              <IconTrendingUp size={16} color="var(--mantine-color-pumpGreen-5)" />
            ) : (
              <IconTrendingDown size={16} color="var(--mantine-color-red-5)" />
            )}
            <Text
              size="sm"
              fw={600}
              c={isPositive ? 'pumpGreen' : 'red'}
            >
              {isPositive ? '+' : ''}{coin.priceChange24h.toFixed(2)}%
            </Text>
          </Group>
        </Group>

        <Group justify="space-between" mt="xs">
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Market Cap
            </Text>
            <Text size="sm" fw={500} c="white">
              {formatMarketCap(coin.marketCap)}
            </Text>
          </Stack>
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Volume 24h
            </Text>
            <Text size="sm" fw={500} c="white">
              {formatMarketCap(coin.volume24h)}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
}

