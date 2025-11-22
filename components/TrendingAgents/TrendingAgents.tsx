import { Container, Title, Group, Button } from '@mantine/core';
import { IconStar, IconCircleDot, IconCoin, IconLeaf, IconPlanet, IconMessageCircle, IconBolt } from '@tabler/icons-react';
import classes from './TrendingAgents.module.css';

export type FilterType = 'featured' | 'live' | 'valuable' | 'new' | 'oldest' | 'lastReply' | 'lastTrade';

interface Filter {
  id: FilterType;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const filters: Filter[] = [
  { id: 'featured', label: 'Featured', icon: IconStar },
  { id: 'live', label: 'Live now', icon: IconCircleDot },
  { id: 'valuable', label: 'Most valuable', icon: IconCoin },
  { id: 'new', label: 'New agents', icon: IconLeaf },
  { id: 'oldest', label: 'Old agents', icon: IconPlanet },
  { id: 'lastReply', label: 'Last reply', icon: IconMessageCircle },
  { id: 'lastTrade', label: 'Last trade', icon: IconBolt },
];

interface TrendingAgentsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TrendingAgents({ activeFilter, onFilterChange }: TrendingAgentsProps) {

  return (
    <Container size="xl" className={classes.wrapper}>
      <Group justify="space-between" mb="xl">
        <Title order={2} className={classes.title}>
          Now trending
        </Title>
      </Group>

      <Group gap="xs" className={classes.filters} wrap="wrap">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <Button
              key={filter.id}
              variant={isActive ? 'filled' : 'light'}
              color={isActive ? 'pumpGreen' : 'gray'}
              size="sm"
              radius="xl"
              leftSection={<Icon size={16} />}
              onClick={() => onFilterChange(filter.id)}
              className={classes.filterButton}
            >
              {filter.label}
            </Button>
          );
        })}
      </Group>
    </Container>
  );
}

