"use client";

import React, { forwardRef } from "react";

import { CaretRight, FunnelX as FunnelXIcon, MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { twJoin } from "tailwind-merge";

import { Prefetch, usePrefetch } from "../../hooks/usePrefetch";
import { fixedForwardRef } from "../../lib/fixed-forward-ref";
import { VariantProps, cn, tv } from "../../lib/tw-utils";
import { Button, ButtonProps } from "./button";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { BasePopover } from "./popover";
import { ScrollArea, ScrollBar } from "./scroll-area";

const MenuTrigger = Aria.MenuTrigger;

const MenuSubTrigger = Aria.SubmenuTrigger;

const MenuSection = Aria.ListBoxSection;

const MenuCollection = Aria.Collection;

const MenuPopover = ({ offset = 4, placement = "bottom", ...props }: Aria.PopoverProps) => (
  <BasePopover variant="menu" offset={offset} placement={placement} showOverlayArrow={false} {...props} />
);

type MenuProps<T> = Aria.MenuProps<T> & {
  scrollAreaClassName?: string;
  withSearch?: boolean;
  withReset?: boolean;
};

const Menu = fixedForwardRef(MenuComponent);
function MenuComponent<T extends { id: string; label: string }>(
  { className, scrollAreaClassName, withReset, withSearch, ...props }: MenuProps<T> & { className?: string },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { items, selectedKeys, onSelectionChange, autoFocus } = props;

  const [search, setSearch] = React.useState("");
  const filteredItems = search
    ? Array.from(items || []).filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
    : items;

  const withSelection = selectedKeys !== undefined;
  const selectedCount =
    withSelection && (selectedKeys === "all" ? Array.from(items || []).length : (selectedKeys as Set<T>).size);

  return (
    <div className={className}>
      {withSearch && (
        <Input
          aria-label="Search"
          placeholder="Search"
          value={search}
          onChange={setSearch}
          startContent={<MagnifyingGlassIcon />}
          className="m-2 h-[2.85rem]"
          isClearable
        />
      )}

      <ScrollArea className={cn("-m-1", scrollAreaClassName)} viewportClassName="p-1">
        <Aria.Menu
          className="space-y-1 outline-none"
          ref={ref}
          {...props}
          items={filteredItems}
          autoFocus={withSelection ? !search : autoFocus}
        />
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {withReset && (
        <div className="-mx-1 mt-1 border-t border-gray-200 px-1 pt-1 dark:border-gray-900">
          <Aria.Button
            isDisabled={selectedKeys !== "all" && (!selectedKeys || (selectedKeys as Set<T>).size === 0)}
            className={twJoin(
              "inline-flex w-full items-center justify-start gap-3 whitespace-nowrap rounded-2 p-3 text-md opacity-80 shadow-none",
              /* Focus-visible */
              "focus-visible:opacity-100 focus-visible:outline-none",
              /* Focus */
              "focus:outline-none",
              /* Hover */
              "hover:bg-foreground-primary hover:opacity-100",
              /* Disabled */
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
            onPress={() => onSelectionChange?.(new Set())}
          >
            <FunnelXIcon className="!size-4 text-icon-primary" weight="fill" />
            Clear({selectedCount})
          </Aria.Button>
        </div>
      )}
    </div>
  );
}

const menuItemVariants = tv({
  base: [
    "relative flex cursor-default select-none items-center gap-3 rounded-2 p-3 text-lg outline-none transition-colors [&_svg]:size-4",
    /* Hovered */
    "hover:cursor-pointer hover:bg-foreground-primary",
    /* Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-60 data-[disabled]:hover:bg-transparent",
    /* Focused */
    "focus:bg-foreground-primary",
  ],

  variants: {
    variant: {
      danger: "text-error",
    },
    isSelected: {
      true: "bg-accent/10 text-primary shadow-[0_0_0_1px] shadow-accent",
    },
  },
});

type MenuItemProps = Aria.MenuItemProps &
  Omit<VariantProps<typeof menuItemVariants>, "isSelected"> & { withSelector?: boolean; prefetch?: Prefetch };

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, className, variant, withSelector = true, prefetch = null, target = "_self", ...props }, ref) => {
    usePrefetch({ href: props.href, target, prefetch });

    return (
      <Aria.MenuItem
        textValue={props.textValue || (typeof children === "string" ? children : undefined)}
        className={composeRenderProps(className, (className, { isSelected }) =>
          menuItemVariants({ variant, className, isSelected: withSelector && isSelected }),
        )}
        {...props}
        target={target}
        ref={ref}
      >
        {composeRenderProps(children, (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {children}

            {withSelector && selectionMode === "multiple" && (
              <Checkbox isSelected={isSelected} size="md" className="absolute right-3 top-1/2 -translate-y-[50%]" />
            )}

            {hasSubmenu && <CaretRight className="ml-auto size-4" />}
          </>
        ))}
      </Aria.MenuItem>
    );
  },
);

const MenuSeparator = ({ className, ...props }: Aria.SeparatorProps) => (
  <Aria.Separator className={cn("my-1 h-px bg-gray-200 dark:bg-gray-900", className)} {...props} />
);

const MenuButton = ({ className, ...props }: ButtonProps) => {
  return <Button variant="neutral-secondary" className={className} {...props} />;
};

MenuPopover.displayName = "WalletConnectUI.MenuPopover";
MenuComponent.displayName = "WalletConnectUI.Menu";
MenuItem.displayName = "WalletConnectUI.MenuItem";
MenuSeparator.displayName = "WalletConnectUI.MenuSeparator";
MenuButton.displayName = "WalletConnectUI.MenuButton";

export {
  MenuTrigger,
  MenuSubTrigger,
  MenuSection,
  MenuCollection,
  MenuPopover,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuButton,
};
