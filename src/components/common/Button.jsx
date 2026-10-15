
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-library-forest text-white shadow-md hover:bg-library-deep hover:shadow-lg",
  secondary:
    "bg-library-gold text-library-deep shadow-md hover:bg-[#d8b577] hover:shadow-lg",
  outline:
    "border border-library-forest/20 bg-transparent text-library-forest hover:border-library-forest hover:bg-library-forest/5",
  light:
    "bg-white text-library-forest shadow-md hover:bg-library-cream",
  ghost:
    "bg-transparent text-library-forest hover:bg-library-forest/5",
  danger:
    "bg-red-600 text-white shadow-md hover:bg-red-700"
};

const sizes = {
  sm: "min-h-9 px-3 text-xs sm:text-sm",
  md: "min-h-11 px-5 text-sm sm:text-base",
  lg: "min-h-12 px-6 text-sm sm:min-h-14 sm:px-8 sm:text-base",
  xl: "min-h-14 px-7 text-base sm:min-h-16 sm:px-10 sm:text-lg"
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    type = "button",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = "",
    onClick,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={isDisabled ? undefined : { y: -2 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-library-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        variants[variant] || variants.primary
      } ${sizes[size] || sizes.md} ${
        fullWidth ? "w-full" : "max-w-full"
      } ${className}`}
      {...props}
    >
      {loading ? (
        <LoaderCircle size={18} className="shrink-0 animate-spin" />
      ) : (
        leftIcon
      )}

      <span>{children}</span>

      {!loading && rightIcon}
    </motion.button>
  );
});

export default Button;
