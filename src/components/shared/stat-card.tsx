interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  // Format large numbers with subscript decimals
  const formatValue = () => {
    if (typeof value === "string") {
      // Handle currency strings like "$120,012.85"
      const match = value.match(/^(\$?)([\d,]+)\.?(\d*)(%?)$/);
      if (match) {
        const [, prefix, whole, decimal, suffix] = match;
        if (decimal) {
          return (
            <>
              {prefix}{whole}<span className="text-[18px] text-[#888]">.{decimal}</span>{suffix}
            </>
          );
        }
        return <>{prefix}{whole}{suffix}</>;
      }
      return value;
    }

    if (value >= 1000) {
      const decimal = value % 1 !== 0 ? `.${value.toFixed(2).split(".")[1]}` : "";
      return (
        <>
          {Math.floor(value).toLocaleString()}
          {decimal && <span className="text-[18px] text-[#888]">{decimal}</span>}
        </>
      );
    }
    return value;
  };

  return (
    <div className="flex-1 rounded-2xl border border-[#222] bg-[#111]">
      <div className="px-6 py-5">
        <div className="text-[#777] text-[13px] tracking-[-0.01em] mb-2">
          {label}
        </div>
        <div className="text-white text-[28px] font-medium tracking-[-0.02em]">
          {formatValue()}
        </div>
        {subtitle && (
          <div className="text-[#555] text-[12px] tracking-[-0.01em] mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
