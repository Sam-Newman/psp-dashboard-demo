interface StatusBadgeProps {
  status: string;
  substatus?: string;
}

export function StatusBadge({ status, substatus }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'succeeded':
      case 'active':
      case 'completed':
        return { bg: '#1a4d2e', text: '#4ade80', label: substatus || 'Success' };
      case 'processing':
      case 'pending':
      case 'pending_kyc':
        return { bg: '#363636', text: '#ffffff', label: substatus || 'Pending' };
      case 'failed':
        return { bg: '#4d1a1a', text: '#f87171', label: 'Failed' };
      case 'expired':
        return { bg: '#4d3d1a', text: '#fbbf24', label: 'Expired' };
      case 'suspended':
        return { bg: '#4d2d1a', text: '#fb923c', label: 'Suspended' };
      case 'requires_action':
        return { bg: '#1a3a4d', text: '#60a5fa', label: 'Requires Action' };
      default:
        return { bg: '#363636', text: '#9a9a9a', label: status };
    }
  };

  const config = getStatusConfig();

  return (
    <div 
      className="content-stretch flex gap-[4px] isolate items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" 
      style={{ backgroundColor: config.bg }}
    >
      <div 
        className="css-g0mm18 flex flex-col font-['KH_Teka:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-right tracking-[-0.14px] z-[1]"
        style={{ color: config.text }}
      >
        <p className="css-ew64yg leading-[16px] capitalize">
          {config.label}
        </p>
      </div>
    </div>
  );
}
