
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock3,
  History,
  LibraryBig,
  Sparkles
} from "lucide-react";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import SectionHeading from "../components/common/SectionHeading";
import BookCover from "../components/books/BookCover";
import AvailabilityBadge from "../components/books/AvailabilityBadge";
import { useAuth } from "../hooks/useAuth";
import { useBooks } from "../hooks/useBooks";
import { useLibrary } from "../hooks/useLibrary";
import {
  formatDate,
  getDueDateStatus
} from "../utils/formatDate";

function StatCard({ icon: Icon, label, value, detail, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl border border-library-forest/10 bg-white p-5 shadow-soft sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-library-muted">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-library-ink sm:text-4xl">
            {value}
          </p>
          <p className="mt-2 text-xs leading-5 text-library-muted">{detail}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-library-paper text-library-forest">
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function LoanCard({ record, index }) {
  const book = record.book;
  const dueDate = record.dueDate || record.dueDateInfo?.date;
  const dueStatus = getDueDateStatus(dueDate);
  const progress = Math.min(100, Math.max(0, Number(record.progress) || 0));

  const statusStyles = {
    overdue: "bg-red-50 text-red-700",
    "due-today": "bg-amber-50 text-amber-700",
    "due-soon": "bg-amber-50 text-amber-700",
    upcoming: "bg-emerald-50 text-emerald-700",
    unknown: "bg-library-paper text-library-muted"
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex min-w-0 flex-col gap-4 rounded-2xl border border-library-forest/10 bg-white p-4 shadow-soft transition hover:shadow-card sm:flex-row sm:gap-5 sm:p-5"
    >
      <Link
        to={book ? `/books/${book.id || book.isbn}` : "/books"}
        className="mx-auto w-28 shrink-0 sm:mx-0 sm:w-24"
      >
        <BookCover
          src={book?.cover}
          title={book?.title || "Library book"}
          author={book?.author || ""}
          category={book?.category || ""}
          aspectRatio="2 / 3"
          className="overflow-hidden rounded-xl"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{book?.category || "Book"}</Badge>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              statusStyles[dueStatus.status] || statusStyles.unknown
            }`}
          >
            {dueStatus.label}
          </span>
        </div>

        <Link
          to={book ? `/books/${book.id || book.isbn}` : "/books"}
          className="mt-3 text-lg font-bold leading-snug text-library-ink transition hover:text-library-forest sm:text-xl"
        >
          {book?.title || "Book information unavailable"}
        </Link>

        <p className="mt-1 text-sm text-library-muted">
          {book?.author || "Unknown author"}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-library-muted">Issued on</p>
            <p className="mt-1 font-semibold text-library-ink">
              {record.issuedDate ? formatDate(record.issuedDate) : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-library-muted">Due date</p>
            <p className="mt-1 font-semibold text-library-ink">
              {dueDate ? formatDate(dueDate) : "—"}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-library-muted">
              Reading progress
            </span>
            <span className="font-bold text-library-forest">{progress}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-library-paper"
            role="progressbar"
            aria-label={`Reading progress for ${book?.title || "book"}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full bg-library-forest"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to={book ? `/books/${book.id || book.isbn}` : "/books"}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-library-forest hover:text-library-gold"
          >
            View book
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function HistoryCard({ record, index }) {
  const book = record.book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex items-center gap-4 rounded-2xl border border-library-forest/10 bg-white p-4"
    >
      <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg">
        <BookCover
          src={book?.cover}
          title={book?.title || "Book"}
          author={book?.author || ""}
          category={book?.category || ""}
          aspectRatio="2 / 3"
          rounded="lg"
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          to={book ? `/books/${book.id || book.isbn}` : "/books"}
          className="line-clamp-2 text-sm font-bold text-library-ink transition hover:text-library-forest"
        >
          {book?.title || "Book information unavailable"}
        </Link>
        <p className="mt-1 truncate text-xs text-library-muted">
          {book?.author || "Unknown author"}
        </p>
        <p className="mt-2 text-xs text-library-muted">
          Returned {record.returnedDate ? formatDate(record.returnedDate) : "—"}
        </p>
      </div>

      <CheckCircle2
        size={20}
        className="shrink-0 text-emerald-600"
        aria-label="Returned"
      />
    </motion.div>
  );
}

export default function Dashboard() {
  const { currentUser, isLoading } = useAuth();
  const { books, borrowHistory, returnBook, updateReadingProgress } = useBooks();
  const {
    borrowedBooks,
    returnedBooks,
    overdueBooks,
    dueSoonBooks,
    statistics
  } = useLibrary();

  const activeLoans = useMemo(
    () =>
      borrowedBooks.map((record) => ({
        ...record,
        book:
          record.book ||
          books.find((item) => item.id === record.bookId) ||
          null
      })),
    [borrowedBooks, books]
  );

  const completedLoans = useMemo(
    () =>
      returnedBooks.map((record) => ({
        ...record,
        book:
          record.book ||
          books.find((item) => item.id === record.bookId) ||
          null
      })),
    [returnedBooks, books]
  );

  const handleReturn = async (bookId) => {
    await returnBook(bookId);
  };

  const handleProgress = async (record, value) => {
    await updateReadingProgress(record.id, Number(value));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-library-cream">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-library-paper border-t-library-forest" />
          <p className="mt-4 text-sm text-library-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-library-cream px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-library-forest/10 bg-white p-8 text-center shadow-soft sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-library-paper text-library-forest">
            <LibraryBig size={30} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-library-ink sm:text-3xl">
            Your library, all in one place
          </h1>
          <p className="mt-3 text-sm leading-7 text-library-muted">
            Sign in with your student account to manage borrowed books, review
            due dates, and track your reading journey.
          </p>
          <Link to="/login" className="mt-7 inline-flex">
            <Button rightIcon={<ArrowRight size={17} />}>
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const firstName =
    currentUser.firstName ||
    currentUser.name?.split(" ")[0] ||
    "Student";

  const activeCount = activeLoans.length;
  const overdueCount = overdueBooks.length;
  const returnedCount = completedLoans.length;

  return (
    <div className="min-h-screen w-full overflow-hidden bg-library-cream">
      <section className="relative w-full overflow-hidden bg-library-deep px-4 pb-12 pt-32 text-white sm:px-6 sm:pb-16 sm:pt-36 lg:px-10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-library-gold/15 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-screen-wide flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="gold" icon={<Sparkles size={14} />}>
              Student dashboard
            </Badge>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl xl:text-6xl">
              Welcome back,
              <span className="mt-1 block font-display text-5xl font-normal text-library-gold sm:text-6xl md:text-7xl">
                {firstName}.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              Keep your reading on track. Check your loans, manage return dates,
              and make time for your next great discovery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex shrink-0 flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/books"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-library-gold px-5 py-3 text-sm font-bold text-library-deep transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              <BookOpen size={18} />
              Discover Books
            </Link>
            <Link
              to="/categories"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-library-gold hover:bg-white/5"
            >
              Browse Subjects
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding w-full">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="Currently borrowed"
              value={activeCount}
              detail="Books in your possession"
              index={0}
            />
            <StatCard
              icon={CalendarClock}
              label="Due soon"
              value={dueSoonBooks.length}
              detail="Keep an eye on return dates"
              index={1}
            />
            <StatCard
              icon={Clock3}
              label="Overdue books"
              value={overdueCount}
              detail={overdueCount ? "Please arrange a return" : "You're all caught up"}
              index={2}
            />
            <StatCard
              icon={History}
              label="Books returned"
              value={returnedCount}
              detail="Completed loans in your history"
              index={3}
            />
          </div>

          <div className="mt-14 grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.7fr)]">
            <section className="min-w-0">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-library-forest/60">
                    Your reading shelf
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-library-ink sm:text-3xl">
                    Currently borrowed
                  </h2>
                  <p className="mt-2 text-sm text-library-muted">
                    Track your books and stay ahead of due dates.
                  </p>
                </div>

                <Link
                  to="/books"
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-library-forest transition hover:text-library-gold"
                >
                  Find more books
                  <ArrowRight size={16} />
                </Link>
              </div>

              {activeLoans.length ? (
                <div className="space-y-5">
                  {activeLoans.map((record, index) => (
                    <LoanCard
                      key={record.id}
                      record={record}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-library-forest/20 bg-white p-8 text-center sm:p-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-library-paper text-library-forest">
                    <BookOpen size={26} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-library-ink">
                    Your reading shelf is ready
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-library-muted">
                    Browse the catalogue and borrow a book to start building
                    your reading journey.
                  </p>
                  <Link to="/books" className="mt-5 inline-flex">
                    <Button rightIcon={<ArrowRight size={17} />}>
                      Explore Books
                    </Button>
                  </Link>
                </div>
              )}
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-library-paper text-library-forest">
                    <LibraryBig size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-library-ink">
                      Membership
                    </h2>
                    <p className="text-xs text-library-muted">
                      Your student library account
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between gap-3 border-b border-library-forest/10 pb-3">
                    <span className="text-sm text-library-muted">Member</span>
                    <span className="text-right text-sm font-bold text-library-ink">
                      {currentUser.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-library-forest/10 pb-3">
                    <span className="text-sm text-library-muted">Student ID</span>
                    <span className="text-right text-sm font-bold text-library-ink">
                      {currentUser.studentId || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-b border-library-forest/10 pb-3">
                    <span className="text-sm text-library-muted">Department</span>
                    <span className="max-w-[55%] text-right text-sm font-bold text-library-ink">
                      {currentUser.department || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-library-muted">Status</span>
                    <Badge variant="success">
                      {currentUser.membership?.status || "Active"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-library-forest/10 bg-library-paper p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-library-forest">
                  <CalendarClock size={22} />
                </div>
                <h2 className="mt-4 text-xl font-black text-library-ink">
                  Return date reminder
                </h2>
                <p className="mt-2 text-sm leading-7 text-library-muted">
                  Return books on time so other students can enjoy them too.
                  Check your loan dates regularly.
                </p>
                <Link
                  to="/rules"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-library-forest transition hover:text-library-gold"
                >
                  Review library rules
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>

          <section className="mt-16">
            <SectionHeading
              eyebrow="Your reading journey"
              title="Recently"
              highlight="returned"
              description="Revisit the titles you've finished borrowing."
              align="left"
            />

            {completedLoans.length ? (
              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {completedLoans.slice(0, 6).map((record, index) => (
                  <HistoryCard
                    key={record.id}
                    record={record}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-library-forest/10 bg-white p-6 text-sm text-library-muted">
                Your returned books will appear here.
              </div>
            )}
          </section>

          <section className="mt-12 rounded-3xl bg-library-deep p-6 text-white sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-library-gold">
                  A little more knowledge
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Make your next discovery.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">
                  Explore a new category and find a book that inspires your next idea.
                </p>
              </div>
              <Link
                to="/books"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-library-gold px-6 py-3 text-sm font-bold text-library-deep transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Explore Books
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
