"use client";

import * as React from "react";

import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "../../lib/tw-utils";

interface ProgressProps extends AriaProgressBarProps {
  barClassName?: string;
  fillClassName?: string;
}

const ProgressBar = ({ className, barClassName, fillClassName, children, ...props }: ProgressProps) => (
  <AriaProgressBar className={composeRenderProps(className, (className) => cn("w-full", className))} {...props}>
    {composeRenderProps(children, (children, renderProps) => (
      <>
        {children}

        <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-foreground-secondary", barClassName)}>
          <div
            className={cn("size-full flex-1 rounded-full bg-accent transition-all", fillClassName)}
            style={{
              transform: `translateX(-${100 - (renderProps.percentage || 0)}%)`,
            }}
          />
        </div>
      </>
    ))}
  </AriaProgressBar>
);
const CircularProgressBar = ({ className, ...props }: ProgressProps) => {
  const [isInitialRender, setIsInitialRender] = React.useState(true);
  const center = 16;
  const strokeWidth = 4;
  const r = 16 - strokeWidth;
  const c = 2 * r * Math.PI;

  return (
    <AriaProgressBar className={composeRenderProps(className, (className) => cn("w-full", className))} {...props}>
      {({ percentage }) => {
        const currentPercentage = percentage ?? 0;
        const currentOffset = c - (currentPercentage / 100) * c;

        React.useEffect(() => {
          if (isInitialRender) {
            setIsInitialRender(false);
          }
        }, [isInitialRender]);

        return (
          <svg width={64} height={64} viewBox="0 0 32 32" fill="none" strokeWidth={strokeWidth}>
            <circle
              cx={center}
              cy={center}
              r={r}
              stroke="hsl(var(--foreground-tertiary))"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
            <circle
              cx={center}
              cy={center}
              r={r}
              stroke="hsl(var(--accent))"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={currentOffset}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
              style={{
                transition: "stroke-dashoffset 0.5s ease-in-out",
                animation: isInitialRender ? `progress-fill-${currentPercentage} 1s ease-out forwards` : undefined,
              }}
            />
            {isInitialRender && (
              <defs>
                <style>{`
                  @keyframes progress-fill-${currentPercentage} {
                    from {
                      stroke-dashoffset: ${c};
                    }
                    to {
                      stroke-dashoffset: ${currentOffset};
                    }
                  }
                `}</style>
              </defs>
            )}
          </svg>
        );
      }}
    </AriaProgressBar>
  );
};

export { ProgressBar, CircularProgressBar };
export type { ProgressProps };
