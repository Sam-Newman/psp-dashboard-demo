"use client";

import { useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

import { useRole } from "@/lib/hooks/use-role";
import type { ApiKey, ApiKeyEnvironment } from "@/lib/types/api-key";
import { mockApiKeys } from "@/lib/mock-data/api-keys";
import { EnvironmentToggle } from "./environment-toggle";
import { ApiKeyCreateModal } from "./api-key-create-modal";
import { ApiKeyRevokeModal } from "./api-key-revoke-modal";

export function ApiKeyList() {
  const { hasPermission } = useRole();
  const [environment, setEnvironment] = useState<ApiKeyEnvironment>("production");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revokeKey, setRevokeKey] = useState<ApiKey | null>(null);

  const filteredKeys = mockApiKeys.filter((k) => k.environment === environment);

  const handleCopy = async (key: ApiKey) => {
    await navigator.clipboard.writeText(key.prefix);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatLastUsed = (date?: string) => {
    if (!date) return "Never used";
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <EnvironmentToggle environment={environment} onEnvironmentChange={setEnvironment} />
        {hasPermission("apiKeys.create") && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <Plus size={16} />
            Create API Key
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredKeys.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
              No {environment} API keys found
            </p>
          </div>
        ) : (
          filteredKeys.map((key) => (
            <div key={key.id} className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  {key.name}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[12px] tracking-[-0.12px] ${
                    key.status === "active"
                      ? "bg-[#1a4d2e] text-[#4ade80]"
                      : "bg-[#363636] text-[#9a9a9a]"
                  }`}
                >
                  {key.status === "active" ? "Active" : "Revoked"}
                </span>
              </div>
              <div className="bg-[#252525] rounded px-4 py-3 mb-3 font-mono text-[14px] text-white flex items-center justify-between">
                <span>{key.prefix.slice(0, 12)}••••••••••••••••</span>
                <button
                  onClick={() => handleCopy(key)}
                  className="text-[#bbb] hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedId === key.id ? (
                    <Check size={16} className="text-[#4ade80]" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Created {new Date(key.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} • Last used: {formatLastUsed(key.lastUsedAt)}
                </div>
                {key.status === "active" && hasPermission("apiKeys.revoke") && (
                  <button
                    onClick={() => setRevokeKey(key)}
                    className="flex items-center gap-1 text-[12px] text-[#f87171] hover:text-[#ef4444] transition-colors"
                  >
                    <Trash2 size={14} />
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <ApiKeyCreateModal
          environment={environment}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {revokeKey && (
        <ApiKeyRevokeModal
          apiKey={revokeKey}
          onClose={() => setRevokeKey(null)}
        />
      )}
    </>
  );
}
