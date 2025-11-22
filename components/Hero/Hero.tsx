import { Button, Container, Text, Title, Group } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
    return (
        <Container className={classes.wrapper} size={1400}>
            <div className={classes.inner}>
                <Title className={classes.title}>
                    Launch your{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        meme coin
                    </Text>{' '}
                    instantly
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        The fair launch platform. No presale, no team allocation. 
                        Just pure pump. Start your journey to the moon today.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button className={classes.control} size="lg" radius="xl">
                        Start launching
                    </Button>
                    <Button className={classes.control} size="lg" variant="default" radius="xl">
                        How it works
                    </Button>
                </div>
            </div>
        </Container>
    );
}
