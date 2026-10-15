
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, LibraryBig, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import BookSearch from "../components/books/BookSearch";
import BookFilters from "../components/books/BookFilters";
import BookGrid from "../components/books/BookGrid";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import SectionHeading from "../components/common/SectionHeading";
import { useBooks } from "../hooks/useBooks";
import { useLibrary } from "../hooks/useLibrary";
import { useAuth } from "../hooks/useAuth";

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    books,
    filteredBooks,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    resetFilters,
    borrowBook
  } = useBooks();

  const { borrowHistory } = useLibrary();
  const { isAuthenticated } = useAuth();

  const borrowedBookIds = useMemo(
    () =>
      borrowHistory
        .filter((record) => record.status === "borrowed")
        .map((record) => record.bookId),
    [borrowHistory]
  );

  useEffect(() => {
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

    if (query !== searchQuery) {
      setSearchQuery(query);
    }

    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
  }, [
    searchParams,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory
  ]);

  const handleSearch = (query) => {
    const nextParams = new URLSearchParams(searchParams);

    if (query.trim()) {
      nextParams.set("q", query.trim());
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams);
  };

  const handleReset = () => {
    resetFilters();
    setSearchParams({});
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(selectedCategory) ||
    availabilityFilter !== "all" ||
    sortBy !== "featured";

  const availableCount = books.filter(
    (book) => Number(book.availableCopies) > 0
  ).length;

  const handleBorrow = async (book) => {
    if (!isAuthenticated) {
      return {
        success: false,
        message: "Please sign in to borrow a book."
      };
    }

    return await borrowBook(book.id || book.isbn);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-library-cream">
      <section className="relative w-full overflow-hidden bg-library-deep px-4 pb-12 pt-32 text-white sm:px-6 sm:pb-16 sm:pt-36 lg:px-10">
        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-library-gold/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-screen-wide items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <Badge variant="gold" icon={<BookOpen size={14} />}>
              The library collection
            </Badge>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Find a book.
              <span className="mt-1 block font-display text-5xl font-normal text-library-gold sm:text-6xl md:text-7xl xl:text-8xl">
                Discover a world.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Explore your campus collection, discover new subjects, and find
              your next great read.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="min-w-32 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-library-gold/15 text-library-gold">
                <LibraryBig size={21} />
              </div>
              <p className="text-2xl font-black sm:text-3xl">
                {books.length}
              </p>
              <p className="mt-1 text-xs text-white/55 sm:text-sm">
                Sample titles
              </p>
            </div>

            <div className="min-w-32 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <BookOpen size={21} />
              </div>
              <p className="text-2xl font-black sm:text-3xl">
                {availableCount}
              </p>
              <p className="mt-1 text-xs text-white/55 sm:text-sm">
                Available titles
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding w-full">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">
            <BookSearch
              variant="default"
              showCategory={false}
              onSearch={handleSearch}
              className="-mt-1"
            />
          </div>

          <div className="mt-12">
            <SectionHeading
              eyebrow="Your next chapter"
              title="Explore the"
              highlight="collection"
              description="Search by title, author, subject, or ISBN. Filter the collection to find exactly what you need."
              align="left"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[285px_minmax(0,1fr)]">
            <aside className="rounded-3xl border border-library-forest/10 bg-white p-5 shadow-soft sm:p-6 lg:sticky lg:top-28">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={19}
                    className="text-library-forest"
                  />
                  <h2 className="text-lg font-bold text-library-ink">
                    Filters
                  </h2>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-library-muted transition hover:text-library-forest"
                  >
                    <RotateCcw size={13} />
                    Reset
                  </button>
                )}
              </div>

              <BookFilters
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                availabilityFilter={availabilityFilter}
                onAvailabilityChange={setAvailabilityFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onReset={handleReset}
                resultCount={filteredBooks.length}
              />

              <div className="mt-7 rounded-2xl bg-library-paper p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-library-forest">
                  <BookOpen size={20} />
                </div>
                <h3 className="mt-3 font-bold text-library-ink">
                  Keep exploring
                </h3>
                <p className="mt-2 text-sm leading-6 text-library-muted">
                  Every subject has something new to teach you.
                </p>
                <Link
                  to="/categories"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-library-forest hover:text-library-gold"
                >
                  Browse categories
                  <ArrowRight size={15} />
                </Link>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black text-library-ink sm:text-2xl">
                    {selectedCategory || "All Books"}
                  </h2>
                  <p className="mt-1 text-sm text-library-muted">
                    Showing {filteredBooks.length} of {books.length} titles
                  </p>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-library-forest/15 bg-white px-4 py-2.5 text-sm font-bold text-library-forest transition hover:border-library-gold"
                  >
                    <RotateCcw size={15} />
                    Clear filters
                  </button>
                )}
              </div>

              <BookGrid
                books={filteredBooks}
                onBorrow={handleBorrow}
                borrowedBookIds={borrowedBookIds}
                showBorrowButton
                showDescription
                columns="default"
                onReset={handleReset}
                emptyTitle="No books found"
                emptyDescription="Try another search or adjust your filters to discover more books."
              />
            </div>
          </div>

          <div className="mt-14 rounded-3xl bg-library-deep p-6 text-white sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-library-gold">
                  Your reading journey
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Ready to borrow your next book?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Sign in to manage your borrowed books, track due dates, and
                  keep your reading history in one place.
                </p>
              </div>

              <Button
                onClick={() => {
                  window.location.href = isAuthenticated
                    ? "/dashboard"
                    : "/login";
                }}
                rightIcon={<ArrowRight size={18} />}
                size="lg"
                className="shrink-0"
              >
                {isAuthenticated ? "My Dashboard" : "Student Login"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
