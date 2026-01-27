import * as React from "react";
import { forwardRef } from "react";

import * as Aria from "react-aria-components";

import { cn } from "../../lib/tw-utils";

const FieldError = forwardRef<HTMLSpanElement, Aria.FieldErrorProps & { className?: string }>(
  ({ className, ...props }, ref) => (
    <Aria.FieldError className={cn("break-all text-md text-error", className)} {...props} ref={ref} />
  ),
);

FieldError.displayName = "WalletConnectUI.FieldError";

export { FieldError };
