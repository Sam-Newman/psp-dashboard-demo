import type { TeamMember, TeamInvite } from "@/lib/types/team";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "usr_001",
    email: "john@psp.com",
    name: "John Smith",
    role: "admin",
    status: "active",
    invitedAt: "2024-01-01T10:00:00Z",
    joinedAt: "2024-01-01T10:05:00Z",
    lastActiveAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "usr_002",
    email: "sarah@psp.com",
    name: "Sarah Johnson",
    role: "admin",
    status: "active",
    invitedAt: "2024-01-15T09:00:00Z",
    joinedAt: "2024-01-15T09:30:00Z",
    lastActiveAt: "2024-03-20T11:00:00Z",
  },
  {
    id: "usr_003",
    email: "mike@psp.com",
    name: "Mike Davis",
    role: "support",
    status: "active",
    invitedAt: "2024-02-01T14:00:00Z",
    joinedAt: "2024-02-02T09:00:00Z",
    lastActiveAt: "2024-03-19T17:45:00Z",
  },
  {
    id: "usr_004",
    email: "emily@psp.com",
    name: "Emily Chen",
    role: "support",
    status: "pending",
    invitedAt: "2024-03-18T16:00:00Z",
  },
  {
    id: "usr_005",
    email: "alex@psp.com",
    name: "Alex Rivera",
    role: "support",
    status: "disabled",
    invitedAt: "2023-06-01T10:00:00Z",
    joinedAt: "2023-06-01T11:00:00Z",
    lastActiveAt: "2024-01-15T12:00:00Z",
  },
];

export const mockTeamInvites: TeamInvite[] = [
  {
    id: "inv_001",
    email: "emily@psp.com",
    role: "support",
    invitedAt: "2024-03-18T16:00:00Z",
    expiresAt: "2024-03-25T16:00:00Z",
    invitedBy: "John Smith",
  },
];

export function getTeamMemberById(id: string): TeamMember | undefined {
  return mockTeamMembers.find((m) => m.id === id);
}

export function getActiveTeamMembers(): TeamMember[] {
  return mockTeamMembers.filter((m) => m.status === "active");
}

export function getPendingInvites(): TeamMember[] {
  return mockTeamMembers.filter((m) => m.status === "pending");
}
