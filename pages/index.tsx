import { useState } from 'react';
import { OverallStats, TrendingCoins, CoinList, Footer } from '../components';
import type { FilterType } from '../components/TrendingCoins/TrendingCoins';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured');

  return (
    <>
      <OverallStats />
      <TrendingCoins activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <CoinList coins={[]} filter={activeFilter} />
      <Footer />
    </>
  );
}
