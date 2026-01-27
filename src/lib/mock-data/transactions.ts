import type { Transaction, TransactionStatus } from "@/lib/types/transaction";

const chains = ["ethereum", "polygon", "base"];
const tokens = ["USDC", "USDT", "ETH"];

const merchantMap: Record<string, string> = {
  mch_001: "TechGadgets Inc",
  mch_002: "Fashion Forward Ltd",
  mch_004: "Digital Arts Studio",
  mch_005: "Crypto Coffee Co",
  mch_006: "GameZone Interactive",
  mch_007: "Luxury Watches EU",
  mch_010: "Smart Home Solutions",
};

const merchantIds = Object.keys(merchantMap);

function generateTxHash(): string {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateWalletAddress(): string {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

function maskWallet(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTransaction(index: number): Transaction {
  const statuses: TransactionStatus[] = ["requires_action", "processing", "succeeded", "succeeded", "succeeded", "failed", "expired"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const merchantId = merchantIds[Math.floor(Math.random() * merchantIds.length)];
  const chain = chains[Math.floor(Math.random() * chains.length)];
  const token = tokens[Math.floor(Math.random() * tokens.length)];

  const amountCrypto = Math.round((Math.random() * 5000 + 10) * 100) / 100;
  const exchangeRate = token === "ETH" ? 3200 : 1;
  const amountFiat = Math.round(amountCrypto * exchangeRate * 100) / 100;
  const feeAmount = Math.round(amountFiat * 0.005 * 100) / 100;

  const createdAt = randomDate(new Date("2024-03-01"), new Date("2024-03-21"));
  const updatedAt = new Date(createdAt.getTime() + Math.random() * 3600000);

  let substatus: Transaction["substatus"];
  let confirmedAt: string | undefined;
  let settledAt: string | undefined;

  if (status === "succeeded") {
    const substatuses: Transaction["substatus"][] = ["confirmed", "reached_payout_account", "offramped_to_fiat"];
    substatus = substatuses[Math.floor(Math.random() * substatuses.length)];
    confirmedAt = new Date(createdAt.getTime() + 120000).toISOString();
    if (substatus === "reached_payout_account" || substatus === "offramped_to_fiat") {
      settledAt = new Date(createdAt.getTime() + 14400000).toISOString();
    }
  } else if (status === "processing") {
    substatus = "waiting_for_confirmation";
  } else if (status === "failed") {
    substatus = "failed";
  } else if (status === "expired") {
    substatus = "expired";
  }

  return {
    id: `tx_${String(index + 1).padStart(3, "0")}`,
    txHash: generateTxHash(),
    merchantId,
    merchantName: merchantMap[merchantId],
    status,
    substatus,
    amountCrypto,
    amountFiat,
    fiatCurrency: "USD",
    chain,
    token,
    customerWallet: maskWallet(generateWalletAddress()),
    merchantWallet: maskWallet(generateWalletAddress()),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    confirmedAt,
    settledAt,
    feeAmount,
    netAmount: Math.round((amountFiat - feeAmount) * 100) / 100,
  };
}

export const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => generateTransaction(i));

export function getTransactionById(id: string): Transaction | undefined {
  return mockTransactions.find((t) => t.id === id);
}

export function getTransactionsByMerchant(merchantId: string): Transaction[] {
  return mockTransactions.filter((t) => t.merchantId === merchantId);
}

export function getTransactionsByStatus(status: TransactionStatus): Transaction[] {
  return mockTransactions.filter((t) => t.status === status);
}
