import { Container, SimpleGrid, Pagination, Group, Center } from '@mantine/core';
import { useState, useEffect } from 'react';
import { CoinCard, CoinData } from '../CoinCard/CoinCard';
import classes from './CoinList.module.css';

import { FilterType } from '../TrendingCoins/TrendingCoins';

interface CoinListProps {
  coins: CoinData[];
  filter?: FilterType;
}

// Mock data - replace with actual API call
const generateMockCoins = (count: number, filter?: FilterType): CoinData[] => {
  const coins: CoinData[] = [];
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const symbols = ['DOGE', 'SHIB', 'PEPE', 'FLOKI', 'BONK', 'WIF', 'BOME', 'POPCAT'];

  for (let i = 0; i < count; i++) {
    const nameIndex = i % names.length;
    const price = Math.random() * 0.1 + 0.001;
    const priceChange = (Math.random() - 0.5) * 40;
    const marketCap = Math.random() * 50e6 + 1e6;
    const isLive = Math.random() > 0.7;
    const isFeatured = i < 3;
    
    coins.push({
      id: `coin-${i}`,
      name: `${names[nameIndex]} ${i > names.length ? Math.floor(i / names.length) : ''}`.trim(),
      symbol: symbols[nameIndex],
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${names[nameIndex]}`,
      price,
      priceChange24h: priceChange,
      marketCap,
      volume24h: marketCap * (Math.random() * 0.5 + 0.1),
      isLive,
      isFeatured,
    });
  }

  // Apply filter logic
  let filtered = coins;
  switch (filter) {
    case 'featured':
      filtered = coins.filter(c => c.isFeatured);
      break;
    case 'live':
      filtered = coins.filter(c => c.isLive);
      break;
    case 'valuable':
      filtered = [...coins].sort((a, b) => b.marketCap - a.marketCap);
      break;
    case 'new':
      filtered = [...coins].reverse();
      break;
    case 'mayhem':
      filtered = [...coins].sort((a, b) => Math.abs(b.priceChange24h) - Math.abs(a.priceChange24h));
      break;
    default:
      filtered = coins;
  }

  return filtered;
};

export function CoinList({ coins: initialCoins, filter }: CoinListProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);
  
  // Use provided coins or generate mock data
  const coins = initialCoins.length > 0 ? initialCoins : generateMockCoins(48, filter);
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCoins = coins.slice(startIndex, endIndex);
  const totalPages = Math.ceil(coins.length / itemsPerPage);

  return (
    <Container size="xl" className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {paginatedCoins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <Center mt="xl">
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            radius="xl"
            color="pumpGreen"
            size="lg"
          />
        </Center>
      )}
    </Container>
  );
}

