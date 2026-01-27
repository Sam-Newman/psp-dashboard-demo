"use client";

import { use } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowSquareOut,
  CheckCircle,
  Clock,
  Copy,
  XCircle,
} from "@phosphor-icons/react";

import { Badge } from "@pay-merchant/ui/ui/badge";
import { Button } from "@pay-merchant/ui/ui/button";
import { Card } from "@pay-merchant/ui/ui/card";
import { Separator } from "@pay-merchant/ui/ui/separator";
import { toast } from "@pay-merchant/ui/ui/toast";

import { TransactionStatusBadge } from "@/components/transactions/transaction-status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { getTransactionById } from "@/lib/mock-data/transactions";
import { transactionSubstatusLabels } from "@/lib/types/transaction";
import { getChainName } from "@/lib/constants/chains";
import { formatCurrency, formatDateTime, truncateTxHash } from "@/lib/utils/format";

export default function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const transaction = getTransactionById(id);

  if (!transaction) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader title="Transaction Not Found" />
        <Card className="p-6">
          <p className="text-secondary">The requested transaction could not be found.</p>
          <Link href="/transactions">
            <Button variant="neutral" className="mt-4">
              Back to Transactions
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const timelineEvents = [
    {
      label: "Created",
      time: transaction.createdAt,
      completed: true,
      icon: Clock,
    },
    {
      label: "Confirmed",
      time: transaction.confirmedAt,
      completed: !!transaction.confirmedAt,
      icon: transaction.confirmedAt ? CheckCircle : Clock,
    },
    {
      label: "Settled",
      time: transaction.settledAt,
      completed: !!transaction.settledAt,
      icon: transaction.settledAt ? CheckCircle : Clock,
    },
  ];

  if (transaction.status === "failed" || transaction.status === "expired") {
    timelineEvents.push({
      label: transaction.status === "failed" ? "Failed" : "Expired",
      time: transaction.updatedAt,
      completed: true,
      icon: XCircle,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold font-mono">{transaction.id}</h1>
            <TransactionStatusBadge status={transaction.status} />
          </div>
          {transaction.substatus && (
            <p className="text-secondary">
              {transactionSubstatusLabels[transaction.substatus]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <h2 className="font-semibold mb-4">Transaction Details</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-secondary">Gross Amount</p>
              <p className="text-2xl font-semibold">{formatCurrency(transaction.amountFiat)}</p>
              <p className="text-sm text-secondary">
                {transaction.amountCrypto} {transaction.token}
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary">Net Amount</p>
              <p className="text-2xl font-semibold">{formatCurrency(transaction.netAmount)}</p>
              <p className="text-sm text-secondary">
                Fee: {formatCurrency(transaction.feeAmount)}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-secondary mb-1">Merchant</p>
              <Link href={`/merchants/${transaction.merchantId}`} className="font-medium text-accent hover:underline">
                {transaction.merchantName}
              </Link>
            </div>
            <div>
              <p className="text-sm text-secondary mb-1">Chain / Token</p>
              <div className="flex items-center gap-2">
                <Badge variant="info">{getChainName(transaction.chain)}</Badge>
                <Badge variant="accent">{transaction.token}</Badge>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold mb-4">Blockchain Details</h3>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-secondary mb-1">Transaction Hash</p>
              <div className="flex items-center gap-2">
                <code className="rounded-3 bg-foreground-secondary px-2 py-1 text-sm">
                  {truncateTxHash(transaction.txHash)}
                </code>
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => copyToClipboard(transaction.txHash, "Transaction hash")}
                >
                  <Copy className="size-4" />
                </Button>
                <a
                  href={`https://etherscan.io/tx/${transaction.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="icon" size="sm">
                    <ArrowSquareOut className="size-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-secondary mb-1">From (Customer)</p>
                <div className="flex items-center gap-2">
                  <code className="rounded-3 bg-foreground-secondary px-2 py-1 text-sm">
                    {transaction.customerWallet}
                  </code>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.customerWallet, "Customer wallet")}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">To (Merchant)</p>
                <div className="flex items-center gap-2">
                  <code className="rounded-3 bg-foreground-secondary px-2 py-1 text-sm">
                    {transaction.merchantWallet}
                  </code>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => copyToClipboard(transaction.merchantWallet, "Merchant wallet")}
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Timeline</h2>
          <div className="flex flex-col gap-4">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLast = index === timelineEvents.length - 1;
              const isFailed = event.label === "Failed" || event.label === "Expired";

              return (
                <div key={event.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex size-8 items-center justify-center rounded-full ${
                        event.completed
                          ? isFailed
                            ? "bg-error/10 text-error"
                            : "bg-success/10 text-success"
                          : "bg-foreground-secondary text-secondary"
                      }`}
                    >
                      <Icon className="size-4" weight="fill" />
                    </div>
                    {!isLast && (
                      <div
                        className={`h-8 w-0.5 ${
                          event.completed ? "bg-success" : "bg-border-primary"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium">{event.label}</p>
                    {event.time ? (
                      <p className="text-sm text-secondary">{formatDateTime(event.time)}</p>
                    ) : (
                      <p className="text-sm text-tertiary">Pending</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
