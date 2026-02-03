"use client";

import type { ApiKeyEnvironment } from "@/lib/types/api-key";

interface EnvironmentToggleProps {
  environment: ApiKeyEnvironment;
  onEnvironmentChange: (env: ApiKeyEnvironment) => void;
}

export function EnvironmentToggle({ environment, onEnvironmentChange }: EnvironmentToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg p-1">
      <button
        onClick={() => onEnvironmentChange("sandbox")}
        className={`px-4 py-2 rounded-lg text-[14px] tracking-[-0.14px] transition-colors ${
          environment === "sandbox"
            ? "bg-[#4d3d1a] text-[#fbbf24]"
            : "text-[#bbb] hover:text-white"
        }`}
      >
        Sandbox
      </button>
      <button
        onClick={() => onEnvironmentChange("production")}
        className={`px-4 py-2 rounded-lg text-[14px] tracking-[-0.14px] transition-colors ${
          environment === "production"
            ? "bg-[#1a4d2e] text-[#4ade80]"
            : "text-[#bbb] hover:text-white"
        }`}
      >
        Production
      </button>
    </div>
  );
}
