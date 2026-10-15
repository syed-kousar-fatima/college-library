
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    name,
    type = "text",
    placeholder = "",
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    error,
    helperText,
    leftIcon,
    rightIcon,
    required = false,
    disabled = false,
    readOnly = false,
    autoComplete,
    className = "",
    inputClassName = "",
    labelClassName = "",
    containerClassName = "",
    id,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id || name || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={`w-full min-w-0 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-2 block text-sm font-semibold text-library-ink ${labelClassName}`}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={`flex min-h-12 w-full min-w-0 items-center gap-3 rounded-xl border bg-white px-4 transition duration-200 focus-within:ring-2 focus-within:ring-library-forest/10 ${
          error
            ? "border-red-400 focus-within:border-red-500"
            : "border-library-forest/15 focus-within:border-library-forest"
        } ${
          disabled
            ? "cursor-not-allowed bg-library-paper/60 opacity-70"
            : ""
        } ${className}`}
      >
        {leftIcon && (
          <span className="shrink-0 text-library-muted" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-full min-h-12 w-full min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-library-ink outline-none placeholder:text-library-muted/70 focus:ring-0 disabled:cursor-not-allowed sm:text-base ${inputClassName}`}
          {...props}
        />

        {rightIcon && (
          <span className="flex shrink-0 items-center text-library-muted">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="mt-2 text-xs leading-5 text-library-muted">
          {helperText}
        </p>
      )}
    </div>
  );
});

export default Input;
