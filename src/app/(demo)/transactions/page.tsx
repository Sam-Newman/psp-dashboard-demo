"use client";

import { useMemo, useState } from "react";
import { Download, SlidersHorizontal, X, Search, Calendar, Coins, DollarSign, Wallet, Globe, Hash, Tag, Settings2 } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { useRole } from "@/lib/hooks/use-role";
import { mockTransactions, searchTransactions } from "@/lib/mock-data/transactions";
import { mockMerchants } from "@/lib/mock-data/merchants";

// Token icons/colors
const tokenColors: Record<string, string> = {
  USDC: "#2775ca",
  USDT: "#26a17b",
  ETH: "#627eea",
  SOL: "#14f195",
};

// Chain icons/colors
const chainColors: Record<string, string> = {
  ethereum: "#627eea",
  polygon: "#8247e5",
  base: "#0052ff",
  solana: "#14f195",
  avalanche: "#e84142",
};

type TabType = "payments" | "payouts";

function TabButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
        active
          ? "bg-[#1a1a1a] text-white"
          : "text-[#888] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function TransactionsPage() {
  const { hasPermission } = useRole();
  const [activeTab, setActiveTab] = useState<TabType>("payments");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const [selectedToken, setSelectedToken] = useState<string>("all");

  const filteredTransactions = useMemo(() => {
    const results = searchQuery ? searchTransactions(searchQuery) : mockTransactions;

    return results.filter((tx) => {
      if (selectedMerchant !== "all" && tx.merchantId !== selectedMerchant) return false;
      if (selectedStatus !== "all" && tx.status !== selectedStatus) return false;
      if (selectedChain !== "all" && tx.chain !== selectedChain) return false;
      if (selectedToken !== "all" && tx.token !== selectedToken) return false;
      return true;
    });
  }, [searchQuery, selectedMerchant, selectedStatus, selectedChain, selectedToken]);

  const hasActiveFilters =
    selectedMerchant !== "all" || selectedStatus !== "all" || selectedChain !== "all" || selectedToken !== "all";

  const clearFilters = () => {
    setSelectedMerchant("all");
    setSelectedStatus("all");
    setSelectedChain("all");
    setSelectedToken("all");
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 p-1 bg-[#111] border border-[#222] rounded-xl w-fit">
        <TabButton active={activeTab === "payments"} onClick={() => setActiveTab("payments")}>
          Payments
        </TabButton>
        <TabButton active={activeTab === "payouts"} onClick={() => setActiveTab("payouts")}>
          Payouts
        </TabButton>
      </div>

      {activeTab === "payments" ? (
        <>
          {/* Search Bar */}
          <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by session ID, wallet, or amount..."
            className="w-full bg-[#111] border border-[#222] rounded-xl pl-10 pr-4 py-2.5 text-white text-[13px] focus:outline-none focus:border-[#333] placeholder:text-[#555]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] transition-colors ${
              showFilters || hasActiveFilters
                ? "bg-white text-black"
                : "bg-[#111] border border-[#222] text-[#888] hover:text-white"
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && (
              <span className={`rounded-full w-5 h-5 flex items-center justify-center text-[11px] ${
                showFilters ? "bg-black text-white" : "bg-white text-black"
              }`}>
                {[selectedMerchant, selectedStatus, selectedChain, selectedToken].filter((f) => f !== "all").length}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-[#111] border border-[#222] text-[#888] hover:text-white rounded-xl transition-colors text-[13px]"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
        {hasPermission("transactions.export") && (
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl transition-colors text-[13px] font-medium hover:bg-[#eee]">
            <Download size={16} />
            Export CSV
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="rounded-2xl border border-[#222] bg-[#111] p-4 mb-4">
          <div className="grid grid-cols-5 gap-3">
            <div>
              <label className="block text-[12px] text-[#666] mb-1.5">Merchant</label>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#333]"
              >
                <option value="all">All Merchants</option>
                {mockMerchants.map((m) => (
                  <option key={m.id} value={m.id}>{m.companyName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-[#666] mb-1.5">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#333]"
              >
                <option value="all">All Statuses</option>
                <option value="succeeded">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-[#666] mb-1.5">Chain</label>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#333]"
              >
                <option value="all">All Chains</option>
                <option value="base">Base</option>
                <option value="polygon">Polygon</option>
                <option value="ethereum">Ethereum</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-[#666] mb-1.5">Token</label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#333]"
              >
                <option value="all">All Tokens</option>
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] text-[#666] mb-1.5">Date Range</label>
              <select className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#333]">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="rounded-2xl border border-[#222] bg-[#111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222]">
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Calendar size={14} />
                    Date
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Coins size={14} />
                    Crypto received
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <DollarSign size={14} />
                    Amount
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Wallet size={14} />
                    Wallet
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Globe size={14} />
                    Network
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Hash size={14} />
                    Payment ID
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Hash size={14} />
                    Hash ID
                  </div>
                </th>
                <th className="text-left px-4 py-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#666] font-normal">
                    <Tag size={14} />
                    Status
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <div className="text-[13px] text-white">
                        {new Date(tx.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit",
                        })} - {new Date(tx.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ backgroundColor: tokenColors[tx.token] || "#666" }}
                        >
                          {tx.token.charAt(0)}
                        </div>
                        <span className="text-[13px] text-white">
                          {tx.amountCrypto} {tx.token}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <span className="text-[13px] text-white">
                        ${tx.amountFiat.toLocaleString()}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#f97316] flex items-center justify-center">
                          <span className="text-[9px] font-bold text-white">M</span>
                        </div>
                        <span className="text-[13px] text-white">MetaMask</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: chainColors[tx.chain] || "#666" }}
                        />
                        <span className="text-[13px] text-white capitalize">{tx.chain}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <span className="text-[13px] text-[#888]">
                        {tx.id.replace("tx_", "")}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <span className="text-[13px] text-[#3b82f6] underline">
                        {tx.txHash.slice(0, 6)}...{tx.txHash.slice(-4)}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/transactions/${tx.id}`} className="block">
                      <StatusBadge status={tx.status} substatus={tx.substatus} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#222] px-4 py-3 flex items-center justify-between">
          <div className="text-[12px] text-[#666]">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 bg-[#0d0d0d] border border-[#222] text-[#888] hover:text-white rounded-lg transition-colors text-[12px]">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white text-black rounded-lg text-[12px] font-medium">
              1
            </button>
            <button className="px-3 py-1.5 bg-[#0d0d0d] border border-[#222] text-[#888] hover:text-white rounded-lg transition-colors text-[12px]">
              2
            </button>
            <button className="px-3 py-1.5 bg-[#0d0d0d] border border-[#222] text-[#888] hover:text-white rounded-lg transition-colors text-[12px]">
              Next
            </button>
          </div>
        </div>
      </div>
        </>
      ) : (
        /* Payouts Tab Content */
        <div className="rounded-2xl border border-[#222] bg-[#111] p-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings2 className="w-6 h-6 text-[#666]" />
            </div>
            <h3 className="text-white text-[15px] font-medium mb-2">Payouts Coming Soon</h3>
            <p className="text-[#666] text-[13px] max-w-sm mx-auto">
              Settlement payouts and disbursements will be available here once configured.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
