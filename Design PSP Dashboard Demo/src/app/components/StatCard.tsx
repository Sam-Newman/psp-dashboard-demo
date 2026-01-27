interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-[#252525] flex-[1_0_0] min-h-px min-w-px relative rounded-[20px]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[32px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col font-['KH_Teka:Regular',sans-serif] gap-[8px] items-start leading-[0] min-h-px min-w-px not-italic relative">
            <div className="css-g0mm18 flex flex-col justify-center relative shrink-0 text-[#bbb] text-[14px] tracking-[-0.14px]">
              <p className="css-ew64yg leading-[16px]">{label}</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[0px] text-white tracking-[-0.26px]">
              <p className="css-4hzbpn">
                {typeof value === 'number' && value >= 1000 ? (
                  <>
                    <span className="leading-[26px] text-[26px]">
                      {Math.floor(value).toLocaleString()}
                    </span>
                    {value % 1 !== 0 && (
                      <span className="font-['KH_Teka:Regular',sans-serif] leading-[18px] not-italic text-[16px] tracking-[-0.16px]">
                        .{value.toFixed(2).split('.')[1]}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="leading-[26px] text-[26px]">{value}</span>
                )}
              </p>
            </div>
            {subtitle && (
              <div className="css-g0mm18 flex flex-col justify-center relative shrink-0 text-[#bbb] text-[12px] tracking-[-0.12px]">
                <p className="css-ew64yg leading-[14px]">{subtitle}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
