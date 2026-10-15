
import { useContext, useMemo } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { getDueDateStatus } from "../utils/formatDate";

export function useLibrary() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider.");
  }

  const { books, borrowHistory } = context;

  const enrichedHistory = useMemo(() => {
    return borrowHistory.map((record) => {
      const book = books.find((item) => item.id === record.bookId) || null;
      const dueDateInfo = getDueDateStatus(record.dueDate);

      return {
        ...record,
        book,
        dueDateInfo:
          record.status === "borrowed"
            ? dueDateInfo
            : {
                label: "Returned",
                status: "returned",
                daysRemaining: null
              }
      };
    });
  }, [books, borrowHistory]);

  const borrowedBooks = useMemo(
    () => enrichedHistory.filter((record) => record.status === "borrowed"),
    [enrichedHistory]
  );

  const returnedBooks = useMemo(
    () => enrichedHistory.filter((record) => record.status === "returned"),
    [enrichedHistory]
  );

  const overdueBooks = useMemo(
    () =>
      borrowedBooks.filter(
        (record) => record.dueDateInfo.status === "overdue"
      ),
    [borrowedBooks]
  );

  const dueSoonBooks = useMemo(
    () =>
      borrowedBooks.filter((record) =>
        ["due-today", "due-soon"].includes(record.dueDateInfo.status)
      ),
    [borrowedBooks]
  );

  const statistics = useMemo(
    () => ({
      currentlyBorrowed: borrowedBooks.length,
      booksReturned: returnedBooks.length,
      overdueBooks: overdueBooks.length,
      dueSoonBooks: dueSoonBooks.length,
      totalRecords: enrichedHistory.length,
      completedBooks: returnedBooks.length,
      averageReadingProgress:
        borrowedBooks.length > 0
          ? Math.round(
              borrowedBooks.reduce(
                (total, record) => total + (record.progress || 0),
                0
              ) / borrowedBooks.length
            )
          : 0
    }),
    [
      borrowedBooks,
      returnedBooks,
      overdueBooks,
      dueSoonBooks,
      enrichedHistory
    ]
  );

  return {
    borrowHistory: enrichedHistory,
    borrowedBooks,
    returnedBooks,
    overdueBooks,
    dueSoonBooks,
    statistics
  };
}

export default useLibrary;
