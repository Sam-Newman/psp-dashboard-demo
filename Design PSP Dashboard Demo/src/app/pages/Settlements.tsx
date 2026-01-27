import { useState } from 'react';
import { StatCard } from '@/app/components/StatCard';
import { StatusBadge } from '@/app/components/StatusBadge';
import { mockSettlements } from '@/app/data/mockData';
import { Download, Calendar, FileText } from 'lucide-react';

export function Settlements() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [showReportPreview, setShowReportPreview] = useState(false);

  const totalGrossVolume = mockSettlements.reduce((sum, s) => sum + parseFloat(s.gross_volume), 0);
  const totalFees = mockSettlements.reduce((sum, s) => sum + parseFloat(s.fees), 0);
  const totalNetSettlement = mockSettlements.reduce((sum, s) => sum + parseFloat(s.net_settlement), 0);
  const totalTransactions = mockSettlements.reduce((sum, s) => sum + s.transaction_count, 0);

  return (
    <div className="p-8">
      {/* Period Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-[#252525] border border-[#4f4f4f] rounded-lg p-1">
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px] transition-colors capitalize ${
                period === p
                  ? 'bg-[#0988f0] text-white'
                  : 'text-[#bbb] hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowReportPreview(true)}
          className="flex items-center gap-2 bg-[#0988f0] hover:bg-[#0770c8] text-white px-6 py-3 rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
        >
          <FileText size={20} />
          Generate Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="content-stretch flex gap-[16px] items-start w-full mb-8">
        <StatCard 
          label="Gross Volume" 
          value={`$${totalGrossVolume.toLocaleString()}`}
          subtitle="Jan 1 - Jan 21, 2026"
        />
        <StatCard 
          label="Total Fees" 
          value={`$${totalFees.toLocaleString()}`}
          subtitle="0.3% average fee"
        />
        <StatCard 
          label="Net Settlement" 
          value={`$${totalNetSettlement.toLocaleString()}`}
          subtitle={`${totalTransactions} transactions`}
        />
      </div>

      {/* Volume Breakdown by Merchant */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#252525] rounded-[20px] p-6">
          <h3 className="font-['KH_Teka:Regular',sans-serif] text-[16px] text-white tracking-[-0.16px] mb-4">
            Volume by Merchant
          </h3>
          <div className="space-y-3">
            {mockSettlements
              .sort((a, b) => parseFloat(b.gross_volume) - parseFloat(a.gross_volume))
              .slice(0, 5)
              .map((settlement) => {
                const percentage = (parseFloat(settlement.gross_volume) / totalGrossVolume) * 100;
                return (
                  <div key={settlement.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                        {settlement.merchant_name}
                      </span>
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                        ${parseFloat(settlement.gross_volume).toLocaleString()}
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
          <h3 className="font-['KH_Teka:Regular',sans-serif] text-[16px] text-white tracking-[-0.16px] mb-4">
            Transaction Count by Merchant
          </h3>
          <div className="space-y-3">
            {mockSettlements
              .sort((a, b) => b.transaction_count - a.transaction_count)
              .slice(0, 5)
              .map((settlement) => {
                const percentage = (settlement.transaction_count / totalTransactions) * 100;
                return (
                  <div key={settlement.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                        {settlement.merchant_name}
                      </span>
                      <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                        {settlement.transaction_count}
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
          <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
            Settlement Details
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#4f4f4f]">
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Merchant
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Period
                </th>
                <th className="text-right px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Gross Volume
                </th>
                <th className="text-right px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Fees
                </th>
                <th className="text-right px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Net Settlement
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                  Transactions
                </th>
                <th className="text-left px-6 py-4 font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
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
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {settlement.merchant_name}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.merchant_id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                      {new Date(settlement.period_start).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })} - {new Date(settlement.period_end).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${parseFloat(settlement.gross_volume).toLocaleString()}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px]">
                      ${parseFloat(settlement.fees).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${parseFloat(settlement.net_settlement).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {settlement.transaction_count}
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
              <h2 className="font-['KH_Teka:Regular',sans-serif] text-[24px] text-white tracking-[-0.24px]">
                Settlement Report Preview
              </h2>
              <button
                onClick={() => setShowReportPreview(false)}
                className="text-[#bbb] hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Report Period
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                    January 1, 2026 - January 21, 2026
                  </div>
                </div>
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Generated On
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                    {new Date().toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-[#363636]">
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Total Merchants
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
                    {mockSettlements.length}
                  </div>
                </div>
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Gross Volume
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
                    ${totalGrossVolume.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Total Fees
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
                    ${totalFees.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                    Net Settlement
                  </div>
                  <div className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
                    ${totalNetSettlement.toLocaleString()}
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
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {settlement.merchant_name}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {settlement.transaction_count} transactions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Gross
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${parseFloat(settlement.gross_volume).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Fees
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${parseFloat(settlement.fees).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      Net
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      ${parseFloat(settlement.net_settlement).toLocaleString()}
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
                className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]"
              >
                Close
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
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
