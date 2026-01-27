"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-aria-components";

import { Toaster } from "@pay-merchant/ui/ui/toast";

import { RoleProvider } from "@/lib/hooks/use-role";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const navigate = useCallback<typeof router.push>((href, options) => router.push(href, options), [router]);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider navigate={navigate}>
          <RoleProvider>{children}</RoleProvider>
        </RouterProvider>
      </ThemeProvider>

      <Toaster />
    </>
  );
}
