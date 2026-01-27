import { cn } from "../../lib/tw-utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
}

export function Skeleton({ className, variant = "primary", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-foreground-primary",
        className,
        variant === "secondary" && "bg-foreground-secondary",
      )}
      {...props}
    />
  );
}
