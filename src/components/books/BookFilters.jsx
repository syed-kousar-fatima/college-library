
import { motion } from "framer-motion";
import {
  ArrowDownAZ,
  BookOpen,
  CheckCircle2,
  Filter,
  RotateCcw,
  SlidersHorizontal
} from "lucide-react";
import categories from "../../data/categories";
import Button from "../common/Button";

const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "titleAsc", label: "Title: A to Z" },
  { value: "titleDesc", label: "Title: Z to A" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "available", label: "Available First" }
];

const availabilityOptions = [
  { value: "all", label: "All Books" },
  { value: "available", label: "Available Only" },
  { value: "unavailable", label: "Unavailable" }
];

const selectClassName =
  "min-h-11 w-full min-w-0 appearance-none rounded-xl border border-library-forest/10 bg-white px-3 py-2.5 text-sm font-medium text-library-ink outline-none transition focus:border-library-forest focus:ring-2 focus:ring-library-forest/10 sm:px-4";

export default function BookFilters({
  selectedCategory = "all",
  onCategoryChange,
  availabilityFilter = "all",
  onAvailabilityChange,
  sortBy = "featured",
  onSortChange,
  onReset,
  resultCount,
  className = ""
}) {
  const hasActiveFilters =
    selectedCategory !== "all" ||
    availabilityFilter !== "all" ||
    sortBy !== "featured";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      aria-label="Filter and sort books"
      className={`w-full min-w-0 rounded-2xl border border-library-forest/10 bg-white p-4 shadow-soft sm:p-5 lg:rounded-3xl lg:p-6 ${className}`}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-library-forest/5 text-library-forest">
            <SlidersHorizontal size={19} />
          </div>

          <div>
            <h3 className="text-base font-bold text-library-forest sm:text-lg">
              Refine Your Search
            </h3>
            <p className="mt-1 text-xs text-library-muted sm:text-sm">
              Find the right book for your next study session.
            </p>
          </div>
        </div>

        {typeof resultCount === "number" && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-library-paper px-3 py-1.5 text-xs font-semibold text-library-forest">
            <BookOpen size={14} />
            {resultCount} {resultCount === 1 ? "book" : "books"}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="min-w-0">
          <label
            htmlFor="book-category-filter"
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-library-muted"
          >
            <Filter size={14} />
            Category
          </label>

          <select
            id="book-category-filter"
            value={selectedCategory}
            onChange={(event) => onCategoryChange?.(event.target.value)}
            className={selectClassName}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="book-availability-filter"
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-library-muted"
          >
            <CheckCircle2 size={14} />
            Availability
          </label>

          <select
            id="book-availability-filter"
            value={availabilityFilter}
            onChange={(event) =>
              onAvailabilityChange?.(event.target.value)
            }
            className={selectClassName}
          >
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <label
            htmlFor="book-sort-filter"
            className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-library-muted"
          >
            <ArrowDownAZ size={14} />
            Sort By
          </label>

          <select
            id="book-sort-filter"
            value={sortBy}
            onChange={(event) => onSortChange?.(event.target.value)}
            className={selectClassName}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-5 flex justify-end border-t border-library-forest/10 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReset?.()}
            leftIcon={<RotateCcw size={15} />}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </motion.section>
  );
}
