import * as React from "react";
import { forwardRef } from "react";

import * as Aria from "react-aria-components";

import { tv } from "../../lib/tw-utils";

const labelVariants = tv({
  base: [
    "break-all text-lg leading-none text-primary",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "invalid:text-error",
  ],
});

const Label = forwardRef<HTMLLabelElement, Aria.LabelProps>(({ className, ...props }, ref) => (
  <Aria.Label className={labelVariants({ className })} {...props} ref={ref} />
));

Label.displayName = "WalletConnectUI.Label";

export { Label, labelVariants };
