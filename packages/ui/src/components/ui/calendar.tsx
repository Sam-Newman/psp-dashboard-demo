"use client";

import { forwardRef } from "react";

import { CaretDownIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { DayPicker, type DayPickerProps, type DropdownProps } from "react-day-picker";

import { cn } from "../../lib/tw-utils";

export type CalendarProps = DayPickerProps & {
  /**
   * The start year for the year dropdown. Defaults to 100 years ago.
   */
  fromYear?: number;
  /**
   * The end year for the year dropdown. Defaults to current year.
   */
  toYear?: number;
};

// Shared styles
const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40";
const navButtonBase = cn(
  "pointer-events-auto inline-flex size-7 items-center justify-center rounded-2 border border-secondary bg-transparent text-icon-inverse transition-colors",
  "hover:bg-foreground-secondary",
  focusRing,
  "disabled:cursor-not-allowed disabled:opacity-60",
);

function CalendarDropdown({ value, onChange, options, className, "aria-label": ariaLabel }: DropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e)}
        className={cn(
          "cursor-pointer appearance-none rounded-2 border border-secondary bg-foreground-primary px-3 py-1.5 pr-7 text-md text-primary transition-colors",
          "hover:bg-foreground-secondary",
          focusRing,
          className,
        )}
        aria-label={ariaLabel}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <CaretDownIcon
        className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-secondary"
        weight="bold"
      />
    </div>
  );
}

function CalendarChevron({ orientation }: { orientation?: "left" | "right" | "up" | "down" }) {
  if (orientation === "left") {
    return <CaretLeftIcon className="size-4" weight="bold" />;
  }
  return <CaretRightIcon className="size-4" weight="bold" />;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      classNames,
      showOutsideDays = true,
      fromYear = new Date().getFullYear() - 100,
      toYear = new Date().getFullYear(),
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          captionLayout="dropdown"
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
          className={cn("p-3", className)}
          formatters={{
            formatMonthDropdown: (date) => date.toLocaleDateString("en-US", { month: "short" }),
          }}
          classNames={{
            months: "relative flex flex-col w-[252px]",
            month: "flex flex-col gap-2",
            month_caption: "flex items-center justify-center h-7 w-full",
            caption_label: "hidden",
            dropdowns: "flex items-center gap-2",
            nav: "absolute top-0 inset-x-0 flex justify-between items-center h-7 z-10 pointer-events-none",
            button_previous: navButtonBase,
            button_next: navButtonBase,
            month_grid: "w-full border-collapse",
            weekdays: "flex",
            weekday: "w-9 text-sm text-secondary font-normal flex items-center justify-center h-[21px]",
            week: "flex w-full",
            day: cn(
              "relative size-9 rounded-2 p-0 text-center text-md focus-within:relative focus-within:z-20",
              "[&:has([aria-selected])]:bg-foreground-secondary",
              "[&:has([aria-selected].day-outside)]:bg-foreground-secondary/50",
            ),
            day_button: cn(
              "inline-flex size-9 items-center justify-center rounded-2 text-primary transition-colors",
              "hover:bg-foreground-secondary hover:text-primary",
              focusRing,
            ),
            range_start: "day-range-start",
            range_end: "day-range-end",
            selected: "bg-accent text-inverse hover:bg-accent hover:text-inverse",
            today: "bg-foreground-secondary text-primary",
            outside: "day-outside text-secondary opacity-50",
            disabled: "text-secondary opacity-50 cursor-not-allowed",
            range_middle: "aria-selected:bg-foreground-secondary aria-selected:text-primary",
            hidden: "invisible",
            ...classNames,
          }}
          components={{
            Chevron: CalendarChevron,
            Dropdown: CalendarDropdown,
          }}
          {...props}
        />
      </div>
    );
  },
);

Calendar.displayName = "WalletConnectUI.Calendar";

export { Calendar };
