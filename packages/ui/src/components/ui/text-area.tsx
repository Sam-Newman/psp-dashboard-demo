import { forwardRef } from "react";

import { composeRenderProps } from "react-aria-components";
import * as Aria from "react-aria-components";

import { cn } from "../../lib/tw-utils";
import { FieldError } from "./field-error";
import { inputElementStyles, inputFieldStyles, inputGroupStyles } from "./input";
import { Label } from "./label";

interface TextAreaProps extends Aria.TextFieldProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  autoFocus?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, placeholder, errorMessage, autoFocus, ...props }, ref) => {
    return (
      <Aria.TextField
        {...props}
        validationBehavior="aria"
        className={composeRenderProps(className, (className) => inputFieldStyles({ className }))}
      >
        {label && <Label>{label}</Label>}

        <TextAreaElement placeholder={placeholder} autoFocus={autoFocus} ref={ref} />

        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </Aria.TextField>
    );
  },
);

const TextAreaElement = forwardRef<HTMLTextAreaElement, Aria.TextAreaProps>((props, ref) => {
  return (
    <Aria.TextArea
      ref={ref}
      {...props}
      className={cn(
        inputGroupStyles(),
        inputElementStyles(),
        "h-20 flex-auto p-5 focus:outline-none focus:ring-4 focus:ring-accent/40 disabled:border-primary",
      )}
    />
  );
});

TextArea.displayName = "WalletConnectUI.TextArea";
TextAreaElement.displayName = "WalletConnectUI.TextAreaElement";

export { TextArea };
export type { TextAreaProps };
