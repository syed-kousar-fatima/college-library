
const borrowHistory = [
  {
    id: "borrow-001",
    bookId: "book-003",
    issuedDate: "2026-10-01",
    dueDate: "2026-10-22",
    returnedDate: null,
    status: "borrowed",
    progress: 68,
    notes: "Currently reading"
  },
  {
    id: "borrow-002",
    bookId: "book-001",
    issuedDate: "2026-10-05",
    dueDate: "2026-10-26",
    returnedDate: null,
    status: "borrowed",
    progress: 42,
    notes: "Continue reading"
  },
  {
    id: "borrow-003",
    bookId: "book-010",
    issuedDate: "2026-10-08",
    dueDate: "2026-10-29",
    returnedDate: null,
    status: "borrowed",
    progress: 85,
    notes: "Almost finished"
  },
  {
    id: "borrow-004",
    bookId: "book-002",
    issuedDate: "2026-09-01",
    dueDate: "2026-09-22",
    returnedDate: "2026-09-20",
    status: "returned",
    progress: 100,
    notes: "Completed"
  },
  {
    id: "borrow-005",
    bookId: "book-005",
    issuedDate: "2026-08-10",
    dueDate: "2026-08-31",
    returnedDate: "2026-08-28",
    status: "returned",
    progress: 100,
    notes: "Completed"
  },
  {
    id: "borrow-006",
    bookId: "book-009",
    issuedDate: "2026-07-15",
    dueDate: "2026-08-05",
    returnedDate: "2026-08-03",
    status: "returned",
    progress: 100,
    notes: "Completed"
  },
  {
    id: "borrow-007",
    bookId: "book-006",
    issuedDate: "2026-06-10",
    dueDate: "2026-07-01",
    returnedDate: "2026-06-29",
    status: "returned",
    progress: 100,
    notes: "Completed"
  }
];

export default borrowHistory;
