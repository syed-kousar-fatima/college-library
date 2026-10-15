
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Loader({
  size = "md",
  fullScreen = false,
  label = "Preparing your library...",
  showLabel = true,
  className = ""
}) {
  const sizes = {
    sm: {
      container: "h-10 w-10",
      icon: 17,
      ring: "h-10 w-10"
    },
    md: {
      container: "h-14 w-14",
      icon: 24,
      ring: "h-14 w-14"
    },
    lg: {
      container: "h-20 w-20",
      icon: 32,
      ring: "h-20 w-20"
    }
  };

  const currentSize = sizes[size] || sizes.md;

  const content = (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen w-full" : "w-full py-10"
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute rounded-full border-2 border-library-forest/10 border-t-library-gold ${currentSize.ring}`}
        />

        <motion.div
          animate={{ y: [0, -4, 0], rotate: [0, -3, 3, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`flex items-center justify-center rounded-2xl bg-library-forest text-library-gold shadow-soft ${currentSize.container}`}
        >
          <BookOpen size={currentSize.icon} strokeWidth={1.8} />
        </motion.div>
      </div>

      {showLabel && (
        <motion.p
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-center text-sm font-medium text-library-muted"
        >
          {label}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-library-cream px-4">
        {content}
      </div>
    );
  }

  return content;
}
