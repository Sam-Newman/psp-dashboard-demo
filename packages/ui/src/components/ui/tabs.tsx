"use client";

import * as React from "react";

import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";

import { cn } from "../../lib/tw-utils";

function Tabs({ className, ...props }: Aria.TabsProps) {
  return (
    <Aria.Tabs
      className={composeRenderProps(className, (className) =>
        cn(
          "flex flex-col gap-2",
          /* Orientation */
          "orientation-vertical:flex-row",
          className,
        ),
      )}
      {...props}
    />
  );
}

const TabList = <T extends object>({ className, ...props }: Aria.TabListProps<T>) => (
  <Aria.TabList
    className={composeRenderProps(className, (className) =>
      cn(
        "inline-flex h-10 items-center justify-center gap-2",
        /* Orientation */
        "orientation-vertical:h-auto orientation-vertical:flex-col",
        className,
      ),
    )}
    {...props}
  />
);

const Tab = ({ className, ...props }: Aria.TabProps) => (
  <Aria.Tab
    className={composeRenderProps(className, (className) =>
      cn(
        "inline-flex cursor-pointer justify-center whitespace-nowrap rounded-3 bg-foreground-primary px-4 py-3 text-md text-primary outline-none transition-all",
        /* Focus Visible */
        "focus-visible:ring-4 focus-visible:ring-accent/40",
        /* Disabled */
        "disabled:pointer-events-none disabled:opacity-60",
        /* Selected */
        "selected:bg-foreground-accent-10 selected:shadow-[0_0_0_1px] selected:shadow-accent",
        /* Orientation */
        "orientation-vertical:w-full",
        className,
      ),
    )}
    {...props}
  />
);

const TabPanel = ({ className, ...props }: Aria.TabPanelProps) => (
  <Aria.TabPanel
    className={composeRenderProps(className, (className) =>
      cn(
        /* Focus Visible */
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-main",
        className,
      ),
    )}
    {...props}
  />
);

export { Tabs, TabList, TabPanel, Tab };
