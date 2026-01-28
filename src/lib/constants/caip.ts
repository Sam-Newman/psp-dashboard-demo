// CAIP-2 Chain IDs (EIP-155 namespace)
export const chainIdToCaip2: Record<string, string> = {
  ethereum: "eip155:1",
  polygon: "eip155:137",
  base: "eip155:8453",
  arbitrum: "eip155:42161",
  optimism: "eip155:10",
};

// Token contract addresses by chain
export const tokenAddresses: Record<string, Record<string, string>> = {
  ethereum: {
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  polygon: {
    USDC: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  },
  base: {
    USDC: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  },
  arbitrum: {
    USDC: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    USDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  },
  optimism: {
    USDC: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    USDT: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  },
};

// Build CAIP-19 asset identifier
export function buildCaip19Asset(chainId: string, tokenId: string): string | null {
  const caip2 = chainIdToCaip2[chainId];
  const tokenAddress = tokenAddresses[chainId]?.[tokenId];

  if (!caip2 || !tokenAddress) {
    return null;
  }

  // Native ETH would be different, but we're only dealing with ERC-20 tokens
  return `${caip2}/erc20:${tokenAddress}`;
}

// Build CAIP-10 account identifier
export function buildCaip10Account(chainId: string, address: string): string | null {
  const caip2 = chainIdToCaip2[chainId];
  if (!caip2) {
    return null;
  }
  return `${caip2}:${address}`;
}

// Get available tokens for a chain
export function getTokensForChain(chainId: string): string[] {
  return Object.keys(tokenAddresses[chainId] || {});
}
