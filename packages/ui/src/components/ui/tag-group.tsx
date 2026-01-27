"use client";

import * as React from "react";

import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  TagList as AriaTagList,
  type TagListProps as AriaTagListProps,
  type TagProps as AriaTagProps,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "../../lib/tw-utils";
import { buttonVariants } from "./button";
import { Label } from "./label";

const TagGroupWrapper = AriaTagGroup;

function TagList<T extends object>({ className, ...props }: AriaTagListProps<T>) {
  return (
    <AriaTagList
      className={composeRenderProps(className, (className) =>
        cn(
          "flex flex-wrap gap-2",
          /* Empty */
          "data-[empty]:text-md data-[empty]:text-secondary",
          className,
        ),
      )}
      {...props}
    />
  );
}

function Tag({ children, className, ...props }: AriaTagProps) {
  const textValue = typeof children === "string" ? children : undefined;

  return (
    <AriaTag
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          buttonVariants({
            variant: "neutral-tertiary",
            size: "lg",
            className: [
              renderProps.selectionMode === "none" || renderProps.isSelected
                ? "bg-accent/10 text-primary shadow-[0_0_0_1px] shadow-accent"
                : "",
              "h-14 cursor-pointer gap-4 px-6",
            ],
          }),
          className,
        ),
      )}
      {...props}
    >
      {composeRenderProps(children, (children) => children)}
    </AriaTag>
  );
}

interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">, Pick<AriaTagListProps<T>, "items" | "children" | "renderEmptyState"> {
  label?: string;
  errorMessage?: string;
  listClassName?: string;
}

function TagGroup<T extends object>({
  label,
  className,
  errorMessage,
  items,
  children,
  renderEmptyState,
  listClassName,
  ...props
}: TagGroupProps<T>) {
  return (
    <TagGroupWrapper className={cn("group space-y-4", className)} {...props}>
      {label && <Label>{label}</Label>}

      <TagList items={items} renderEmptyState={renderEmptyState} className={listClassName}>
        {children}
      </TagList>

      {errorMessage && <p className="break-all text-md text-error">{errorMessage}</p>}
    </TagGroupWrapper>
  );
}

export { TagGroup, TagGroupWrapper, TagList, Tag };
