
import { forwardRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const PasswordInput = forwardRef(function PasswordInput(
  {
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    placeholder = "Enter your password",
    name = "password",
    id,
    autoComplete = "current-password",
    disabled = false,
    required = false,
    readOnly = false,
    error,
    showLockIcon = true,
    className = "",
    inputClassName = "",
    toggleLabel = "Toggle password visibility",
    ...props
  },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`relative w-full ${className}`}
    >
      {showLockIcon && (
        <LockKeyhole
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 ${
            error ? "text-red-500" : "text-library-muted"
          }`}
        />
      )}

      <input
        ref={ref}
        id={id}
        name={name}
        type={isVisible ? "text" : "password"}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        aria-invalid={Boolean(error)}
        className={`h-12 w-full rounded-xl border bg-white text-sm text-library-ink outline-none transition duration-200 placeholder:text-library-muted/70 focus:ring-4 focus:ring-library-forest/10 disabled:cursor-not-allowed disabled:bg-library-paper/50 disabled:opacity-60 sm:h-13 ${
          showLockIcon ? "pl-11" : "pl-4"
        } pr-12 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-library-forest/15 focus:border-library-forest"
        } ${inputClassName}`}
        {...props}
      />

      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        disabled={disabled}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        title={toggleLabel}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-library-muted transition hover:bg-library-paper hover:text-library-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-library-forest disabled:cursor-not-allowed"
      >
        {isVisible ? (
          <EyeOff size={18} strokeWidth={1.8} />
        ) : (
          <Eye size={18} strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
