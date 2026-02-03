"use client";

import {
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  Settings,
  History,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@pay-merchant/ui/lib/tw-utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "merchants", label: "Merchants", href: "/merchants", icon: Users },
  { id: "transactions", label: "Transactions", href: "/transactions", icon: Receipt },
  { id: "settlements", label: "Settlements", href: "/settlements", icon: FileText },
];

const settingsItems = [
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
  { id: "audit-log", label: "Audit Log", href: "/settings/audit-log", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/settings") {
      return pathname === "/settings";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col h-screen w-[240px]">
      {/* Logo */}
      <div className="border-b border-[#2a2a2a] p-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="WalletConnect Pay"
            width={40}
            height={40}
          />
          <div className="text-white text-[16px] tracking-[-0.16px]">
            PSP Dashboard
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors text-[14px] tracking-[-0.14px]",
                  active
                    ? "bg-[#0988f0] text-white"
                    : "text-[#bbb] hover:bg-[#2a2a2a] hover:text-white"
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="border-t border-[#2a2a2a] p-4 space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors text-[14px] tracking-[-0.14px]",
                active
                  ? "bg-[#0988f0] text-white"
                  : "text-[#bbb] hover:bg-[#2a2a2a] hover:text-white"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
