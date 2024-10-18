"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cairo } from "next/font/google";
import "./globals.css";


import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton, RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { rainbowWeb3AuthConnector } from '@/auth/RainbowWeb3authConnector';
import { rainbowWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia, mainnet, polygon } from "wagmi/chains";

const cairo = Cairo({ subsets: ['latin'] })

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '04309ed1007e77d1f119b85205bb779d',
  chains: [mainnet, sepolia, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
  },
  wallets: [{
    groupName: 'Recommended',
    wallets: [
      rainbowWallet,
      rainbowWeb3AuthConnector,
      metaMaskWallet,
    ],
  }],
});

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.className}  antialiased`}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
