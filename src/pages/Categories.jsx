
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/common/SectionHeading";
import Button from "../components/common/Button";
import categories from "../data/categories";

export default function Categories() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-library-cream">
      <section className="relative w-full overflow-hidden bg-library-deep px-4 pb-16 pt-32 text-white sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-library-gold/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-screen-wide items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-library-gold sm:text-sm">
              <Sparkles size={15} />
              Explore the collection
            </span>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Find your next
              <span className="mt-1 block font-display text-5xl font-normal text-library-gold sm:text-6xl md:text-7xl xl:text-8xl">
                great discovery.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              From timeless fiction to cutting-edge technology, explore subjects
              that inspire curiosity, build knowledge, and open new possibilities.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => document.getElementById("all-categories")?.scrollIntoView({ behavior: "smooth" })}
                rightIcon={<ArrowRight size={18} />}
                size="lg"
              >
                Explore Categories
              </Button>
              <Link
                to="/books"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-library-gold hover:bg-white/5"
              >
                <Search size={18} />
                Browse All Books
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-6 rounded-[2rem] bg-library-gold/20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/55">Your learning journey</p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    A world of ideas
                  </h2>
                </div>
                <div className="rounded-2xl bg-library-gold/15 p-3 text-library-gold">
                  <BookOpen size={26} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 4).map((category, index) => {
                  const Icon = category.icon;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                    >
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${category.background || "bg-white/10"}`}
                      >
                        <Icon size={21} className={category.color || "text-library-gold"} />
                      </div>
                      <p className="text-sm font-bold text-white">
                        {category.name}
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        Discover something new
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-library-gold/10 p-4">
                <div className="rounded-xl bg-library-gold/15 p-2 text-library-gold">
                  <Sparkles size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold">Curiosity starts here</p>
                  <p className="mt-1 text-xs text-white/55">
                    One subject can open countless doors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="all-categories"
        className="section-padding w-full scroll-mt-24"
      >
        <div className="section-container">
          <SectionHeading
            eyebrow="Browse by interest"
            title="Explore every"
            highlight="subject"
            description="Choose a field that interests you and discover books selected to help you learn, imagine, and grow."
          />

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-library-muted">
              <span className="font-bold text-library-ink">{categories.length}</span>{" "}
              subject areas to explore
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-sm font-bold text-library-forest transition hover:text-library-gold"
            >
              View all books
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.article
                  key={category.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.07,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -7 }}
                  className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-library-forest/10 bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-card sm:p-7"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-library-paper/70 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110 ${category.background || "bg-library-paper"}`}
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.8}
                        className={category.color || "text-library-forest"}
                      />
                    </div>
                    <span className="rounded-full bg-library-paper px-3 py-1.5 text-xs font-bold text-library-forest">
                      {category.bookCount ?? 0} books
                    </span>
                  </div>

                  <h2 className="relative mt-6 text-xl font-bold tracking-tight text-library-ink transition-colors group-hover:text-library-forest sm:text-2xl">
                    {category.name}
                  </h2>

                  <p className="relative mt-3 flex-1 text-sm leading-7 text-library-muted">
                    {category.description}
                  </p>

                  <Link
                    to={`/books?category=${encodeURIComponent(category.name)}`}
                    className="relative mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-library-forest"
                  >
                    Explore books
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-library-paper p-6 sm:p-8 md:flex-row md:items-center lg:p-10"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-library-forest/65">
                Keep exploring
              </span>
              <h2 className="mt-2 text-2xl font-black text-library-ink sm:text-3xl">
                Your next favorite book is waiting.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-library-muted sm:text-base">
                Search the full collection and find a title that matches your interests.
              </p>
            </div>

            <Button
              onClick={() => {
                window.location.href = "/books";
              }}
              rightIcon={<ArrowRight size={18} />}
              size="lg"
              className="shrink-0"
            >
              Browse the Library
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
