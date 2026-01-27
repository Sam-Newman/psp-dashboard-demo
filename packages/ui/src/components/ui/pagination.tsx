"use client";

import * as React from "react";

import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";

import { cn } from "../../lib/tw-utils";
import { Button, type ButtonProps } from "./button";

function PaginationRoot({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      data-testid="PAGINATION"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="pagination-content" className={cn("flex h-12 flex-row items-center gap-2", className)} {...props} />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={className} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Omit<ButtonProps, "variant" | "isCurrent">;

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <Button
      size="md"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant="neutral-tertiary"
      isCurrent={isActive}
      className={className}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: Omit<PaginationLinkProps, "isActive">) {
  return (
    <PaginationLink aria-label="Go to previous page" className={className} {...props}>
      <span className="sr-only">Previous</span>
      <CaretLeftIcon />
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: Omit<PaginationLinkProps, "isActive">) {
  return (
    <PaginationLink aria-label="Go to next page" className={className} {...props}>
      <span className="sr-only">Next</span>
      <CaretRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

function generatePaginationItems(currentPage: number, totalPages: number) {
  const items: (number | "ellipsis-start" | "ellipsis-end")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    items.push(1);
    if (currentPage > 3) items.push("ellipsis-start");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) items.push("ellipsis-end");
    items.push(totalPages);
  }

  return items;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = generatePaginationItems(currentPage, totalPages);

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onPress={() => onPageChange(Math.max(1, currentPage - 1))}
            isDisabled={currentPage === 1}
          />
        </PaginationItem>

        {items.map((item) =>
          typeof item === "string" ? (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink onPress={() => onPageChange(item)} isActive={currentPage === item}>
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            isDisabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

Pagination.displayName = "WalletConnectUI.Pagination";

export { Pagination };

export type { PaginationProps };
