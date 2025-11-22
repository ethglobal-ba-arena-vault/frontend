import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../config/wagmi';
import { theme } from '../theme';
import { Layout } from '../components';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Head>
            <title>POLYARENA - Polymarket Predictions</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
