import type { Metadata } from "next";
import localFont from "next/font/local";

import "@pay-merchant/ui/globals";

import { Providers } from "./_components/providers";

const KHTeka = localFont({
  variable: "--font-KHTeka",
  src: [
    {
      path: "../lib/fonts/KHTeka-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../lib/fonts/KHTeka-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "PSP Dashboard - WalletConnect Pay",
  description: "Payment Service Provider Dashboard for WalletConnect Pay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${KHTeka.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
