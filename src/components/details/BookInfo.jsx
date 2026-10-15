
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  Star,
  Tag,
  UserRound
} from "lucide-react";
import Badge from "../common/Badge";
import AvailabilityBadge from "../books/AvailabilityBadge";

export default function BookInfo({
  book,
  className = "",
  showDescription = true,
  showTags = true,
  showAvailability = true
}) {
  if (!book) return null;

  const {
    title,
    author,
    category,
    description,
    rating,
    year,
    tags = [],
    availableCopies
  } = book;

  const formattedRating = Number.isFinite(Number(rating))
    ? Number(rating).toFixed(1)
    : null;

  return (
    <div className={`min-w-0 w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <Badge variant="primary" size="md">
              {category}
            </Badge>
          )}

          {year && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-library-muted sm:text-sm">
              <CalendarDays size={15} />
              {year}
            </span>
          )}
        </div>

        <h1 className="mt-5 break-words text-3xl font-bold leading-tight tracking-tight text-library-forest sm:text-4xl lg:text-5xl">
          {title || "Untitled Book"}
        </h1>

        {author && (
          <div className="mt-4 flex items-start gap-2 text-library-muted">
            <UserRound size={19} className="mt-0.5 shrink-0 text-library-gold" />
            <p className="text-sm leading-6 sm:text-base">
              Written by{" "}
              <span className="font-semibold text-library-ink">
                {author}
              </span>
            </p>
          </div>
        )}

        {formattedRating && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-library-gold/15 px-3 py-2">
              <Star
                size={17}
                fill="currentColor"
                className="text-library-gold"
              />
              <span className="text-sm font-bold text-library-forest">
                {formattedRating}
              </span>
            </div>

            <span className="text-sm text-library-muted">
              Reader rating
            </span>
          </div>
        )}
      </motion.div>

      {showAvailability && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <AvailabilityBadge
            availableCopies={availableCopies}
            showCount
            size="md"
          />

          {Number(availableCopies) > 0 && (
            <span className="text-xs text-library-muted sm:text-sm">
              Ready to borrow
            </span>
          )}
        </motion.div>
      )}

      {showDescription && description && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-7"
        >
          <h2 className="flex items-center gap-2 text-base font-bold text-library-forest sm:text-lg">
            <BookOpen size={19} className="text-library-gold" />
            About This Book
          </h2>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-library-muted sm:text-base sm:leading-8">
            {description}
          </p>
        </motion.div>
      )}

      {showTags && tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-7"
        >
          <h2 className="flex items-center gap-2 text-sm font-bold text-library-forest">
            <Tag size={17} className="text-library-gold" />
            Topics & Keywords
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="max-w-full break-words rounded-full border border-library-forest/10 bg-white px-3 py-1.5 text-xs font-medium text-library-muted transition-colors hover:border-library-gold/50 hover:text-library-forest sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
