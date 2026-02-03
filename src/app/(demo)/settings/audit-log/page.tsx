"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import { AccessDenied } from "@/components/shared/access-denied";
import { useRole } from "@/lib/hooks/use-role";
import { mockAuditLogs } from "@/lib/mock-data/audit-logs";
import type { AuditAction, AuditResourceType, AuditLog } from "@/lib/types/audit";
import {
  auditActionLabels,
  auditResourceTypeLabels,
  auditActionColors,
} from "@/lib/types/audit";

export default function AuditLogPage() {
  const { hasPermission } = useRole();
  const [actionFilter, setActionFilter] = useState<AuditAction | "all">("all");
  const [resourceFilter, setResourceFilter] = useState<AuditResourceType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!hasPermission("auditLogs.view")) {
    return (
      <div className="p-8">
        <AccessDenied feature="audit logs" />
      </div>
    );
  }

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      if (actionFilter !== "all" && log.action !== actionFilter) return false;
      if (resourceFilter !== "all" && log.resource.type !== resourceFilter) return false;
      return true;
    });
  }, [actionFilter, resourceFilter]);

  const hasActiveFilters = actionFilter !== "all" || resourceFilter !== "all";

  const clearFilters = () => {
    setActionFilter("all");
    setResourceFilter("all");
  };

  const formatTimestamp = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionDescription = (log: AuditLog) => {
    const resourceType = auditResourceTypeLabels[log.resource.type].toLowerCase();
    const resourceName = log.resource.name || log.resource.id;

    switch (log.action) {
      case "invited":
        return `Invited ${resourceName} as ${resourceType}`;
      case "removed":
        return `Removed ${resourceName} from team`;
      case "revoked":
        return `Revoked ${resourceType} "${resourceName}"`;
      default:
        return `${auditActionLabels[log.action]} ${resourceType} "${resourceName}"`;
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/settings"
          className="text-[#bbb] hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-[24px] text-white tracking-[-0.24px]">
            Audit Log
          </h1>
          <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            A history of actions taken in your account
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors text-[14px] tracking-[-0.14px] ${
            showFilters || hasActiveFilters
              ? "bg-[#0988f0] text-white"
              : "bg-[#252525] border border-[#4f4f4f] text-[#bbb] hover:text-white"
          }`}
        >
          <Filter size={20} />
          Filters
          {hasActiveFilters && (
            <span className="bg-white text-[#0988f0] rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
              {[actionFilter, resourceFilter].filter((f) => f !== "all").length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 bg-[#363636] hover:bg-[#4f4f4f] text-white rounded-lg transition-colors text-[14px] tracking-[-0.14px]"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-[#252525] rounded-[20px] p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Action Type
              </label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as AuditAction | "all")}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Actions</option>
                {(Object.keys(auditActionLabels) as AuditAction[]).map((action) => (
                  <option key={action} value={action}>
                    {auditActionLabels[action]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[14px] text-[#bbb] tracking-[-0.14px] mb-2">
                Resource Type
              </label>
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value as AuditResourceType | "all")}
                className="w-full bg-[#1a1a1a] border border-[#4f4f4f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0988f0] text-[14px] tracking-[-0.14px]"
              >
                <option value="all">All Resources</option>
                {(Object.keys(auditResourceTypeLabels) as AuditResourceType[]).map((type) => (
                  <option key={type} value={type}>
                    {auditResourceTypeLabels[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log List */}
      <div className="bg-[#252525] rounded-[20px] overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[14px] text-[#bbb] tracking-[-0.14px]">
              No audit logs match your filters
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#363636]">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4">
                <button
                  onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[14px] tracking-[-0.14px] font-medium ${auditActionColors[log.action]}`}>
                        {auditActionLabels[log.action]}
                      </span>
                      <span className="text-[12px] text-[#666] tracking-[-0.12px]">
                        {auditResourceTypeLabels[log.resource.type]}
                      </span>
                    </div>
                    <p className="text-[14px] text-white tracking-[-0.14px]">
                      {getActionDescription(log)}
                    </p>
                    <p className="text-[12px] text-[#bbb] tracking-[-0.12px] mt-1">
                      by {log.actor.name} • {formatTimestamp(log.timestamp)}
                    </p>
                  </div>
                  {expandedId === log.id ? (
                    <ChevronUp size={20} className="text-[#bbb] flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown size={20} className="text-[#bbb] flex-shrink-0 mt-1" />
                  )}
                </button>

                {expandedId === log.id && (
                  <div className="mt-4 pt-4 border-t border-[#363636]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                          Actor
                        </div>
                        <div className="text-[14px] text-white tracking-[-0.14px]">
                          {log.actor.name}
                        </div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px]">
                          {log.actor.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                          Resource
                        </div>
                        <div className="text-[14px] text-white tracking-[-0.14px]">
                          {log.resource.name || log.resource.id}
                        </div>
                        <div className="text-[12px] text-[#bbb] tracking-[-0.12px] font-mono">
                          {log.resource.id}
                        </div>
                      </div>
                      {log.ipAddress && (
                        <div>
                          <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                            IP Address
                          </div>
                          <div className="text-[14px] text-white tracking-[-0.14px] font-mono">
                            {log.ipAddress}
                          </div>
                        </div>
                      )}
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="col-span-2">
                          <div className="text-[12px] text-[#bbb] tracking-[-0.12px] mb-1">
                            Details
                          </div>
                          <pre className="bg-[#1a1a1a] rounded-lg p-3 text-[12px] text-white font-mono overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="border-t border-[#4f4f4f] px-6 py-4">
          <div className="text-[14px] text-[#bbb] tracking-[-0.14px]">
            Showing {filteredLogs.length} of {mockAuditLogs.length} audit entries
          </div>
        </div>
      </div>
    </div>
  );
}
