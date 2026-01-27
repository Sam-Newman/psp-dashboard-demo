import React, { type PropsWithoutRef } from "react";

export function fixedForwardRef<T, P extends object = object>(
  render: (props: PropsWithoutRef<P>, ref: React.Ref<T>) => React.ReactNode,
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return React.forwardRef(render) as unknown as (props: P & React.RefAttributes<T>) => React.ReactNode;
}
