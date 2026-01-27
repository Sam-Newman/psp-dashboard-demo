import svgPaths from "@/imports/svg-98c6wt9th4";

function Moon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Moon">
      <div className="absolute inset-[0_-22.89%_-16.68%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.493 28.0032">
          <g id="Moon">
            <path d={svgPaths.p17379100} fill="var(--fill-0, white)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Gear() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Gear">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Gear">
          <path d={svgPaths.p1789680} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center p-[12px] relative rounded-[16px] shrink-0" data-name="Icon Button">
      <div aria-hidden="true" className="absolute border border-[#4f4f4f] border-solid inset-0 pointer-events-none rounded-[16px]" />
      {children}
    </div>
  );
}

export function Header({ title }: { title: string }) {
  return (
    <div className="bg-[#141414] border-b border-[#2a2a2a] px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-['KH_Teka:Regular',sans-serif] text-[26px] text-white tracking-[-0.26px]">
          {title}
        </h1>
        <div className="content-stretch flex gap-[8px] items-center">
          <IconButton>
            <Moon />
          </IconButton>
          <IconButton>
            <Gear />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
