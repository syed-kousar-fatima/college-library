
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  GraduationCap,
  LibraryBig,
  Sparkles,
  Star
} from "lucide-react";
import BookSearch from "../books/BookSearch";

const floatingBooks = [
  {
    title: "THE ART OF",
    subtitle: "THINKING",
    color: "bg-[#C99D5B]",
    rotate: "-rotate-12",
    position: "left-[4%] top-[18%]",
    delay: 0.3
  },
  {
    title: "NEW",
    subtitle: "PERSPECTIVES",
    color: "bg-[#A7BBA7]",
    rotate: "rotate-[10deg]",
    position: "right-[3%] top-[10%]",
    delay: 0.55
  },
  {
    title: "KNOWLEDGE",
    subtitle: "IS POWER",
    color: "bg-[#B77C69]",
    rotate: "rotate-[7deg]",
    position: "left-[8%] bottom-[10%]",
    delay: 0.7
  }
];

const stats = [
  {
    value: "10,000+",
    label: "Books to Explore",
    icon: BookOpen
  },
  {
    value: "50+",
    label: "Study Subjects",
    icon: GraduationCap
  },
  {
    value: "24/7",
    label: "Digital Discovery",
    icon: LibraryBig
  }
];

function FloatingBook({ book }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: book.delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`absolute ${book.position} ${book.rotate} z-20 hidden w-24 sm:block sm:w-28 lg:w-32 2xl:w-40`}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 4.5,
          delay: book.delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`relative aspect-[3/4] overflow-hidden rounded-r-lg rounded-l-sm ${book.color} p-3 text-library-deep shadow-2xl sm:p-4`}
      >
        <div className="absolute inset-2 border border-library-deep/20" />
        <div className="relative flex h-full flex-col items-center justify-center border-y border-library-deep/15 text-center">
          <span className="text-[8px] font-bold tracking-[0.16em] sm:text-[10px]">
            {book.title}
          </span>
          <span className="mt-1 text-sm font-black leading-tight tracking-tight sm:text-base">
            {book.subtitle}
          </span>
          <div className="mt-3 h-5 w-5 rounded-full border border-library-deep/40 sm:h-7 sm:w-7" />
        </div>
        <div className="absolute inset-y-0 left-0 w-1 bg-black/10" />
      </motion.div>
    </motion.div>
  );
}

function LibraryIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px] 2xl:max-w-[760px]">
      <div className="absolute inset-[9%] rounded-full border border-library-gold/25" />
      <div className="absolute inset-[17%] rounded-full border border-library-forest/10" />
      <div className="absolute inset-[24%] rounded-full bg-library-gold/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute inset-[15%] flex items-center justify-center"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute bottom-[9%] h-[14%] w-[78%] rounded-[50%] bg-library-forest/15 blur-xl" />

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative flex h-[68%] w-[82%] items-center justify-center"
          >
            <div className="absolute bottom-[6%] left-[5%] h-[68%] w-[42%] -rotate-[9deg] rounded-l-md rounded-r-sm bg-[#C99D5B] shadow-xl">
              <div className="absolute inset-3 border border-white/35" />
              <div className="absolute inset-x-0 bottom-4 h-1 bg-library-deep/20" />
            </div>

            <div className="absolute bottom-[4%] right-[4%] h-[72%] w-[43%] rotate-[8deg] rounded-l-sm rounded-r-md bg-[#789581] shadow-xl">
              <div className="absolute inset-3 border border-white/30" />
              <div className="absolute inset-x-0 bottom-4 h-1 bg-library-deep/20" />
            </div>

            <div className="absolute bottom-[12%] left-[17%] z-10 h-[69%] w-[66%] rounded-l-lg rounded-r-md bg-library-forest shadow-2xl">
              <div className="absolute inset-3 rounded-sm border border-library-gold/50" />
              <div className="absolute inset-x-5 top-[22%] flex flex-col items-center text-center text-library-cream">
                <Sparkles size={23} className="mb-3 text-library-gold sm:size-7" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
                  The Art of
                </span>
                <span className="font-display mt-1 text-2xl leading-tight text-library-gold sm:text-4xl">
                  Discovery
                </span>
                <span className="mt-4 h-px w-10 bg-library-gold/70" />
              </div>
              <div className="absolute inset-y-0 left-0 w-2 rounded-l-lg bg-black/15" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {floatingBooks.map((book) => (
        <FloatingBook key={book.title} book={book} />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute right-[2%] top-[38%] z-30 flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 p-2.5 shadow-card backdrop-blur-md sm:right-[1%] sm:gap-3 sm:p-4"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-library-gold/15 text-library-forest sm:h-11 sm:w-11">
          <Star size={19} className="fill-library-gold text-library-gold" />
        </div>
        <div>
          <p className="text-xs font-bold text-library-forest sm:text-sm">
            Inspire Your Mind
          </p>
          <p className="mt-1 text-[10px] text-library-muted sm:text-xs">
            One page at a time
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-[4%] right-[12%] z-10 h-14 w-14 rounded-full bg-library-gold/15 blur-xl sm:h-20 sm:w-20" />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-library-cream"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-library-gold/10 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-library-forest/5 blur-3xl" />

      <div className="section-container relative grid min-h-[calc(100svh-66px)] w-full items-center gap-5 px-4 pb-8 pt-5 sm:min-h-[calc(100svh-72px)] sm:gap-6 sm:px-6 sm:pb-10 sm:pt-7 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:pb-12 lg:pt-8 xl:gap-8 2xl:gap-12 2xl:px-16 2xl:pb-16 2xl:pt-10 3xl:px-24 4xl:px-28">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center lg:mx-0 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-library-gold/30 bg-white/75 px-3 py-1.5 shadow-sm sm:mb-5 sm:px-4 sm:py-2"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-library-forest text-library-gold">
              <Sparkles size={14} />
            </span>
            <span className="text-left text-[10px] font-bold uppercase tracking-[0.1em] text-library-forest sm:text-xs sm:tracking-[0.15em]">
              Your Campus Library, Reimagined
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-balance text-[clamp(2.4rem,6.5vw,5.8rem)] font-extrabold leading-[1.05] tracking-[-0.055em] text-library-forest 2xl:text-[6.8rem] 4xl:text-[7.5rem]"
          >
            Every Book
            <br />
            Opens a{" "}
            <span className="relative inline-block text-library-gold">
              New World
              <svg
                viewBox="0 0 320 18"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full"
              >
                <path
                  d="M4 12C83 2 214 1 315 10"
                  stroke="#C99D5B"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mx-auto mt-4 max-w-xl text-sm leading-6 text-library-muted sm:mt-5 sm:text-base sm:leading-7 lg:mx-0 lg:mt-6 lg:text-lg lg:leading-8 2xl:max-w-2xl 2xl:text-xl"
          >
            Discover knowledge, fuel your curiosity, and find your next
            favorite read. Your college library is more than a place to
            study. It is where your next big idea begins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 sm:mt-6"
          >
            <BookSearch variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 flex flex-col justify-center gap-3 min-[420px]:flex-row lg:mt-6 lg:justify-start"
          >
            <Link
              to="/books"
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-xl bg-library-forest px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-library-forest/15 transition duration-300 hover:-translate-y-1 hover:bg-library-deep hover:shadow-xl sm:min-h-12 sm:px-7 sm:py-3 sm:text-base"
            >
              Explore All Books
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/categories"
              className="inline-flex min-h-11 items-center justify-center gap-3 rounded-xl border border-library-forest/15 bg-white/70 px-5 py-2.5 text-sm font-bold text-library-forest transition duration-300 hover:-translate-y-1 hover:border-library-gold hover:bg-white sm:min-h-12 sm:px-7 sm:py-3 sm:text-base"
            >
              Browse Categories
              <BookOpen size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:mt-7 lg:justify-start"
          >
            <div className="flex -space-x-2">
              {["A", "R", "S", "M"].map((letter, index) => (
                <div
                  key={letter}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-library-cream text-xs font-bold text-white sm:h-9 sm:w-9 ${
                    [
                      "bg-[#587A68]",
                      "bg-[#C99D5B]",
                      "bg-[#A87561]",
                      "bg-library-forest"
                    ][index]
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="fill-library-gold text-library-gold"
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-library-forest">
                  Made for Learners
                </span>
              </div>
              <p className="mt-1 text-[11px] text-library-muted sm:text-xs">
                A welcoming space for every curious mind
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <LibraryIllustration />
        </div>

        <a
          href="#library-highlights"
          className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold text-library-muted transition hover:text-library-forest lg:flex"
        >
          Scroll to discover
          <ArrowDown size={15} className="animate-bounce" />
        </a>
      </div>

      <div
        id="library-highlights"
        className="relative z-10 border-y border-library-forest/10 bg-white/75 backdrop-blur-sm"
      >
        <div className="section-container grid grid-cols-1 divide-y divide-library-forest/10 px-5 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12 2xl:px-20 4xl:px-28">
          {stats.map(({ value, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center gap-4 py-4 sm:py-5 lg:gap-5 lg:py-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-library-forest/5 text-library-forest sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-xl font-extrabold tracking-tight text-library-forest sm:text-2xl 2xl:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-xs text-library-muted sm:text-sm">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
