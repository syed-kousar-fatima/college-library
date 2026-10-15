
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import SearchBar from "../common/SearchBar";
import categories from "../../data/categories";
import useBooks from "../../hooks/useBooks";

export default function BookSearch({
  showCategory = false,
  variant = "default",
  className = "",
  autoFocus = false,
  onSearch
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useBooks();

  const [query, setQuery] = useState(
    searchParams.get("q") || searchQuery || ""
  );

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
    setSearchQuery(urlQuery);
  }, [searchParams, setSearchQuery]);

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    setSearchQuery(nextQuery);
  };

  const handleSearch = (nextQuery) => {
    const normalizedQuery = nextQuery.trim();

    setQuery(normalizedQuery);
    setSearchQuery(normalizedQuery);

    const nextParams = new URLSearchParams(searchParams);

    if (normalizedQuery) {
      nextParams.set("q", normalizedQuery);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
    onSearch?.(normalizedQuery);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const nextParams = new URLSearchParams(searchParams);

    if (category === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams, { replace: true });
  };

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    setSelectedCategory(urlCategory);
  }, [searchParams, setSelectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-w-0 ${className}`}
    >
      {variant === "hero" && (
        <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-library-forest/75 sm:text-sm">
          <Sparkles size={15} className="text-library-gold" />
          <span>Your next chapter starts here</span>
        </div>
      )}

      <SearchBar
        value={query}
        onChange={handleQueryChange}
        onSearch={handleSearch}
        placeholder="Search titles, authors, ISBN..."
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        showCategory={showCategory}
        variant={variant}
        autoFocus={autoFocus}
      />

      {variant === "hero" && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-library-muted sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Search size={14} />
            Search thousands of possibilities
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-library-gold sm:block" />
          <span>Discover. Learn. Grow.</span>
        </div>
      )}
    </motion.div>
  );
}
