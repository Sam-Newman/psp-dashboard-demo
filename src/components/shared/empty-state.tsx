"use client";

import { FolderOpen } from "@phosphor-icons/react";

import { Card } from "@pay-merchant/ui/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center py-16">
      <div className="flex size-16 items-center justify-center rounded-full bg-foreground-secondary">
        <FolderOpen className="size-8 text-secondary" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-center text-secondary">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
