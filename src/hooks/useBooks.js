
import { useContext, useMemo } from "react";
import { LibraryContext } from "../context/LibraryContext";
import {
  getAvailableBooks,
  getBookById,
  getBooksByCategory,
  getBookStatistics,
  getFeaturedBooks,
  getPopularBooks
} from "../utils/bookHelpers";

export function useBooks() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useBooks must be used within a LibraryProvider.");
  }

  const {
    books,
    borrowHistory,
    filteredBooks,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    borrowBook,
    returnBook,
    updateReadingProgress,
    resetFilters
  } = context;

  const availableBooks = useMemo(
    () => getAvailableBooks(books),
    [books]
  );

  const featuredBooks = useMemo(
    () => getFeaturedBooks(books, 8),
    [books]
  );

  const popularBooks = useMemo(
    () => getPopularBooks(books, 8),
    [books]
  );

  const statistics = useMemo(
    () => getBookStatistics(books),
    [books]
  );

  const getBook = (bookId) => getBookById(books, bookId);

  const getBooksInCategory = (category) =>
    getBooksByCategory(books, category);

  return {
    books,
    filteredBooks,
    availableBooks,
    featuredBooks,
    popularBooks,
    statistics,
    borrowHistory,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    getBook,
    getBooksInCategory,
    borrowBook,
    returnBook,
    updateReadingProgress,
    resetFilters
  };
}

export default useBooks;
