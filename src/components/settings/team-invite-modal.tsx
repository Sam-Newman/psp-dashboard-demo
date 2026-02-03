"use client";

import { useState } from "react";
import { X, Mail } from "lucide-react";

import type { Role } from "@/lib/types/role";
import { roleLabels, roleDescriptions } from "@/lib/types/role";

interface TeamInviteModalProps {
  onClose: () => void;
}

export function TeamInviteModal({ onClose }: TeamInviteModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("support");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes("@")) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);

    // Auto-close after showing success
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#252525] rounded-[20px] p-6 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-[#1a4d2e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-[#4ade80]" size={32} />
          </div>
          <h2 className="text-[20px] text-white tracking-[-0.20px] mb-2">
            Invitation Sent!
          </h2>
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            An invitation email has been sent to <span className="text-white">{email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#252525] rounded-[20px] p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] text-white tracking-[-0.20px]">
            Invite Team Member
          </h2>
          <button
            onClick={onClose}
            className="text-[#bbb] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
            />
          </div>

          <div>
            <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
              Role
            </label>
            <div className="space-y-2">
              {(["admin", "support"] as Role[]).map((r) => (
                <label
                  key={r}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    role === r
                      ? "bg-[#0988f0]/10 border-[#0988f0]"
                      : "bg-[#1a1a1a] border-[#4f4f4f] hover:border-[#666]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={() => setRole(r)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-[14px] text-white tracking-[-0.14px] font-medium">
                      {roleLabels[r]}
                    </div>
                    <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                      {roleDescriptions[r]}
                    </div>
                  </div>
                </label>
              ))}
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
            onClick={handleSubmit}
            disabled={!email.trim() || !email.includes("@") || isSubmitting}
            className="px-6 py-3 bg-[#0988f0] hover:bg-[#0770c8] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail size={16} />
                Send Invitation
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
