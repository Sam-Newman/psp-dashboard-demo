export type SettlementStatus = "pending" | "processing" | "completed";

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
}

export const settlementStatusLabels: Record<SettlementStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
};

export const settlementStatusColors: Record<SettlementStatus, "warning" | "info" | "success"> = {
  pending: "warning",
  processing: "info",
  completed: "success",
};
