import { Key, Users, Bell, Shield } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="space-y-6">
        {/* API Keys Section */}
        <div className="bg-[#252525] rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Key className="text-[#0988f0]" size={24} />
            <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
              API Keys
            </h2>
          </div>
          <p className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
            Manage your PSP API keys for accessing WalletConnect Pay endpoints.
          </p>
          
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Production API Key
                </div>
                <span className="bg-[#1a4d2e] text-[#4ade80] px-3 py-1 rounded-full text-[12px] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px]">
                  Active
                </span>
              </div>
              <div className="bg-[#252525] rounded px-4 py-3 mb-3 font-mono text-[14px] text-white">
                sk_live_••••••••••••••••••••••••••••
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  Regenerate
                </button>
                <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  Copy
                </button>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Test API Key
                </div>
                <span className="bg-[#1a4d2e] text-[#4ade80] px-3 py-1 rounded-full text-[12px] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px]">
                  Active
                </span>
              </div>
              <div className="bg-[#252525] rounded px-4 py-3 mb-3 font-mono text-[14px] text-white">
                sk_test_••••••••••••••••••••••••••••
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  Regenerate
                </button>
                <button className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-[#252525] rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-[#0988f0]" size={24} />
            <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
              Team Members
            </h2>
          </div>
          <p className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
            Manage user access and permissions for your PSP dashboard.
          </p>

          <div className="space-y-3">
            {[
              { name: 'John Smith', email: 'john@psp.com', role: 'PSP Admin' },
              { name: 'Sarah Johnson', email: 'sarah@psp.com', role: 'PSP Analyst' },
              { name: 'Mike Davis', email: 'mike@psp.com', role: 'PSP Support' }
            ].map((member, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0988f0] flex items-center justify-center text-white font-['KH_Teka:Regular',sans-serif] text-[14px]">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                      {member.name}
                    </div>
                    <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#363636] px-3 py-1 rounded text-[12px] text-[#bbb] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px]">
                    {member.role}
                  </span>
                  <button className="text-[#bbb] hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <circle cx="10" cy="10" r="1" fill="currentColor" />
                      <circle cx="10" cy="5" r="1" fill="currentColor" />
                      <circle cx="10" cy="15" r="1" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-3 border border-[#4f4f4f] rounded-lg text-white hover:bg-[#2a2a2a] transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
            + Add Team Member
          </button>
        </div>

        {/* Notifications Section */}
        <div className="bg-[#252525] rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-[#0988f0]" size={24} />
            <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
              Notifications
            </h2>
          </div>
          <p className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
            Configure webhook endpoints and notification preferences.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
              <div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Transaction Confirmed
                </div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Notify when a payment is confirmed on-chain
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0988f0]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
              <div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Settlement Completed
                </div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Notify when a settlement batch is completed
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0988f0]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
              <div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Transaction Failed
                </div>
                <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Notify when a transaction fails
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#363636] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0988f0]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-[#252525] rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#0988f0]" size={24} />
            <h2 className="font-['KH_Teka:Regular',sans-serif] text-[20px] text-white tracking-[-0.20px]">
              Security
            </h2>
          </div>
          <p className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
            Manage security settings and rate limits.
          </p>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  IP Whitelist
                </div>
                <button className="px-4 py-2 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  Configure
                </button>
              </div>
              <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                Restrict API access to specific IP addresses
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-['KH_Teka:Regular',sans-serif] text-[14px] text-white tracking-[-0.14px]">
                  Rate Limits
                </div>
                <span className="bg-[#363636] px-3 py-1 rounded text-[12px] text-[#bbb] font-['KH_Teka:Regular',sans-serif] tracking-[-0.12px]">
                  500 req/min
                </span>
              </div>
              <div className="font-['KH_Teka:Regular',sans-serif] text-[12px] text-[#bbb] tracking-[-0.12px]">
                Enterprise tier rate limits
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
