import { type ClassNameValue, extendTailwindMerge } from "tailwind-merge";
import { type TV, type VariantProps, tv as tvBase } from "tailwind-variants";

const twMergeConfig = {
  classGroups: {
    "font-size": [
      {
        text: ["sm", "md", "lg", "h6", "h5", "h4", "h3", "h2", "h1"],
      },
    ],
    "border-radius": [
      {
        rounded: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "full"],
      },
    ],
  },
};

const twMerge = extendTailwindMerge({
  extend: twMergeConfig,
});

export function cn(...inputs: Array<ClassNameValue>) {
  return twMerge(inputs);
}

export const tv: TV = (options, config) =>
  tvBase(options, {
    ...config,
    twMergeConfig: {
      ...config?.twMergeConfig,
      classGroups: {
        ...config?.twMergeConfig?.classGroups,
        ...twMergeConfig.classGroups,
      },
    },
  });

export type { VariantProps };
