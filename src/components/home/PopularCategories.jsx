
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Compass } from "lucide-react";
import categories from "../../data/categories";
import SectionHeading from "../common/SectionHeading";

export default function PopularCategories() {
  const popularCategories = categories.slice(0, 8);

  return (
    <section
      id="popular-categories"
      className="section-padding relative w-full overflow-hidden bg-library-cream"
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-library-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-library-forest/5 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto mb-12 max-w-3xl lg:mb-16">
          <SectionHeading
            eyebrow="Explore what inspires you"
            title="Find Your"
            highlight="Field of Interest"
            description="From technology and science to timeless fiction and personal growth, explore subjects that expand your knowledge and imagination."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 2xl:gap-7">
          {popularCategories.map((category, index) => {
            const Icon = category.icon || BookOpen;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="min-w-0"
              >
                <Link
                  to={`/books?category=${encodeURIComponent(category.name)}`}
                  aria-label={`Explore ${category.name} books`}
                  className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-library-forest/10 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:border-library-gold/50 hover:shadow-card sm:min-h-[240px] sm:p-6 2xl:min-h-[270px] 2xl:p-7"
                >
                  <div
                    className={`absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition duration-500 group-hover:scale-150 ${
                      category.background || "bg-library-gold/20"
                    }`}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        category.background || "bg-library-forest/5"
                      } ${category.color || "text-library-forest"} transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14`}
                    >
                      <Icon size={25} strokeWidth={1.7} />
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-library-forest/10 text-library-muted transition duration-300 group-hover:border-library-forest group-hover:bg-library-forest group-hover:text-white">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>

                  <div className="relative mt-6 flex-1">
                    <h3 className="text-base font-bold leading-snug text-library-forest transition-colors group-hover:text-library-gold sm:text-lg 2xl:text-xl">
                      {category.name}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-xs leading-6 text-library-muted sm:text-sm">
                      {category.description}
                    </p>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between gap-2 border-t border-library-forest/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-library-forest">
                      <BookOpen size={14} />
                      Explore collection
                    </span>

                    <span className="text-[10px] font-medium text-library-muted sm:text-xs">
                      {category.bookCount ?? 0}+ books
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-library-forest px-5 py-7 text-center sm:flex-row sm:gap-5 sm:px-8 sm:py-8 sm:text-left lg:mt-14 lg:px-10"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-library-gold">
            <Compass size={25} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Curious about something new?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Step outside your usual reading list and discover a subject you have never explored.
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-library-gold px-5 py-3 text-sm font-bold text-library-deep transition duration-300 hover:-translate-y-0.5 hover:bg-[#dfb978]"
          >
            All Categories
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
