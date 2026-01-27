"use client";

import { use } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Bank,
  Envelope,
  PencilSimple,
  Phone,
  Prohibit,
} from "@phosphor-icons/react";

import { Badge } from "@pay-merchant/ui/ui/badge";
import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";
import { Tabs, Tab, TabList, TabPanel } from "@pay-merchant/ui/ui/tabs";
import { toast } from "@pay-merchant/ui/ui/toast";

import { MerchantStatusBadge } from "@/components/merchants/merchant-status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { useRole } from "@/lib/hooks/use-role";
import { getMerchantById } from "@/lib/mock-data/merchants";
import { getTransactionsByMerchant } from "@/lib/mock-data/transactions";
import { getChainName } from "@/lib/constants/chains";
import {
  transactionStatusColors,
  transactionStatusLabels,
} from "@/lib/types/transaction";
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils/format";

export default function MerchantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { hasPermission } = useRole();

  const merchant = getMerchantById(id);
  const transactions = getTransactionsByMerchant(id).slice(0, 10);

  if (!merchant) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Merchant Not Found" />
        <Card className="p-6">
          <p className="text-secondary">The requested merchant could not be found.</p>
          <Link href="/merchants">
            <Button variant="neutral" className="mt-4">
              Back to Merchants
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSuspend = () => {
    toast.success("Merchant suspended", {
      description: `${merchant.companyName} has been suspended.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{merchant.companyName}</h1>
            <MerchantStatusBadge status={merchant.status} />
          </div>
          <p className="text-secondary">{merchant.legalEntity}</p>
        </div>
        {hasPermission("merchants.edit") && (
          <div className="flex items-center gap-2">
            <Link href={`/merchants/${id}/edit`}>
              <Button variant="neutral-secondary">
                <PencilSimple className="size-4" />
                Edit
              </Button>
            </Link>
            {merchant.status === "active" && hasPermission("merchants.suspend") && (
              <Button variant="error" onClick={handleSuspend}>
                <Prohibit className="size-4" />
                Suspend
              </Button>
            )}
          </div>
        )}
      </div>

      <Tabs>
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="transactions">Transactions</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>

        <TabPanel id="overview" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-5">
              <p className="text-sm text-secondary">Total Volume</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCurrency(merchant.totalVolume, merchant.settlementCurrency)}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-secondary">Transactions</p>
              <p className="mt-1 text-2xl font-semibold">
                {merchant.transactionCount.toLocaleString()}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-secondary">Created</p>
              <p className="mt-1 text-2xl font-semibold">{formatDate(merchant.createdAt)}</p>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Envelope className="size-4 text-secondary" />
                  <span>{merchant.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 text-secondary" />
                  <span>{merchant.contactPhone}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Settlement Details</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Bank className="size-4 text-secondary" />
                  <span>{merchant.bankAccount.bankName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Currency</span>
                  <span className="font-medium">{merchant.settlementCurrency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Frequency</span>
                  <span className="font-medium capitalize">{merchant.settlementFrequency}</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <h3 className="font-semibold mb-4">Supported Networks</h3>
            <div className="flex flex-wrap gap-2">
              {merchant.supportedChains.map((chain) => (
                <Badge key={chain} variant="info">
                  {getChainName(chain)}
                </Badge>
              ))}
              {merchant.supportedTokens.map((token) => (
                <Badge key={token} variant="accent">
                  {token}
                </Badge>
              ))}
            </div>
          </Card>
        </TabPanel>

        <TabPanel id="transactions" className="mt-6">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary bg-foreground-secondary">
                    <th className="px-4 py-3 text-left text-sm font-medium text-secondary">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-secondary">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-secondary">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-secondary">Chain</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-foreground-secondary/50">
                      <td className="px-4 py-3 font-mono text-sm">{tx.id}</td>
                      <td className="px-4 py-3">
                        <Badge variant={transactionStatusColors[tx.status]} className="text-xs px-1.5 py-1">
                          {transactionStatusLabels[tx.status]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(tx.amountFiat, tx.fiatCurrency)}</td>
                      <td className="px-4 py-3 capitalize">{tx.chain}</td>
                      <td className="px-4 py-3 text-secondary">{formatRelativeTime(tx.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabPanel>

        <TabPanel id="settings" className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Bank Account</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary">Account Name</p>
                <p className="font-medium">{merchant.bankAccount.accountName}</p>
              </div>
              <div>
                <p className="text-sm text-secondary">Bank Name</p>
                <p className="font-medium">{merchant.bankAccount.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-secondary">Account Number</p>
                <p className="font-medium font-mono">{merchant.bankAccount.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-secondary">Routing Number</p>
                <p className="font-medium font-mono">{merchant.bankAccount.routingNumber}</p>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-6">
            <h3 className="font-semibold mb-4">API Credentials</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-secondary">Merchant ID</p>
                <p className="font-medium font-mono">{merchant.id}</p>
              </div>
              <div>
                <p className="text-sm text-secondary">API Key</p>
                <p className="font-medium font-mono">sk_live_••••••••••••••••</p>
              </div>
              {hasPermission("merchants.edit") && (
                <Button
                  variant="neutral-secondary"
                  size="sm"
                  className="w-fit"
                  onClick={() => toast.success("API key regenerated")}
                >
                  Regenerate API Key
                </Button>
              )}
            </div>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  );
}
