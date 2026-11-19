import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  lead?: string;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, eyebrow, title, lead, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {eyebrow ? <p className="font-mono text-label text-fg-faint uppercase">{eyebrow}</p> : null}
      <h2 className="text-h2 text-fg">{title}</h2>
      {lead ? <p className="text-lead text-fg-muted">{lead}</p> : null}
    </div>
  ),
);

SectionHeader.displayName = "SectionHeader";
