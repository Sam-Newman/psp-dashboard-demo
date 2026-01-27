"use client";

import * as React from "react";
import { forwardRef } from "react";

import { ArrowSquareOut as ExternalLinkIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";

import { buttonVariants } from "./button";

interface LinkDefaultProps extends Aria.LinkProps, Omit<VariantProps<typeof buttonVariants>, "fullWidth"> {
  hideExternalLinkIcon?: boolean;
  fullWidth?: boolean;
}

const LinkDefault = forwardRef<HTMLAnchorElement, LinkDefaultProps>(
  (
    {
      href,
      className,
      variant = "link",
      hideExternalLinkIcon = false,
      size,
      target = "_self",
      children,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    return (
      <Aria.Link
        className={composeRenderProps(className, (className) =>
          buttonVariants({ variant, size, className, fullWidth }),
        )}
        {...props}
        href={href}
        target={target}
        ref={ref}
      >
        {composeRenderProps(children, (children) => (
          <>
            {children}
            {target === "_blank" && !hideExternalLinkIcon ? <ExternalLinkIcon /> : null}
          </>
        ))}
      </Aria.Link>
    );
  },
);

LinkDefault.displayName = "WalletConnectUI.LinkDefault";

export { LinkDefault };
export type { LinkDefaultProps };
