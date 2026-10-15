
import { motion } from "framer-motion";
import {
  Barcode,
  BookCopy,
  CalendarDays,
  Languages,
  LibraryBig,
  UserRound
} from "lucide-react";

const metadataFields = [
  {
    key: "author",
    label: "Author",
    icon: UserRound
  },
  {
    key: "isbn",
    label: "ISBN",
    icon: Barcode
  },
  {
    key: "publisher",
    label: "Publisher",
    icon: LibraryBig
  },
  {
    key: "year",
    label: "Publication Year",
    icon: CalendarDays
  },
  {
    key: "pages",
    label: "Pages",
    icon: BookCopy,
    suffix: " pages"
  },
  {
    key: "language",
    label: "Language",
    icon: Languages
  }
];

export default function BookMeta({
  book,
  className = "",
  columns = 2,
  showIcons = true
}) {
  if (!book) return null;

  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 min-[420px]:grid-cols-2",
    3: "grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3"
  };

  const selectedColumns = gridColumns[columns] || gridColumns[2];

  const fields = metadataFields.filter((field) => {
    const value = book[field.key];
    return value !== undefined && value !== null && String(value).trim() !== "";
  });

  if (fields.length === 0) return null;

  return (
    <div
      className={`grid ${selectedColumns} gap-3 sm:gap-4 ${className}`}
    >
      {fields.map((field, index) => {
        const Icon = field.icon;
        const rawValue = book[field.key];
        const value = field.suffix
          ? `${rawValue}${field.suffix}`
          : String(rawValue);

        return (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06
            }}
            className="flex min-w-0 items-start gap-3 rounded-xl border border-library-forest/10 bg-white p-3.5 transition-colors duration-200 hover:border-library-gold/50 hover:bg-library-paper/40 sm:p-4"
          >
            {showIcons && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-library-forest/5 text-library-forest">
                <Icon size={19} strokeWidth={1.7} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-library-muted">
                {field.label}
              </p>

              <p
                title={value}
                className="mt-1 break-words text-sm font-semibold leading-5 text-library-ink sm:text-base"
              >
                {value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
