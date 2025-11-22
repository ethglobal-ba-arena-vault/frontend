'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    MantineProvider,
    Card,
    Text,
    Group,
    Stack,
    Button,
    SegmentedControl,
    Badge,
    Box,
    Center,
    Avatar,
    ActionIcon,
    rem
} from '@mantine/core';
import '@mantine/core/styles.css';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    Bot,
    Zap,
    BrainCircuit,
    Sparkles,
    Orbit,
    Cpu,
    Hexagon,
    TrendingUp,
    MessageCircle,
    Wallet,
    BookOpen
} from 'lucide-react';

// --- Configuration & Icons ---

const LLM_CONFIG = [
    { id: 'claude', name: 'Claude 3.5', color: '#ff6b35', icon: Zap },        // Orange
    { id: 'gpt5', name: 'GPT-5', color: '#00e699', icon: BrainCircuit }, // Green
    { id: 'deep', name: 'DeepSeek', color: '#339af0', icon: Cpu },          // Blue
    { id: 'grok', name: 'Grok', color: '#f8f9fa', icon: Orbit },        // White
    { id: 'gemini', name: 'Gemini', color: '#a755f7', icon: Sparkles },     // Purple
];

// --- Custom Components for Chart ---

// The glowing icon at the end of the line
const CustomLineEndLabel = (props: any) => {
    const { cx, cy, index, dataLength, color, icon: Icon } = props;

    // Only render for the very last data point
    if (index !== dataLength - 1) return null;

    return (
        <foreignObject x={cx + 10} y={cy - 16} width={80} height={32} style={{ overflow: 'visible' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Glowing Icon Circle */}
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#1A1B1E',
                    border: `2px solid ${color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 15px ${color}60`, // Neon glow
                    zIndex: 50
                }}>
                    <Icon size={16} color={color} fill={color} fillOpacity={0.2} />
                </div>

                {/* Price Label next to icon */}
                <div style={{
                    backgroundColor: color,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#000',
                    boxShadow: `0 0 10px ${color}40`
                }}>
                    ${props.payload[props.dataKey]?.toFixed(2)}
                </div>
            </div>
        </foreignObject>
    );
};

// --- Mock Data Logic ---

