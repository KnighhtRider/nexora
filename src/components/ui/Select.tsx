import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, helperText, error, className, children, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="text-small font-medium text-fg">
          {label}
        </label>
        <select
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-fg",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={errorId} className="text-small text-danger">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-small text-fg-muted">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
