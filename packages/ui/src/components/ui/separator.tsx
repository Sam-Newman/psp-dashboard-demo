import * as React from "react";

import { cn } from "../../lib/tw-utils";

export function Separator({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex w-full items-center text-md text-secondary", children && "gap-2", className)}>
      <div className="h-[1px] flex-1 bg-border" />
      {children}
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}
