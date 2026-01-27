"use client";

import { forwardRef } from "react";

import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";

import { cn, tv } from "../../lib/tw-utils";

const switchVariants = tv({
  slots: {
    container: [
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-gray-300 bg-gray-300 transition-colors dark:border-gray-700 dark:bg-gray-700",
      /* Focus Visible */
      "group-data-[focus-visible]:ring-4 group-data-[focus-visible]:ring-accent/40",
      /* Disabled */
      "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-60",
      /* Selected */
      "group-data-[selected]:border-accent group-data-[selected]:bg-accent",
      /* Readonly */
      "group-data-[readonly]:cursor-auto",
      /* Resets */
      "focus-visible:outline-none",
    ],

    thumb: "pointer-events-none block translate-x-0 rounded-full bg-white shadow-lg ring-0 transition-transform",
  },

  variants: {
    size: {
      sm: {
        container: "h-[1.375rem] w-8 border-[3px]",
        thumb: "size-4 group-data-[selected]:translate-x-[10px]",
      },

      md: {
        container: "h-7 w-10 border-4",
        thumb: "size-5 group-data-[selected]:translate-x-3",
      },

      lg: {
        container: "h-8 w-12 border-4",
        thumb: "size-6 group-data-[selected]:translate-x-4",
      },
    },
  },

  defaultVariants: {
    size: "lg",
  },
});

interface SwitchProps extends Aria.SwitchProps, VariantProps<typeof switchVariants> {}

const Switch = forwardRef<HTMLLabelElement, SwitchProps>(({ children, size, className, ...props }, ref) => {
  const { container, thumb } = switchVariants({ size });

  return (
    <Aria.Switch
      className={composeRenderProps(className, (className) =>
        cn(
          "group inline-flex items-center gap-2 text-md leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
          className,
        ),
      )}
      {...props}
      ref={ref}
    >
      {composeRenderProps(children, (children) => (
        <>
          <div className={container()}>
            <div className={thumb()} />
          </div>
          {children}
        </>
      ))}
    </Aria.Switch>
  );
});

Switch.displayName = "WalletConnectUI.Switch";

export { Switch, switchVariants };
