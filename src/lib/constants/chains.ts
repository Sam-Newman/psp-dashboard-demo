export const supportedChains = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "polygon", name: "Polygon", symbol: "MATIC" },
  { id: "base", name: "Base", symbol: "ETH" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ETH" },
  { id: "optimism", name: "Optimism", symbol: "ETH" },
] as const;

export type ChainId = (typeof supportedChains)[number]["id"];

export function getChainName(chainId: string): string {
  const chain = supportedChains.find((c) => c.id === chainId);
  return chain?.name ?? chainId;
}
