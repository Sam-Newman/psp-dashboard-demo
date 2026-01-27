"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Key, Power, MoreVertical } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { useRole } from "@/lib/hooks/use-role";
import { mockMerchants } from "@/lib/mock-data/merchants";

export default function MerchantsPage() {
  const { hasPermission } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMerchant, setShowAddMerchant] = useState(false);

  const filteredMerchants = useMemo(() => {
    return mockMerchants.filter(
      (merchant) =>
        merchant.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="p-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9a9a9a]" size={20} />
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#252525] border border-[#4f4f4f] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
          />
        </div>
        {hasPermission("merchants.create") && (
          <button
            onClick={() => setShowAddMerchant(true)}
            className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <Plus size={20} />
            Add Merchant
          </button>
        )}
      </div>

      {/* Merchants Table */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Contact
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Volume
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Transactions
                </th>
                <th className="text-left px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Chains
                </th>
                <th className="text-right px-6 py-4 text-[14px] text-[#bbb] tracking-[-0.14px] font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMerchants.map((merchant) => (
                <tr
                  key={merchant.id}
                  className="border-b border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link href={`/merchants/${merchant.id}`}>
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        {merchant.companyName}
                      </div>
                      <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                        {merchant.legalEntity}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {merchant.contactEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={merchant.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      ${merchant.totalVolume.toLocaleString()}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {merchant.settlementCurrency}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-white tracking-[-0.14px]">
                      {merchant.transactionCount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {merchant.supportedChains.map((chain) => (
                        <span
                          key={chain}
                          className="bg-[#363636] px-2 py-1 rounded text-[12px] text-[#bbb] tracking-[-0.12px] capitalize"
                        >
                          {chain}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                        title="Regenerate API Keys"
                      >
                        <Key size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                        title="Suspend/Activate"
                      >
                        <Power size={16} />
                      </button>
                      <button
                        className="p-2 hover:bg-[#363636] rounded-lg transition-colors text-[#bbb] hover:text-white"
                        title="More"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Merchant Modal */}
      {showAddMerchant && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#252525] rounded-[20px] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-[24px] text-white tracking-[-0.24px] mb-6">
              Add New Merchant
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
                    placeholder="Acme Retail"
                  />
                </div>
                <div>
                  <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Legal Entity
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
                    placeholder="Acme Retail Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
                  placeholder="finance@acme.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Settlement Currency
                  </label>
                  <select className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Supported Chains
                </label>
                <div className="flex gap-3">
                  {["Base", "Polygon", "Ethereum", "Solana"].map((chain) => (
                    <label key={chain} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-[#4f4f4f] bg-[#1a1a1a] text-[#0988f0] focus:ring-[#0988f0]"
                      />
                      <span className="text-[14px] text-white tracking-[-0.14px]">
                        {chain}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMerchant(false)}
                  className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddMerchant(false);
                  }}
                  className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
                >
                  Create Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
