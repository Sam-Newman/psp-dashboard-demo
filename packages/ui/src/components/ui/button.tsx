"use client";

import { type ReactNode, forwardRef } from "react";

import { CircleNotchIcon as LoadingCircleIcon } from "@phosphor-icons/react/dist/ssr";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";

import { tv } from "../../lib/tw-utils";

const buttonVariants = tv({
  base: [
    "inline-flex w-fit touch-manipulation items-center justify-center whitespace-nowrap transition-[border-radius]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "pending:cursor-not-allowed",
    "hover:rounded-9",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40",
    "focus:outline-none",
  ],

  variants: {
    variant: {
      accent: "bg-accent text-inverse",
      neutral: "bg-inverse text-inverse",
      "neutral-secondary": "bg-none text-primary shadow-[0_0_0_1px] shadow-secondary",
      "neutral-tertiary": "bg-foreground-primary text-primary",
      error: "bg-error text-white",
      link: "bg-transparent text-secondary underline underline-offset-4 hover:text-tertiary focus-visible:text-accent focus-visible:ring-0",
      "link-secondary":
        "bg-transparent text-tertiary hover:text-primary focus-visible:text-accent focus-visible:ring-0 current:text-primary",
      icon: "bg-transparent disabled:bg-transparent text-icon-inverse hover:bg-foreground-secondary",
      "icon-accent": "bg-accent text-inverse",
      "icon-secondary": "bg-transparent text-icon-inverse shadow-[0_0_0_1px] shadow-secondary",
      menu: "bg-transparent text-primary md:hover:bg-foreground-secondary",
    },

    isCurrent: {
      true: "",
    },

    size: {
      sm: "h-7 gap-1 rounded-2 px-3 py-2 text-sm hover:disabled:rounded-2 [&_svg]:size-3",
      md: "h-[2.375rem] gap-1.5 rounded-3 px-4 py-3 text-md hover:disabled:rounded-3 [&_svg]:size-[0.875rem]",
      lg: "h-12 gap-2 rounded-4 px-5 py-4 text-lg hover:disabled:rounded-4 [&_svg]:size-4",
    },

    fullWidth: { true: "w-full" },
  },

  compoundVariants: [
    { fullWidth: true, className: "pressed:scale-[0.99]" },
    { fullWidth: false, className: "pressed:scale-[0.97]" },
    { variant: ["link", "link-secondary"], className: "rounded-none h-auto p-0" },
    {
      variant: ["neutral", "neutral-secondary", "neutral-tertiary"],
      className: "current:bg-accent/10 current:text-primary current:shadow-[0_0_0_1px] current:shadow-accent",
    },
    {
      variant: ["neutral", "neutral-secondary", "neutral-tertiary"],
      isCurrent: true,
      className: "bg-accent/10 text-primary shadow-[0_0_0_1px] shadow-accent",
    },
    { variant: "icon", size: "lg", className: "rounded-4 hover:rounded-4" },
    { variant: "icon", size: "md", className: "rounded-3 hover:rounded-3" },
    { variant: "icon", size: "sm", className: "rounded-2 hover:rounded-2" },
    { variant: ["icon", "icon-accent", "icon-secondary"], className: "p-0" },
    { variant: ["icon", "icon-accent", "icon-secondary"], size: "lg", className: "size-12 [&_svg]:size-6" },
    { variant: ["icon", "icon-accent", "icon-secondary"], size: "md", className: "size-[2.375rem] [&_svg]:size-5" },
    { variant: ["icon", "icon-accent", "icon-secondary"], size: "sm", className: "size-7 [&_svg]:size-4" },
    { variant: "menu", className: "h-fit px-0 py-0.5 pressed:scale-100 hover:rounded-3 md:h-auto md:p-3" },
    { variant: ["menu", "link"], size: "sm", className: "text-sm" },
    { variant: ["menu", "link"], size: "md", className: "text-md" },
    { variant: ["menu", "link"], size: "lg", className: "text-lg" },
  ],

  defaultVariants: {
    variant: "accent",
    size: "lg",
    fullWidth: false,
    isCurrent: false,
  },
});

interface ButtonProps extends Aria.ButtonProps, VariantProps<typeof buttonVariants> {
  pendingContent?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, isPending, pendingContent, children, isCurrent, ...props }: ButtonProps,
    ref,
  ) => {
    return (
      <Aria.Button
        isPending={isPending}
        className={composeRenderProps(className, (className) =>
          buttonVariants({ variant, size, fullWidth, className, isCurrent }),
        )}
        {...props}
        ref={ref}
      >
        {isPending ? (
          <>
            <LoadingCircleIcon className="!size-[1.25em] animate-spin-fast" weight="bold" />
            {pendingContent}
          </>
        ) : (
          children
        )}
      </Aria.Button>
    );
  },
);

Button.displayName = "WalletConnectUI.Button";

export { Button, buttonVariants };
export type { ButtonProps };
