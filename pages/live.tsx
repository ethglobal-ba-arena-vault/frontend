'use client';

import { Container, Title, Tabs } from '@mantine/core';
import { LeaderboardTab } from '../components/LeaderboardTab/LeaderboardTab';
import { ChartTab } from '../components/ChartTab/ChartTab';
import classes from './live.module.css';

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

