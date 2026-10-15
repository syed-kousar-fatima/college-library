
export function searchBooks(books, query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return books;

  return books.filter((book) => {
    const searchableFields = [
      book.title,
      book.author,
      book.category,
      book.isbn,
      book.publisher,
      ...(book.tags || [])
    ];

    return searchableFields.some((field) =>
      String(field || "").toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterBooks(books, filters = {}) {
  const {
    category = "all",
    availability = "all",
    featured,
    popular,
    minRating = 0
  } = filters;

  return books.filter((book) => {
    const matchesCategory =
      category === "all" ||
      book.category.toLowerCase() === category.toLowerCase();

    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && book.availableCopies > 0) ||
      (availability === "unavailable" && book.availableCopies === 0);

    const matchesFeatured =
      featured === undefined || book.featured === featured;

    const matchesPopular =
      popular === undefined || book.popular === popular;

    const matchesRating = (book.rating || 0) >= minRating;

    return (
      matchesCategory &&
      matchesAvailability &&
      matchesFeatured &&
      matchesPopular &&
      matchesRating
    );
  });
}

export function sortBooks(books, sortBy = "featured") {
  const sortedBooks = [...books];

  const sorters = {
    featured: (a, b) => Number(b.featured) - Number(a.featured),
    titleAsc: (a, b) => a.title.localeCompare(b.title),
    titleDesc: (a, b) => b.title.localeCompare(a.title),
    rating: (a, b) => (b.rating || 0) - (a.rating || 0),
    newest: (a, b) => (b.publishedYear || 0) - (a.publishedYear || 0),
    oldest: (a, b) => (a.publishedYear || 0) - (b.publishedYear || 0),
    available: (a, b) => (b.availableCopies || 0) - (a.availableCopies || 0)
  };

  const sorter = sorters[sortBy] || sorters.featured;

  return sortedBooks.sort(sorter);
}

export function getBookById(books, bookId) {
  return books.find((book) => book.id === bookId) || null;
}

export function getBooksByCategory(books, category) {
  if (!category) return [];

  return books.filter(
    (book) => book.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedBooks(books, limit = 4) {
  return books.filter((book) => book.featured).slice(0, limit);
}

export function getPopularBooks(books, limit = 4) {
  return books.filter((book) => book.popular).slice(0, limit);
}

export function getAvailableBooks(books) {
  return books.filter((book) => book.availableCopies > 0);
}

export function getBookStatistics(books) {
  return {
    totalBooks: books.length,
    availableBooks: books.filter((book) => book.availableCopies > 0).length,
    unavailableBooks: books.filter((book) => book.availableCopies === 0).length,
    featuredBooks: books.filter((book) => book.featured).length,
    categories: new Set(books.map((book) => book.category)).size
  };
}
