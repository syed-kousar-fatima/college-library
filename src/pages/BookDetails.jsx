
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Home,
  LibraryBig,
  Sparkles
} from "lucide-react";
import BookCover from "../components/books/BookCover";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import BookInfo from "../components/details/BookInfo";
import BookMeta from "../components/details/BookMeta";
import AvailabilityPanel from "../components/details/AvailabilityPanel";
import RelatedBooks from "../components/details/RelatedBooks";
import { useBooks } from "../hooks/useBooks";

export default function BookDetails() {
  const { id } = useParams();
  const { books, getBook } = useBooks();

  const book = useMemo(
    () => getBook(id) || books.find((item) => item.isbn === id),
    [getBook, books, id]
  );

  if (!book) {
    return (
      <div className="flex min-h-[75vh] w-full items-center justify-center bg-library-cream px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-3xl border border-library-forest/10 bg-white p-7 text-center shadow-soft sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-library-paper text-library-forest">
            <BookOpen size={30} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-library-ink sm:text-3xl">
            Book not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-library-muted sm:text-base">
            We couldn't find this title in the current collection. Browse the
            catalogue to discover another book.
          </p>
          <Link to="/books" className="mt-7 inline-flex">
            <Button leftIcon={<ArrowLeft size={17} />}>
              Back to All Books
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const bookId = book.id || book.isbn;

  return (
    <div className="min-h-screen w-full overflow-hidden bg-library-cream">
      <section className="relative w-full overflow-hidden bg-library-deep px-4 pb-8 pt-28 text-white sm:px-6 sm:pb-10 sm:pt-32 lg:px-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-library-gold/15 blur-3xl" />

        <div className="relative mx-auto w-full max-w-screen-wide">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-white/55 sm:text-sm"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 transition hover:text-library-gold"
            >
              <Home size={14} />
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/books" className="transition hover:text-library-gold">
              Books
            </Link>
            <ChevronRight size={14} />
            <span className="max-w-[220px] truncate text-white/90 sm:max-w-md">
              {book.title}
            </span>
          </nav>

          <Link
            to="/books"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-library-gold"
          >
            <ArrowLeft size={16} />
            Back to collection
          </Link>
        </div>
      </section>

      <section className="section-padding w-full">
        <div className="section-container">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-12 xl:grid-cols-[minmax(320px,0.75fr)_minmax(0,1.25fr)] xl:gap-16">
            <motion.aside
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="min-w-0"
            >
              <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-library-forest/10 bg-white p-5 shadow-card sm:p-7 lg:sticky lg:top-28">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-library-paper/80 blur-2xl" />

                <div className="relative mx-auto w-full max-w-[270px]">
                  <BookCover
                    src={book.cover}
                    title={book.title}
                    author={book.author}
                    category={book.category}
                    aspectRatio="2 / 3"
                    priority
                    className="overflow-hidden rounded-2xl shadow-card"
                    imageClassName="transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>

                <div className="relative mt-6 flex flex-wrap justify-center gap-2">
                  {book.featured && (
                    <Badge
                      variant="gold"
                      icon={<Sparkles size={13} />}
                    >
                      Featured title
                    </Badge>
                  )}
                  {book.popular && (
                    <Badge variant="primary">Popular read</Badge>
                  )}
                </div>

                <div className="relative mt-6 rounded-2xl bg-library-paper p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-library-forest">
                      <LibraryBig size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-library-ink">
                        PageNest Library
                      </p>
                      <p className="mt-1 text-xs text-library-muted">
                        Where Campus Minds Take Flight
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="min-w-0"
            >
              <BookInfo book={book} />

              <div className="mt-8">
                <BookMeta book={book} />
              </div>

              <div className="mt-8">
                <AvailabilityPanel book={book} />
              </div>

              <div className="mt-8 rounded-2xl border border-library-forest/10 bg-white p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-library-paper text-library-forest">
                    <BookOpen size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-library-ink">
                      About this book
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-library-muted">
                      {book.description ||
                        "Explore this title to expand your knowledge and discover new ideas."}
                    </p>
                  </div>
                </div>

                {Array.isArray(book.tags) && book.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-library-forest/10 bg-library-cream px-3 py-1.5 text-xs font-medium text-library-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/books" className="flex-1">
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<ArrowLeft size={17} />}
                  >
                    Back to Books
                  </Button>
                </Link>

                <Link to="/categories" className="flex-1">
                  <Button
                    fullWidth
                    rightIcon={<ArrowRight size={17} />}
                  >
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 border-t border-library-forest/10 pt-12 sm:mt-20 sm:pt-16">
            <RelatedBooks
              currentBookId={bookId}
              category={book.category}
              books={books}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
