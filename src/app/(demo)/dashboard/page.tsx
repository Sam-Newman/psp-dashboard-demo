"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { mockMerchants } from "@/lib/mock-data/merchants";
import { mockTransactions } from "@/lib/mock-data/transactions";

export default function DashboardPage() {
  const activeMerchants = mockMerchants.filter((m) => m.status === "active");
  const pendingKYC = mockMerchants.filter((m) => m.status === "pending_kyc").length;
  const totalVolume = mockMerchants.reduce((sum, m) => sum + m.totalVolume, 0);
  const totalTransactions = mockTransactions.length;

  const recentTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topMerchants = [...mockMerchants]
    .filter((m) => m.status === "active")
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 5);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="flex gap-4">
        <StatCard
          label="Total Volume"
          value={`$${totalVolume.toLocaleString()}`}
          subtitle="Last 30 days"
        />
        <StatCard
          label="Active Merchants"
          value={activeMerchants.length}
          subtitle={`${pendingKYC} pending KYC`}
        />
        <StatCard
          label="Total Transactions"
          value={totalTransactions}
          subtitle="Across all merchants"
        />
      </div>

      {/* Top Merchants */}
      <div className="bg-[#252525] rounded-[20px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Top Merchants by Volume
          </h2>
        </div>
        <div className="space-y-4">
          {topMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#303030] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  {merchant.companyName}
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                  {merchant.transactionCount} transactions
                </div>
              </div>
              <div className="text-right mr-4">
                <div className="text-[16px] text-white tracking-[-0.16px]">
                  ${merchant.totalVolume.toLocaleString()}
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  {merchant.settlementCurrency}
                </div>
              </div>
              <StatusBadge status={merchant.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#252525] rounded-[20px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Recent Transactions
          </h2>
          <Link
            href="/transactions"
            className="flex items-center gap-2 text-[#0988f0] hover:text-[#0770c8] transition-colors"
          >
            <span className="text-[14px] tracking-[-0.14px]">View all</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#303030] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  {tx.merchantName}
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                  {new Date(tx.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    {tx.amountCrypto} {tx.token}
                  </div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                    ${tx.amountFiat} {tx.fiatCurrency}
                  </div>
                </div>
                <div className="w-[100px]">
                  <StatusBadge status={tx.status} substatus={tx.substatus} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Chain
          </h3>
          <div className="space-y-3">
            {[
              { chain: "Base", volume: 45200, percentage: 45 },
              { chain: "Polygon", volume: 32800, percentage: 32 },
              { chain: "Ethereum", volume: 18500, percentage: 18 },
              { chain: "Solana", volume: 5000, percentage: 5 },
            ].map((item) => (
              <div key={item.chain}>
                <div className="flex justify-between mb-1">
                  <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                    {item.chain}
                  </span>
                  <span className="text-[14px] text-white tracking-[-0.14px]">
                    ${item.volume.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                  <div
                    className="bg-[#0988f0] h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Token
          </h3>
          <div className="space-y-3">
            {[
              { token: "USDC", volume: 89500, percentage: 75 },
              { token: "USDT", volume: 18200, percentage: 15 },
              { token: "SOL", volume: 7800, percentage: 7 },
              { token: "ETH", volume: 3500, percentage: 3 },
            ].map((item) => (
              <div key={item.token}>
                <div className="flex justify-between mb-1">
                  <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                    {item.token}
                  </span>
                  <span className="text-[14px] text-white tracking-[-0.14px]">
                    ${item.volume.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                  <div
                    className="bg-[#0988f0] h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
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
