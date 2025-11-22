import { useState } from 'react';
import { TrendingAgents, AgentList, Footer, LatestPredictions } from '../components';
import type { FilterType } from '../components/TrendingAgents/TrendingAgents';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('featured');

  return (
    <>
      <LatestPredictions />
      <TrendingAgents activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <AgentList coins={[]} filter={activeFilter} />
      <Footer />
    </>
  );
}
