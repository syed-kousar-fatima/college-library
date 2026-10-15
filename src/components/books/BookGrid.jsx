
import { motion } from "framer-motion";
import { BookOpen, Search, RotateCcw } from "lucide-react";
import BookCard from "./BookCard";
import Loader from "../common/Loader";
import Button from "../common/Button";

export default function BookGrid({
  books = [],
  loading = false,
  onBorrow,
  borrowedBookIds = [],
  showBorrowButton = true,
  showDescription = false,
  onReset,
  emptyTitle = "No books found",
  emptyDescription = "Try another search term or adjust your filters to discover more books.",
  columns = "default",
  className = ""
}) {
  const columnStyles = {
    default:
      "grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
    compact:
      "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5",
    featured:
      "grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
    wide:
      "grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5"
  };

  if (loading) {
    return <Loader label="Finding books for you..." />;
  }

  if (!books.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border border-dashed border-library-forest/20 bg-white/60 px-5 py-12 text-center sm:min-h-[360px] ${className}`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-library-forest/5 text-library-forest sm:h-20 sm:w-20">
          <Search size={30} strokeWidth={1.5} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-library-forest sm:text-2xl">
          {emptyTitle}
        </h3>

        <p className="mt-3 max-w-md text-sm leading-7 text-library-muted sm:text-base">
          {emptyDescription}
        </p>

        {onReset && (
          <Button
            variant="outline"
            size="md"
            className="mt-6"
            leftIcon={<RotateCcw size={16} />}
            onClick={onReset}
          >
            Clear Filters
          </Button>
        )}

        <div className="mt-8 flex items-center gap-2 text-xs font-medium text-library-muted">
          <BookOpen size={15} />
          <span>Your next great read is waiting.</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">
        <p className="text-sm text-library-muted">
          Showing{" "}
          <span className="font-bold text-library-forest">
            {books.length}
          </span>{" "}
          {books.length === 1 ? "book" : "books"}
        </p>

        <div className="flex items-center gap-2 text-xs text-library-muted">
          <span className="h-2 w-2 rounded-full bg-library-gold" />
          Curated for curious minds
        </div>
      </div>

      <motion.div
        layout
        className={`grid min-w-0 gap-4 sm:gap-5 lg:gap-6 ${columnStyles[columns] || columnStyles.default}`}
      >
        {books.map((book, index) => (
          <motion.div
            layout
            key={book.id || book.isbn || `${book.title}-${index}`}
            className="min-w-0"
          >
            <BookCard
              book={book}
              index={index}
              onBorrow={onBorrow}
              isBorrowed={borrowedBookIds.includes(book.id)}
              showBorrowButton={showBorrowButton}
              showDescription={showDescription}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
