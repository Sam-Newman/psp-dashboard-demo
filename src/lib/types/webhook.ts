export type WebhookStatus = "active" | "disabled" | "failing";

export type WebhookEvent =
  | "merchant.pending_kyb"
  | "merchant.kyb_in_review"
  | "merchant.activated"
  | "merchant.kyb_rejected"
  | "merchant.suspended"
  | "session.completed"
  | "session.failed"
  | "session.refunded"
  | "settlement.completed"
  | "settlement.failed";

export interface WebhookEndpoint {
  id: string;
  url: string;
  description?: string;
  events: WebhookEvent[];
  status: WebhookStatus;
  createdAt: string;
  updatedAt: string;
  lastDeliveryAt?: string;
  failureCount: number;
}

export interface WebhookDelivery {
  id: string;
  endpointId: string;
  event: WebhookEvent;
  status: "success" | "failed" | "pending";
  statusCode?: number;
  timestamp: string;
  requestBody: string;
  responseBody?: string;
  duration?: number; // ms
}

export const webhookEventLabels: Record<WebhookEvent, string> = {
  "merchant.pending_kyb": "Merchant Pending KYB",
  "merchant.kyb_in_review": "Merchant KYB In Review",
  "merchant.activated": "Merchant Activated",
  "merchant.kyb_rejected": "Merchant KYB Rejected",
  "merchant.suspended": "Merchant Suspended",
  "session.completed": "Session Completed",
  "session.failed": "Session Failed",
  "session.refunded": "Session Refunded",
  "settlement.completed": "Settlement Completed",
  "settlement.failed": "Settlement Failed",
};

export const webhookEventCategories: Record<string, WebhookEvent[]> = {
  Merchant: [
    "merchant.pending_kyb",
    "merchant.kyb_in_review",
    "merchant.activated",
    "merchant.kyb_rejected",
    "merchant.suspended",
  ],
  Session: ["session.completed", "session.failed", "session.refunded"],
  Settlement: ["settlement.completed", "settlement.failed"],
};

export const webhookStatusLabels: Record<WebhookStatus, string> = {
  active: "Active",
  disabled: "Disabled",
  failing: "Failing",
};
