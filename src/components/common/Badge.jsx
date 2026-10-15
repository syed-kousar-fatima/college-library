
import { motion } from "framer-motion";

const variants = {
  default: "bg-library-paper text-library-forest",
  primary: "bg-library-forest text-white",
  gold: "bg-library-gold/15 text-white",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-800",
  muted: "bg-gray-100 text-gray-600",
  light: "border border-white/20 bg-white/10 text-white"
};

const sizes = {
  sm: "px-2 py-1 text-[10px] sm:text-xs",
  md: "px-3 py-1.5 text-xs",
  lg: "px-3.5 py-2 text-sm"
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  rounded = "full",
  dot = false,
  icon,
  animated = false,
  className = "",
  ...props
}) {
  const Component = animated ? motion.span : "span";

  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 }
      }
    : {};

  return (
    <Component
      {...animationProps}
      className={`inline-flex max-w-full items-center gap-1.5 font-semibold leading-none ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.md} ${
        rounded === "lg" ? "rounded-lg" : "rounded-full"
      } ${className}`}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
          aria-hidden="true"
        />
      )}

      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}

      <span className="min-w-0">{children}</span>
    </Component>
  );
}
