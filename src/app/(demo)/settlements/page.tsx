"use client";

import { useMemo, useState } from "react";
import { Download, FileText, X } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { AccessDenied } from "@/components/shared/access-denied";
import { useRole } from "@/lib/hooks/use-role";
import { mockSettlements, getSettlementSummary } from "@/lib/mock-data/settlements";

export default function SettlementsPage() {
  const { hasPermission } = useRole();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [showReportPreview, setShowReportPreview] = useState(false);

  if (!hasPermission("settlements.view")) {
    return (
      <div className="p-8">
        <AccessDenied feature="settlements" />
      </div>
    );
  }

  const summary = getSettlementSummary();

  const volumeByMerchant = useMemo(() => {
    return [...mockSettlements]
      .sort((a, b) => b.totalVolume - a.totalVolume)
      .slice(0, 5);
  }, []);

  const transactionsByMerchant = useMemo(() => {
    return [...mockSettlements]
      .sort((a, b) => b.transactionCount - a.transactionCount)
      .slice(0, 5);
  }, []);

  const totalVolume = mockSettlements.reduce((sum, s) => sum + s.totalVolume, 0);
  const totalTransactions = mockSettlements.reduce((sum, s) => sum + s.transactionCount, 0);

  return (
    <div className="p-8">
      {/* Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-[#252525] border border-[#4f4f4f] rounded-lg p-1">
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-[14px] tracking-[-0.14px] transition-colors capitalize ${
                period === p
                  ? "bg-[#0988f0] text-white"
                  : "text-[#bbb] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {hasPermission("settlements.generateReport") && (
          <button
            onClick={() => setShowReportPreview(true)}
            className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <FileText size={20} />
            Generate Report
          </button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="flex gap-4 mb-8">
        <StatCard
          label="Gross Volume"
          value={`$${summary.totalVolume.toLocaleString()}`}
          subtitle="Jan 1 - Jan 21, 2026"
        />
        <StatCard
          label="Total Fees"
          value={`$${summary.totalFees.toLocaleString()}`}
          subtitle="0.3% average fee"
        />
        <StatCard
          label="Net Settlement"
          value={`$${summary.totalNet.toLocaleString()}`}
          subtitle={`${summary.transactionCount} transactions`}
        />
      </div>

      {/* Volume Breakdown by Merchant */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Merchant
          </h3>
          <div className="space-y-3">
            {volumeByMerchant.map((settlement) => {
              const percentage = (settlement.totalVolume / totalVolume) * 100;
              return (
                <div key={settlement.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {settlement.merchantName}
                    </span>
                    <span className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.totalVolume.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div
                      className="bg-[#0988f0] h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="text-[16px] text-white tracking-[-0.16px] mb-4">
            Transaction Count by Merchant
          </h3>
          <div className="space-y-3">
            {transactionsByMerchant.map((settlement) => {
              const percentage = (settlement.transactionCount / totalTransactions) * 100;
              return (
                <div key={settlement.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {settlement.merchantName}
                    </span>
                    <span className="text-[14px] text-white tracking-[-0.14px]">
                      {settlement.transactionCount}
                    </span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div
                      className="bg-[#4ade80] h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#4f4f4f]">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Settlement Details
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Merchant
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Period
                </th>
                <th className="text-right px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Gross Volume
                </th>
                <th className="text-right px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Fees
                </th>
                <th className="text-right px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Net Settlement
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Transactions
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockSettlements.map((settlement) => (
                <tr
                  key={settlement.id}
                  className="border-b border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      {settlement.merchantName}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.merchantId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {new Date(settlement.period.start).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(settlement.period.end).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.totalVolume.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      ${settlement.totalFees.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.netAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      {settlement.transactionCount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={settlement.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#252525] rounded-[20px] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[24px] text-white tracking-[-0.24px]">
                Settlement Report Preview
              </h2>
              <button
                onClick={() => setShowReportPreview(false)}
                className="text-[#bbb] hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Report Period
                  </div>
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    January 1, 2026 - January 21, 2026
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Generated On
                  </div>
                  <div className="text-[14px] text-white tracking-[-0.14px]">
                    {new Date().toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#363636]">
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Total Merchants
                  </div>
                  <div className="text-[20px] text-white tracking-[-0.20px]">
                    {mockSettlements.length}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Gross Volume
                  </div>
                  <div className="text-[20px] text-white tracking-[-0.20px]">
                    ${summary.totalVolume.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Total Fees
                  </div>
                  <div className="text-[20px] text-white tracking-[-0.20px]">
                    ${summary.totalFees.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Net Settlement
                  </div>
                  <div className="text-[20px] text-white tracking-[-0.20px]">
                    ${summary.totalNet.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {mockSettlements.map((settlement) => (
                <div
                  key={settlement.id}
                  className="bg-[#1a1a1a] rounded-lg p-4 grid grid-cols-6 gap-4"
                >
                  <div className="col-span-2">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      {settlement.merchantName}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.transactionCount} transactions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Gross
                    </div>
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.totalVolume.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Fees
                    </div>
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.totalFees.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Net
                    </div>
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${settlement.netAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <StatusBadge status={settlement.status} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReportPreview(false)}
                className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                Close
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
                <Download size={20} />
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
