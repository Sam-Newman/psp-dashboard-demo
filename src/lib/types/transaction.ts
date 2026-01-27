export type TransactionStatus = "requires_action" | "processing" | "succeeded" | "failed" | "expired";

export type TransactionSubstatus =
  | "waiting_for_confirmation"
  | "confirmed"
  | "reached_payout_account"
  | "offramped_to_fiat"
  | "failed"
  | "expired";

export interface Transaction {
  id: string;
  txHash: string;
  merchantId: string;
  merchantName: string;
  status: TransactionStatus;
  substatus?: TransactionSubstatus;
  amountCrypto: number;
  amountFiat: number;
  fiatCurrency: string;
  chain: string;
  token: string;
  customerWallet: string;
  merchantWallet: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  settledAt?: string;
  feeAmount: number;
  netAmount: number;
}

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  requires_action: "Requires Action",
  processing: "Processing",
  succeeded: "Succeeded",
  failed: "Failed",
  expired: "Expired",
};

export const transactionStatusColors: Record<TransactionStatus, "warning" | "info" | "success" | "error"> = {
  requires_action: "warning",
  processing: "info",
  succeeded: "success",
  failed: "error",
  expired: "info",
};

export const transactionSubstatusLabels: Record<TransactionSubstatus, string> = {
  waiting_for_confirmation: "Waiting for Confirmation",
  confirmed: "Confirmed",
  reached_payout_account: "Reached Payout Account",
  offramped_to_fiat: "Off-ramped to Fiat",
  failed: "Failed",
  expired: "Expired",
};
