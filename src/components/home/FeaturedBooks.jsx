
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import BookGrid from "../books/BookGrid";
import useBooks from "../../hooks/useBooks";
import useLibrary from "../../hooks/useLibrary";

export default function FeaturedBooks() {
  const {
    featuredBooks,
    borrowBook
  } = useBooks();

  const {
    borrowedBooks
  } = useLibrary();

  const borrowedBookIds = borrowedBooks
    .map((record) => record.bookId);

  const handleBorrow = (bookId) => {
    borrowBook(bookId);
  };

  return (
    <section
      id="featured-books"
      className="section-padding relative w-full overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-library-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-library-forest/5 blur-3xl" />

      <div className="section-container relative">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-3xl">
            <SectionHeading
              eyebrow="Handpicked for curious minds"
              title="Featured"
              highlight="Reads"
              description="Explore a selection of inspiring books chosen to spark ideas, build new skills, and make every reading session worthwhile."
              align="left"
              showLine
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex shrink-0 flex-col gap-3 sm:flex-row lg:pb-1"
          >
            <Link
              to="/books"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-library-forest/15 px-5 py-3 text-sm font-bold text-library-forest transition duration-300 hover:border-library-forest hover:bg-library-forest hover:text-white"
            >
              View All Books
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mb-7 flex flex-wrap items-center gap-3 rounded-2xl border border-library-gold/20 bg-library-cream/70 p-4 sm:p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-library-gold/15 text-library-forest">
            <Sparkles size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-library-forest sm:text-base">
              A little inspiration goes a long way
            </h3>
            <p className="mt-1 text-xs leading-5 text-library-muted sm:text-sm">
              Find a new perspective, discover an interesting subject, or revisit a timeless favorite.
            </p>
          </div>

          <BookOpen
            size={25}
            className="hidden shrink-0 text-library-gold sm:block"
          />
        </div>

        <BookGrid
          books={featuredBooks}
          onBorrow={handleBorrow}
          borrowedBookIds={borrowedBookIds}
          columns="featured"
          emptyTitle="Featured books are coming soon"
          emptyDescription="Check back soon to explore our recommended reading collection."
          showBorrowButton
        />

        <div className="mt-10 flex justify-center lg:mt-14">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={18} />}
            onClick={() => {
              window.location.href = "/books";
            }}
          >
            Explore the Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
