"use server";

import { createMerchantApi, CreateMerchantResponse, getMerchantApi, GetMerchantResponse } from "@/lib/api/merchants";
import { ApiMerchant, CreateMerchantInput } from "@/lib/types/merchant";
import { buildCaip19Asset, buildCaip10Account } from "@/lib/constants/caip";

export async function createMerchant(
  input: CreateMerchantInput
): Promise<CreateMerchantResponse> {
  const apiKey = process.env.PAY_API_KEY;
  const partnerId = process.env.NEXT_PUBLIC_PARTNER_ID;

  if (!apiKey) {
    return {
      success: false,
      error: "API key not configured. Please set PAY_API_KEY in environment variables.",
    };
  }

  if (!partnerId) {
    return {
      success: false,
      error: "Partner ID not configured. Please set NEXT_PUBLIC_PARTNER_ID in environment variables.",
    };
  }

  // Build CAIP identifiers
  const asset = buildCaip19Asset(input.chainId, input.tokenAddress);
  const destination = buildCaip10Account(input.chainId, input.destinationAddress);

  if (!asset) {
    return {
      success: false,
      error: `Invalid chain/token combination: ${input.chainId}/${input.tokenAddress}`,
    };
  }

  if (!destination) {
    return {
      success: false,
      error: `Invalid chain for destination: ${input.chainId}`,
    };
  }

  const now = new Date().toISOString();

  // Generate a simple ID based on name (replace spaces with underscores)
  const merchantId = input.name.replace(/\s+/g, "_");

  const merchant: ApiMerchant = {
    id: merchantId,
    name: input.name,
    version: 1,
    partnerId,
    alwaysCollectData: true,
    deleted: false,
    offrampOptions: [
      {
        optionType: "caip19",
        caip19Asset: asset,
        caip10Destination: destination,
        mta: true,
      },
    ],
    mtaAddresses: [destination],
    createdAt: now,
    updatedAt: now,
    ...(input.iconUrl && { iconUrl: input.iconUrl }),
  };

  return createMerchantApi(merchant, apiKey);
}

export async function getMerchant(merchantId: string): Promise<GetMerchantResponse> {
  const apiKey = process.env.PAY_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "API key not configured.",
    };
  }

  return getMerchantApi(merchantId, apiKey);
}

export interface UpdateMerchantInput {
  existingMerchant: ApiMerchant;
  name: string;
  iconUrl?: string;
  chainId: string;
  tokenAddress: string;
  destinationAddress: string;
}

export async function updateMerchant(
  input: UpdateMerchantInput
): Promise<CreateMerchantResponse> {
  const apiKey = process.env.PAY_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "API key not configured.",
    };
  }

  // Build CAIP identifiers
  const asset = buildCaip19Asset(input.chainId, input.tokenAddress);
  const destination = buildCaip10Account(input.chainId, input.destinationAddress);

  if (!asset) {
    return {
      success: false,
      error: `Invalid chain/token combination: ${input.chainId}/${input.tokenAddress}`,
    };
  }

  if (!destination) {
    return {
      success: false,
      error: `Invalid chain for destination: ${input.chainId}`,
    };
  }

  const now = new Date().toISOString();

  // Create updated merchant with incremented version
  const merchant: ApiMerchant = {
    ...input.existingMerchant,
    name: input.name,
    version: input.existingMerchant.version + 1,
    offrampOptions: [
      {
        optionType: "caip19",
        caip19Asset: asset,
        caip10Destination: destination,
        mta: true,
      },
    ],
    mtaAddresses: [destination],
    updatedAt: now,
    ...(input.iconUrl ? { iconUrl: input.iconUrl } : {}),
  };

  return createMerchantApi(merchant, apiKey);
}
