interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-[#252525] flex-1 rounded-[20px]">
      <div className="p-8">
        <div className="flex flex-col gap-2">
          <div className="text-[#bbb] text-[14px] tracking-[-0.14px]">
            <p className="leading-[16px]">{label}</p>
          </div>
          <div className="text-white text-[26px] tracking-[-0.26px]">
            <p className="leading-[26px]">
              {typeof value === "number" && value >= 1000 ? (
                <>
                  <span>{Math.floor(value).toLocaleString()}</span>
                  {value % 1 !== 0 && (
                    <span className="text-[16px] tracking-[-0.16px]">
                      .{value.toFixed(2).split(".")[1]}
                    </span>
                  )}
                </>
              ) : (
                <span>{value}</span>
              )}
            </p>
          </div>
          {subtitle && (
            <div className="text-[#bbb] text-[12px] tracking-[-0.12px]">
              <p className="leading-[14px]">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
