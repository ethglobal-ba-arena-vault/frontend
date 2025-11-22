import { Carousel } from '@mantine/carousel';
import { Button, Paper, Text, Title, Container } from '@mantine/core';
import classes from './Carousel.module.css';

interface CardProps {
    image: string;
    title: string;
    category: string;
}

function Card({ image, title, category }: CardProps) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button variant="white" color="dark" radius="xl">
                View Coin
            </Button>
        </Paper>
    );
}

const data = [
    {
        image:
            'https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        title: 'PEPE: The king of memes',
        category: 'Trending',
    },
    {
        image:
            'https://images.unsplash.com/photo-1622630998477-20aa696fab05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        title: 'DOGE: Much wow, very pump',
        category: 'Legendary',
    },
    {
        image:
            'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        title: 'SHIB: The Doge killer',
        category: 'Hot',
    },
    {
        image:
            'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        title: 'BONK: Solana savior',
        category: 'New',
    },
];

export function CarouselCards() {
    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Container size="xl" px={0} py={60}>
            <Carousel
                slideSize="100%"
                slideGap={0}
                loop
                withIndicators
            >
                {slides}
            </Carousel>
        </Container>
    );
}
