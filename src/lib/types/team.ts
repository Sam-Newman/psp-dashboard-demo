import type { Role } from "./role";

export type TeamMemberStatus = "active" | "pending" | "disabled";

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: TeamMemberStatus;
  invitedAt: string;
  joinedAt?: string;
  lastActiveAt?: string;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: Role;
  invitedAt: string;
  expiresAt: string;
  invitedBy: string;
}

export const teamMemberStatusLabels: Record<TeamMemberStatus, string> = {
  active: "Active",
  pending: "Pending",
  disabled: "Disabled",
};
