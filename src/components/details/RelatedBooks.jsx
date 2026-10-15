
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import BookGrid from "../books/BookGrid";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";

export default function RelatedBooks({
  book,
  limit = 4,
  className = ""
}) {
  const { books } = useBooks();

  const relatedBooks = useMemo(() => {
    if (!book || !Array.isArray(books)) return [];

    const currentId = book.id || book.isbn;

    const sameCategory = books.filter((item) => {
      const itemId = item.id || item.isbn;

      return (
        itemId !== currentId &&
        item.category?.toLowerCase() === book.category?.toLowerCase()
      );
    });

    const otherBooks = books.filter((item) => {
      const itemId = item.id || item.isbn;

      return (
        itemId !== currentId &&
        item.category?.toLowerCase() !== book.category?.toLowerCase()
      );
    });

    return [...sameCategory, ...otherBooks].slice(
      0,
      Math.max(0, limit)
    );
  }, [book, books, limit]);

  if (!book || relatedBooks.length === 0) return null;

  return (
    <section
      className={`w-full overflow-hidden bg-library-cream py-14 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <SectionHeading
              eyebrow="Continue Exploring"
              title="You May Also Enjoy"
              highlight="Also Enjoy"
              description={`Discover more titles from ${book.category || "our library"} and find your next favorite read.`}
              align="left"
              className="mb-0"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="shrink-0"
          >
            <Link
              to={`/books?category=${encodeURIComponent(book.category || "")}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-library-forest transition-colors hover:text-library-gold"
            >
              Explore Category
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-9 sm:mt-12">
          <BookGrid
            books={relatedBooks}
            columns="featured"
            showBorrowButton={false}
            showDescription={false}
            emptyTitle="More books are on the way"
            emptyDescription="Explore our collection to discover more reading choices."
          />
        </div>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 rounded-2xl border border-library-forest/10 bg-white p-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-library-forest/5 text-library-forest">
              <BookOpen size={22} />
            </div>

            <div>
              <h3 className="text-base font-bold text-library-forest">
                Looking for something different?
              </h3>
              <p className="mt-1 text-sm leading-6 text-library-muted">
                Browse the full collection and discover new subjects.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            rightIcon={<ArrowRight size={17} />}
            onClick={() => {
              window.location.href = "/books";
            }}
          >
            Browse All Books
          </Button>
        </div>
      </div>
    </section>
  );
}
