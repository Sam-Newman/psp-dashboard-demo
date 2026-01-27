export type MerchantStatus = "pending_kyc" | "active" | "suspended" | "offboarded";

export interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

export interface Merchant {
  id: string;
  companyName: string;
  legalEntity: string;
  contactEmail: string;
  contactPhone: string;
  status: MerchantStatus;
  createdAt: string;
  updatedAt: string;
  settlementCurrency: "USD" | "EUR" | "GBP";
  settlementFrequency: "daily" | "weekly" | "monthly";
  bankAccount: BankAccount;
  supportedChains: string[];
  supportedTokens: string[];
  totalVolume: number;
  transactionCount: number;
}

export const merchantStatusLabels: Record<MerchantStatus, string> = {
  pending_kyc: "Pending KYC",
  active: "Active",
  suspended: "Suspended",
  offboarded: "Offboarded",
};

export const merchantStatusColors: Record<MerchantStatus, "warning" | "success" | "error" | "info"> = {
  pending_kyc: "warning",
  active: "success",
  suspended: "error",
  offboarded: "info",
};
