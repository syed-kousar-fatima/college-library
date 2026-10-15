
import { cloneElement, isValidElement, useId } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FormField({
  label,
  name,
  error,
  success,
  hint,
  required = false,
  children,
  className = "",
  labelAction,
  showStatusIcon = true
}) {
  const generatedId = useId();
  const fieldId = name || generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const successId = `${fieldId}-success`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
    success ? successId : null
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id || fieldId,
        name: children.props.name || name,
        required: children.props.required ?? required,
        "aria-invalid": Boolean(error),
        "aria-describedby": [
          children.props["aria-describedby"],
          describedBy
        ]
          .filter(Boolean)
          .join(" ") || undefined
      })
    : children;

  return (
    <div className={`w-full min-w-0 ${className}`}>
      {(label || labelAction) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <label
              htmlFor={fieldId}
              className="text-sm font-semibold text-library-forest"
            >
              {label}
              {required && (
                <span className="ml-1 text-red-500" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}

          {labelAction && (
            <div className="shrink-0 text-xs font-semibold text-library-forest">
              {labelAction}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {control}
      </div>

      {hint && !error && (
        <p
          id={hintId}
          className="mt-2 text-xs leading-5 text-library-muted"
        >
          {hint}
        </p>
      )}

      {error && (
        <motion.p
          id={errorId}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-600"
        >
          {showStatusIcon && (
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
          )}
          <span>{error}</span>
        </motion.p>
      )}

      {success && !error && (
        <motion.p
          id={successId}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-emerald-700"
        >
          {showStatusIcon && (
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
          )}
          <span>{success}</span>
        </motion.p>
      )}
    </div>
  );
}
