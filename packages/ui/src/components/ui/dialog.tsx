"use client";

import * as React from "react";
import { forwardRef } from "react";

import { XIcon } from "@phosphor-icons/react";
import * as Aria from "react-aria-components";
import { composeRenderProps } from "react-aria-components";

import { cn } from "../../lib/tw-utils";
import { nativeScrollAreaStyles } from "./native-scroll-area";

const Dialog = Aria.DialogTrigger;

type DialogProps = React.ComponentProps<typeof Aria.DialogTrigger>;
type DialogContentProps = Omit<React.ComponentProps<typeof Aria.Modal>, "children" | "isDismissable"> & {
  children?: Aria.DialogProps["children"];
  role?: Aria.DialogProps["role"];
  isDismissable?: boolean;
  navigation?: React.ReactNode;
  leftTopContent?: React.ReactNode;
  bodyClassName?: string;
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ bodyClassName, className, children, isDismissable = true, navigation, leftTopContent, ...props }, ref) => {
    return (
      <Aria.ModalOverlay
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={!isDismissable}
        className={({ isExiting, isEntering }) =>
          cn(
            "fixed inset-0 z-50 h-[var(--visual-viewport-height,100dvh)] bg-[#000000]/45 backdrop-blur-[1px]",
            "grid grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_1fr]",
            isEntering && "duration-300 animate-in fade-in",
            isExiting && "duration-200 animate-out fade-out",
          )
        }
      >
        <Aria.Modal
          className={composeRenderProps(className, (className, { isExiting, isEntering }) =>
            cn(
              nativeScrollAreaStyles(),
              "relative z-50 row-start-2 w-full overflow-auto bg-primary align-middle shadow-lg",
              "max-h-[85dvh] rounded-tl-8 rounded-tr-8 p-7 sm:max-h-[90dvh] sm:max-w-md sm:rounded-8",
              isEntering && [
                "duration-300 ease-out animate-in slide-in-from-bottom",
                "sm:fade-in sm:zoom-in-95 sm:slide-in-from-bottom-0",
              ],
              isExiting && ["animate-out slide-out-to-bottom", "sm:fade-out sm:zoom-out-95 sm:slide-out-to-bottom-0"],
              className,
            ),
          )}
          {...props}
        >
          <Aria.Dialog className="relative flex flex-col gap-4 outline-none" ref={ref}>
            {composeRenderProps(children, (children, { close }) => (
              <>
                <div className="grid grid-cols-3 items-center justify-between gap-3">
                  <div>{leftTopContent}</div>

                  <div className="flex w-full justify-center">{navigation}</div>

                  <Aria.Button
                    onPress={close}
                    className="ml-auto w-fit rounded-2 p-1 transition-opacity hover:bg-foreground-secondary focus:outline-none"
                  >
                    <XIcon className="size-5" />
                    <span className="sr-only">Close</span>
                  </Aria.Button>
                </div>

                <div className={cn("flex flex-col gap-7", bodyClassName)}>{children}</div>
              </>
            ))}
          </Aria.Dialog>
        </Aria.Modal>
      </Aria.ModalOverlay>
    );
  },
);

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-3 text-center", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof Aria.Heading>) {
  return (
    <Aria.Heading data-slot="dialog-title" slot="title" className={cn("text-h5 text-primary", className)} {...props} />
  );
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-center text-lg text-secondary", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex w-full flex-col gap-2", className)} {...props} />;
}

DialogContent.displayName = "WalletConnectUI.DialogContent";
DialogHeader.displayName = "WalletConnectUI.DialogHeader";
DialogTitle.displayName = "WalletConnectUI.DialogTitle";
DialogFooter.displayName = "WalletConnectUI.DialogFooter";

export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter };

export type { DialogProps, DialogContentProps };
