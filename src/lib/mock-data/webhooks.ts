import type { WebhookEndpoint, WebhookDelivery, WebhookEvent } from "@/lib/types/webhook";

export const mockWebhookEndpoints: WebhookEndpoint[] = [
  {
    id: "wh_001",
    url: "https://api.example.com/webhooks/payments",
    description: "Production payment notifications",
    events: ["session.completed", "session.failed", "session.refunded"],
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
    lastDeliveryAt: "2024-03-20T14:30:00Z",
    failureCount: 0,
  },
  {
    id: "wh_002",
    url: "https://api.example.com/webhooks/merchants",
    description: "Merchant status updates",
    events: [
      "merchant.pending_kyb",
      "merchant.kyb_in_review",
      "merchant.activated",
      "merchant.kyb_rejected",
      "merchant.suspended",
    ],
    status: "active",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-03-19T11:20:00Z",
    lastDeliveryAt: "2024-03-19T11:20:00Z",
    failureCount: 0,
  },
  {
    id: "wh_003",
    url: "https://old-api.example.com/hooks",
    description: "Legacy endpoint (deprecated)",
    events: ["settlement.completed", "settlement.failed"],
    status: "failing",
    createdAt: "2023-06-01T09:00:00Z",
    updatedAt: "2024-03-18T08:00:00Z",
    lastDeliveryAt: "2024-03-18T08:00:00Z",
    failureCount: 5,
  },
];

export const mockWebhookDeliveries: WebhookDelivery[] = [
  {
    id: "del_001",
    endpointId: "wh_001",
    event: "session.completed",
    status: "success",
    statusCode: 200,
    timestamp: "2024-03-20T14:30:00Z",
    requestBody: JSON.stringify({
      type: "session.completed",
      data: {
        sessionId: "sess_abc123",
        merchantId: "mch_001",
        amount: 1500,
        currency: "USD",
      },
    }, null, 2),
    responseBody: JSON.stringify({ received: true }),
    duration: 145,
  },
  {
    id: "del_002",
    endpointId: "wh_001",
    event: "session.completed",
    status: "success",
    statusCode: 200,
    timestamp: "2024-03-20T13:15:00Z",
    requestBody: JSON.stringify({
      type: "session.completed",
      data: {
        sessionId: "sess_def456",
        merchantId: "mch_002",
        amount: 850,
        currency: "EUR",
      },
    }, null, 2),
    responseBody: JSON.stringify({ received: true }),
    duration: 132,
  },
  {
    id: "del_003",
    endpointId: "wh_001",
    event: "session.failed",
    status: "success",
    statusCode: 200,
    timestamp: "2024-03-20T11:45:00Z",
    requestBody: JSON.stringify({
      type: "session.failed",
      data: {
        sessionId: "sess_ghi789",
        merchantId: "mch_001",
        errorCode: "insufficient_funds",
      },
    }, null, 2),
    responseBody: JSON.stringify({ received: true }),
    duration: 98,
  },
  {
    id: "del_004",
    endpointId: "wh_002",
    event: "merchant.activated",
    status: "success",
    statusCode: 200,
    timestamp: "2024-03-19T11:20:00Z",
    requestBody: JSON.stringify({
      type: "merchant.activated",
      data: {
        merchantId: "mch_010",
        name: "Pet Paradise",
      },
    }, null, 2),
    responseBody: JSON.stringify({ received: true }),
    duration: 156,
  },
  {
    id: "del_005",
    endpointId: "wh_003",
    event: "settlement.completed",
    status: "failed",
    statusCode: 503,
    timestamp: "2024-03-18T08:00:00Z",
    requestBody: JSON.stringify({
      type: "settlement.completed",
      data: {
        settlementId: "stl_007",
        merchantId: "mch_001",
        amount: 12785.75,
      },
    }, null, 2),
    responseBody: "Service Unavailable",
    duration: 5023,
  },
];

export function getWebhookEndpointById(id: string): WebhookEndpoint | undefined {
  return mockWebhookEndpoints.find((e) => e.id === id);
}

export function getDeliveriesByEndpoint(endpointId: string): WebhookDelivery[] {
  return mockWebhookDeliveries.filter((d) => d.endpointId === endpointId);
}

export function getRecentDeliveries(limit: number = 10): WebhookDelivery[] {
  return [...mockWebhookDeliveries]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function getAllWebhookEvents(): WebhookEvent[] {
  return [
    "merchant.pending_kyb",
    "merchant.kyb_in_review",
    "merchant.activated",
    "merchant.kyb_rejected",
    "merchant.suspended",
    "session.completed",
    "session.failed",
    "session.refunded",
    "settlement.completed",
    "settlement.failed",
  ];
}
