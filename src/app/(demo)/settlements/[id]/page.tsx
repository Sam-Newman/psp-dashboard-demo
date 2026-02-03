"use client";

import { use } from "react";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { AccessDenied } from "@/components/shared/access-denied";
import { useRole } from "@/lib/hooks/use-role";
import { getSettlementById } from "@/lib/mock-data/settlements";

interface SettlementDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SettlementDetailPage({ params }: SettlementDetailPageProps) {
  const { id } = use(params);
  const { hasPermission } = useRole();
  const settlement = getSettlementById(id);

  if (!hasPermission("settlements.viewDetails")) {
    return (
      <div className="p-8">
        <AccessDenied feature="settlement details" />
      </div>
    );
  }

  if (!settlement) {
    return (
      <div className="p-8">
        <div className="bg-[#252525] rounded-[20px] p-6 text-center">
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            Settlement not found
          </p>
          <Link
            href="/settlements"
            className="inline-flex items-center gap-2 mt-4 text-[#0988f0] hover:text-[#0770c8] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Settlements
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/settlements"
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] text-white tracking-[-0.24px]">
                Settlement Details
              </h1>
              <StatusBadge status={settlement.status} />
            </div>
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px] font-mono mt-1">
              {settlement.id}
            </p>
          </div>
        </div>
        {hasPermission("settlements.generateReport") && (
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
            <Download size={16} />
            Download Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#252525] rounded-[20px] p-6">
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                Gross Volume
              </div>
              <div className="text-[24px] text-white tracking-[-0.24px]">
                ${settlement.totalVolume.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                {settlement.currency}
              </div>
            </div>
            <div className="bg-[#252525] rounded-[20px] p-6">
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                Total Fees
              </div>
              <div className="text-[24px] text-white tracking-[-0.24px]">
                ${settlement.totalFees.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                {((settlement.totalFees / settlement.totalVolume) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="bg-[#252525] rounded-[20px] p-6">
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                Net Settlement
              </div>
              <div className="text-[24px] text-[#4ade80] tracking-[-0.24px]">
                ${settlement.netAmount.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                {settlement.transactionCount} transactions
              </div>
            </div>
          </div>

          {/* Crypto In */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Crypto Received
            </h2>
            <div className="space-y-3">
              {settlement.cryptoIn.map((crypto, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#363636] rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">
                        {crypto.token.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        {crypto.amount.toLocaleString()} {crypto.token}
                      </div>
                      <div className="text-[12px] text-[#bbb] tracking-[-0.12px] capitalize">
                        {crypto.chain}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ~${crypto.amount.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      USD
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Fee Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Platform Fees
                </span>
                <span className="text-[14px] text-white tracking-[-0.14px]">
                  ${settlement.platformFees.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#363636]">
                <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Network Fees
                </span>
                <span className="text-[14px] text-white tracking-[-0.14px]">
                  ${settlement.networkFees.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[14px] text-white tracking-[-0.14px] font-medium">
                  Total Fees
                </span>
                <span className="text-[14px] text-white tracking-[-0.14px] font-medium">
                  ${settlement.totalFees.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Linked Transactions */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] text-white tracking-[-0.16px]">
                Linked Transactions
              </h2>
              <span className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                {settlement.linkedTransactionIds.length} transactions
              </span>
            </div>
            <div className="space-y-2">
              {settlement.linkedTransactionIds.slice(0, 5).map((txId) => (
                <Link
                  key={txId}
                  href={`/transactions/${txId}`}
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg hover:bg-[#363636] transition-colors"
                >
                  <span className="text-[14px] text-white tracking-[-0.14px] font-mono">
                    {txId}
                  </span>
                  <ExternalLink size={14} className="text-[#bbb]" />
                </Link>
              ))}
              {settlement.linkedTransactionIds.length > 5 && (
                <div className="text-center pt-2">
                  <span className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                    +{settlement.linkedTransactionIds.length - 5} more transactions
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Settlement Info */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Settlement Info
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                  Merchant
                </div>
                <Link
                  href={`/merchants/${settlement.merchantId}`}
                  className="text-[14px] text-[#0988f0] hover:text-[#0770c8] tracking-[-0.14px]"
                >
                  {settlement.merchantName}
                </Link>
              </div>
              <div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                  Period
                </div>
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  {new Date(settlement.period.start).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(settlement.period.end).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                  Created
                </div>
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  {formatDate(settlement.createdAt)}
                </div>
              </div>
              {settlement.completedAt && (
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Completed
                  </div>
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    {formatDate(settlement.completedAt)}
                  </div>
                </div>
              )}
              {settlement.exchangeRate && (
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Exchange Rate
                  </div>
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    1 USD = {settlement.exchangeRate} {settlement.currency}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chain Breakdown */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Volume by Chain
            </h2>
            <div className="space-y-3">
              {settlement.breakdown.map((item) => {
                const percentage = (item.volume / settlement.totalVolume) * 100;
                return (
                  <div key={item.chain}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[14px] text-[#bbb] tracking-[-0.14px] capitalize">
                        {item.chain}
                      </span>
                      <span className="text-[14px] text-white tracking-[-0.14px]">
                        ${item.volume.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                        <div
                          className="bg-[#0988f0] h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[12px] text-[#bbb] tracking-[-0.12px] w-12 text-right">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-[12px] text-[#666] tracking-[-0.12px] mt-1">
                      {item.count} transactions
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payout Info */}
          <div className="bg-[#252525] rounded-[20px] p-6">
            <h2 className="text-[16px] text-white tracking-[-0.16px] mb-4">
              Payout
            </h2>
            <div className="bg-[#1a4d2e] rounded-lg p-4 text-center">
              <div className="text-[12px] text-[#4ade80]/80 tracking-[-0.12px] mb-1">
                Fiat Payout
              </div>
              <div className="text-[24px] text-[#4ade80] tracking-[-0.24px]">
                ${settlement.fiatOut.toLocaleString()}
              </div>
              <div className="text-[12px] text-[#4ade80]/80 tracking-[-0.12px]">
                {settlement.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
