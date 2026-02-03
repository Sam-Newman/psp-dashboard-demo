import type { AuditLog, AuditAction, AuditResourceType } from "@/lib/types/audit";

export const mockAuditLogs: AuditLog[] = [
  {
    id: "audit_001",
    timestamp: "2024-03-20T14:30:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "created",
    resource: { type: "api_key", id: "key_004", name: "New Production Key" },
    details: { environment: "production" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_002",
    timestamp: "2024-03-20T13:15:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "invited",
    resource: { type: "team_member", id: "usr_004", name: "emily@psp.com" },
    details: { role: "support" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_003",
    timestamp: "2024-03-20T11:45:00Z",
    actor: { id: "usr_002", email: "sarah@psp.com", name: "Sarah Johnson" },
    action: "activated",
    resource: { type: "merchant", id: "mch_010", name: "Pet Paradise" },
    details: { previousStatus: "kyb_in_review" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "audit_004",
    timestamp: "2024-03-20T10:30:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "created",
    resource: { type: "webhook", id: "wh_004", name: "https://new-api.example.com/hooks" },
    details: { events: ["session.completed", "session.failed"] },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_005",
    timestamp: "2024-03-19T16:00:00Z",
    actor: { id: "usr_002", email: "sarah@psp.com", name: "Sarah Johnson" },
    action: "suspended",
    resource: { type: "merchant", id: "mch_007", name: "Fitness First" },
    details: { reason: "Pending compliance review" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "audit_006",
    timestamp: "2024-03-19T14:20:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "revoked",
    resource: { type: "api_key", id: "key_003", name: "Legacy Production Key" },
    details: { reason: "Security rotation" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_007",
    timestamp: "2024-03-19T11:00:00Z",
    actor: { id: "usr_002", email: "sarah@psp.com", name: "Sarah Johnson" },
    action: "updated",
    resource: { type: "merchant", id: "mch_001", name: "TechGadgets Inc" },
    details: { field: "settlementFrequency", oldValue: "weekly", newValue: "daily" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "audit_008",
    timestamp: "2024-03-18T15:30:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "removed",
    resource: { type: "team_member", id: "usr_005", name: "Alex Rivera" },
    details: { reason: "No longer with company" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_009",
    timestamp: "2024-03-18T10:00:00Z",
    actor: { id: "usr_002", email: "sarah@psp.com", name: "Sarah Johnson" },
    action: "created",
    resource: { type: "merchant", id: "mch_011", name: "Crypto Collectibles" },
    details: { status: "pending_kyb" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "audit_010",
    timestamp: "2024-03-17T14:45:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "updated",
    resource: { type: "settings", id: "rate_limits", name: "Rate Limits" },
    details: { field: "requestsPerMinute", oldValue: 100, newValue: 500 },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "audit_011",
    timestamp: "2024-03-17T09:30:00Z",
    actor: { id: "usr_002", email: "sarah@psp.com", name: "Sarah Johnson" },
    action: "deleted",
    resource: { type: "webhook", id: "wh_005", name: "https://deprecated.example.com" },
    details: { reason: "Endpoint deprecated" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "audit_012",
    timestamp: "2024-03-16T16:15:00Z",
    actor: { id: "usr_001", email: "john@psp.com", name: "John Smith" },
    action: "activated",
    resource: { type: "merchant", id: "mch_006", name: "Digital Books Plus" },
    details: { previousStatus: "kyb_in_review" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
];

export function getAuditLogById(id: string): AuditLog | undefined {
  return mockAuditLogs.find((log) => log.id === id);
}

export function getAuditLogsByActor(actorId: string): AuditLog[] {
  return mockAuditLogs.filter((log) => log.actor.id === actorId);
}

export function getAuditLogsByAction(action: AuditAction): AuditLog[] {
  return mockAuditLogs.filter((log) => log.action === action);
}

export function getAuditLogsByResourceType(type: AuditResourceType): AuditLog[] {
  return mockAuditLogs.filter((log) => log.resource.type === type);
}

export function getRecentAuditLogs(limit: number = 10): AuditLog[] {
  return [...mockAuditLogs]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
