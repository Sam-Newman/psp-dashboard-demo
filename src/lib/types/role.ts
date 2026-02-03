export type Role = "admin" | "support";

export interface RolePermissions {
  merchants: {
    view: boolean;
    create: boolean;
    edit: boolean;
    suspend: boolean;
  };
  transactions: {
    view: boolean;
    export: boolean;
  };
  settlements: {
    view: boolean;
    viewDetails: boolean;
    generateReport: boolean;
  };
  settings: {
    view: boolean;
    edit: boolean;
  };
  apiKeys: {
    view: boolean;
    create: boolean;
    revoke: boolean;
  };
  team: {
    view: boolean;
    invite: boolean;
    remove: boolean;
  };
  auditLogs: {
    view: boolean;
  };
  webhooks: {
    view: boolean;
    create: boolean;
    delete: boolean;
  };
}

export const rolePermissions: Record<Role, RolePermissions> = {
  admin: {
    merchants: { view: true, create: true, edit: true, suspend: true },
    transactions: { view: true, export: true },
    settlements: { view: true, viewDetails: true, generateReport: true },
    settings: { view: true, edit: true },
    apiKeys: { view: true, create: true, revoke: true },
    team: { view: true, invite: true, remove: true },
    auditLogs: { view: true },
    webhooks: { view: true, create: true, delete: true },
  },
  support: {
    merchants: { view: true, create: false, edit: false, suspend: false },
    transactions: { view: true, export: false },
    settlements: { view: true, viewDetails: true, generateReport: false },
    settings: { view: true, edit: false },
    apiKeys: { view: true, create: false, revoke: false },
    team: { view: true, invite: false, remove: false },
    auditLogs: { view: true },
    webhooks: { view: true, create: false, delete: false },
  },
};

export const roleLabels: Record<Role, string> = {
  admin: "Admin",
  support: "Support",
};

export const roleDescriptions: Record<Role, string> = {
  admin: "Full access to all features",
  support: "Read-only access for customer support",
};
