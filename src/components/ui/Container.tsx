import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-5 md:px-8 lg:px-12", {
  variants: {
    size: {
      content: "max-w-content",
      reading: "max-w-reading",
      article: "max-w-article",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(containerVariants({ size }), className)} {...props} />
  ),
);

Container.displayName = "Container";
