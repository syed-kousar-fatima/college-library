
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  LibraryBig,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../components/layout/Logo";
import LoginForm from "../components/auth/LoginForm";

const highlights = [
  "Manage your borrowed books",
  "Track upcoming due dates",
  "Discover your next great read"
];

export default function Login() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-library-cream">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        <section className="relative hidden min-h-screen overflow-hidden bg-library-deep lg:flex lg:flex-col lg:justify-between xl:p-12 2xl:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,157,91,0.2),transparent_48%),linear-gradient(145deg,#173F35_0%,#102E27_65%,#0B211C_100%)]" />

          <div className="pointer-events-none absolute -right-36 top-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full border border-library-gold/20" />
          <div className="pointer-events-none absolute -bottom-36 -left-28 h-96 w-96 rounded-full border border-white/10" />

          <div className="relative z-10">
            <Logo light />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-2xl py-12 xl:py-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-library-gold/30 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide text-library-gold">
                <Sparkles size={15} />
                YOUR CAMPUS, YOUR KNOWLEDGE
              </span>

              <h2 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl 2xl:text-6xl">
                Your next great idea
                <span className="mt-2 block font-display text-5xl font-normal text-library-gold xl:text-6xl 2xl:text-7xl">
                  begins with a book.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-white/65 xl:text-lg">
                Step into a world of knowledge, explore new perspectives, and
                make every visit to your college library count.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto mt-10 flex h-64 max-w-lg items-center justify-center sm:h-72 xl:mt-14 xl:h-80"
            >
              <div className="absolute h-48 w-48 rounded-full bg-library-gold/10 blur-3xl sm:h-64 sm:w-64" />

              <div className="absolute left-[14%] top-[17%] h-28 w-24 rotate-[-15deg] rounded-lg border border-white/20 bg-[#8E6546] shadow-2xl sm:h-36 sm:w-28">
                <div className="absolute inset-y-0 left-3 w-1 bg-white/15" />
                <div className="absolute left-7 right-3 top-7 h-px bg-white/40" />
                <div className="absolute left-7 right-6 top-10 h-px bg-white/25" />
                <div className="absolute bottom-5 left-7 right-6 h-px bg-white/25" />
              </div>

              <div className="absolute right-[13%] top-[12%] h-32 w-24 rotate-[13deg] rounded-lg border border-white/20 bg-[#B48A53] shadow-2xl sm:h-40 sm:w-32">
                <div className="absolute inset-y-0 left-3 w-1 bg-white/20" />
                <div className="absolute left-7 right-4 top-8 h-px bg-white/50" />
                <div className="absolute left-7 right-7 top-12 h-px bg-white/30" />
                <div className="absolute bottom-6 left-7 right-5 h-px bg-white/30" />
              </div>

              <div className="relative z-10 flex h-44 w-40 -rotate-2 flex-col items-center justify-center rounded-2xl border border-white/20 bg-library-forest shadow-2xl sm:h-52 sm:w-48">
                <div className="absolute inset-2 rounded-xl border border-library-gold/40" />
                <BookOpenCheck
                  size={62}
                  strokeWidth={1.2}
                  className="text-library-gold sm:h-[72px] sm:w-[72px]"
                />
                <span className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-sm">
                  PageNest
                </span>
                <span className="mt-1 text-[10px] text-library-gold sm:text-xs">
                  Library
                </span>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[8%] top-[4%] flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-library-gold backdrop-blur-sm sm:h-14 sm:w-14"
              >
                <GraduationCap size={26} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[5%] right-[7%] flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-library-gold backdrop-blur-sm sm:h-14 sm:w-14"
              >
                <LibraryBig size={25} />
              </motion.div>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm leading-6 text-white/70"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-library-gold" />
                  {highlight}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
            <span>Where Campus Minds Take Flight</span>
            <span>Learn. Discover. Grow.</span>
          </div>
        </section>

        <section className="relative flex min-h-screen min-w-0 flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-10 xl:px-16 2xl:px-24">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-library-gold/10 blur-3xl lg:hidden" />

          <div className="relative z-10 mx-auto w-full max-w-md xl:max-w-lg">
            <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
              <Logo compact />
              <Link
                to="/"
                aria-label="Back to homepage"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-library-forest/10 bg-white text-library-forest transition hover:bg-library-paper"
              >
                <ArrowLeft size={19} />
              </Link>
            </div>

            <div className="rounded-3xl border border-library-forest/5 bg-white p-5 shadow-soft sm:p-8 xl:p-10">
              <LoginForm />
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-library-muted">
              By signing in, you agree to follow your college library's rules
              and borrowing guidelines.
            </p>
          </div>

          <div className="relative z-10 mt-8 text-center text-xs text-library-muted lg:absolute lg:bottom-6 lg:left-0 lg:right-0 lg:mt-0">
            © {new Date().getFullYear()} PageNest Library. All rights reserved.
          </div>
        </section>
      </div>
    </main>
  );
}
