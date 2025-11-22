import {
    Box,
    Burger,
    Button,
    Container,
    Group,
    Text,
    Menu,
    Drawer,
    ScrollArea,
    Divider,
    UnstyledButton,
    Center,
    Collapse,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';
import classes from './Header.module.css';
import { IconChevronDown } from '@tabler/icons-react';

const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Determine connection state - default to false on server to match initial client render
    const showConnected = mounted && isConnected;

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text fw={900} size="xl" c="pumpGreen">PUMP.CLONE</Text>
                    </Link>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link href="/" className={classes.link}>
                            Home
                        </Link>
                        <Link href="/create" className={classes.link}>
                            Create Agent
                        </Link>
                        <Link href="/live" className={classes.link}>
                            Live
                        </Link>
                    </Group>

                    <Group visibleFrom="sm">
                        {showConnected ? (
                            <Group gap="xs">
                                <Button variant="filled" color="pumpGreen" size="sm" radius="xl">
                                    {address ? truncateAddress(address) : 'Connected'}
                                </Button>
                                <Button variant="light" color="red" size="sm" radius="xl" onClick={() => disconnect()}>
                                    Disconnect
                                </Button>
                            </Group>
                        ) : (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button radius="xl" variant="filled" color="pumpGreen">Connect Wallet</Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {connectors.map((connector) => (
                                        <Menu.Item
                                            key={connector.id}
                                            onClick={() => connect({ connector })}
                                        >
                                            {connector.name}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />

                    <Link href="/" className={classes.link}>
                        Home
                    </Link>
                    <Link href="/create" className={classes.link}>
                        Create Agent
                    </Link>
                    <Link href="/live" className={classes.link}>
                        Live
                    </Link>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                         {showConnected ? (
                            <>
                                <Button variant="filled" color="pumpGreen" size="sm">
                                    {address ? truncateAddress(address) : 'Connected'}
                                </Button>
                                <Button variant="light" color="red" size="sm" onClick={() => disconnect()}>
                                    Disconnect
                                </Button>
                            </>
                        ) : (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button fullWidth variant="filled" color="pumpGreen">Connect Wallet</Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {connectors.map((connector) => (
                                        <Menu.Item
                                            key={connector.id}
                                            onClick={() => connect({ connector })}
                                        >
                                            {connector.name}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
