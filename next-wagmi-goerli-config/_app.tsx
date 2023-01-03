import "styles/globals.scss";
import Head from "next/head";
import { Poppins } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureChains, createClient, WagmiConfig, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import type { AppProps } from "next/app";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>...</Head>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
}
