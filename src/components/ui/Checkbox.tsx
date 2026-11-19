import * as React from "react";

import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, helperText, error, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="space-y-2">
        <label className="inline-flex min-h-11 items-center gap-3 text-base text-fg">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "size-4 rounded-sm border border-line-strong bg-surface text-brand",
              className,
            )}
            {...props}
          />
          <span>{label}</span>
        </label>
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

Checkbox.displayName = "Checkbox";
