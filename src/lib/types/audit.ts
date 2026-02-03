export type AuditAction =
  | "created"
  | "updated"
  | "deleted"
  | "suspended"
  | "activated"
  | "revoked"
  | "invited"
  | "removed";

export type AuditResourceType =
  | "merchant"
  | "api_key"
  | "team_member"
  | "webhook"
  | "settlement"
  | "settings";

export interface AuditActor {
  id: string;
  email: string;
  name: string;
}

export interface AuditResource {
  type: AuditResourceType;
  id: string;
  name?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: AuditActor;
  action: AuditAction;
  resource: AuditResource;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export const auditActionLabels: Record<AuditAction, string> = {
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  suspended: "Suspended",
  activated: "Activated",
  revoked: "Revoked",
  invited: "Invited",
  removed: "Removed",
};

export const auditResourceTypeLabels: Record<AuditResourceType, string> = {
  merchant: "Merchant",
  api_key: "API Key",
  team_member: "Team Member",
  webhook: "Webhook",
  settlement: "Settlement",
  settings: "Settings",
};

export const auditActionColors: Record<AuditAction, string> = {
  created: "text-[#4ade80]",
  updated: "text-[#60a5fa]",
  deleted: "text-[#f87171]",
  suspended: "text-[#fb923c]",
  activated: "text-[#4ade80]",
  revoked: "text-[#f87171]",
  invited: "text-[#60a5fa]",
  removed: "text-[#f87171]",
};
