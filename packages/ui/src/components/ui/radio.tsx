"use client";

import { createContext, forwardRef, useContext } from "react";

import { Circle as CircleIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { type VariantProps } from "tailwind-variants";

import { cn, tv } from "../../lib/tw-utils";
import { checkboxCardStyles } from "./checkbox";
import { FieldError } from "./field-error";
import { Label, labelVariants } from "./label";

const radioVariants = tv({
  slots: {
    container: "group flex items-center gap-x-2 hover:cursor-pointer",

    element: [
      "flex aspect-square items-center justify-center rounded-full border border-gray-400 transition-colors dark:border-gray-700",
      /* Focus Visible */
      "group-data-[focus-visible]:border-accent group-data-[focus-visible]:outline-none group-data-[focus-visible]:ring-4 group-data-[focus-visible]:ring-accent/40",
      /* Focus */
      "group-data-[focused]:border-accent group-data-[focused]:outline-none group-data-[focused]:ring-4 group-data-[focused]:ring-accent/40",
      /* Selected */
      "group-data-[selected]:border-accent",
      /* Disabled */
      "group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-60",
      /* Invalid */
      "group-data-[invalid]:border-error group-data-[invalid]:group-data-[selected]:border-error",
    ],

    circle: "text-accent group-data-[invalid]:text-error",
  },

  variants: {
    variant: {
      default: "",
      card: { container: checkboxCardStyles({ className: "selected:hover:rounded-5" }) },
    },

    size: {
      sm: {
        element: "size-4",
        circle: "size-2",
      },

      md: {
        element: "size-5",
        circle: "size-2.5",
      },

      lg: {
        element: "size-6",
        circle: "size-3",
      },
    },
  },

  defaultVariants: {
    size: "lg",
  },
});

const RadioGroupContext = createContext<VariantProps<typeof radioVariants>>({});

const Radio = forwardRef<HTMLLabelElement, Aria.RadioProps>(({ className, children, ...props }, ref) => {
  const { size, variant } = useContext(RadioGroupContext);

  const { container, element, circle } = radioVariants({ size, variant });

  return (
    <Aria.Radio
      className={composeRenderProps(className, (className) => cn(container(), labelVariants(), className))}
      {...props}
      ref={ref}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          <span className={element({ className: variant === "card" && "order-last" })}>
            {renderProps.isSelected && <CircleIcon weight="fill" className={circle()} />}
          </span>

          <div className="flex items-center gap-4">{children}</div>
        </>
      ))}
    </Aria.Radio>
  );
});

interface RadioGroupProps extends Aria.RadioGroupProps, VariantProps<typeof radioVariants> {
  label?: string;
  errorMessage?: string;
  elementsClassName?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ label, className, errorMessage, size, variant, children, elementsClassName, value, ...props }, ref) => {
    return (
      <Aria.RadioGroup
        validationBehavior="aria"
        className={composeRenderProps(className, (className) => cn("flex flex-col gap-3", className))}
        {...props}
        value={value === "" ? undefined : value}
        ref={ref}
      >
        {composeRenderProps(children, (children) => (
          <>
            {label && <Label>{label}</Label>}

            <div className={cn("grid grid-cols-1 gap-2", elementsClassName)}>
              <RadioGroupContext.Provider value={{ size, variant }}>{children}</RadioGroupContext.Provider>
            </div>

            {errorMessage && <FieldError>{errorMessage}</FieldError>}
          </>
        ))}
      </Aria.RadioGroup>
    );
  },
);

Radio.displayName = "WalletConnectUI.Radio";
RadioGroup.displayName = "WalletConnectUI.RadioGroup";

export { Radio, RadioGroup, radioVariants };
export type { RadioGroupProps };
