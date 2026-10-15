
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Star
} from "lucide-react";
import BookCover from "./BookCover";
import AvailabilityBadge from "./AvailabilityBadge";
import Badge from "../common/Badge";
import Button from "../common/Button";

export default function BookCard({
  book,
  index = 0,
  onBorrow,
  isBorrowed = false,
  showBorrowButton = true,
  showDescription = false,
  className = ""
}) {
  if (!book) return null;

  const {
    id,
    title = "Untitled Book",
    author = "Unknown Author",
    category = "General",
    cover,
    rating,
    availableCopies = 0,
    featured = false,
    description = ""
  } = book;

  const bookId = id || book.isbn;
  const detailsPath = `/books/${bookId}`;
  const isAvailable = Number(availableCopies) > 0;
  const canBorrow = isAvailable && !isBorrowed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index % 4, 3) * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -6 }}
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-library-forest/10 bg-white p-3 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-4 lg:rounded-3xl ${className}`}
    >
      <div className="relative">
        <Link
          to={detailsPath}
          aria-label={`View details for ${title}`}
          className="block overflow-hidden rounded-xl bg-library-paper sm:rounded-2xl"
        >
          <BookCover
            src={cover}
            title={title}
            author={author}
            category={category}
            hover={false}
            rounded="xl"
            className="shadow-none"
          />
        </Link>

        {featured && (
          <Badge
            variant="gold"
            size="sm"
            icon={<Bookmark size={12} />}
            className="absolute left-2 top-2 shadow-sm sm:left-3 sm:top-3"
          >
            Featured
          </Badge>
        )}

        {typeof rating === "number" && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-library-ink shadow-md backdrop-blur-sm sm:bottom-3 sm:right-3">
            <Star size={12} className="fill-library-gold text-library-gold" />
            {rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4 sm:pt-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant="default" size="sm" className="max-w-full truncate">
            {category}
          </Badge>

          <AvailabilityBadge
            availableCopies={availableCopies}
            size="sm"
          />
        </div>

        <Link to={detailsPath} className="group/title block">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-library-forest transition-colors group-hover/title:text-library-gold sm:text-lg">
            {title}
          </h3>
        </Link>

        <p className="mt-1.5 line-clamp-1 text-xs text-library-muted sm:text-sm">
          By {author}
        </p>

        {showDescription && description && (
          <p className="mt-3 line-clamp-3 text-xs leading-6 text-library-muted sm:text-sm">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4">
          {showBorrowButton ? (
            <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                rightIcon={<ArrowUpRight size={15} />}
                onClick={() => {
                  window.location.href = detailsPath;
                }}
              >
                Details
              </Button>

              <Button
                variant={isBorrowed ? "secondary" : "primary"}
                size="sm"
                fullWidth
                disabled={!canBorrow}
                leftIcon={<BookOpen size={15} />}
                onClick={() => onBorrow?.(bookId)}
              >
                {isBorrowed
                  ? "Borrowed"
                  : isAvailable
                    ? "Borrow"
                    : "Unavailable"}
              </Button>
            </div>
          ) : (
            <Link
              to={detailsPath}
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-library-forest/5 px-3 py-2 text-sm font-semibold text-library-forest transition hover:bg-library-forest hover:text-white"
            >
              View Book Details
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
