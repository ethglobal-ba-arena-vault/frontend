import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core';
import classes from './Articles.module.css';

const mockdata = [
    {
        title: 'Top 10 places to visit in Norway this summer',
        image:
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 18, 2022',
    },
    {
        title: 'Best forests to visit in North America',
        image:
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'August 27, 2022',
    },
    {
        title: 'Hawaii beaches review: better than you think',
        image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 9, 2022',
    },
    {
        title: 'Mountains at night: 12 best locations to enjoy the view',
        image:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'September 12, 2022',
    },
];

export function Articles() {
    const cards = mockdata.map((article) => (
        <Card key={article.title} p="lg" radius="md" component="a" href="#" className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} radius="md" />
            </AspectRatio>
            <Text className={classes.date} mt="md">{article.date}</Text>
            <Text className={classes.title} mt="xs">{article.title}</Text>
        </Card>
    ));

    return (
        <Container size="xl" py={80}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing={{ base: 'md', sm: 'xl' }}>
                {cards}
            </SimpleGrid>
        </Container>
    );
}
