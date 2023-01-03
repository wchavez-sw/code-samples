import "../styles/globals.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "@contexts";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
