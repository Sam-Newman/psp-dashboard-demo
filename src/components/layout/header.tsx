"use client";

import { Globe, Moon, Settings } from "lucide-react";
import Image from "next/image";

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center w-11 h-11 rounded-full border border-[#333] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
      {children}
    </button>
  );
}

function LanguageButton() {
  return (
    <button className="flex items-center gap-2 px-4 h-11 rounded-full border border-[#333] bg-[#111] hover:bg-[#1a1a1a] transition-colors">
      <Globe className="size-4 text-white" />
      <span className="text-white text-[13px]">En</span>
    </button>
  );
}

function PartnerBranding() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="WalletConnect Pay"
        width={24}
        height={24}
      />
      <span className="text-white text-[15px] font-medium tracking-[-0.01em]">Pay</span>
      <span className="text-[#666] text-[15px]">+</span>
      <span className="text-white text-[15px] font-medium tracking-[-0.01em]">Partner</span>
    </div>
  );
}

export function Header() {
  return (
    <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-8 py-4">
      <div className="flex items-center justify-between">
        <PartnerBranding />
        <div className="flex items-center gap-2">
          <LanguageButton />
          <IconButton>
            <Moon className="size-5 text-white" />
          </IconButton>
          <IconButton>
            <Settings className="size-5 text-white" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
