import { StatCard } from '@/app/components/StatCard';
import { StatusBadge } from '@/app/components/StatusBadge';
import { mockTransactions, dashboardStats, mockMerchants } from '@/app/data/mockData';
import { ArrowUpRight } from 'lucide-react';

export function Dashboard() {
  const recentTransactions = mockTransactions.slice(0, 5);
  const activeMerchants = mockMerchants.filter(m => m.status === 'active');

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="content-stretch flex gap-[16px] items-start w-full">
        <StatCard 
          label="Total Volume" 
          value={`$${dashboardStats.totalVolume.toLocaleString()}`}
          subtitle="Last 30 days"
        />
        <StatCard 
          label="Active Merchants" 
          value={dashboardStats.totalMerchants}
          subtitle={`${dashboardStats.pendingKYC} pending KYC`}
        />
        <StatCard 
          label="Total Transactions" 
          value={dashboardStats.totalTransactions}
          subtitle="Across all merchants"
        />
      </div>

      {/* Merchant Overview */}
      <div className="bg-[#252525] rounded-[20px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
            Top Merchants by Volume
          </h2>
        </div>
        <div className="space-y-4">
          {activeMerchants
            .sort((a, b) => b.gross_volume - a.gross_volume)
            .slice(0, 5)
            .map((merchant) => (
              <div 
                key={merchant.id}
                className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#303030] transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                    {merchant.company_name}
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                    {merchant.transaction_count} transactions
                  </div>
                </div>
                <div className="text-right mr-4">
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[16px] text-white tracking-[-0.16px]">
                    ${merchant.gross_volume.toLocaleString()}
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                    {merchant.settlement_currency}
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
          <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
            Recent Transactions
          </h2>
          <button className="flex items-center gap-2 text-[#0988f0] hover:text-[#0770c8] transition-colors">
            <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
              View all
            </span>
            <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div 
              key={tx.tx_id}
              className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#303030] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  {tx.merchant_name}
                </div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                  {new Date(tx.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                    {tx.amount_crypto} {tx.token}
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                    ${tx.amount_fiat} {tx.fiat_currency}
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

      {/* Volume by Chain */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="font-['KH_Teka:Regular',sans-serif] text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Chain
          </h3>
          <div className="space-y-3">
            {[
              { chain: 'Base', volume: 45200, percentage: 45 },
              { chain: 'Polygon', volume: 32800, percentage: 32 },
              { chain: 'Ethereum', volume: 18500, percentage: 18 },
              { chain: 'Solana', volume: 5000, percentage: 5 }
            ].map((item) => (
              <div key={item.chain}>
                <div className="flex justify-between mb-1">
                  <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                    {item.chain}
                  </span>
                  <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
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
          <h3 className="font-['KH_Teka:Regular',sans-serif] text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Token
          </h3>
          <div className="space-y-3">
            {[
              { token: 'USDC', volume: 89500, percentage: 75 },
              { token: 'USDT', volume: 18200, percentage: 15 },
              { token: 'SOL', volume: 7800, percentage: 7 },
              { token: 'ETH', volume: 3500, percentage: 3 }
            ].map((item) => (
              <div key={item.token}>
                <div className="flex justify-between mb-1">
                  <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                    {item.token}
                  </span>
                  <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
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
