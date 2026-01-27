"use client";

import Link from "next/link";

import { ArrowDown, ArrowUp, Eye } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";

import { TransactionStatusBadge } from "./transaction-status-badge";
import type { Transaction } from "@/lib/types/transaction";
import { formatCurrency, formatRelativeTime, truncateTxHash } from "@/lib/utils/format";

type SortField = "createdAt" | "amountFiat" | "status";
type SortDirection = "asc" | "desc";

interface TransactionTableProps {
  transactions: Transaction[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function TransactionTable({
  transactions,
  sortField,
  sortDirection,
  onSort,
}: TransactionTableProps) {
  const SortIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;

  const renderSortHeader = (label: string, field: SortField) => (
    <button
      className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary"
      onClick={() => onSort(field)}
    >
      {label}
      {sortField === field && <SortIcon className="size-3" />}
    </button>
  );

  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary bg-foreground-secondary">
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-secondary">Transaction</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-secondary">Merchant</span>
              </th>
              <th className="px-4 py-3 text-left">{renderSortHeader("Status", "status")}</th>
              <th className="px-4 py-3 text-left">{renderSortHeader("Amount", "amountFiat")}</th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-secondary">Chain</span>
              </th>
              <th className="px-4 py-3 text-left">{renderSortHeader("Date", "createdAt")}</th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-secondary">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-foreground-secondary/50">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{tx.id}</span>
                    <span className="font-mono text-xs text-secondary">{truncateTxHash(tx.txHash)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">{tx.merchantName}</span>
                </td>
                <td className="px-4 py-3">
                  <TransactionStatusBadge status={tx.status} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{formatCurrency(tx.amountFiat)}</span>
                    <span className="text-xs text-secondary">
                      {tx.amountCrypto} {tx.token}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="capitalize text-sm">{tx.chain}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-secondary">{formatRelativeTime(tx.createdAt)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/transactions/${tx.id}`}>
                    <Button variant="icon" size="sm">
                      <Eye className="size-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
