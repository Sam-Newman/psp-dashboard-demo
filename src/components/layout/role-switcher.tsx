"use client";

import { CaretDown, Headset, Shield, ChartLine } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@pay-merchant/ui/ui/menu";

import { useRole } from "@/lib/hooks/use-role";
import { Role, roleDescriptions, roleLabels } from "@/lib/types/role";

const roleIcons: Record<Role, typeof Shield> = {
  admin: Shield,
  analyst: ChartLine,
  support: Headset,
};

const roleColors: Record<Role, string> = {
  admin: "text-blue-400",
  analyst: "text-emerald-400",
  support: "text-amber-400",
};

export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const Icon = roleIcons[role];

  return (
    <MenuTrigger>
      <Button
        variant="icon"
        className="rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 gap-2 px-3"
      >
        <Icon className={`size-4 ${roleColors[role]}`} weight="fill" />
        <span className="text-sm">{roleLabels[role]}</span>
        <CaretDown className="size-3.5 text-white/60" />
      </Button>
      <MenuPopover placement="bottom end">
        <Menu
          onAction={(key) => {
            setRole(key as Role);
          }}
        >
          {(Object.keys(roleLabels) as Role[]).map((r) => {
            const RoleIcon = roleIcons[r];
            return (
              <MenuItem key={r} id={r} className={role === r ? "bg-accent/10" : ""}>
                <div className="flex items-center gap-3">
                  <RoleIcon className={`size-4 ${roleColors[r]}`} weight="fill" />
                  <div className="flex flex-col">
                    <span className="font-medium">{roleLabels[r]}</span>
                    <span className="text-xs text-secondary">{roleDescriptions[r]}</span>
                  </div>
                </div>
              </MenuItem>
            );
          })}
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}
