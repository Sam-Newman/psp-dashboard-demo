"use client";

import type { ComponentProps } from "react";

import { CheckCircle, Info, Spinner, Warning, XCircle } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = () => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      duration={5000}
      offset={23}
      className="--toast-icon-margin-end=8px flex justify-center"
      icons={ICONS}
      toastOptions={{
        unstyled: true,
        classNames: TOAST_CLASS_NAMES,
      }}
    />
  );
};

const ICONS = {
  success: <CheckCircle weight="fill" className="size-[18px] text-success" />,
  info: <Info weight="fill" className="text-info size-[18px]" />,
  warning: <Warning weight="fill" className="size-[18px] text-warning" />,
  error: <XCircle weight="fill" className="size-[18px] text-error" />,
  loading: <Spinner className="size-[18px] text-foreground-secondary" />,
};

const TOAST_CLASS_NAMES = {
  toast: "min-h-10 flex gap-2 items-center w-fit p-4 bg-foreground-primary border border-primary rounded-3",
  content: "sm:flex sm:flex-row sm:items-center sm:gap-2",
  title: "text-primary text-lg",
  description: "text-secondary text-lg",
  actionButton: "text-secondary",
  cancelButton: "text-secondary",
  closeButton: "text-secondary",
  icon: "-mr-[0px]",
};

export { Toaster, toast };
export type { ToasterProps };
