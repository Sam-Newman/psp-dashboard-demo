export type ApiKeyEnvironment = "sandbox" | "production";
export type ApiKeyStatus = "active" | "revoked";

export interface ApiKey {
  id: string;
  name: string;
  prefix: string; // "sk_live_abc..." or "sk_test_abc..." for display
  environment: ApiKeyEnvironment;
  createdAt: string;
  lastUsedAt?: string;
  status: ApiKeyStatus;
}

export const apiKeyEnvironmentLabels: Record<ApiKeyEnvironment, string> = {
  sandbox: "Sandbox",
  production: "Production",
};

export const apiKeyStatusLabels: Record<ApiKeyStatus, string> = {
  active: "Active",
  revoked: "Revoked",
};
