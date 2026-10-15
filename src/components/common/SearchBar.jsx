
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Search, X } from "lucide-react";
import Button from "./Button";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search by title, author, or category...",
  categories = [],
  selectedCategory = "all",
  onCategoryChange,
  showCategory = false,
  variant = "default",
  autoFocus = false,
  className = ""
}) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const query = isControlled ? value : internalValue;

  const updateQuery = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  const clearSearch = () => {
    updateQuery("");
    onSearch?.("");
  };

  const isHero = variant === "hero";

  return (
    <motion.form
      onSubmit={submitSearch}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      role="search"
      className={`flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-library-forest/10 bg-white p-2 shadow-soft sm:flex-row sm:items-center sm:gap-2 ${
        isHero ? "rounded-2xl sm:rounded-full sm:p-2.5" : ""
      } ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
        <Search
          size={21}
          className="shrink-0 text-library-forest"
          aria-hidden="true"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search library books"
          className="min-h-11 w-full min-w-0 flex-1 border-0 bg-transparent text-sm text-library-ink outline-none placeholder:text-library-muted/70 focus:ring-0 sm:text-base"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              aria-label="Clear search"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-library-muted transition hover:bg-library-paper hover:text-library-forest"
            >
              <X size={17} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {showCategory && (
        <div className="flex min-w-0 items-center gap-2 border-t border-library-forest/10 px-3 py-2 sm:max-w-52 sm:border-l sm:border-t-0 sm:px-3 sm:py-0">
          <BookOpen
            size={17}
            className="shrink-0 text-library-muted"
            aria-hidden="true"
          />

          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange?.(event.target.value)}
            aria-label="Filter by book category"
            className="min-h-10 w-full min-w-0 cursor-pointer border-0 bg-transparent text-sm text-library-ink outline-none focus:ring-0"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option
                key={category.id || category.slug || category.name}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button
        type="submit"
        size="md"
        fullWidth
        className="sm:w-auto sm:shrink-0 sm:rounded-full"
        leftIcon={<Search size={17} />}
      >
        Search Books
      </Button>
    </motion.form>
  );
}
