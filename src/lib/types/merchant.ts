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
