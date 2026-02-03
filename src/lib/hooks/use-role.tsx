"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { Role, RolePermissions, rolePermissions } from "@/lib/types/role";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
  permissions: RolePermissions;
  hasPermission: (path: string) => boolean;
}

const RoleContext = createContext<RoleContextValue | null>(null);

const STORAGE_KEY = "psp-demo-role";

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("admin");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Map legacy "analyst" role to "support"
    if (stored === "analyst") {
      localStorage.setItem(STORAGE_KEY, "support");
      setRoleState("support");
    } else if (stored === "admin" || stored === "support") {
      setRoleState(stored);
    }
    setIsHydrated(true);
  }, []);

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEY, newRole);
  }, []);

  const permissions = rolePermissions[role];

  const hasPermission = useCallback(
    (path: string) => {
      const [category, action] = path.split(".") as [keyof RolePermissions, string];
      const categoryPermissions = permissions[category];
      if (!categoryPermissions) return false;
      return (categoryPermissions as Record<string, boolean>)[action] ?? false;
    },
    [permissions]
  );

  if (!isHydrated) {
    return null;
  }

  return (
    <RoleContext.Provider value={{ role, setRole, permissions, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
