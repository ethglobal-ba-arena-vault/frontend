'use client';

import { Container, Title, Group, Avatar, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconRocket } from '@tabler/icons-react';
import { AgentOverview } from '../../components/AgentOverview/AgentOverview';
import { AgentPrompt } from '../../components/AgentPrompt/AgentPrompt';
import { AgentStats } from '../../components/AgentStats/AgentStats';
import classes from './[id].module.css';

// Generate agent name from ID (matches the logic in AgentList)
function getAgentNameFromId(agentId?: string): string {
  if (!agentId) return 'Agent';
  
  // Extract number from coin-{i} format
  const match = agentId.match(/coin-(\d+)/);
  if (!match) return agentId;
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  const name = `${names[nameIndex]}${index >= names.length ? ` ${Math.floor(index / names.length)}` : ''}`.trim();
  
  return name;
}

// Generate agent image URL from ID (matches the logic in AgentList)
function getAgentImageFromId(agentId?: string): string {
  if (!agentId) return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  
  // Extract number from coin-{i} format
  const match = agentId.match(/coin-(\d+)/);
  if (!match) return 'https://api.dicebear.com/7.x/shapes/svg?seed=default';
  
  const index = parseInt(match[1], 10);
  const names = ['Doge', 'Shiba', 'Pepe', 'Floki', 'Bonk', 'Wif', 'Bome', 'Popcat'];
  const nameIndex = index % names.length;
  
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${names[nameIndex]}`;
}

export default function AgentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const agentId = typeof id === 'string' ? id : undefined;
  const agentName = getAgentNameFromId(agentId);
  const agentImage = getAgentImageFromId(agentId);

  const handleTryoutClick = () => {
    if (agentId) {
      router.push(`/agents/${agentId}/prediction`);
    }
  };

  return (
    <Container size="xl" className={classes.wrapper}>
      <Group gap="md" mb="xl" justify="space-between" wrap="nowrap">
        <Group gap="md">
          <Avatar src={agentImage} alt={agentName} size="lg" radius="xl" />
          <Title order={1} className={classes.title}>
            {agentName}
          </Title>
        </Group>
        <Button
          leftSection={<IconRocket size={18} />}
          onClick={handleTryoutClick}
          color="pumpGreen"
          variant="filled"
          size="md"
        >
          Tryout
        </Button>
      </Group>

      <AgentOverview agentId={agentId} />
      <AgentPrompt agentId={agentId} />
      <AgentStats agentId={agentId} />
    </Container>
  );
}

