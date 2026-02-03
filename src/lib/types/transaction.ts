export type TransactionStatus = "requires_action" | "processing" | "succeeded" | "failed" | "expired";

export type TransactionSubstatus =
  | "waiting_for_confirmation"
  | "confirmed"
  | "reached_payout_account"
  | "offramped_to_fiat"
  | "failed"
  | "expired";

export type TransactionErrorCode =
  | "insufficient_funds"
  | "wallet_rejected"
  | "timeout"
  | "network_error"
  | "invalid_token"
  | "slippage_exceeded"
  | "merchant_not_active"
  | "rate_limit_exceeded"
  | "unknown";

export interface Transaction {
  id: string;
  sessionId: string;
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
  errorCode?: TransactionErrorCode;
  errorMessage?: string;
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

export const transactionErrorCodeLabels: Record<TransactionErrorCode, string> = {
  insufficient_funds: "Insufficient Funds",
  wallet_rejected: "Wallet Rejected",
  timeout: "Transaction Timeout",
  network_error: "Network Error",
  invalid_token: "Invalid Token",
  slippage_exceeded: "Slippage Exceeded",
  merchant_not_active: "Merchant Not Active",
  rate_limit_exceeded: "Rate Limit Exceeded",
  unknown: "Unknown Error",
};

export const transactionErrorMessages: Record<TransactionErrorCode, string> = {
  insufficient_funds: "The customer's wallet did not have enough funds to complete the transaction.",
  wallet_rejected: "The customer rejected the transaction in their wallet.",
  timeout: "The transaction timed out before receiving enough confirmations.",
  network_error: "A network error occurred while processing the transaction.",
  invalid_token: "The token used is not supported or invalid for this merchant.",
  slippage_exceeded: "The price changed too much during the transaction.",
  merchant_not_active: "The merchant account is not active.",
  rate_limit_exceeded: "Too many transaction attempts. Please try again later.",
  unknown: "An unexpected error occurred.",
};
