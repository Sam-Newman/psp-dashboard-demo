"use client";

import { HTMLAttributeAnchorTarget, ReactNode, forwardRef } from "react";

import NextLinkComponent, { LinkProps as NextLinkComponentProps } from "next/link";

import { Prefetch, usePrefetch } from "../../hooks/usePrefetch";
import { LinkDefault, LinkDefaultProps } from "./link-default";

interface LinkProps extends LinkDefaultProps {
  prefetch?: Prefetch;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, target = "_self", prefetch = null, children, ...props }, ref) => {
    usePrefetch({ href, target, prefetch });

    return (
      <LinkDefault href={href} target={target} {...props} ref={ref}>
        {children}
      </LinkDefault>
    );
  },
);

type NextLinkProps = NextLinkComponentProps & {
  href: string;
  prefetch?: Prefetch;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  children?: ReactNode;
};

const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ target = "_self", prefetch = null, ...props }, ref) => {
    usePrefetch({ href: props.href, target: target, prefetch });
    return <NextLinkComponent ref={ref} {...props} target={target} prefetch={false} />;
  },
);

Link.displayName = "WalletConnectUI.Link";
NextLink.displayName = "WalletConnectUI.NextLink";

export { Link, NextLink };
export type { LinkProps };
