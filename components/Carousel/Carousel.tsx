import { Carousel } from '@mantine/carousel';
import { Button, Paper, Text, Title, Container } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
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
            <Button variant="white" color="dark">
                Read article
            </Button>
        </Paper>
    );
}

const data = [
    {
        image:
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Best forests to visit in North America',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Hawaii beaches review: better than you think',
        category: 'beach',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Mountains at night: 12 best locations to enjoy the view',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Aurora in Norway: when to visit for best experience',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Best places to visit this winter',
        category: 'tourism',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80',
        title: 'Active volcanos reviews: travel at your own risk',
        category: 'nature',
    },
];

export function CarouselCards() {
    const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

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
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
            >
                {slides}
            </Carousel>
        </Container>
    );
}
