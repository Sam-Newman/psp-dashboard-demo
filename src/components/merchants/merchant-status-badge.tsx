import { Badge } from "@pay-merchant/ui/ui/badge";

import {
  MerchantStatus,
  merchantStatusColors,
  merchantStatusLabels,
} from "@/lib/types/merchant";

interface MerchantStatusBadgeProps {
  status: MerchantStatus;
  size?: "sm" | "md";
}

export function MerchantStatusBadge({ status, size = "md" }: MerchantStatusBadgeProps) {
  return (
    <Badge
      variant={merchantStatusColors[status]}
      className={size === "sm" ? "text-xs px-1.5 py-1" : ""}
    >
      {merchantStatusLabels[status]}
    </Badge>
  );
}
