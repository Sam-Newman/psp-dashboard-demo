"use client";

import * as React from "react";

import * as Aria from "react-aria-components";

import { cn } from "../../lib/tw-utils";
import { Tooltip, TooltipTrigger, TooltipTriggerWrapper } from "./tooltip";

type SliderProps = Aria.SliderProps & {
  before?: React.ReactNode;
  after?: React.ReactNode;
};

function Slider({ className, before, after, ...props }: SliderProps) {
  const thumbs = Math.max(
    (Array.isArray(props.value) && props.value.length) || 1,
    (Array.isArray(props.defaultValue) && props.defaultValue.length) || 1,
    1,
  );

  return (
    <Aria.Slider
      {...props}
      className={(values) =>
        cn(
          "flex items-center justify-center gap-4 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          typeof className === "function" ? className(values) : className,
        )
      }
    >
      {before}
      <Aria.SliderTrack className="grow rounded-full bg-foreground-secondary data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2">
        <SliderTrackCompletion />
        {new Array(thumbs).fill(null).map((_, index) => (
          <ThumbWithTooltip index={index} key={index} />
        ))}
      </Aria.SliderTrack>
      {after}
    </Aria.Slider>
  );
}
export { Slider };

function ThumbWithTooltip({ index }: { index: number }) {
  const state = React.useContext(Aria.SliderStateContext);

  const percent = state ? Math.round(state.getThumbPercent(index) * 100) : 0;

  return (
    <TooltipTrigger isOpen={state?.focusedThumb === index} delay={0} closeDelay={0}>
      <TooltipTriggerWrapper>
        <Aria.SliderThumb
          index={index}
          className={cn(
            "left-1/2 top-1/2 size-6 rounded-full border-4 border-solid border-[theme(backgroundColor.primary)] bg-accent transition-[size]",
            "data-[focused=true]:ring-4 data-[focused=true]:ring-accent/40",
          )}
        />
      </TooltipTriggerWrapper>
      <Tooltip placement="top" offset={10} className="!bg-accent text-white [&_svg]:text-accent">
        {percent}%
      </Tooltip>
    </TooltipTrigger>
  );
}

function SliderTrackCompletion() {
  const state = React.useContext(Aria.SliderStateContext);

  if (!state || state.values.length > 2) return null;

  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;

  if (state.values.length === 1) {
    if (state.orientation === "horizontal") {
      right = (1 - state.getThumbPercent(0)) * 100;
    } else {
      top = (1 - state.getThumbPercent(0)) * 100;
    }
  }

  if (state.values.length === 2) {
    if (state.orientation === "horizontal") {
      left = state.getThumbPercent(0) * 100;
      right = (1 - state.getThumbPercent(1)) * 100;
    } else {
      top = (1 - state.getThumbPercent(1)) * 100;
      bottom = state.getThumbPercent(0) * 100;
    }
  }

  return (
    <div
      className="absolute rounded-full bg-accent"
      style={{ left: `${left}%`, right: `${right}%`, top: `${top}%`, bottom: `${bottom}%` }}
    />
  );
}
