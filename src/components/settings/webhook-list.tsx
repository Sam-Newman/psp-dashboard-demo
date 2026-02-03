"use client";

import { useState } from "react";
import { Plus, ExternalLink, Activity, Trash2 } from "lucide-react";

import { useRole } from "@/lib/hooks/use-role";
import type { WebhookEndpoint } from "@/lib/types/webhook";
import { mockWebhookEndpoints } from "@/lib/mock-data/webhooks";
import { WebhookCreateModal } from "./webhook-create-modal";
import { WebhookDeliveryLog } from "./webhook-delivery-log";

export function WebhookList() {
  const { hasPermission } = useRole();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewDeliveriesEndpoint, setViewDeliveriesEndpoint] = useState<WebhookEndpoint | null>(null);

  const getStatusColor = (status: WebhookEndpoint["status"]) => {
    switch (status) {
      case "active":
        return "bg-[#1a4d2e] text-[#4ade80]";
      case "disabled":
        return "bg-[#363636] text-[#9a9a9a]";
      case "failing":
        return "bg-[#4d1a1a] text-[#f87171]";
    }
  };

  const formatLastDelivery = (date?: string) => {
    if (!date) return "Never";
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
          Configure webhook endpoints to receive real-time event notifications.
        </p>
        {hasPermission("webhooks.create") && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <Plus size={16} />
            Add Endpoint
          </button>
        )}
      </div>

      <div className="space-y-4">
        {mockWebhookEndpoints.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
              No webhook endpoints configured
            </p>
          </div>
        ) : (
          mockWebhookEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] tracking-[-0.10px] ${getStatusColor(endpoint.status)}`}>
                      {endpoint.status === "active" ? "Active" : endpoint.status === "disabled" ? "Disabled" : "Failing"}
                    </span>
                    {endpoint.failureCount > 0 && (
                      <span className="text-[10px] text-[#f87171] tracking-[-0.10px]">
                        {endpoint.failureCount} failed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-white tracking-[-0.14px] font-mono truncate">
                    {endpoint.url}
                    <a
                      href={endpoint.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#bbb] hover:text-white flex-shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  {endpoint.description && (
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                      {endpoint.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {endpoint.events.map((event) => (
                  <span
                    key={event}
                    className="px-2 py-0.5 bg-[#252525] rounded text-[10px] text-[#bbb] tracking-[-0.10px]"
                  >
                    {event}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#363636]">
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  Last delivery: {formatLastDelivery(endpoint.lastDeliveryAt)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewDeliveriesEndpoint(endpoint)}
                    className="flex items-center gap-1 text-[12px] text-[#0988f0] hover:text-[#0770c8] transition-colors"
                  >
                    <Activity size={14} />
                    View Logs
                  </button>
                  {hasPermission("webhooks.delete") && (
                    <button className="flex items-center gap-1 text-[12px] text-[#f87171] hover:text-[#ef4444] transition-colors">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <WebhookCreateModal onClose={() => setShowCreateModal(false)} />
      )}

      {viewDeliveriesEndpoint && (
        <WebhookDeliveryLog
          endpoint={viewDeliveriesEndpoint}
          onClose={() => setViewDeliveriesEndpoint(null)}
        />
      )}
    </>
  );
}
