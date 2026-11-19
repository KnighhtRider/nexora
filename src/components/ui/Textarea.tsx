import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, helperText, error, className, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-32 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-fg placeholder:text-fg-faint",
            className,
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";
