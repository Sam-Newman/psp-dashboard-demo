import * as React from "react";

import { Info as InfoIcon, Question as QuestionIcon } from "@phosphor-icons/react";
import { composeRenderProps } from "react-aria-components";

import { cn } from "../../lib/tw-utils";
import { Button, type ButtonProps } from "./button";
import { Popover, PopoverTrigger } from "./popover";

type ContextualHelpProps = {
  variant: "info" | "help";
  size?: ButtonProps["size"];
  className?: string;
  triggerClassName?: string;
  children: React.ReactNode;
};

function ContextualHelp({ variant = "help", size = "md", className, triggerClassName, children }: ContextualHelpProps) {
  const Icon = variant === "info" ? InfoIcon : QuestionIcon;

  return (
    <PopoverTrigger>
      <Button
        variant="icon"
        size={size}
        className={cn("ml-0.5", triggerClassName)}
        data-testid="CONTEXTUAL_HELP_TRIGGER"
      >
        <Icon weight="fill" />
      </Button>

      <Popover className={composeRenderProps(className, (className) => cn("p-4", className))}>
        <div className="flex flex-col gap-2">{children}</div>
      </Popover>
    </PopoverTrigger>
  );
}

function ContextualHelpTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-invert text-lg">{children}</p>;
}

function ContextualHelpDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-invert text-md">{children}</p>;
}

ContextualHelp.displayName = "WalletConnectUI.ContextualHelp";
ContextualHelpTitle.displayName = "WalletConnectUI.ContextualHelpTitle";
ContextualHelpDescription.displayName = "WalletConnectUI.ContextualHelpDescription";

export { ContextualHelp, ContextualHelpTitle, ContextualHelpDescription };
export type { ContextualHelpProps };
