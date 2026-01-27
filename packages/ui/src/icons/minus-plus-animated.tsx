"use client";

import * as React from "react";

import { type Variants, motion, useAnimation } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  isPlus?: boolean;
}

const baseTransition = { ease: "easeInOut" as const, duration: 0.3 };
const delayedTransition = { ...baseTransition };

const horizontalLine = {
  x1: 6,
  y1: 12,
  x2: 18,
  y2: 12,
};

const animations = {
  minus: {
    line1: {
      initial: { rotate: -180, ...horizontalLine, transition: baseTransition },
      animate: { rotate: -180, ...horizontalLine, transition: baseTransition },
    },
    line2: {
      initial: { rotate: 0, scaleX: 0, opacity: 0, ...horizontalLine, transition: delayedTransition },
      animate: { rotate: 0, scaleX: 0, opacity: 0, ...horizontalLine, transition: delayedTransition },
    },
  } satisfies Record<string, Variants>,
  plus: {
    line1: {
      initial: { rotate: 0, ...horizontalLine, transition: baseTransition },
      animate: { rotate: 0, ...horizontalLine, transition: baseTransition },
    },
    line2: {
      initial: { rotate: 0, scaleX: 0, opacity: 0, ...horizontalLine, transition: delayedTransition },
      animate: { rotate: 90, scaleX: 1, opacity: 1, ...horizontalLine, transition: delayedTransition },
    },
  } satisfies Record<string, Variants>,
} as const;

function MinusPlusAnimated({ size = 24, className, onClick, isPlus = false }: IconProps) {
  const controls = useAnimation();

  React.useEffect(() => {
    if (isPlus) {
      controls.start("initial");
    } else {
      controls.start("animate");
    }
  }, [isPlus, controls]);

  const variants = isPlus ? animations.minus : animations.plus;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <motion.line x1={6} y1={12} x2={18} y2={12} variants={variants.line1} initial="initial" animate={controls} />
      <motion.line x1={12} y1={6} x2={12} y2={18} variants={variants.line2} initial="initial" animate={controls} />
    </motion.svg>
  );
}

export { animations, MinusPlusAnimated, type IconProps };
