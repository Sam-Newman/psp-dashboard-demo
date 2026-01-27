"use client";

import { cloneElement, forwardRef, useRef } from "react";

import { mergeProps, useButton } from "react-aria";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";

import { OverlayArrow } from "./overlay-arrow";
import { popoverVariants } from "./popover";

const TooltipTrigger = ({ delay = 300, closeDelay = 300, ...props }: Aria.TooltipTriggerComponentProps) => (
  <Aria.TooltipTrigger delay={delay} closeDelay={closeDelay} {...props} />
);

const Tooltip = forwardRef<HTMLDivElement, Aria.TooltipProps>(
  ({ className, offset = 8, placement = "top", children, ...props }, ref) => (
    <Aria.Tooltip
      ref={ref}
      offset={offset}
      placement={placement}
      className={composeRenderProps(className, (className) => popoverVariants({ className }))}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          <OverlayArrow placement={placement} />
          {children}
        </>
      ))}
    </Aria.Tooltip>
  ),
);

// Wrapper for non Button elements: https://github.com/adobe/react-spectrum/issues/5733
function TooltipTriggerWrapper(props: { children: React.ReactElement }) {
  const triggerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = props.children.props as any;
  const { buttonProps } = useButton(childProps, triggerRef);
  return cloneElement(props.children, mergeProps(buttonProps, childProps, { ref: triggerRef }));
}

TooltipTrigger.displayName = "WalletConnectUI.TooltipTrigger";
Tooltip.displayName = "WalletConnectUI.Tooltip";

export { TooltipTrigger, TooltipTriggerWrapper, Tooltip };
