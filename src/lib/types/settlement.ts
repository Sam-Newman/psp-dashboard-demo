export type SettlementStatus = "pending" | "processing" | "completed" | "failed";

export interface SettlementBreakdown {
  chain: string;
  volume: number;
  count: number;
}

export interface Settlement {
  id: string;
  merchantId: string;
  merchantName: string;
  period: {
    start: string;
    end: string;
  };
  totalVolume: number;
  totalFees: number;
  netAmount: number;
  transactionCount: number;
  currency: string;
  status: SettlementStatus;
  createdAt: string;
  completedAt?: string;
  breakdown: SettlementBreakdown[];
  // New fields
  cryptoIn: {
    token: string;
    amount: number;
    chain: string;
  }[];
  fiatOut: number;
  exchangeRate?: number;
  platformFees: number;
  networkFees: number;
  linkedTransactionIds: string[];
}

export const settlementStatusLabels: Record<SettlementStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

export const settlementStatusColors: Record<SettlementStatus, "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  processing: "info",
  completed: "success",
  failed: "error",
};
