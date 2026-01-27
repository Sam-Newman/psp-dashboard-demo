import { useState } from 'react';
import { StatusBadge } from '@/app/components/StatusBadge';
import { mockMerchants } from '@/app/data/mockData';
import { Plus, Search, MoreVertical, Key, Power, Edit } from 'lucide-react';

export function Merchants() {
  const [showAddMerchant, setShowAddMerchant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMerchants = mockMerchants.filter(merchant =>
    merchant.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    merchant.contact_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="w-full bg-[#252525] border border-[#4f4f4f] rounded-lg pl-12 pr-4 py-3 text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
          />
        </div>
        <button
          onClick={() => setShowAddMerchant(true)}
          className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
        >
          <Plus size={20} />
          Add Merchant
        </button>
      </div>

      {/* Merchants Table */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Company
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Contact
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Status
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Volume
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Transactions
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Chains
                </th>
                <th className="text-right px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
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
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {merchant.company_name}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {merchant.legal_entity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {merchant.contact_email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={merchant.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${merchant.gross_volume.toLocaleString()}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {merchant.settlement_currency}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {merchant.transaction_count}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {merchant.supported_chains.map((chain) => (
                        <span 
                          key={chain}
                          className="bg-[#363636] px-2 py-1 rounded text-[12px] text-[#bbb] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px] capitalize"
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
            <h2 className="font-['KH_Teka:Regular',sans-serif] text-[24px] text-white tracking-[-0.24px] mb-6">
              Add New Merchant
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
                    placeholder="Acme Retail"
                  />
                </div>
                <div>
                  <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Legal Entity
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
                    placeholder="Acme Retail Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
                  placeholder="finance@acme.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                    Settlement Currency
                  </label>
                  <select className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                  Supported Chains
                </label>
                <div className="flex gap-3">
                  {['Base', 'Polygon', 'Ethereum', 'Solana'].map((chain) => (
                    <label key={chain} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#4f4f4f] bg-[#1a1a1a] text-[#0988f0] focus:ring-[#0988f0]"
                      />
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
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
                  className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddMerchant(false);
                  }}
                  className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
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
