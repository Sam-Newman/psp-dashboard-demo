import React, { HTMLAttributes, forwardRef } from "react";

import { Prefetch } from "../../hooks/usePrefetch";
import { type VariantProps, cn, tv } from "../../lib/tw-utils";
import { NextLink } from "./link";
import { ScrollArea, ScrollBar } from "./scroll-area";

interface CardComponentProps extends HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
  className?: string;
  href?: string;

  target?: "_blank" | "_self";
  fullWidth?: boolean;
}
const cardVariants = tv({
  base: ["flex items-center justify-between gap-4 rounded-5 bg-foreground-primary px-6 py-5 text-secondary"],
  variants: {
    isActive: { true: "bg-foreground-accent-10 ring-1 ring-accent" },
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    },
    isPressable: { true: "cursor-pointer hover:rounded-8" },
  },
  defaultVariants: {
    fullWidth: true,
    isPressable: false,
  },
});

type CardProps = CardComponentProps & VariantProps<typeof cardVariants> & { prefetch?: Prefetch };

const CardDiv = forwardRef<HTMLDivElement, CardProps>(
  ({ className, isActive, fullWidth, isPressable, children, ...props }, ref) => (
    <div
      data-testid="CARD"
      ref={ref}
      className={cardVariants({ isActive, fullWidth, isPressable, className })}
      {...props}
    >
      {children}
    </div>
  ),
);

const CardLink = forwardRef<HTMLAnchorElement, CardProps & { href: string }>(
  ({ className, isActive, fullWidth, isPressable, children, ...props }, ref) => (
    <NextLink
      data-testid="CARD"
      ref={ref}
      className={cardVariants({ isActive, fullWidth, isPressable, className })}
      {...props}
    >
      {children}
    </NextLink>
  ),
);

const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>((props, ref) => {
  return props.href ? (
    <CardLink {...props} href={props.href} ref={ref as React.Ref<HTMLAnchorElement>} />
  ) : (
    <CardDiv {...props} ref={ref as React.Ref<HTMLDivElement>} />
  );
});

function CardHeader({
  title,
  description,
  className,
  cta,
  icon,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  cta?: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <div className={cn("flex flex-col gap-1", className)}>
        {icon && <div className="mb-3">{icon}</div>}
        {typeof title === "string" ? <p className="text-lg text-primary">{title}</p> : title}
        {typeof description === "string" ? <p className="text-md text-secondary">{description}</p> : description}
      </div>
      {cta && <div className="flex items-start gap-2">{cta}</div>}
    </div>
  );
}

type CardScrollableWrapperProps = React.ComponentProps<typeof ScrollArea> & {
  disableVerticalScroll?: boolean;
  disableHorizontalScroll?: boolean;
};

function CardScrollableWrapper({
  children,
  className,
  viewportClassName,
  disableVerticalScroll = false,
  disableHorizontalScroll = true,
  ...props
}: CardScrollableWrapperProps) {
  return (
    <ScrollArea
      className={cn(
        "before:absolute before:left-0 before:right-0 before:top-0 before:z-0 before:block before:h-4 before:rounded-t-3 before:bg-fade-top-foreground-primary",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:z-0 after:block after:h-4 after:rounded-b-3 after:bg-fade-bottom-foreground-primary",
        "relative -mx-6 -my-3 box-content px-6",
        className,
      )}
      viewportClassName={cn("py-3", viewportClassName)}
      {...props}
    >
      {children}
      {!disableVerticalScroll && <ScrollBar orientation="vertical" className="py-3" />}
      {!disableHorizontalScroll && <ScrollBar orientation="horizontal" className="px-3" />}
    </ScrollArea>
  );
}

Card.displayName = "Card";
CardDiv.displayName = "CardDiv";
CardLink.displayName = "CardLink";
CardHeader.displayName = "CardHeader";
CardScrollableWrapper.displayName = "CardScrollableWrapper";

export { Card, CardHeader, CardScrollableWrapper };
export type { CardProps, CardScrollableWrapperProps };
