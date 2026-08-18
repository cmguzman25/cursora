import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, icon, rightElement, id, name, className = "", ...props },
  ref,
) {
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`h-11 w-full rounded-xl border bg-white text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${
            icon ? "pl-10" : "pl-3.5"
          } ${rightElement ? "pr-10" : "pr-3.5"} ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-zinc-200 dark:border-zinc-700"
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <span className="absolute inset-y-0 right-3 flex items-center">{rightElement}</span>
        )}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
