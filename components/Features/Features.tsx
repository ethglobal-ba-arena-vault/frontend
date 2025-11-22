import { IconBolt, IconChartBar, IconRocket, IconShieldLock } from '@tabler/icons-react';
import { Button, Container, Grid, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Features.module.css';

const features = [
    {
        icon: IconRocket,
        title: 'Instant Launch',
        description: 'No presale, no team allocation. Just pure pump. Launch your coin in seconds.',
    },
    {
        icon: IconShieldLock,
        title: 'Safe & Secure',
        description: 'Liquidity is locked automatically. Rug pulls are impossible on our protocol.',
    },
    {
        icon: IconBolt,
        title: 'Lightning Fast',
        description: 'Built on the fastest chain for instant swaps and sniper-proof launches.',
    },
    {
        icon: IconChartBar,
        title: 'Live Charts',
        description: 'Real-time trading view integration for professional technical analysis.',
    },
];

export function Features() {
    const items = features.map((feature) => (
        <div key={feature.title}>
            <ThemeIcon
                size={44}
                radius="md"
                variant="gradient"
                gradient={{ deg: 133, from: 'pumpGreen.4', to: 'pumpGreen.8' }}
            >
                <feature.icon size={26} stroke={1.5} />
            </ThemeIcon>
            <Text fz="lg" mt="sm" fw={500} c="white">
                {feature.title}
            </Text>
            <Text c="dimmed" fz="sm">
                {feature.description}
            </Text>
        </div>
    ));

    return (
        <Container size="xl" className={classes.wrapper}>
            <Grid gutter={80}>
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Title className={classes.title} order={2}>
                        The fair launch platform for meme coins
                    </Title>
                    <Text c="dimmed">
                        Don't let your dreams be dreams. Launch the next 1000x gem today. 
                        Community driven, fair, and open for everyone.
                    </Text>

                    <Button
                        variant="gradient"
                        gradient={{ deg: 133, from: 'pumpGreen.4', to: 'pumpGreen.8' }}
                        size="lg"
                        radius="xl"
                        mt="xl"
                        c="black"
                    >
                        Start Trading
                    </Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
                        {items}
                    </SimpleGrid>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
