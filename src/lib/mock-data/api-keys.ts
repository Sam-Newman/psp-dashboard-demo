import type { ApiKey } from "@/lib/types/api-key";

export const mockApiKeys: ApiKey[] = [
  {
    id: "key_001",
    name: "Production API Key",
    prefix: "sk_live_abc123...xyz",
    environment: "production",
    createdAt: "2024-01-15T10:00:00Z",
    lastUsedAt: "2024-03-20T14:30:00Z",
    status: "active",
  },
  {
    id: "key_002",
    name: "Sandbox API Key",
    prefix: "sk_test_def456...uvw",
    environment: "sandbox",
    createdAt: "2024-01-15T10:05:00Z",
    lastUsedAt: "2024-03-19T16:45:00Z",
    status: "active",
  },
  {
    id: "key_003",
    name: "Legacy Production Key",
    prefix: "sk_live_old789...rst",
    environment: "production",
    createdAt: "2023-06-01T09:00:00Z",
    lastUsedAt: "2024-02-10T11:20:00Z",
    status: "revoked",
  },
];

export function getApiKeyById(id: string): ApiKey | undefined {
  return mockApiKeys.find((k) => k.id === id);
}

export function getApiKeysByEnvironment(environment: "sandbox" | "production"): ApiKey[] {
  return mockApiKeys.filter((k) => k.environment === environment);
}

export function getActiveApiKeys(): ApiKey[] {
  return mockApiKeys.filter((k) => k.status === "active");
}

export function generateApiKeyPrefix(environment: "sandbox" | "production"): string {
  const prefix = environment === "production" ? "sk_live_" : "sk_test_";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let random = "";
  for (let i = 0; i < 24; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}${random}`;
}
