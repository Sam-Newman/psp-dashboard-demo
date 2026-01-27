"use client";

import { type ReactNode, forwardRef, useCallback, useState } from "react";

import { CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import { format, isValid, parse } from "date-fns";
import * as Aria from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn } from "../../lib/tw-utils";
import { Calendar, type CalendarProps } from "./calendar";
import { FieldError } from "./field-error";
import { Label } from "./label";
import { BasePopover, PopoverTrigger } from "./popover";

const DATE_FORMAT = "yyyy-MM-dd";
const DISPLAY_DATE_FORMAT = "MMMM d, yyyy";

const datePickerFieldStyles = tv({
  base: "group flex flex-col gap-3 disabled:cursor-not-allowed",
});

const datePickerTriggerStyles = tv({
  base: [
    "flex h-[3.75rem] w-full cursor-pointer items-center gap-2 overflow-hidden rounded-4 border border-primary bg-foreground-primary px-5 text-lg",
    "hover:border-secondary",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "data-[invalid]:border-error",
    "[&_svg]:size-4 [&_svg]:text-icon-primary",
  ],
});

const datePickerPopoverStyles = tv({
  base: "w-fit overflow-auto rounded-3 border border-primary bg-foreground-primary p-0 text-primary outline-none",
});

interface DatePickerProps {
  label?: ReactNode;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  className?: string;
  id?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">;
}

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      placeholder = "Select date",
      errorMessage,
      value,
      onChange,
      onBlur,
      isRequired,
      isInvalid,
      isDisabled,
      className,
      id,
      calendarProps,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;
    const selectedDate = parsedDate && isValid(parsedDate) ? parsedDate : undefined;

    const handleSelect = useCallback(
      (date: Date | undefined) => {
        if (date) {
          onChange?.(format(date, DATE_FORMAT));
        }
        setIsOpen(false);
      },
      [onChange],
    );

    const handleOpenChange = useCallback(
      (open: boolean) => {
        setIsOpen(open);
        if (!open) {
          onBlur?.();
        }
      },
      [onBlur],
    );

    return (
      <div className={datePickerFieldStyles({ className })}>
        {label && <Label>{label}</Label>}

        <PopoverTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
          <Aria.Button
            ref={ref}
            id={id}
            isDisabled={isDisabled}
            data-invalid={isInvalid || undefined}
            className={datePickerTriggerStyles()}
          >
            <CalendarBlankIcon className="shrink-0" />
            <span className={cn("flex-1 text-left", !selectedDate && "text-secondary")}>
              {selectedDate ? format(selectedDate, DISPLAY_DATE_FORMAT) : placeholder}
            </span>
            {isRequired && <span className="text-error">*</span>}
          </Aria.Button>

          <BasePopover placement="bottom start" offset={4} className={datePickerPopoverStyles()}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              defaultMonth={selectedDate}
              {...calendarProps}
            />
          </BasePopover>
        </PopoverTrigger>

        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </div>
    );
  },
);

DatePicker.displayName = "WalletConnectUI.DatePicker";

export { DatePicker, datePickerFieldStyles, datePickerTriggerStyles };
export type { DatePickerProps };
