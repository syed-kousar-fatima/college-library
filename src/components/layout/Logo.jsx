
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Logo({ compact = false, light = false, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="PageNest Library home"
      className="group inline-flex min-w-0 items-center gap-2 sm:gap-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-library-forest shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-12 sm:w-12 lg:h-14 lg:w-14 2xl:h-16 2xl:w-16"
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[78%] w-[78%]"
          aria-hidden="true"
        >
          <path
            d="M5 16.5L23 11L32 15V48L23 44L5 49.5V16.5Z"
            fill="#C99D5B"
          />
          <path
            d="M32 15L41 11L59 16.5V49.5L41 44L32 48V15Z"
            fill="#F8F6EF"
          />
          <path
            d="M5 16.5L23 12L32 16V51L23 47L5 52V16.5Z"
            fill="#E9D4AC"
            stroke="#F8F6EF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M32 16L41 12L59 16.5V52L41 47L32 51V16Z"
            fill="#F8F6EF"
            stroke="#F8F6EF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M32 16V51"
            stroke="#173F35"
            strokeWidth="1.6"
          />
          <path
            d="M10 23L25 19M10 29L25 25M10 35L25 31M10 41L25 37"
            stroke="#173F35"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M38 19L54 23M38 25L54 29M38 31L54 35M38 37L54 41"
            stroke="#173F35"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M23 12L23 47M41 12V47"
            stroke="#C99D5B"
            strokeWidth="1.2"
          />
        </svg>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-library-cream bg-library-gold sm:h-3.5 sm:w-3.5" />
      </motion.div>

      {!compact && (
        <span className="flex min-w-0 flex-col justify-center">
          <span
            className={`truncate text-sm font-extrabold leading-tight tracking-tight sm:text-base lg:text-lg 2xl:text-xl ${
              light ? "text-white" : "text-library-forest"
            }`}
          >
            PageNest <span className="text-library-gold">Library</span>
          </span>
          <span
            className={`mt-1 hidden text-[9px] font-medium tracking-wide sm:block sm:text-[10px] lg:text-[11px] 2xl:text-xs ${
              light ? "text-white/70" : "text-library-muted"
            }`}
          >
            Where Campus Minds Take Flight
          </span>
        </span>
      )}
    </Link>
  );
}
