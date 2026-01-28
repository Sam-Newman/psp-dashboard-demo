import { ApiMerchant } from "@/lib/types/merchant";

const API_URL = process.env.NEXT_PUBLIC_PAY_API_URL || "https://api.pay.walletconnect.com";

export interface CreateMerchantResponse {
  success: boolean;
  merchant?: ApiMerchant;
  error?: string;
}

export interface GetMerchantResponse {
  success: boolean;
  merchant?: ApiMerchant;
  error?: string;
}

export async function getMerchantApi(
  merchantId: string,
  apiKey: string
): Promise<GetMerchantResponse> {
  try {
    const response = await fetch(`${API_URL}/v1/internal/merchant/${merchantId}`, {
      method: "GET",
      headers: {
        "Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `API error (${response.status}): ${errorText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      merchant: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function createMerchantApi(
  merchant: ApiMerchant,
  apiKey: string
): Promise<CreateMerchantResponse> {
  try {
    const response = await fetch(`${API_URL}/v1/internal/merchant`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify(merchant),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `API error (${response.status}): ${errorText}`,
      };
    }

    // API returns 204 No Content on success
    if (response.status === 204) {
      return {
        success: true,
        merchant,
      };
    }

    // If there's a response body, parse it
    const text = await response.text();
    if (text) {
      const data = JSON.parse(text);
      return {
        success: true,
        merchant: data,
      };
    }

    return {
      success: true,
      merchant,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
