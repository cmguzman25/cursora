import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, name, error, className = "", ...props },
  ref,
) {
  const inputId = id ?? name;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400"
      >
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="checkbox"
          aria-invalid={!!error}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-0 dark:border-zinc-600 dark:bg-zinc-800 ${className}`}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p role="alert" className="pl-6 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});
