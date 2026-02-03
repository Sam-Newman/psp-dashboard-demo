"use client";

import { useState } from "react";
import { Plus, MoreVertical, Trash2, UserX } from "lucide-react";

import { useRole } from "@/lib/hooks/use-role";
import { roleLabels } from "@/lib/types/role";
import type { TeamMember } from "@/lib/types/team";
import { mockTeamMembers } from "@/lib/mock-data/team";
import { TeamInviteModal } from "./team-invite-modal";
import { TeamMemberRemoveModal } from "./team-member-remove-modal";

export function TeamMemberList() {
  const { hasPermission } = useRole();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [removeMember, setRemoveMember] = useState<TeamMember | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const formatLastActive = (date?: string) => {
    if (!date) return "Never";
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "bg-[#1a4d2e] text-[#4ade80]";
      case "pending":
        return "bg-[#4d3d1a] text-[#fbbf24]";
      case "disabled":
        return "bg-[#363636] text-[#9a9a9a]";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="space-y-3">
        {mockTeamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#1a1a1a] rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0988f0] flex items-center justify-center text-white text-[14px]">
                {getInitials(member.name)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-white tracking-[-0.14px]">
                    {member.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] tracking-[-0.10px] ${getStatusColor(member.status)}`}>
                    {member.status === "active" ? "Active" : member.status === "pending" ? "Pending" : "Disabled"}
                  </span>
                </div>
                <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                  {member.email}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <span className="bg-[#363636] px-3 py-1 rounded text-[12px] text-[#bbb] tracking-[-0.12px]">
                  {roleLabels[member.role]}
                </span>
                <div className="text-[10px] text-[#666] tracking-[-0.10px] mt-1">
                  {member.status === "pending" ? "Invite sent" : `Active ${formatLastActive(member.lastActiveAt)}`}
                </div>
              </div>
              {hasPermission("team.remove") && member.status !== "disabled" && (
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                    className="text-[#bbb] hover:text-white transition-colors p-1"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {openMenuId === member.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenuId(null)}
                      />
                      <div className="absolute right-0 top-full mt-1 bg-[#252525] border border-[#4f4f4f] rounded-lg shadow-lg z-20 min-w-[140px]">
                        {member.status === "active" && (
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              // Handle disable
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-[14px] text-[#bbb] hover:text-white hover:bg-[#363636] transition-colors"
                          >
                            <UserX size={16} />
                            Disable
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            setRemoveMember(member);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-[14px] text-[#f87171] hover:text-[#ef4444] hover:bg-[#363636] transition-colors"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasPermission("team.invite") && (
        <button
          onClick={() => setShowInviteModal(true)}
          className="mt-4 w-full py-3 border border-[#4f4f4f] rounded-lg text-white hover:bg-[#2a2a2a] transition-colors text-[14px] tracking-[-0.14px] flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Invite Team Member
        </button>
      )}

      {showInviteModal && (
        <TeamInviteModal onClose={() => setShowInviteModal(false)} />
      )}

      {removeMember && (
        <TeamMemberRemoveModal
          member={removeMember}
          onClose={() => setRemoveMember(null)}
        />
      )}
    </>
  );
}
