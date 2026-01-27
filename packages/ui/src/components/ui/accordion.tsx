"use client";

import React, { type ReactNode, forwardRef } from "react";

import * as Aria from "react-aria-components";

import { MinusPlusAnimated } from "../../icons";
import { cn, tv } from "../../lib/tw-utils";

const accordionVariants = tv({
  base: "w-full space-y-1",
});

const accordionItemVariants = tv({
  base: [
    "group flex w-full flex-col justify-center rounded-5 bg-foreground-primary text-primary hover:rounded-9",
    "data-[expanded=true]:bg-foreground-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
    "ease-standard transition-all duration-300",
    "overflow-hidden",
  ],
});

const accordionTriggerVariants = tv({
  base: "flex w-full cursor-pointer flex-col space-y-2 p-7 text-left text-lg text-primary no-underline",
  variants: {
    isExpanded: {
      false: "space-y-0",
    },
  },
});

const accordionContentVariants = tv({
  base: [
    "overflow-hidden text-sm text-secondary",
    "grid",
    "data-[expanded=true]:mt-4",
    "ease-standard transition-[grid-template-rows] duration-200",
    "data-[expanded=false]:grid-rows-[0fr] data-[expanded=false]:opacity-0",
    "data-[expanded=true]:grid-rows-[1fr] data-[expanded=true]:opacity-100",
    "data-[enter]:grid-rows-[1fr]",
  ],
});

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  isExpanded?: boolean;
}

interface TriggerProps {
  isExpanded?: boolean;
  triggerProps?: Aria.ButtonProps;
}

const AccordionGroup = forwardRef<HTMLDivElement, AccordionProps & Aria.DisclosureGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Aria.DisclosureGroup className={accordionVariants({ className })} {...props} ref={ref}>
        {children}
      </Aria.DisclosureGroup>
    );
  },
);

const Accordion = forwardRef<HTMLDivElement, AccordionItemProps>(({ className, children, ...props }, ref) => {
  return (
    <Aria.Disclosure className={accordionItemVariants({ className })} {...props} ref={ref}>
      {({ isExpanded, ...triggerProps }) => {
        // Find trigger and content children
        const childrenArray = Array.isArray(children) ? children : [children];
        const triggerChild = childrenArray.find(
          (child) =>
            child &&
            typeof child === "object" &&
            "type" in child &&
            child.type?.displayName === "WalletConnectUI.AccordionTrigger",
        );
        const contentChild = childrenArray.find(
          (child) =>
            child &&
            typeof child === "object" &&
            "type" in child &&
            child.type?.displayName === "WalletConnectUI.AccordionContent",
        );

        return (
          <>
            <Aria.Heading className="flex w-full cursor-pointer items-center justify-between">
              <Aria.Button
                {...triggerProps}
                slot="trigger"
                className={accordionTriggerVariants({ isExpanded, className })}
                {...props}
              >
                {triggerChild &&
                  React.cloneElement(triggerChild as React.ReactElement<TriggerProps>, {
                    isExpanded,
                  })}

                {contentChild &&
                  React.cloneElement(contentChild as React.ReactElement<AccordionContentProps>, {
                    isExpanded,
                  })}
              </Aria.Button>
            </Aria.Heading>
          </>
        );
      }}
    </Aria.Disclosure>
  );
});

const AccordionTrigger = forwardRef<HTMLDivElement, AccordionTriggerProps & TriggerProps>(
  ({ className, children, isExpanded }, ref) => {
    return (
      <div className={cn("flex w-full", className)} ref={ref}>
        <p className="w-full text-left text-lg text-primary">{children}</p>
        <MinusPlusAnimated className="size-5 text-secondary" isPlus={isExpanded} />
      </div>
    );
  },
);

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, isExpanded, ...props }, ref) => {
    return (
      <div
        className={accordionContentVariants({ className })}
        data-expanded={isExpanded}
        aria-hidden={!isExpanded}
        {...props}
        ref={ref}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    );
  },
);

Accordion.displayName = "WalletConnectUI.Accordion";
AccordionGroup.displayName = "WalletConnectUI.AccordionGroup";
AccordionTrigger.displayName = "WalletConnectUI.AccordionTrigger";
AccordionContent.displayName = "WalletConnectUI.AccordionContent";

export { AccordionGroup, Accordion, AccordionTrigger, AccordionContent };
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps };
