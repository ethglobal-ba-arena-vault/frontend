import { AspectRatio, Card, Container, Image, SimpleGrid, Text, Badge, Group } from '@mantine/core';
import classes from './Articles.module.css';

const mockdata = [
    {
        title: 'PEPE (Pepe)',
        image:
            'https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
        date: 'Market Cap: $1.2M',
        change: '+120%',
    },
    {
        title: 'DOGE (Dogecoin)',
        image:
            'https://images.unsplash.com/photo-1622630998477-20aa696fab05?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
        date: 'Market Cap: $420k',
        change: '+69%',
    },
    {
        title: 'SHIB (Shiba Inu)',
        image:
            'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
        date: 'Market Cap: $50k',
        change: '+12%',
    },
    {
        title: 'WOJAK (Wojak)',
        image:
            'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
        date: 'Market Cap: $10k',
        change: '-5%',
    },
];

export function Articles() {
    const cards = mockdata.map((article) => (
        <Card key={article.title} p="lg" radius="md" component="a" href="#" className={classes.card}>
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} radius="md" />
            </AspectRatio>
            <Group justify="space-between" mt="md" mb="xs">
                <Text className={classes.date}>{article.date}</Text>
                <Badge color={article.change.startsWith('+') ? 'green' : 'red'} variant="light">
                    {article.change}
                </Badge>
            </Group>
            <Text className={classes.title} mt={5}>{article.title}</Text>
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
