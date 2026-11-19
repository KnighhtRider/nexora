import * as React from "react";
import NextLink from "next/link";

import { cn } from "@/lib/utils";

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: "inline" | "nav";
  active?: boolean;
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, variant = "inline", active = false, external = false, className, children, ...props },
    ref,
  ) => {
    const classes = cn(
      variant === "inline"
        ? "text-cyan underline-offset-4 hover:underline"
        : "text-fg-muted transition-colors duration-base hover:text-fg",
      active && "text-fg",
      className,
    );

    if (external || /^https?:\/\//.test(href)) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          rel="noopener noreferrer"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={classes}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
