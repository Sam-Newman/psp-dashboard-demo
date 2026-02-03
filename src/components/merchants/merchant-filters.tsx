"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Input } from "@pay-merchant/ui/ui/input";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@pay-merchant/ui/ui/menu";

import type { MerchantStatus } from "@/lib/types/merchant";
import { merchantStatusLabels } from "@/lib/types/merchant";

interface MerchantFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: MerchantStatus | "all";
  onStatusFilterChange: (value: MerchantStatus | "all") => void;
}

export function MerchantFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: MerchantFiltersProps) {
  const statusOptions: (MerchantStatus | "all")[] = [
    "all",
    "active",
    "pending_kyb",
    "kyb_in_review",
    "kyb_rejected",
    "suspended",
    "disabled",
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-sm">
        <Input
          placeholder="Search merchants..."
          value={search}
          onChange={onSearchChange}
          startContent={<MagnifyingGlass className="size-4 text-secondary" />}
          endContent={
            search ? (
              <button onClick={() => onSearchChange("")} className="text-secondary hover:text-primary">
                <X className="size-4" />
              </button>
            ) : undefined
          }
        />
      </div>

      <MenuTrigger>
        <Button variant="neutral-secondary" size="sm">
          Status: {statusFilter === "all" ? "All" : merchantStatusLabels[statusFilter]}
        </Button>
        <MenuPopover>
          <Menu onAction={(key) => onStatusFilterChange(key as MerchantStatus | "all")}>
            {statusOptions.map((status) => (
              <MenuItem
                key={status}
                id={status}
                className={statusFilter === status ? "bg-foreground-secondary" : ""}
              >
                {status === "all" ? "All Statuses" : merchantStatusLabels[status]}
              </MenuItem>
            ))}
          </Menu>
        </MenuPopover>
      </MenuTrigger>

      {(search || statusFilter !== "all") && (
        <Button
          variant="link-secondary"
          size="sm"
          onClick={() => {
            onSearchChange("");
            onStatusFilterChange("all");
          }}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
