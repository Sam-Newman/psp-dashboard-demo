"use client";

import { Key, Users, Webhook, Shield, FileText } from "lucide-react";
import Link from "next/link";

import { useRole } from "@/lib/hooks/use-role";
import { ApiKeyList } from "@/components/settings/api-key-list";
import { TeamMemberList } from "@/components/settings/team-member-list";
import { WebhookList } from "@/components/settings/webhook-list";

export default function SettingsPage() {
  const { hasPermission } = useRole();

  return (
    <div className="p-8 max-w-5xl">
      <div className="space-y-6">
        {/* API Keys Section */}
        {hasPermission("apiKeys.view") && (
          <div className="bg-[#252525] rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="text-[#0988f0]" size={24} />
              <h2 className="text-[20px] text-white tracking-[-0.20px]">
                API Keys
              </h2>
            </div>
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
              Manage your PSP API keys for accessing WalletConnect Pay endpoints.
            </p>
            <ApiKeyList />
          </div>
        )}

        {/* Team Members Section */}
        {hasPermission("team.view") && (
          <div className="bg-[#252525] rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-[#0988f0]" size={24} />
              <h2 className="text-[20px] text-white tracking-[-0.20px]">
                Team Members
              </h2>
            </div>
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
              Manage user access and permissions for your PSP dashboard.
            </p>
            <TeamMemberList />
          </div>
        )}

        {/* Webhooks Section */}
        {hasPermission("webhooks.view") && (
          <div className="bg-[#252525] rounded-[20px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Webhook className="text-[#0988f0]" size={24} />
              <h2 className="text-[20px] text-white tracking-[-0.20px]">
                Webhooks
              </h2>
            </div>
            <WebhookList />
          </div>
        )}

        {/* Audit Log Link */}
        {hasPermission("auditLogs.view") && (
          <div className="bg-[#252525] rounded-[20px] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-[#0988f0]" size={24} />
                <div>
                  <h2 className="text-[20px] text-white tracking-[-0.20px]">
                    Audit Log
                  </h2>
                  <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
                    View a history of actions taken in your account.
                  </p>
                </div>
              </div>
              <Link
                href="/settings/audit-log"
                className="px-4 py-2 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
              >
                View Audit Log
              </Link>
            </div>
          </div>
        )}

        {/* Security Section */}
        <div className="bg-[#252525] rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#0988f0]" size={24} />
            <h2 className="text-[20px] text-white tracking-[-0.20px]">
              Security
            </h2>
          </div>
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px] mb-6">
            Manage security settings and rate limits.
          </p>

          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  IP Whitelist
                </div>
                {hasPermission("settings.edit") ? (
                  <button className="px-4 py-2 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]">
                    Configure
                  </button>
                ) : (
                  <span className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                    Contact admin to configure
                  </span>
                )}
              </div>
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                Restrict API access to specific IP addresses
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[14px] text-white tracking-[-0.14px]">
                  Rate Limits
                </div>
                <span className="bg-[#363636] px-3 py-1 rounded text-[12px] text-[#bbb] tracking-[-0.12px]">
                  500 req/min
                </span>
              </div>
              <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                Enterprise tier rate limits
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
