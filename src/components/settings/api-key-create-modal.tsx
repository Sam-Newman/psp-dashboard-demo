"use client";

import { useState } from "react";
import { X, Copy, Check, AlertTriangle } from "lucide-react";

import type { ApiKeyEnvironment } from "@/lib/types/api-key";
import { generateApiKeyPrefix } from "@/lib/mock-data/api-keys";

interface ApiKeyCreateModalProps {
  environment: ApiKeyEnvironment;
  onClose: () => void;
}

export function ApiKeyCreateModal({ environment, onClose }: ApiKeyCreateModalProps) {
  const [name, setName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;
    const fullKey = generateApiKeyPrefix(environment);
    setGeneratedKey(fullKey);
  };

  const handleCopy = async () => {
    if (!generatedKey) return;
    await navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-[20px] p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Create {environment === "production" ? "Production" : "Sandbox"} API Key
          </h2>
          <button
            onClick={onClose}
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!generatedKey ? (
          <>
            <div className="mb-6">
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              />
              <p className="text-[12px] text-[#bbb] tracking-[-0.12px] mt-2">
                Give your API key a descriptive name to help identify its purpose.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Key
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#4d3d1a] border border-[#fbbf24]/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-[#fbbf24] flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-[14px] text-[#fbbf24] tracking-[-0.14px] font-medium mb-1">
                    Save this key now
                  </p>
                  <p className="text-[12px] text-[#fbbf24]/80 tracking-[-0.12px]">
                    This is the only time you&apos;ll see this API key. Copy it and store it securely. You won&apos;t be able to see it again.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Your API Key
              </label>
              <div className="bg-[#1a1a1a] rounded-lg px-4 py-3 font-mono text-[14px] text-white flex items-center justify-between gap-3">
                <span className="break-all">{generatedKey}</span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 text-[#bbb] hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check size={20} className="text-[#4ade80]" />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
