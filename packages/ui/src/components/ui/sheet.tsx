"use client";

import { XIcon } from "@phosphor-icons/react";
import type { DialogProps, DialogTriggerProps, ModalOverlayProps } from "react-aria-components";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  Modal,
  ModalOverlay,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { cn } from "../../lib/tw-utils";

const Sheet = (props: DialogTriggerProps) => <DialogTriggerPrimitive {...props} />;

const sheetContentStyles = tv({
  base: [
    "fixed inset-y-2 right-2 z-50 grid h-auto w-3/4 overflow-y-auto",
    "rounded-3 bg-primary text-primary shadow-lg outline-none ring-1 ring-gray-800",
    "transition ease-in-out entering:slide-in-from-right exiting:slide-out-to-right sm:max-w-sm",
  ],
  variants: {
    isEntering: { true: "duration-300 animate-in fade-in" },
    isExiting: { true: "animate-out fade-out" },
  },
});

interface SheetContentProps
  extends Omit<ModalOverlayProps, "children">, Pick<DialogProps, "aria-label" | "aria-labelledby" | "children"> {}

const SheetContent = ({ className, isDismissable = true, children, ...props }: SheetContentProps) => {
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      className={({ isExiting, isEntering }) =>
        cn(
          "fixed inset-0 z-50 h-[var(--visual-viewport-height,100vh)] w-screen overflow-hidden bg-[#000000]/45 backdrop-blur-[1px]",
          isEntering && "duration-300 animate-in fade-in",
          isExiting && "duration-200 animate-out fade-out",
        )
      }
      {...props}
    >
      <Modal
        className={composeRenderProps(className, (className, renderProps) =>
          sheetContentStyles({ ...renderProps, className: cn(className, "p-5") }),
        )}
      >
        <DialogPrimitive
          aria-label={props["aria-label"]}
          role="dialog"
          className="outline-hidden relative flex max-h-[inherit] flex-col overflow-hidden pt-[3.25rem]"
        >
          {(values) => (
            <div className="flex flex-1 flex-col justify-between gap-8 overflow-auto">
              {typeof children === "function" ? children(values) : children}

              <ButtonPrimitive
                slot="close"
                className="absolute right-1 top-1 w-fit rounded-2 p-1 transition-opacity hover:bg-foreground-secondary focus:outline-none"
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </ButtonPrimitive>
            </div>
          )}
        </DialogPrimitive>
      </Modal>
    </ModalOverlay>
  );
};

Sheet.Content = SheetContent;

export { Sheet };
