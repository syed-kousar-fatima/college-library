
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Info,
  LoaderCircle,
  LogIn,
  ShieldCheck
} from "lucide-react";
import Button from "../common/Button";
import AvailabilityBadge from "../books/AvailabilityBadge";
import { useAuth } from "../../hooks/useAuth";
import { useBooks } from "../../hooks/useBooks";

export default function AvailabilityPanel({
  book,
  onBorrow,
  className = ""
}) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { borrowBook, borrowHistory } = useBooks();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const bookId = book?.id || book?.isbn;
  const availableCopies = Number(book?.availableCopies) || 0;
  const totalCopies = Number(book?.copies) || 0;

  const activeBorrowing = useMemo(
    () =>
      (borrowHistory || []).find(
        (record) =>
          record.bookId === bookId &&
          record.status === "borrowed"
      ),
    [borrowHistory, bookId]
  );

  const isAlreadyBorrowed = Boolean(activeBorrowing);
  const canBorrow = Boolean(bookId) && availableCopies > 0;

  const handleBorrow = async () => {
    if (!book || !bookId || isSubmitting) return;

    setFeedback(null);

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/books/${bookId}`,
          message: "Sign in to issue books from your library."
        }
      });
      return;
    }

    if (isAlreadyBorrowed) {
      setFeedback({
        type: "info",
        message: "You already have this book issued."
      });
      return;
    }

    if (!canBorrow) {
      setFeedback({
        type: "error",
        message: "This book is currently unavailable."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = onBorrow
        ? await onBorrow(book)
        : await borrowBook(bookId);

      if (
        result === false ||
        result?.success === false
      ) {
        setFeedback({
          type: "error",
          message:
            result?.message ||
            result?.error ||
            "This book could not be issued. Please try again."
        });
        return;
      }

      setFeedback({
        type: "success",
        message: "Book issued successfully. Enjoy your reading!"
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error?.message ||
          "Something went wrong while issuing this book."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full min-w-0 overflow-hidden rounded-2xl border border-library-forest/10 bg-white shadow-soft ${className}`}
    >
      <div className="bg-library-forest px-5 py-5 text-white sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-library-gold">
            <BookCheck size={23} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold sm:text-xl">
              Borrow This Book
            </h2>
            <p className="mt-1 text-xs text-white/65 sm:text-sm">
              Your next chapter starts here
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-library-muted">
            Current availability
          </p>

          <AvailabilityBadge
            availableCopies={availableCopies}
            showCount
            size="md"
          />

          <p className="mt-2 text-xs leading-5 text-library-muted">
            {availableCopies > 0
              ? `${availableCopies} ${availableCopies === 1 ? "copy is" : "copies are"} currently available.`
              : "All copies are currently issued or unavailable."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-library-paper/70 p-3">
            <BookOpen
              size={19}
              className="text-library-forest"
            />
            <p className="mt-3 text-xs text-library-muted">
              Total copies
            </p>
            <p className="mt-1 text-xl font-bold text-library-forest">
              {totalCopies || "—"}
            </p>
          </div>

          <div className="rounded-xl bg-library-paper/70 p-3">
            <Clock3
              size={19}
              className="text-library-forest"
            />
            <p className="mt-3 text-xs text-library-muted">
              Loan period
            </p>
            <p className="mt-1 text-xl font-bold text-library-forest">
              21 days
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={18}
              className="mt-0.5 shrink-0 text-library-gold"
            />
            <div>
              <p className="text-sm font-semibold text-library-ink">
                Standard borrowing period
              </p>
              <p className="mt-1 text-xs leading-5 text-library-muted">
                The demo library sets a 21-day loan period for issued books.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap
              size={18}
              className="mt-0.5 shrink-0 text-library-gold"
            />
            <div>
              <p className="text-sm font-semibold text-library-ink">
                Student borrowing limit
              </p>
              <p className="mt-1 text-xs leading-5 text-library-muted">
                Up to five books can be borrowed at a time in this demo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-library-gold"
            />
            <div>
              <p className="text-sm font-semibold text-library-ink">
                Return on time
              </p>
              <p className="mt-1 text-xs leading-5 text-library-muted">
                Check your dashboard to track due dates and borrowing history.
              </p>
            </div>
          </div>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role={feedback.type === "error" ? "alert" : "status"}
            className={`flex items-start gap-2 rounded-xl border p-3 text-sm leading-6 ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : feedback.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 size={18} className="mt-1 shrink-0" />
            ) : (
              <Info size={18} className="mt-1 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </motion.div>
        )}

        {isAlreadyBorrowed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-xl bg-library-paper p-3 text-sm font-medium text-library-forest">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-700" />
              You have already issued this book.
            </div>

            <Button
              fullWidth
              variant="outline"
              rightIcon={<ArrowRight size={17} />}
              onClick={() => navigate("/dashboard")}
            >
              View My Dashboard
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            size="lg"
            disabled={
              !canBorrow ||
              isSubmitting ||
              authLoading
            }
            loading={isSubmitting || authLoading}
            leftIcon={
              !isAuthenticated ? <LogIn size={18} /> : <BookCheck size={18} />
            }
            rightIcon={
              !isSubmitting && !authLoading
                ? <ArrowRight size={18} />
                : undefined
            }
            onClick={handleBorrow}
          >
            {!isAuthenticated
              ? "Sign In to Issue"
              : canBorrow
                ? "Issue This Book"
                : "Currently Unavailable"}
          </Button>
        )}

        {!isAuthenticated && (
          <p className="text-center text-xs leading-5 text-library-muted">
            You must sign in with your student account before borrowing.
          </p>
        )}

        <Link
          to="/rules"
          className="flex items-center justify-center gap-2 text-sm font-medium text-library-forest transition hover:text-library-gold"
        >
          <Info size={16} />
          Read library borrowing rules
        </Link>
      </div>
    </motion.aside>
  );
}
