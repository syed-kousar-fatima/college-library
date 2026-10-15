
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function BookCover({
  src,
  title = "Untitled Book",
  author = "",
  category = "Library Collection",
  aspectRatio = "3 / 4",
  rounded = "xl",
  hover = true,
  priority = false,
  className = "",
  imageClassName = ""
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const roundedStyles = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl"
  };

  const showImage = Boolean(src) && !imageFailed;

  return (
    <motion.div
      whileHover={hover ? { y: -5, rotate: -1 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative w-full overflow-hidden bg-library-paper shadow-soft ${
        roundedStyles[rounded] || roundedStyles.xl
      } ${className}`}
      style={{ aspectRatio }}
    >
      {showImage ? (
        <img
          src={src}
          alt={`Cover of ${title}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageFailed(true)}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            hover ? "group-hover:scale-105" : ""
          } ${imageClassName}`}
        />
      ) : (
        <div className="library-gradient relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4 text-center text-white">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/10" />
          <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full border border-library-gold/30" />

          <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-library-gold/40 bg-white/10 text-library-gold sm:h-16 sm:w-16">
            <BookOpen size={28} strokeWidth={1.4} />
          </div>

          <p className="relative line-clamp-3 text-sm font-bold leading-snug sm:text-base">
            {title}
          </p>

          {author && (
            <p className="relative mt-2 line-clamp-2 text-xs text-white/70">
              {author}
            </p>
          )}

          <span className="relative mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-library-gold sm:text-[10px]">
            {category}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" />
    </motion.div>
  );
}
