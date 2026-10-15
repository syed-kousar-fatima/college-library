
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Home,
  Search,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Logo from "../components/layout/Logo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-library-cream px-4 py-16 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-library-gold/15 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-800/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="text-center md:text-left"
        >
          <div className="mb-8 flex justify-center md:justify-start">
            <Logo />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-library-forest/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-library-forest shadow-soft sm:text-sm">
            <Compass size={15} />
            Lost between the pages?
          </div>

          <h1 className="mt-6 text-6xl font-black leading-none tracking-tight text-library-deep sm:text-7xl lg:text-8xl">
            404
            <span className="mt-2 block font-display text-5xl font-normal text-library-gold sm:text-6xl lg:text-7xl">
              Page not found
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-library-muted sm:text-base sm:leading-8 md:mx-0">
            It looks like this page has wandered off the shelves. Let's guide
            you back to a place where your next discovery is waiting.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link to="/">
              <Button
                fullWidth
                leftIcon={<Home size={17} />}
                size="lg"
              >
                Back to Home
              </Button>
            </Link>

            <Link to="/books">
              <Button
                fullWidth
                variant="outline"
                rightIcon={<ArrowRight size={17} />}
                size="lg"
              >
                Explore Books
              </Button>
            </Link>
          </div>

          <Link
            to="/categories"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-library-forest transition hover:text-library-gold"
          >
            <Search size={16} />
            Browse library categories
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-8 rounded-full bg-library-gold/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-library-forest/10 bg-white p-6 shadow-card sm:p-9">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-library-paper/80" />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-library-muted">
                  A little detour
                </p>
                <h2 className="mt-2 text-xl font-black text-library-ink sm:text-2xl">
                  The missing chapter
                </h2>
              </div>
              <div className="rounded-2xl bg-library-paper p-3 text-library-forest">
                <Sparkles size={23} />
              </div>
            </div>

            <div className="relative flex h-64 items-center justify-center sm:h-72">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-3, 0, -3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="absolute -left-4 top-5 h-44 w-32 -rotate-12 rounded-lg bg-amber-200 shadow-lg sm:h-48 sm:w-36" />
                <div className="absolute -right-4 top-2 h-48 w-32 rotate-12 rounded-lg bg-emerald-900 shadow-lg sm:h-52 sm:w-36" />

                <div className="relative z-10 flex h-48 w-36 -rotate-2 flex-col items-center justify-center rounded-r-xl border-l-4 border-library-gold bg-library-forest p-4 text-center shadow-xl sm:h-56 sm:w-40">
                  <div className="mb-5 rounded-full border border-white/30 p-3 text-library-gold">
                    <BookOpen size={28} />
                  </div>
                  <span className="font-display text-5xl text-white sm:text-6xl">
                    ?
                  </span>
                  <span className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
                    Unknown chapter
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0], rotate: [0, 10, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-4 top-10 rounded-xl bg-library-paper p-3 text-library-forest shadow-soft sm:left-8"
              >
                <Sparkles size={19} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -8, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-8 right-3 rounded-xl bg-amber-100 p-3 text-amber-800 shadow-soft sm:right-8"
              >
                <Compass size={20} />
              </motion.div>
            </div>

            <div className="relative rounded-2xl bg-library-cream p-4 text-center">
              <p className="text-sm font-bold text-library-ink">
                Every great story finds its way.
              </p>
              <p className="mt-1 text-xs leading-5 text-library-muted">
                Let's turn the page and try another destination.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Link
        to="/"
        aria-label="Return to the previous home destination"
        className="absolute left-4 top-5 inline-flex items-center gap-2 rounded-full border border-library-forest/10 bg-white/80 px-3 py-2 text-xs font-bold text-library-forest backdrop-blur transition hover:bg-white sm:left-6 sm:top-6 sm:px-4 sm:text-sm"
      >
        <ArrowLeft size={15} />
        Home
      </Link>
    </main>
  );
}
