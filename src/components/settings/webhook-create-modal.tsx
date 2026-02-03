"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

import type { WebhookEvent } from "@/lib/types/webhook";
import { webhookEventLabels, webhookEventCategories } from "@/lib/types/webhook";

interface WebhookCreateModalProps {
  onClose: () => void;
}

export function WebhookCreateModal({ onClose }: WebhookCreateModalProps) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<WebhookEvent[]>([]);

  const toggleEvent = (event: WebhookEvent) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    );
  };

  const toggleCategory = (events: WebhookEvent[]) => {
    const allSelected = events.every((e) => selectedEvents.includes(e));
    if (allSelected) {
      setSelectedEvents((prev) => prev.filter((e) => !events.includes(e)));
    } else {
      setSelectedEvents((prev) => [...new Set([...prev, ...events])]);
    }
  };

  const handleCreate = () => {
    if (!url.trim() || selectedEvents.length === 0) return;
    // In a real app, this would call an API to create the endpoint
    console.log("Creating webhook:", { url, description, events: selectedEvents });
    onClose();
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-[20px] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Add Webhook Endpoint
          </h2>
          <button
            onClick={onClose}
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
              Endpoint URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/webhooks"
              className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px] font-mono"
            />
            {url && !isValidUrl(url) && (
              <p className="text-[12px] text-[#f87171] tracking-[-0.12px] mt-1">
                Please enter a valid URL
              </p>
            )}
          </div>

          <div>
            <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Production payment notifications"
              className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-3">
              Events to listen for
            </label>
            <div className="space-y-4">
              {Object.entries(webhookEventCategories).map(([category, events]) => {
                const allSelected = events.every((e) => selectedEvents.includes(e));
                const someSelected = events.some((e) => selectedEvents.includes(e));

                return (
                  <div key={category} className="bg-[#1a1a1a] rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          allSelected
                            ? "bg-[#0988f0] border-[#0988f0]"
                            : someSelected
                            ? "bg-[#0988f0]/50 border-[#0988f0]"
                            : "border-[#4f4f4f]"
                        }`}
                        onClick={() => toggleCategory(events)}
                      >
                        {(allSelected || someSelected) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                      <span className="text-[14px] text-white tracking-[-0.14px] font-medium">
                        {category} Events
                      </span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 ml-8">
                      {events.map((event) => (
                        <label
                          key={event}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              selectedEvents.includes(event)
                                ? "bg-[#0988f0] border-[#0988f0]"
                                : "border-[#4f4f4f]"
                            }`}
                            onClick={() => toggleEvent(event)}
                          >
                            {selectedEvents.includes(event) && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <span className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                            {webhookEventLabels[event]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
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
            onClick={handleCreate}
            disabled={!url.trim() || !isValidUrl(url) || selectedEvents.length === 0}
            className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Endpoint
          </button>
        </div>
      </div>
    </div>
  );
}
