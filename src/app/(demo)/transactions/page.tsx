"use client";

import { useMemo, useState } from "react";
import { Download, Filter, X } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { useRole } from "@/lib/hooks/use-role";
import { mockTransactions } from "@/lib/mock-data/transactions";
import { mockMerchants } from "@/lib/mock-data/merchants";

export default function TransactionsPage() {
  const { hasPermission } = useRole();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedChain, setSelectedChain] = useState<string>("all");

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      if (selectedMerchant !== "all" && tx.merchantId !== selectedMerchant) return false;
      if (selectedStatus !== "all" && tx.status !== selectedStatus) return false;
      if (selectedChain !== "all" && tx.chain !== selectedChain) return false;
      return true;
    });
  }, [selectedMerchant, selectedStatus, selectedChain]);

  const hasActiveFilters =
    selectedMerchant !== "all" || selectedStatus !== "all" || selectedChain !== "all";

  const clearFilters = () => {
    setSelectedMerchant("all");
    setSelectedStatus("all");
    setSelectedChain("all");
  };

  return (
    <div className="p-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px] ${
              showFilters || hasActiveFilters
                ? "bg-[#0988f0] text-white"
                : "bg-[#252525] border border-[#4f4f4f] text-[#bbb] hover:text-white"
            }`}
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-[#0988f0] rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
                {
                  [selectedMerchant, selectedStatus, selectedChain].filter(
                    (f) => f !== "all"
                  ).length
                }
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>
        {hasPermission("transactions.export") && (
          <button className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
            <Download size={20} />
            Export CSV
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-[#252525] rounded-[20px] p-6 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Merchant
              </label>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Merchants</option>
                {mockMerchants.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Statuses</option>
                <option value="succeeded">Succeeded</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
                <option value="requires_action">Requires Action</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Chain
              </label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Chains</option>
                <option value="base">Base</option>
                <option value="polygon">Polygon</option>
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Date Range
              </label>
              <select className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Date
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Merchant
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Crypto Received
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Amount
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Wallet
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Network
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Hash ID
                </th>
                <th className="text-left px-4 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      })}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {new Date(tx.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      {tx.merchantName}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#4f4f4f] rounded-full flex items-center justify-center">
                        <span className="text-[8px] text-white">
                          {tx.token.substring(0, 2)}
                        </span>
                      </div>
                      <span className="text-[14px] text-white tracking-[-0.14px]">
                        {tx.amountCrypto} {tx.token}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${tx.amountFiat}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {tx.fiatCurrency}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {tx.customerWallet}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-[#363636] px-2 py-1 rounded text-[12px] text-[#bbb] tracking-[-0.12px] capitalize">
                      {tx.chain}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[14px] text-[#bbb] tracking-[-0.14px] underline cursor-pointer hover:text-white">
                      {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={tx.status} substatus={tx.substatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#4f4f4f] px-6 py-4 flex items-center justify-between">
          <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#0988f0] text-white rounded-lg text-[14px] tracking-[-0.14px]">
              1
            </button>
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
              2
            </button>
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
