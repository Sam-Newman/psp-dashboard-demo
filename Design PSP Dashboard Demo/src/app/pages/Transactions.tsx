import { useState } from 'react';
import { StatusBadge } from '@/app/components/StatusBadge';
import { mockTransactions, mockMerchants } from '@/app/data/mockData';
import { Download, Filter, X } from 'lucide-react';
import svgPaths from "@/imports/svg-98c6wt9th4";

function TokenIcon({ token }: { token: string }) {
  if (token === 'USDC') {
    return (
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g clipPath="url(#clip0_usdc)">
            <path d={svgPaths.p3d2a7400} fill="#627EEA" />
            <path d={svgPaths.p34bb2000} fill="#2775CA" />
            <path d={svgPaths.p12cfb900} fill="white" />
            <path d={svgPaths.padd23f0} fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_usdc">
              <path d={svgPaths.p180dff00} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
  
  if (token === 'SOL') {
    return (
      <div className="relative shrink-0 size-[16px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g clipPath="url(#clip0_sol)">
            <path d={svgPaths.p30769300} fill="url(#paint0_linear_sol)" />
            <path d={svgPaths.p1a861000} fill="white" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_sol" x1="1.35059" x2="16.1367" y1="16.3813" y2="1.47377" gradientUnits="userSpaceOnUse">
              <stop offset="0.08" stopColor="#9945FF" />
              <stop offset="0.5" stopColor="#5497D5" />
              <stop offset="0.97" stopColor="#19FB9B" />
            </linearGradient>
            <clipPath id="clip0_sol">
              <rect fill="white" height="16" width="16" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
  
  return (
    <div className="relative shrink-0 size-[16px] bg-[#4f4f4f] rounded-full flex items-center justify-center">
      <span className="text-[8px] text-white">{token.substring(0, 2)}</span>
    </div>
  );
}

export function Transactions() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedChain, setSelectedChain] = useState<string>('all');

  const filteredTransactions = mockTransactions.filter(tx => {
    if (selectedMerchant !== 'all' && tx.merchant_id !== selectedMerchant) return false;
    if (selectedStatus !== 'all' && tx.status !== selectedStatus) return false;
    if (selectedChain !== 'all' && tx.chain !== selectedChain) return false;
    return true;
  });

  const hasActiveFilters = selectedMerchant !== 'all' || selectedStatus !== 'all' || selectedChain !== 'all';

  const clearFilters = () => {
    setSelectedMerchant('all');
    setSelectedStatus('all');
    setSelectedChain('all');
  };

  return (
    <div className="p-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px] ${
              showFilters || hasActiveFilters
                ? 'bg-[#0988f0] text-white'
                : 'bg-[#252525] border border-[#4f4f4f] text-[#bbb] hover:text-white'
            }`}
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-[#0988f0] rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
                {[selectedMerchant, selectedStatus, selectedChain].filter(f => f !== 'all').length}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>
        <button className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-[#252525] rounded-[20px] p-6 mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Merchant
              </label>
              <select 
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Merchants</option>
                {mockMerchants.map(m => (
                  <option key={m.id} value={m.id}>{m.company_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Status
              </label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
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
              <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Chain
              </label>
              <select 
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Chains</option>
                <option value="base">Base</option>
                <option value="polygon">Polygon</option>
                <option value="ethereum">Ethereum</option>
                <option value="solana">Solana</option>
              </select>
            </div>
            <div>
              <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Date Range
              </label>
              <select className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
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
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Date
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Merchant
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Crypto Received
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Amount
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Wallet
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Network
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Payment ID
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Hash ID
                </th>
                <th className="text-left px-4 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr 
                  key={tx.tx_id}
                  className="border-b border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: '2-digit' 
                      })}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {new Date(tx.created_at).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {tx.merchant_name}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <TokenIcon token={tx.token} />
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                        {tx.amount_crypto} {tx.token}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${tx.amount_fiat}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {tx.fiat_currency}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {tx.wallet_type}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-[#363636] px-2 py-1 rounded text-[12px] text-[#bbb] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px] capitalize">
                      {tx.chain}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {tx.payment_id}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] underline cursor-pointer hover:text-white">
                      {tx.hash_id}
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
          <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#0988f0] text-white rounded-lg font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
              1
            </button>
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
              2
            </button>
            <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
