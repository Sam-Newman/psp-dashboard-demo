import { cn } from "@pay-merchant/ui/lib/tw-utils";

import {
  TransactionStatus,
  TransactionSubstatus,
} from "@/lib/types/transaction";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
  substatus?: TransactionSubstatus;
  size?: "sm" | "md";
}

const statusConfig: Record<TransactionStatus, { label: string; className: string }> = {
  requires_action: { label: "Pending", className: "bg-amber-500/20 text-amber-400" },
  processing: { label: "Processing", className: "bg-blue-500/20 text-blue-400" },
  succeeded: { label: "Completed", className: "bg-emerald-500/20 text-emerald-400" },
  failed: { label: "Failed", className: "bg-red-500/20 text-red-400" },
  expired: { label: "Expired", className: "bg-gray-500/20 text-gray-400" },
};

const substatusLabels: Record<string, string> = {
  waiting_for_confirmation: "Pending",
  confirmed: "Completed",
  reached_payout_account: "Payout sent",
  offramped_to_fiat: "Completed",
  failed: "Payout failed",
  expired: "Expired",
};

export function TransactionStatusBadge({ status, substatus, size = "md" }: TransactionStatusBadgeProps) {
  const config = statusConfig[status];

  // Use substatus label if available for succeeded status
  let label = config.label;
  let className = config.className;

  if (substatus) {
    label = substatusLabels[substatus] || config.label;

    // Override colors for specific substatuses
    if (substatus === "reached_payout_account") {
      className = "bg-amber-500/20 text-amber-400";
    } else if (substatus === "failed") {
      className = "bg-red-500/20 text-red-400";
    }
  }

  return (
    <span className={cn(
      "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
      className
    )}>
      {label}
    </span>
  );
}
