"use client";

import { use } from "react";
import { ArrowLeft, ExternalLink, Copy, Check, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { StatusBadge } from "@/components/shared/status-badge";
import { TransactionError } from "@/components/transactions/transaction-error";
import { getTransactionById } from "@/lib/mock-data/transactions";
import { transactionSubstatusLabels } from "@/lib/types/transaction";

interface TransactionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  const { id } = use(params);
  const transaction = getTransactionById(id);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!transaction) {
    return (
      <div className="p-8">
        <div className="bg-[#252525] rounded-[20px] p-6 text-center">
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            Transaction not found
          </p>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 mt-4 text-[#0988f0] hover:text-[#0770c8] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Transactions
          </Link>
        </div>
      </div>
    );
  }

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="text-[#bbb] hover:text-white transition-colors"
      title="Copy"
    >
      {copiedField === field ? (
        <Check size={14} className="text-[#4ade80]" />
      ) : (
        <Copy size={14} />
      )}
    </button>
  );

  const timelineSteps = [
    {
      label: "Created",
      timestamp: transaction.createdAt,
      completed: true,
      icon: Clock,
    },
    {
      label: "Confirmed",
      timestamp: transaction.confirmedAt,
      completed: !!transaction.confirmedAt,
      icon: CheckCircle,
    },
    {
      label: "Settled",
      timestamp: transaction.settledAt,
      completed: !!transaction.settledAt,
      icon: CheckCircle,
    },
  ];

  const isFailed = transaction.status === "failed" || transaction.status === "expired";

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/transactions"
          className="text-[#bbb] hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] text-white tracking-[-0.24px]">
              Transaction Details
            </h1>
            <StatusBadge status={transaction.status} substatus={transaction.substatus} />
          </div>
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px] font-mono mt-1">
            {transaction.id}
          </p>
        </div>
      </div>

      {/* Error Panel (if failed) */}
      {isFailed && transaction.errorCode && (
        <div className="mb-6">
          <TransactionError
            errorCode={transaction.errorCode}
            errorMessage={transaction.errorMessage}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Amount Details */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Amount Details
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                  Crypto Amount
                </div>
                <div className="text-[20px] text-white tracking-[-0.20px]">
                  {transaction.amountCrypto} {transaction.token}
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  on {transaction.chain}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                  Fiat Amount
                </div>
                <div className="text-[20px] text-white tracking-[-0.20px]">
                  ${transaction.amountFiat.toLocaleString()} {transaction.fiatCurrency}
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Fee: ${transaction.feeAmount} • Net: ${transaction.netAmount}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Info */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Transaction Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">Session ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white tracking-[-0.14px] font-mono">
                    {transaction.sessionId}
                  </span>
                  <CopyButton text={transaction.sessionId} field="sessionId" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">Transaction Hash</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white tracking-[-0.14px] font-mono">
                    {transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-8)}
                  </span>
                  <CopyButton text={transaction.txHash} field="txHash" />
                  <a
                    href={`https://etherscan.io/tx/${transaction.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0988f0] hover:text-[#0770c8]"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">Customer Wallet</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white tracking-[-0.14px] font-mono">
                    {transaction.customerWallet}
                  </span>
                  <CopyButton text={transaction.customerWallet} field="customerWallet" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">Merchant Wallet</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white tracking-[-0.14px] font-mono">
                    {transaction.merchantWallet}
                  </span>
                  <CopyButton text={transaction.merchantWallet} field="merchantWallet" />
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">Merchant</span>
                <Link
                  href={`/merchants/${transaction.merchantId}`}
                  className="text-[14px] text-[#0988f0] hover:text-[#0770c8] tracking-[-0.14px]"
                >
                  {transaction.merchantName}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Timeline
            </h2>
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const Icon = step.completed ? step.icon : Clock;
                const isLast = index === timelineSteps.length - 1;

                return (
                  <div key={step.label} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-[#1a4d2e]"
                            : isFailed && !step.completed
                            ? "bg-[#4d1a1a]"
                            : "bg-[#363636]"
                        }`}
                      >
                        {isFailed && !step.completed ? (
                          <XCircle size={16} className="text-[#f87171]" />
                        ) : (
                          <Icon
                            size={16}
                            className={step.completed ? "text-[#4ade80]" : "text-[#bbb]"}
                          />
                        )}
                      </div>
                      {!isLast && (
                        <div
                          className={`w-0.5 h-8 ${
                            step.completed ? "bg-[#1a4d2e]" : "bg-[#363636]"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        {step.label}
                      </div>
                      {step.timestamp ? (
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                          {new Date(step.timestamp).toLocaleString()}
                        </div>
                      ) : (
                        <div className="text-[12px] text-[#666] tracking-[-0.12px]">
                          {isFailed ? "Not completed" : "Pending"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Current Status */}
              {transaction.substatus && (
                <div className="pt-4 border-t border-[#363636]">
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Current Status
                  </div>
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    {transactionSubstatusLabels[transaction.substatus]}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Actions
            </h2>
            <div className="space-y-2">
              <a
                href={`https://etherscan.io/tx/${transaction.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-3 bg-[#1a1a1a] hover:bg-[#363636] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                <ExternalLink size={16} />
                View on Explorer
              </a>
              <button
                onClick={() => handleCopy(transaction.txHash, "txHash-action")}
                className="flex items-center gap-2 w-full px-4 py-3 bg-[#1a1a1a] hover:bg-[#363636] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                {copiedField === "txHash-action" ? (
                  <>
                    <Check size={16} className="text-[#4ade80]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Transaction Hash
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
