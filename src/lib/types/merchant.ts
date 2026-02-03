export type MerchantStatus =
  | "pending_kyb"
  | "kyb_in_review"
  | "kyb_rejected"
  | "active"
  | "suspended"
  | "disabled";

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
  statusMessage?: string;
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

// API Types for WalletConnect Pay Internal API

export interface OfframpOption {
  optionType: "caip19"; // Required field - must be "caip19"
  caip19Asset: string; // CAIP-19 asset identifier (e.g., "eip155:137/erc20:0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359")
  caip10Destination: string; // CAIP-10 account identifier (e.g., "eip155:137:0x...")
  mta: boolean; // Whether to use MTA (merchant token account)
}

export interface ApiMerchant {
  id: string;
  name: string;
  version: number;
  partnerId: string;
  alwaysCollectData: boolean;
  deleted: boolean;
  offrampOptions: OfframpOption[];
  mtaAddresses: string[];
  createdAt: string;
  updatedAt: string;
  iconUrl?: string;
  fees?: Record<string, unknown>;
  turnkeyOrganizationId?: string;
}

export interface CreateMerchantInput {
  name: string;
  iconUrl?: string;
  chainId: string;
  tokenAddress: string;
  destinationAddress: string;
}

export const merchantStatusLabels: Record<MerchantStatus, string> = {
  pending_kyb: "Pending KYB",
  kyb_in_review: "KYB In Review",
  kyb_rejected: "KYB Rejected",
  active: "Active",
  suspended: "Suspended",
  disabled: "Disabled",
};

export const merchantStatusColors: Record<MerchantStatus, "warning" | "success" | "error" | "info"> = {
  pending_kyb: "warning",
  kyb_in_review: "info",
  kyb_rejected: "error",
  active: "success",
  suspended: "error",
  disabled: "info",
};

export const merchantStatusMessages: Record<MerchantStatus, string> = {
  pending_kyb: "Awaiting KYB submission",
  kyb_in_review: "KYB documents are being reviewed",
  kyb_rejected: "KYB verification was unsuccessful",
  active: "Merchant is active and can process payments",
  suspended: "Account temporarily suspended",
  disabled: "Account has been disabled",
};
