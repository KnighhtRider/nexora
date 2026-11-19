import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-line bg-surface p-6",
        hoverable &&
          "transition-colors duration-base hover:border-line-strong hover:bg-surface-hover",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";
