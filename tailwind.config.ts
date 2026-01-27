import type { Config } from "tailwindcss";
import tw from "@pay-merchant/ui/tailwind";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./packages/ui/src/components/**/*.{ts,tsx}",
    "./packages/ui/src/lib/**/*.{ts,tsx}",
  ],
  presets: [tw],
};

export default config;
