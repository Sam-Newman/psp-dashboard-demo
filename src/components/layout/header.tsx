"use client";

import { usePathname } from "next/navigation";
import { Moon, Settings } from "lucide-react";

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="relative flex items-center justify-center p-3 rounded-2xl shrink-0 border border-[#4f4f4f] hover:bg-[#2a2a2a] transition-colors">
      {children}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard")) return "Dashboard Overview";
    if (pathname.startsWith("/merchants")) return "Merchant Management";
    if (pathname.startsWith("/transactions")) return "Transaction Monitoring";
    if (pathname.startsWith("/settlements")) return "Settlements & Reporting";
    if (pathname.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="bg-[#141414] border-b border-[#2a2a2a] px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] text-white tracking-[-0.26px]">
          {getPageTitle()}
        </h1>
        <div className="flex items-center gap-2">
          <IconButton>
            <Moon className="size-6 text-white" />
          </IconButton>
          <IconButton>
            <Settings className="size-6 text-white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
