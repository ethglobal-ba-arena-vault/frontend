import { Button, Container, Image, Text, TextInput, Title } from '@mantine/core';
import image from './image.svg';
import classes from './EmailBanner.module.css';

export function EmailBanner() {
    return (
        <Container size="xl" py={80}>
            <div className={classes.wrapper}>
                <div className={classes.body}>
                    <Title className={classes.title}>Don't miss the next pump</Title>
                    <Text fw={500} fz="lg" mb={5} c="white">
                        Join our community!
                    </Text>
                    <Text fz="sm" c="dimmed">
                        Get notified about new launches, trending coins, and platform updates.
                        We won't spam you, promised.
                    </Text>

                    <div className={classes.controls}>
                        <TextInput
                            placeholder="Your email"
                            classNames={{ input: classes.input, root: classes.inputWrapper }}
                            radius="xl"
                            size="md"
                        />
                        <Button className={classes.control} radius="xl" size="md" c="black">
                            Subscribe
                        </Button>
                    </div>
                </div>
                <Image src={image.src} className={classes.image} />
            </div>
        </Container>
    );
}
