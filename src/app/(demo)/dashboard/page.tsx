"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockMerchants } from "@/lib/mock-data/merchants";
import { mockTransactions } from "@/lib/mock-data/transactions";

export default function DashboardPage() {
  // Count unique customer wallets from transactions
  const uniqueCustomers = new Set(mockTransactions.map((tx) => tx.customerWallet)).size;
  const totalVolume = mockMerchants.reduce((sum, m) => sum + m.totalVolume, 0);
  const totalTransactions = mockTransactions.length;

  // Calculate success rate
  const succeededTransactions = mockTransactions.filter((t) => t.status === "succeeded").length;
  const successRate = totalTransactions > 0
    ? ((succeededTransactions / totalTransactions) * 100).toFixed(0)
    : "0";

  const recentTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topMerchants = [...mockMerchants]
    .filter((m) => m.status === "active")
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="flex gap-4">
        <StatCard
          label="Total revenue"
          value={`$${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        />
        <StatCard
          label="Total payments"
          value={totalTransactions.toLocaleString()}
        />
        <StatCard
          label="Total customers"
          value={uniqueCustomers}
        />
        <StatCard
          label="Payment success rate"
          value={`${successRate}%`}
        />
      </div>

      {/* Top Merchants */}
      <div className="rounded-2xl border border-[#222] bg-[#111]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
          <h2 className="text-[15px] text-white font-medium tracking-[-0.01em]">
            Top Merchants by Volume
          </h2>
        </div>
        <div className="divide-y divide-[#1a1a1a]">
          {topMerchants.map((merchant) => (
            <Link
              key={merchant.id}
              href={`/merchants/${merchant.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex-1">
                <div className="text-[13px] text-white tracking-[-0.01em]">
                  {merchant.companyName}
                </div>
                <div className="text-[12px] text-[#666] tracking-[-0.01em] mt-0.5">
                  {merchant.transactionCount.toLocaleString()} transactions
                </div>
              </div>
              <div className="text-right mr-4">
                <div className="text-[14px] text-white tracking-[-0.01em]">
                  ${merchant.totalVolume.toLocaleString()}
                </div>
                <div className="text-[12px] text-[#666] tracking-[-0.01em]">
                  {merchant.settlementCurrency}
                </div>
              </div>
              <StatusBadge status={merchant.status} />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-2xl border border-[#222] bg-[#111]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222]">
          <h2 className="text-[15px] text-white font-medium tracking-[-0.01em]">
            Recent Transactions
          </h2>
          <Link
            href="/transactions"
            className="flex items-center gap-1.5 text-[#3b82f6] hover:text-[#60a5fa] transition-colors text-[13px]"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-[#1a1a1a]">
          {recentTransactions.map((tx) => (
            <Link
              key={tx.id}
              href={`/transactions/${tx.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex-1">
                <div className="text-[13px] text-white tracking-[-0.01em]">
                  {tx.merchantName}
                </div>
                <div className="text-[12px] text-[#666] tracking-[-0.01em] mt-0.5">
                  {new Date(tx.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[13px] text-white tracking-[-0.01em]">
                    {tx.amountCrypto} {tx.token}
                  </div>
                  <div className="text-[12px] text-[#666] tracking-[-0.01em]">
                    ${tx.amountFiat.toLocaleString()}
                  </div>
                </div>
                <div className="w-[100px] flex justify-end">
                  <StatusBadge status={tx.status} substatus={tx.substatus} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Volume Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
          <h3 className="text-[15px] text-white font-medium tracking-[-0.01em] mb-4">
            Volume by Chain
          </h3>
          <div className="space-y-4">
            {[
              { chain: "Base", volume: 45200, percentage: 45, color: "#3b82f6" },
              { chain: "Polygon", volume: 32800, percentage: 32, color: "#8b5cf6" },
              { chain: "Ethereum", volume: 18500, percentage: 18, color: "#6366f1" },
              { chain: "Solana", volume: 5000, percentage: 5, color: "#14f195" },
            ].map((item) => (
              <div key={item.chain}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[13px] text-[#888] tracking-[-0.01em]">
                    {item.chain}
                  </span>
                  <span className="text-[13px] text-white tracking-[-0.01em]">
                    ${item.volume.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#222] bg-[#111] p-6">
          <h3 className="text-[15px] text-white font-medium tracking-[-0.01em] mb-4">
            Volume by Token
          </h3>
          <div className="space-y-4">
            {[
              { token: "USDC", volume: 89500, percentage: 75, color: "#2775ca" },
              { token: "USDT", volume: 18200, percentage: 15, color: "#26a17b" },
              { token: "SOL", volume: 7800, percentage: 7, color: "#14f195" },
              { token: "ETH", volume: 3500, percentage: 3, color: "#627eea" },
            ].map((item) => (
              <div key={item.token}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[13px] text-[#888] tracking-[-0.01em]">
                    {item.token}
                  </span>
                  <span className="text-[13px] text-white tracking-[-0.01em]">
                    ${item.volume.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
