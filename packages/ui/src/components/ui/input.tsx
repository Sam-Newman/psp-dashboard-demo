"use client";

import * as React from "react";
import { type ReactNode, forwardRef, useContext, useState } from "react";

import { Copy as CopyIcon, Eye as EyeIcon, EyeSlash as EyeSlashIcon, X as XIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { toast } from "sonner";
import { tv } from "tailwind-variants";

import { cn } from "../../lib/tw-utils";
import { FieldError } from "./field-error";
import { Label } from "./label";
import { Tooltip, TooltipTrigger } from "./tooltip";

interface InputProps extends Aria.SearchFieldProps, Pick<Aria.InputProps, "max" | "min" | "step"> {
  label?: ReactNode;
  placeholder?: string;
  errorMessage?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isClearable?: boolean;
  groupClassName?: string;
  autoFocus?: boolean;
  description?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      errorMessage,
      startContent,
      endContent,
      isClearable,
      isReadOnly,
      type,
      groupClassName,
      autoFocus,
      description,
      min,
      max,
      step,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleCopy = async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.success("Copied to clipboard");
      } catch {
        toast.error("Failed to copy to clipboard");
      }
    };

    return (
      <InputField {...props} validationBehavior="aria" data-readonly={isReadOnly}>
        {({ state }) => (
          <>
            {label && <Label>{label}</Label>}

            {description && <p className="text-md text-secondary">{description}</p>}

            <InputGroup className={groupClassName}>
              {startContent}

              <InputElement
                placeholder={placeholder}
                type={type === "password" && isVisible ? "text" : type}
                autoFocus={autoFocus}
                ref={ref}
                min={min}
                max={max}
                step={step}
              />

              {endContent}

              {isReadOnly && (
                <TooltipTrigger>
                  <InputButton aria-label="Copy" onPress={() => handleCopy(state.value)}>
                    <CopyIcon />
                  </InputButton>

                  <Tooltip>Copy</Tooltip>
                </TooltipTrigger>
              )}

              {type === "password" && (
                <InputButton aria-label="Toggle password visibility" onPress={() => setIsVisible(!isVisible)}>
                  {isVisible ? <EyeSlashIcon weight="fill" /> : <EyeIcon weight="fill" />}
                </InputButton>
              )}

              {isClearable && !isReadOnly && (
                <InputButton onPress={() => state.setValue("")} aria-label="Clear input">
                  <XIcon />
                </InputButton>
              )}
            </InputGroup>

            {errorMessage && <FieldError>{errorMessage}</FieldError>}
          </>
        )}
      </InputField>
    );
  },
);

interface InputFileProps extends Aria.InputProps {
  label?: string;
  errorMessage?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, errorMessage, startContent, endContent, ...props }, ref) => {
    return (
      <div className="group flex flex-col gap-3">
        {label && <Label>{label}</Label>}

        <InputGroup>
          {startContent}

          <InputElement {...props} type="file" ref={ref} />

          {endContent}
        </InputGroup>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </div>
    );
  },
);

const inputFieldStyles = tv({
  base: "group flex flex-col gap-3 disabled:cursor-not-allowed",
});

const InputField = forwardRef<HTMLDivElement, Aria.SearchFieldProps>(({ className, ...props }, ref) => {
  return (
    <Aria.SearchField
      className={composeRenderProps(className, (className) => inputFieldStyles({ className }))}
      {...props}
      ref={ref}
    />
  );
});

const inputGroupStyles = tv({
  base: [
    "flex h-[3.75rem] w-full cursor-text items-center gap-2 overflow-hidden rounded-4 border border-primary bg-foreground-primary px-5 text-lg",
    /* Hover */
    "hover:border-secondary",
    /* Focus Within */
    "focus-within:outline-none focus-within:ring-4 focus-within:ring-accent/40",
    /* Disabled */
    "disabled:cursor-not-allowed disabled:opacity-60",
    /* Invalid */
    "invalid:border-error",
    /* SVG */
    "[&_svg]:size-4 [&_svg]:text-icon-primary",
  ],
});

const InputGroup = forwardRef<HTMLDivElement, Aria.GroupProps>(({ className, ...props }, ref) => {
  const buttonContext = useContext(Aria.ButtonContext);

  return (
    <Aria.ButtonContext.Provider value={{ ...buttonContext, onPress: () => {}, excludeFromTabOrder: false }}>
      <Aria.Group
        onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
        className={composeRenderProps(className, (className) => inputGroupStyles({ className }))}
        {...props}
        ref={ref}
      />
    </Aria.ButtonContext.Provider>
  );
});

const inputElementStyles = tv({
  base: [
    "min-w-0 flex-1 bg-foreground-primary text-primary outline outline-0 placeholder:text-lg placeholder:text-secondary group-data-[readonly]:text-secondary disabled:cursor-not-allowed [&::-webkit-search-cancel-button]:hidden",
    /* File */
    "file:border-0 file:bg-transparent file:text-lg file:text-primary file:underline file:underline-offset-4",
  ],
});

const InputElement = forwardRef<HTMLInputElement, Aria.InputProps>(({ className, ...props }, ref) => {
  return (
    <Aria.Input
      className={composeRenderProps(className, (className) => inputElementStyles({ className }))}
      {...props}
      ref={ref}
    />
  );
});

const InputButton = forwardRef<HTMLButtonElement, Aria.ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Aria.Button
      excludeFromTabOrder
      className={composeRenderProps(className, (className) =>
        cn(
          "rounded-2 p-1 opacity-70 transition-opacity",
          /* Hover */
          "hover:bg-foreground-secondary hover:opacity-100",
          /* Disabled */
          "disabled:pointer-events-none",
          /* Empty */
          "group-data-[empty]:invisible",
          className,
        ),
      )}
      {...props}
      ref={ref}
    />
  );
});

Input.displayName = "WalletConnectUI.Input";
InputField.displayName = "WalletConnectUI.InputField";
InputGroup.displayName = "WalletConnectUI.InputGroup";
InputElement.displayName = "WalletConnectUI.InputElement";
InputButton.displayName = "WalletConnectUI.InputButton";
InputFile.displayName = "WalletConnectUI.InputFile";

export { Input, InputFile, inputFieldStyles, inputGroupStyles, inputElementStyles };
export type { InputProps };
