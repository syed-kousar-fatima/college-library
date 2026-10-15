
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import initialBooks from "../data/books";
import initialBorrowHistory from "../data/borrowHistory";
import {
  filterBooks,
  searchBooks,
  sortBooks
} from "../utils/bookHelpers";

export const LibraryContext = createContext(null);

const BORROWING_LIMIT = 5;
const BORROWING_PERIOD_DAYS = 21;

const normalizeCategory = (value = "") =>
  String(value).toLowerCase().replace(/[-_]/g, " ").trim();

const getCategoryMatch = (bookCategory, selectedCategory) => {
  if (!selectedCategory || selectedCategory === "all") {
    return true;
  }

  return (
    normalizeCategory(bookCategory) ===
    normalizeCategory(selectedCategory)
  );
};

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [borrowHistory, setBorrowHistory] = useState(initialBorrowHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredBooks = useMemo(() => {
    let result = searchBooks(books, searchQuery);

    result = result.filter((book) =>
      getCategoryMatch(book.category, selectedCategory)
    );

    result = filterBooks(result, {
      availability: availabilityFilter
    });

    return sortBooks(result, sortBy);
  }, [
    books,
    searchQuery,
    selectedCategory,
    availabilityFilter,
    sortBy
  ]);

  const borrowBook = useCallback(
    (bookId) => {
      const book = books.find(
        (item) => item.id === bookId || item.isbn === bookId
      );

      if (!book) {
        return {
          success: false,
          message: "This book could not be found."
        };
      }

      if (book.availableCopies <= 0) {
        return {
          success: false,
          message: "This book is currently unavailable."
        };
      }

      const activeLoans = borrowHistory.filter(
        (record) => record.status === "borrowed"
      );

      if (activeLoans.some((record) => record.bookId === book.id)) {
        return {
          success: false,
          message: "You have already borrowed this book."
        };
      }

      if (activeLoans.length >= BORROWING_LIMIT) {
        return {
          success: false,
          message: `You can borrow up to ${BORROWING_LIMIT} books at a time.`
        };
      }

      const issuedDate = new Date();
      const dueDate = new Date(issuedDate);
      dueDate.setDate(dueDate.getDate() + BORROWING_PERIOD_DAYS);

      const newRecord = {
        id: `loan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        bookId: book.id,
        issuedDate: issuedDate.toISOString().slice(0, 10),
        dueDate: dueDate.toISOString().slice(0, 10),
        returnedDate: null,
        status: "borrowed",
        progress: 0,
        notes: ""
      };

      setBooks((currentBooks) =>
        currentBooks.map((item) =>
          item.id === book.id
            ? {
                ...item,
                availableCopies: Math.max(0, item.availableCopies - 1)
              }
            : item
        )
      );

      setBorrowHistory((currentHistory) => [
        newRecord,
        ...currentHistory
      ]);

      return {
        success: true,
        message: `"${book.title}" has been added to your borrowed books.`,
        record: newRecord
      };
    },
    [books, borrowHistory]
  );

  const returnBook = useCallback(
    (recordId) => {
      const record = borrowHistory.find(
        (item) => item.id === recordId
      );

      if (!record || record.status !== "borrowed") {
        return {
          success: false,
          message: "This borrowing record is not active."
        };
      }

      const returnedDate = new Date().toISOString().slice(0, 10);

      setBorrowHistory((currentHistory) =>
        currentHistory.map((item) =>
          item.id === recordId
            ? {
                ...item,
                status: "returned",
                returnedDate
              }
            : item
        )
      );

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === record.bookId
            ? {
                ...book,
                availableCopies: Math.min(
                  book.copies ?? Infinity,
                  book.availableCopies + 1
                )
              }
            : book
        )
      );

      return {
        success: true,
        message: "The book has been returned successfully."
      };
    },
    [borrowHistory]
  );

  const updateReadingProgress = useCallback(
    (recordId, progress) => {
      const numericProgress = Number(progress);

      if (!Number.isFinite(numericProgress)) {
        return {
          success: false,
          message: "Please provide a valid reading progress."
        };
      }

      const record = borrowHistory.find(
        (item) => item.id === recordId
      );

      if (!record || record.status !== "borrowed") {
        return {
          success: false,
          message: "An active borrowing record was not found."
        };
      }

      const nextProgress = Math.min(
        100,
        Math.max(0, Math.round(numericProgress))
      );

      setBorrowHistory((currentHistory) =>
        currentHistory.map((item) =>
          item.id === recordId
            ? {
                ...item,
                progress: nextProgress
              }
            : item
        )
      );

      return {
        success: true,
        message: "Reading progress updated."
      };
    },
    [borrowHistory]
  );

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setAvailabilityFilter("all");
    setSortBy("featured");
  }, []);

  const value = useMemo(
    () => ({
      books,
      setBooks,
      borrowHistory,
      setBorrowHistory,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      availabilityFilter,
      setAvailabilityFilter,
      sortBy,
      setSortBy,
      filteredBooks,
      borrowBook,
      returnBook,
      updateReadingProgress,
      resetFilters
    }),
    [
      books,
      borrowHistory,
      searchQuery,
      selectedCategory,
      availabilityFilter,
      sortBy,
      filteredBooks,
      borrowBook,
      returnBook,
      updateReadingProgress,
      resetFilters
    ]
  );

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error(
      "useLibraryContext must be used inside a LibraryProvider."
    );
  }

  return context;
}

export default LibraryContext;
