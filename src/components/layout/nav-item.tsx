"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@pay-merchant/ui/lib/tw-utils";

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
}

export function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-[14px] tracking-[-0.14px] transition-colors w-full",
        isActive
          ? "bg-[#0988f0] text-white"
          : "text-[#bbb] hover:bg-[#2a2a2a] hover:text-white"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}
