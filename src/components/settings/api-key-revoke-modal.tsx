"use client";

import { X, AlertTriangle } from "lucide-react";

import type { ApiKey } from "@/lib/types/api-key";

interface ApiKeyRevokeModalProps {
  apiKey: ApiKey;
  onClose: () => void;
}

export function ApiKeyRevokeModal({ apiKey, onClose }: ApiKeyRevokeModalProps) {
  const handleRevoke = () => {
    // In a real app, this would call an API to revoke the key
    console.log("Revoking key:", apiKey.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-[20px] p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Revoke API Key
          </h2>
          <button
            onClick={onClose}
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-[#4d1a1a] border border-[#f87171]/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-[#f87171] flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-[14px] text-[#f87171] tracking-[-0.14px] font-medium mb-1">
                This action cannot be undone
              </p>
              <p className="text-[12px] text-[#f87171]/80 tracking-[-0.12px]">
                Revoking this API key will immediately invalidate it. Any applications using this key will no longer be able to authenticate.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6">
          <div className="text-[14px] text-white tracking-[-0.14px] mb-1">
            {apiKey.name}
          </div>
          <div className="text-[12px] text-[#bbb] tracking-[-0.12px] font-mono">
            {apiKey.prefix.slice(0, 12)}••••••••••••••••
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            Cancel
          </button>
          <button
            onClick={handleRevoke}
            className="px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            Revoke Key
          </button>
        </div>
      </div>
    </div>
  );
}