const generateInitialData = (points: number) => {
    const data = [];
    let baseValues: any = { claude: 4.20, gpt5: 2.80, deep: 1.50, grok: 0.90, gemini: 7.50 };
    const now = new Date();

    for (let i = points; i > 0; i--) {
        const date = new Date(now.getTime() - i * 2000); // 2 seconds per step
        const point: any = {
            time: date.getTime(), // Numeric timestamp for XAxis
            label: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

        LLM_CONFIG.forEach(llm => {
            const change = (Math.random() - 0.5) * 0.2;
            baseValues[llm.id] = Math.max(0.1, baseValues[llm.id] + change);
            point[llm.id] = parseFloat(baseValues[llm.id].toFixed(2));
        });

        data.push(point);
    }
    return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Card shadow="xl" padding="xs" radius="md" withBorder bg="dark.8" style={{ borderColor: '#373A40', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(20,20,20,0.9)' }}>
                <Text size="xs" c="dimmed" mb={5}>{new Date(label).toLocaleTimeString()}</Text>
                {payload
                    .sort((a: any, b: any) => b.value - a.value)
                    .map((entry: any) => (
                        <Group key={entry.name} gap="xs" mb={2} justify="space-between" style={{ minWidth: 120 }}>
                            <Group gap={5}>
                                <Box w={6} h={6} style={{ backgroundColor: entry.color, borderRadius: '50%' }} />
                                <Text size="xs" c="gray.3">{entry.name}</Text>
                            </Group>
                            <Text size="xs" fw={700} c="white" style={{ fontFamily: 'monospace' }}>
                                ${entry.value.toFixed(2)}
                            </Text>
                        </Group>
                    ))}
            </Card>
        );
    }
    return null;
};

export default function PolyarenaChart() {
    // --- State ---
    const [data, setData] = useState(() => generateInitialData(40));
    const [activeSeries, setActiveSeries] = useState(LLM_CONFIG.map(c => c.id));
    const [timeRange, setTimeRange] = useState('ALL');
    const [unit, setUnit] = useState('USD');

    // --- Live Streaming Effect ---
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const lastPoint = prevData[prevData.length - 1];
                const newTime = new Date().getTime();

                const newPoint: any = {
                    time: newTime,
                    label: new Date(newTime).toLocaleTimeString(),
                };

                LLM_CONFIG.forEach(llm => {
                    const lastValue = lastPoint[llm.id];
                    // Random walk with mean reversion slightly
                    const change = (Math.random() - 0.5) * 0.3;
                    let newValue = lastValue + change;
                    if (newValue < 0.1) newValue = 0.1;
                    newPoint[llm.id] = parseFloat(newValue.toFixed(2));
                });

                // Keep array size constant-ish
                const newData = [...prevData.slice(1), newPoint];
                return newData;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleSeries = (id: string) => {
        setActiveSeries(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // --- Domain Calculation for "85% Width" ---
    // We calculate the min and max time of the current data, 
    // then add a buffer to the max domain so the lines stop early.
    const domain = useMemo(() => {
        if (data.length === 0) return ['auto', 'auto'];
        const minTime = data[0].time;
        const maxTime = data[data.length - 1].time;
        const duration = maxTime - minTime;
        // Add 20% buffer to the right to simulate the line stopping at ~80-85%
        const buffer = duration * 0.25;
        return [minTime, maxTime + buffer];
    }, [data]);

    return (
        <MantineProvider forceColorScheme="dark">
            <Center h="100vh" bg="black" p="md">

                {/* App Container */}
                <Card
                    w="100%"
                    maw={600} // Wider card for better view
                    h={750}
                    radius={32}
                    p={0}
                    bg="#050505"
                    withBorder
                    style={{ borderColor: '#1f1f1f', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >

                    {/* Navbar / Header */}
                    <Box p="lg" pb={0}>
                        <Group justify="space-between" align="center" mb="md">
                            <Group gap={8}>
                                <Hexagon size={24} fill="white" color="white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }} />
                                <Text fw={900} size="xl" lts={-0.5} c="white">POLYARENA</Text>
                            </Group>
                            <Badge
                                color="green"
                                variant="dot"
                                size="lg"
                                radius="sm"
                                bg="rgba(0, 255, 0, 0.1)"
                                styles={{ root: { borderColor: '#1f1f1f', color: '#4ade80' } }}
                            >
                                LIVE
                            </Badge>
                        </Group>

                        <Group justify="space-between" mt={30}>
                            <SegmentedControl
                                size="xs"
                                radius="md"
                                value={unit}
                                onChange={setUnit}
                                data={['USD', '%']}
                                bg="#111"
                                c="dimmed"
                                styles={{ indicator: { backgroundColor: '#222' }, label: { color: '#888' } }}
                            />

                            <Text c="gray.3" size="sm" fw={600} lts={1}>TOTAL VALUE</Text>

                            <SegmentedControl
                                size="xs"
                                radius="md"
                                value={timeRange}
                                onChange={setTimeRange}
                                data={['All', '72H']}
                                bg="#111"
                                styles={{ indicator: { backgroundColor: '#222' } }}
                            />
                        </Group>
                    </Box>

                    {/* Chart Area */}
                    <Box style={{ flex: 1, position: 'relative', marginTop: '20px' }} px={0}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={true}
                                    horizontal={true}
                                    stroke="#1A1A1A"
                                />
                                <XAxis
                                    dataKey="time"
                                    type="number"
                                    domain={domain as any}
                                    hide // Hide X Axis labels for cleaner look like reference
                                    tickCount={5}
                                />
                                <YAxis
                                    hide // Hide Y Axis labels to match cleaner look
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ stroke: '#ffffff', strokeWidth: 1, strokeDasharray: '5 5', strokeOpacity: 0.3 }}
                                />

                                {LLM_CONFIG.map((llm) => (
                                    activeSeries.includes(llm.id) && (
                                        <Line
                                            key={llm.id}
                                            type="basis" // Natural curve
                                            dataKey={llm.id}
                                            stroke={llm.color}
                                            strokeWidth={3}
                                            dot={(props) => (
                                                // Pass the specific icon to the custom label
                                                <CustomLineEndLabel {...props} dataLength={data.length} icon={llm.icon} color={llm.color} />
                                            )}
                                            isAnimationActive={false} // Important for smooth streaming
                                            style={{ filter: `drop-shadow(0px 0px 8px ${llm.color}60)` }}
                                        />
                                    )
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Footer Controls */}
                    <Stack gap={0} bg="#080808" style={{ borderTop: '1px solid #1f1f1f' }}>

                        {/* LLM Toggles */}
                        <Box p="md" py="lg" style={{ overflowX: 'auto' }}>
                            <Group gap="sm" wrap="nowrap" justify='center'>
                                {LLM_CONFIG.map((llm) => {
                                    const Icon = llm.icon;
                                    const isActive = activeSeries.includes(llm.id);
                                    return (
                                        <Button
                                            key={llm.id}
                                            onClick={() => toggleSeries(llm.id)}
                                            variant="outline"
                                            radius="xl"
                                            size="xs"
                                            h={36}
                                            pl={8}
                                            pr={12}
                                            styles={{
                                                root: {
                                                    borderColor: isActive ? '#333' : '#1A1A1A',
                                                    backgroundColor: isActive ? '#111' : 'transparent',
                                                    color: isActive ? 'white' : '#444',
                                                    transition: 'all 0.2s ease'
                                                },
                                                inner: { justifyContent: 'flex-start' }
                                            }}
                                            leftSection={
                                                <div style={{
                                                    backgroundColor: isActive ? llm.color : '#222',
                                                    borderRadius: '50%',
                                                    padding: '4px',
                                                    display: 'flex'
                                                }}>
                                                    <Icon size={12} color={isActive ? 'black' : '#555'} />
                                                </div>
                                            }
                                        >
                                            {llm.name}
                                        </Button>
                                    );
                                })}
                            </Group>
                        </Box>

                        {/* Bottom Navigation */}
                        <Group justify="space-between" px="xl" py="lg" pt="xs">
                            <Group gap={30}>
                                <Stack gap={4} align="center" style={{ cursor: 'pointer' }}>
                                    <Text size="xs" fw={900} c="white" style={{ borderBottom: '2px solid white', paddingBottom: '2px' }}>TRADES</Text>
                                </Stack>
                                <Stack gap={4} align="center" style={{ cursor: 'pointer', opacity: 0.5 }}>
                                    <Text size="xs" fw={700} c="gray">CHAT</Text>
                                </Stack>
                                <Stack gap={4} align="center" style={{ cursor: 'pointer', opacity: 0.5 }}>
                                    <Text size="xs" fw={700} c="gray">POS</Text>
                                </Stack>
                                <Stack gap={4} align="center" style={{ cursor: 'pointer', opacity: 0.5 }}>
                                    <Text size="xs" fw={700} c="gray">README</Text>
                                </Stack>
                            </Group>

                            <Group gap={6} opacity={0.3}>
                                <Bot size={14} />
                                <Text size="xs" fw={900} lts={1}>POLYARENA</Text>
                            </Group>
                        </Group>
                    </Stack>

                </Card>
            </Center>
        </MantineProvider>
    );
}