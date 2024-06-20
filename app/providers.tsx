"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/lib/wagmi";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "@/lib/dynamic";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "0c1a9cce-cd35-4510-b82b-0041967accf6",
        walletConnectors: [EthereumWalletConnectors,StarknetWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
