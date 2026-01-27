"use client";

import React, { forwardRef, useContext } from "react";

import { Check as CheckIcon, Minus as MinusIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";

import { cn, tv } from "../../lib/tw-utils";
import { Button } from "./button";
import { FieldError } from "./field-error";
import { Label, labelVariants } from "./label";
import { NativeScrollArea } from "./native-scroll-area";

const checkboxCardStyles = tv({
  base: [
    "min-h-[4.5rem] justify-between gap-4 rounded-5 bg-foreground-primary p-6",
    "transition-all hover:rounded-8 hover:data-[disabled]:rounded-5",
    "selected:bg-foreground-accent-10 selected:ring-1 selected:ring-accent",
    "indeterminate:bg-foreground-accent-10",
    "invalid:indeterminate:bg-error/20 invalid:selected:bg-error/20",
  ],
});

const checkboxVariants = tv({
  slots: {
    container: "group flex items-center gap-x-2 hover:cursor-pointer hover:data-[disabled]:cursor-not-allowed",

    element: [
      "flex shrink-0 items-center justify-center border border-gray-400 transition-colors dark:border-gray-700",
      /*  Focus Visible */
      "group-data-[focus-visible]:border-accent group-data-[focus-visible]:ring-4 group-data-[focus-visible]:ring-accent/40",
      /* Selected */
      "group-data-[selected]:border-accent group-data-[selected]:bg-accent",
      /* Indeterminate */
      "group-data-[indeterminate]:border-accent group-data-[indeterminate]:bg-accent",
      /* Disabled */
      "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-60",
      /* Invalid */
      "group-data-[invalid]:border-error group-data-[invalid]:group-data-[indeterminate]:border-error group-data-[invalid]:group-data-[selected]:border-error group-data-[invalid]:group-data-[indeterminate]:bg-error group-data-[invalid]:group-data-[selected]:bg-error",
      /* Resets */
      "focus:outline-none focus-visible:outline-none",
    ],

    icon: "text-white",
  },

  variants: {
    variant: {
      default: "",
      card: { container: checkboxCardStyles() },
    },

    size: {
      sm: {
        element: "size-4 rounded-[0.375rem]",
        icon: "size-2",
      },

      md: {
        element: "size-5 rounded-2",
        icon: "size-3",
      },

      lg: {
        element: "size-6 rounded-[0.625rem]",
        icon: "size-4",
      },
    },
  },

  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

interface CheckboxProps extends Aria.CheckboxProps, VariantProps<typeof checkboxVariants> {}

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const { container, element, icon } = checkboxVariants({ variant, size });

    return (
      <Aria.Checkbox
        validationBehavior="aria"
        className={composeRenderProps(className, (className) => cn(container(), labelVariants(), className))}
        {...props}
        ref={ref}
      >
        {composeRenderProps(children, (children, renderProps) => (
          <>
            <div className={element({ className: variant === "card" && "order-last" })}>
              {renderProps.isIndeterminate ? (
                <MinusIcon className={icon()} />
              ) : renderProps.isSelected ? (
                <CheckIcon className={icon()} />
              ) : null}
            </div>

            <div className="flex gap-4">{children}</div>
          </>
        ))}
      </Aria.Checkbox>
    );
  },
);

type CheckboxGroupProps = Aria.CheckboxGroupProps & {
  label?: string;
  errorMessage?: string;
  elementsClassName?: string;
  isScrollable?: boolean;
} & ({ showSelectAll: true; values: string[] } | { showSelectAll?: false; values?: never });

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      errorMessage,
      values,
      className,
      elementsClassName,
      children,
      showSelectAll,
      isScrollable = false,
      ...props
    }: CheckboxGroupProps,
    ref,
  ) => {
    return (
      <Aria.CheckboxGroup
        validationBehavior="aria"
        className={composeRenderProps(className, (className) =>
          cn("flex w-full flex-col", label && "gap-3", className),
        )}
        {...props}
        ref={ref}
      >
        {composeRenderProps(children, (children) => (
          <>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-3">
              <Label>{label}</Label>
              {showSelectAll && <CheckboxGroupSelectAll values={values} />}
            </div>

            <NativeScrollArea className={cn("h-full", isScrollable && "sm:max-h-[24rem] sm:min-h-0")}>
              <div className={cn("grid grid-cols-1 gap-2", elementsClassName)}>{children}</div>
            </NativeScrollArea>

            <FieldError>{errorMessage}</FieldError>
          </>
        ))}
      </Aria.CheckboxGroup>
    );
  },
);

const CheckboxGroupSelectAll = forwardRef<HTMLButtonElement, { values: string[] }>(
  ({ values }: { values: string[] }, ref) => {
    const state = useContext(Aria.CheckboxGroupStateContext);
    if (!state) return null;

    const areAllSelected = state.value.length === values.length;

    const handleSelectAll = () => {
      const newValue = areAllSelected ? [] : values;
      state.setValue(newValue);
    };

    return (
      <Button variant="link" size="md" onPress={handleSelectAll} isDisabled={state.isDisabled} ref={ref}>
        {areAllSelected ? "Deselect all" : "Select all"}
      </Button>
    );
  },
);

Checkbox.displayName = "WalletConnectUI.Checkbox";
CheckboxGroup.displayName = "WalletConnectUI.CheckboxGroup";

export { Checkbox, CheckboxGroup, checkboxVariants, checkboxCardStyles };
export type { CheckboxGroupProps };
