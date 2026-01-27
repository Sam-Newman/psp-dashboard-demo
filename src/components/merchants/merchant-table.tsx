"use client";

import Link from "next/link";

import { Eye } from "@phosphor-icons/react";

import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";

import { MerchantStatusBadge } from "./merchant-status-badge";
import type { Merchant } from "@/lib/types/merchant";
import { formatCurrency, formatDate } from "@/lib/utils/format";

interface MerchantTableProps {
  merchants: Merchant[];
}

export function MerchantTable({ merchants }: MerchantTableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary bg-foreground-secondary">
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
                Company
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
                Volume
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
                Transactions
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
                Created
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary">
            {merchants.map((merchant) => (
              <tr key={merchant.id} className="hover:bg-foreground-secondary/50">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{merchant.companyName}</span>
                    <span className="text-sm text-secondary">{merchant.contactEmail}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <MerchantStatusBadge status={merchant.status} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium">
                    {formatCurrency(merchant.totalVolume, merchant.settlementCurrency)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span>{merchant.transactionCount.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-secondary">{formatDate(merchant.createdAt)}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/merchants/${merchant.id}`}>
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
