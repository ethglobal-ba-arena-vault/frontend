import { useState } from 'react';
import { TrendingCoins, CoinList, Footer, LatestPredictions } from '../components';
import type { FilterType } from '../components/TrendingCoins/TrendingCoins';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured');

  return (
    <>
      <LatestPredictions />
      <TrendingCoins activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <CoinList coins={[]} filter={activeFilter} />
      <Footer />
    </>
  );
}
