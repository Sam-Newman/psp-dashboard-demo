"use client";

import { useState } from "react";
import { X, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";

import type { WebhookEndpoint, WebhookDelivery } from "@/lib/types/webhook";
import { webhookEventLabels } from "@/lib/types/webhook";
import { getDeliveriesByEndpoint } from "@/lib/mock-data/webhooks";

interface WebhookDeliveryLogProps {
  endpoint: WebhookEndpoint;
  onClose: () => void;
}

export function WebhookDeliveryLog({ endpoint, onClose }: WebhookDeliveryLogProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const deliveries = getDeliveriesByEndpoint(endpoint.id);

  const getStatusIcon = (status: WebhookDelivery["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle size={16} className="text-[#4ade80]" />;
      case "failed":
        return <XCircle size={16} className="text-[#f87171]" />;
      case "pending":
        return <Clock size={16} className="text-[#fbbf24]" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-[20px] p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[20px] text-white tracking-[-0.20px]">
              Delivery Logs
            </h2>
            <p className="text-[12px] text-[#bbb] tracking-[-0.12px] font-mono mt-1">
              {endpoint.url}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {deliveries.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-lg p-6 text-center">
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
              No deliveries yet
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === delivery.id ? null : delivery.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(delivery.status)}
                    <div className="text-left">
                      <div className="text-[14px] text-white tracking-[-0.14px]">
                        {webhookEventLabels[delivery.event]}
                      </div>
                      <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                        {formatTimestamp(delivery.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {delivery.statusCode && (
                      <span
                        className={`text-[12px] tracking-[-0.12px] ${
                          delivery.statusCode >= 200 && delivery.statusCode < 300
                            ? "text-[#4ade80]"
                            : "text-[#f87171]"
                        }`}
                      >
                        {delivery.statusCode}
                      </span>
                    )}
                    {delivery.duration && (
                      <span className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                        {delivery.duration}ms
                      </span>
                    )}
                    {expandedId === delivery.id ? (
                      <ChevronUp size={16} className="text-[#bbb]" />
                    ) : (
                      <ChevronDown size={16} className="text-[#bbb]" />
                    )}
                  </div>
                </button>

                {expandedId === delivery.id && (
                  <div className="px-4 pb-4 border-t border-[#363636]">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-2">
                          Request Body
                        </div>
                        <pre className="bg-[#252525] rounded-lg p-3 text-[11px] text-white font-mono overflow-x-auto whitespace-pre-wrap">
                          {delivery.requestBody}
                        </pre>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-2">
                          Response
                        </div>
                        <pre className="bg-[#252525] rounded-lg p-3 text-[11px] text-white font-mono overflow-x-auto whitespace-pre-wrap">
                          {delivery.responseBody || "No response body"}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
