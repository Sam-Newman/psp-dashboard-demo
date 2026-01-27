"use client";

import { forwardRef } from "react";

import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps, tv } from "tailwind-variants";

import { OverlayArrow } from "./overlay-arrow";

const PopoverTrigger = Aria.DialogTrigger;

const popoverVariants = tv({
  base: [
    "z-50 shadow-md",
    /* Entering */
    "entering:animate-in entering:fade-in-0 entering:zoom-in-90",
    /* Exiting */
    "exiting:animate-out exiting:fade-out-0 exiting:zoom-out-90",
    /* Placement */
    "placement-left:slide-in-from-right-2 placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
  ],

  variants: {
    variant: {
      default: "max-w-xs rounded-2 bg-gray-100 px-3 py-2 text-md text-primary dark:bg-gray-900",
      menu: "w-[13.75rem] overflow-auto rounded-3 border border-primary bg-primary p-1 text-primary outline-none",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

interface BasePopoverProps extends Aria.PopoverProps, VariantProps<typeof popoverVariants> {
  showOverlayArrow?: boolean;
  shouldFlip?: boolean;
  containerPadding?: number;
}

const BasePopover = forwardRef<HTMLDivElement, BasePopoverProps>(
  (
    {
      className,
      variant,
      offset = 4,
      children,
      placement = "bottom",
      showOverlayArrow = false,
      shouldFlip = true,
      containerPadding = 30,
      ...props
    },
    ref,
  ) => (
    <Aria.Popover
      ref={ref}
      offset={offset}
      placement={placement}
      shouldFlip={shouldFlip}
      containerPadding={containerPadding}
      className={composeRenderProps(className, (className) => popoverVariants({ variant, className }))}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          {showOverlayArrow && <OverlayArrow placement={placement} />}
          {children}
        </>
      ))}
    </Aria.Popover>
  ),
);

const Popover = forwardRef<HTMLDivElement, Aria.PopoverProps>(({ children, ...props }, ref) => (
  <BasePopover {...props} ref={ref}>
    {composeRenderProps(children, (children) => (
      <Aria.Dialog className="outline-none">{children}</Aria.Dialog>
    ))}
  </BasePopover>
));

BasePopover.displayName = "WalletConnectUI.BasePopover";
Popover.displayName = "WalletConnectUI.Popover";

export { PopoverTrigger, BasePopover, Popover, popoverVariants };
