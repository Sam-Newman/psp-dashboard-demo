export const supportedTokens = [
  { id: "USDC", name: "USD Coin", symbol: "USDC" },
  { id: "USDT", name: "Tether", symbol: "USDT" },
  { id: "ETH", name: "Ethereum", symbol: "ETH" },
  { id: "DAI", name: "Dai", symbol: "DAI" },
] as const;

export type TokenId = (typeof supportedTokens)[number]["id"];

export function getTokenName(tokenId: string): string {
  const token = supportedTokens.find((t) => t.id === tokenId);
  return token?.name ?? tokenId;
}
