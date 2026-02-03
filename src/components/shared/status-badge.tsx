interface StatusBadgeProps {
  status: string;
  substatus?: string;
}

export function StatusBadge({ status, substatus }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "succeeded":
      case "active":
      case "completed":
        return { bg: "#1a4d2e", text: "#4ade80", label: substatus || "Active" };
      case "processing":
      case "pending":
        return { bg: "#363636", text: "#ffffff", label: substatus || "Pending" };
      case "pending_kyb":
        return { bg: "#4d3d1a", text: "#fbbf24", label: "Pending KYB" };
      case "kyb_in_review":
        return { bg: "#1a3a4d", text: "#60a5fa", label: "KYB In Review" };
      case "kyb_rejected":
        return { bg: "#4d1a1a", text: "#f87171", label: "KYB Rejected" };
      case "failed":
        return { bg: "#4d1a1a", text: "#f87171", label: "Failed" };
      case "expired":
        return { bg: "#4d3d1a", text: "#fbbf24", label: "Expired" };
      case "suspended":
        return { bg: "#4d2d1a", text: "#fb923c", label: "Suspended" };
      case "disabled":
        return { bg: "#363636", text: "#9a9a9a", label: "Disabled" };
      case "requires_action":
        return { bg: "#1a3a4d", text: "#60a5fa", label: "Requires Action" };
      case "deactivated":
      case "offboarded":
        return { bg: "#363636", text: "#9a9a9a", label: "Deactivated" };
      default:
        return { bg: "#363636", text: "#9a9a9a", label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className="inline-flex items-center justify-center px-2 py-1.5 rounded-lg text-[14px] tracking-[-0.14px] capitalize"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </div>
  );
}
