import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import classes from './Footer.module.css';

const data = [
    {
        title: 'About',
        links: [
            { label: 'Features', link: '/features' },
            { label: 'Pricing', link: '/pricing' },
            { label: 'Support', link: '/support' },
            { label: 'Forums', link: '/forums' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'Contribute', link: '/contribute' },
            { label: 'Media assets', link: '#' },
            { label: 'Changelog', link: '/changelog' },
            { label: 'Releases', link: '/releases' },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'Join Discord', link: '#' },
            { label: 'Follow on Twitter', link: '#' },
            { label: 'Email newsletter', link: '#' },
            { label: 'GitHub discussions', link: '#' },
        ],
    },
];

export function Footer() {
    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Link
                key={index}
                className={classes.link}
                href={link.link}
            >
                {link.label}
            </Link>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <MantineLogo size={30} />
                    <Text size="xs" c="dimmed" className={classes.description}>
                        Build fully functional accessible web applications faster than ever
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © 2020 mantine.dev. All rights reserved.
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
