"use client";

import { LockSimple } from "@phosphor-icons/react";

import { Card } from "@pay-merchant/ui/ui/card";

interface AccessDeniedProps {
  feature: string;
}

export function AccessDenied({ feature }: AccessDeniedProps) {
  return (
    <Card className="flex flex-col items-center py-16">
      <div className="flex size-16 items-center justify-center rounded-full bg-foreground-secondary">
        <LockSimple className="size-8 text-secondary" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">Access Restricted</h3>
      <p className="mt-2 text-center text-secondary">
        Your role does not have permission to view {feature}.
      </p>
      <p className="mt-1 text-center text-sm text-tertiary">
        Contact your administrator for access.
      </p>
    </Card>
  );
}
