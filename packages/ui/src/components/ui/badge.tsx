import * as React from "react";

import { type VariantProps, tv } from "tailwind-variants";

const badgeVariants = tv({
  base: ["inline-flex text-md [&_svg]:size-3.5 items-center gap-1 rounded-2 px-2 py-1.5 font-medium transition-colors"],

  variants: {
    variant: {
      accent: "bg-dashboard/90 text-white",
      info: "bg-foreground-tertiary text-primary",
      success: "bg-success/90 text-white",
      warning: "bg-warning/90 text-white",
      error: "bg-error/90 text-white",
    },
  },

  defaultVariants: {
    variant: "accent",
  },
});

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={badgeVariants({ variant, className })} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };
