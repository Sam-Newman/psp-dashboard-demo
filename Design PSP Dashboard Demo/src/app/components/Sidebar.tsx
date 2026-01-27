import { LayoutDashboard, Users, Receipt, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'merchants', label: 'Merchants', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'settlements', label: 'Settlements', icon: FileText },
  ];

  return (
    <div className="bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col h-screen w-[240px]">
      {/* Logo */}
      <div className="border-b border-[#2a2a2a] p-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#0988f0] rounded-lg p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-['KH_Teka:Regular',sans-serif] text-white text-[16px] tracking-[-0.16px]">
              PSP Dashboard
            </div>
            <div className="font-['KH_Teka:Regular',sans-serif] text-[#bbb] text-[12px] tracking-[-0.12px]">
              WalletConnect Pay
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors
                  ${isActive 
                    ? 'bg-[#0988f0] text-white' 
                    : 'text-[#bbb] hover:bg-[#2a2a2a] hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="border-t border-[#2a2a2a] p-4">
        <button
          onClick={() => onNavigate('settings')}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors
            ${currentPage === 'settings' 
              ? 'bg-[#0988f0] text-white' 
              : 'text-[#bbb] hover:bg-[#2a2a2a] hover:text-white'
            }
          `}
        >
          <Settings size={20} />
          <span className="font-['KH_Teka:Regular',sans-serif] text-[14px] tracking-[-0.14px]">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}
