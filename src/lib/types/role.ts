export type Role = "admin" | "analyst" | "support";

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
}

export const rolePermissions: Record<Role, RolePermissions> = {
  admin: {
    merchants: { view: true, create: true, edit: true, suspend: true },
    transactions: { view: true, export: true },
    settlements: { view: true, viewDetails: true, generateReport: true },
    settings: { view: true, edit: true },
  },
  analyst: {
    merchants: { view: true, create: false, edit: false, suspend: false },
    transactions: { view: true, export: true },
    settlements: { view: true, viewDetails: true, generateReport: true },
    settings: { view: false, edit: false },
  },
  support: {
    merchants: { view: true, create: false, edit: false, suspend: false },
    transactions: { view: true, export: false },
    settlements: { view: false, viewDetails: false, generateReport: false },
    settings: { view: false, edit: false },
  },
};

export const roleLabels: Record<Role, string> = {
  admin: "Admin",
  analyst: "Analyst",
  support: "Support",
};

export const roleDescriptions: Record<Role, string> = {
  admin: "Full access to all features",
  analyst: "Read-only access with reporting",
  support: "Limited access for customer support",
};
