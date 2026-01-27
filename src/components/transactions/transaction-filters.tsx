"use client";

import { MagnifyingGlass, X, CaretDown } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Input } from "@pay-merchant/ui/ui/input";
import { Menu, MenuItem, MenuPopover, MenuTrigger } from "@pay-merchant/ui/ui/menu";

import { mockMerchants } from "@/lib/mock-data/merchants";
import type { TransactionStatus } from "@/lib/types/transaction";
import { transactionStatusLabels } from "@/lib/types/transaction";

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: TransactionStatus | "all";
  onStatusFilterChange: (value: TransactionStatus | "all") => void;
  merchantFilter: string | "all";
  onMerchantFilterChange: (value: string | "all") => void;
  chainFilter: string | "all";
  onChainFilterChange: (value: string | "all") => void;
}

const statusOptions: (TransactionStatus | "all")[] = [
  "all",
  "requires_action",
  "processing",
  "succeeded",
  "failed",
  "expired",
];

const chainOptions = ["all", "ethereum", "polygon", "base"];

export function TransactionFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  merchantFilter,
  onMerchantFilterChange,
  chainFilter,
  onChainFilterChange,
}: TransactionFiltersProps) {
  const activeMerchants = mockMerchants.filter((m) => m.status === "active");

  const hasActiveFilters =
    search || statusFilter !== "all" || merchantFilter !== "all" || chainFilter !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Input
          placeholder="Search by TxID or wallet..."
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
          Status: {statusFilter === "all" ? "All" : transactionStatusLabels[statusFilter]}
          <CaretDown className="size-3.5" />
        </Button>
        <MenuPopover>
          <Menu onAction={(key) => onStatusFilterChange(key as TransactionStatus | "all")}>
            {statusOptions.map((status) => (
              <MenuItem
                key={status}
                id={status}
                className={statusFilter === status ? "bg-foreground-secondary" : ""}
              >
                {status === "all" ? "All Statuses" : transactionStatusLabels[status]}
              </MenuItem>
            ))}
          </Menu>
        </MenuPopover>
      </MenuTrigger>

      <MenuTrigger>
        <Button variant="neutral-secondary" size="sm">
          Merchant:{" "}
          {merchantFilter === "all"
            ? "All"
            : activeMerchants.find((m) => m.id === merchantFilter)?.companyName ?? "Unknown"}
          <CaretDown className="size-3.5" />
        </Button>
        <MenuPopover>
          <Menu onAction={(key) => onMerchantFilterChange(key as string)}>
            <MenuItem id="all" className={merchantFilter === "all" ? "bg-foreground-secondary" : ""}>
              All Merchants
            </MenuItem>
            {activeMerchants.map((merchant) => (
              <MenuItem
                key={merchant.id}
                id={merchant.id}
                className={merchantFilter === merchant.id ? "bg-foreground-secondary" : ""}
              >
                {merchant.companyName}
              </MenuItem>
            ))}
          </Menu>
        </MenuPopover>
      </MenuTrigger>

      <MenuTrigger>
        <Button variant="neutral-secondary" size="sm">
          Chain: {chainFilter === "all" ? "All" : chainFilter}
          <CaretDown className="size-3.5" />
        </Button>
        <MenuPopover>
          <Menu onAction={(key) => onChainFilterChange(key as string)}>
            {chainOptions.map((chain) => (
              <MenuItem
                key={chain}
                id={chain}
                className={chainFilter === chain ? "bg-foreground-secondary" : ""}
              >
                {chain === "all" ? "All Chains" : chain.charAt(0).toUpperCase() + chain.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </MenuPopover>
      </MenuTrigger>

      {hasActiveFilters && (
        <Button
          variant="link-secondary"
          size="sm"
          onClick={() => {
            onSearchChange("");
            onStatusFilterChange("all");
            onMerchantFilterChange("all");
            onChainFilterChange("all");
          }}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
