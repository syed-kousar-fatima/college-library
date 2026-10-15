
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import FeaturedBooks from "../components/home/FeaturedBooks";
import PopularCategories from "../components/home/PopularCategories";
import LibraryServices from "../components/home/LibraryServices";
import Loader from "../components/common/Loader";

const LibraryStats = lazy(() =>
  import("../components/home/LibraryStats")
);

function HomeCallToAction() {
  return (
    <section className="section-padding w-full">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="section-container"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-library-deep px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-library-gold/15 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-library-gold sm:text-sm">
                <Sparkles size={15} />
                Your next chapter starts here
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl xl:text-6xl">
                Make room for
                <span className="block font-display text-5xl font-normal text-library-gold sm:text-6xl md:text-7xl">
                  new possibilities.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                Discover a new perspective, learn a valuable skill, or lose
                yourself in a great story. Your next favorite book is waiting
                to be found.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/books"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-library-gold px-6 py-3 text-sm font-bold text-library-deep transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Explore the Library
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-library-gold hover:bg-white/5"
              >
                <BookOpen size={18} />
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-library-cream">
      <HeroSection />

      <div id="library-highlights" className="scroll-mt-24">
        <Suspense
          fallback={
            <div className="flex min-h-40 items-center justify-center">
              <Loader size="md" label="Loading library statistics" />
            </div>
          }
        >
          <LibraryStats />
        </Suspense>
      </div>

      <div id="featured-books" className="scroll-mt-24">
        <FeaturedBooks />
      </div>

      <div id="popular-categories" className="scroll-mt-24">
        <PopularCategories />
      </div>

      <div id="library-services" className="scroll-mt-24">
        <LibraryServices />
      </div>

      <HomeCallToAction />
    </div>
  );
}
