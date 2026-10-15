
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import services from "../../data/services";
import SectionHeading from "../common/SectionHeading";

export default function LibraryServices() {
  return (
    <section
      id="library-services"
      className="section-padding relative w-full overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-library-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-80 w-80 rounded-full bg-library-forest/5 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto mb-12 max-w-3xl lg:mb-16">
          <SectionHeading
            eyebrow="More than bookshelves"
            title="Everything You Need"
            highlight="to Grow"
            description="Make the most of your college library with resources and spaces designed to support learning, research, and a lifelong love of reading."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 2xl:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: (index % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6 }}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-library-forest/10 bg-library-cream/60 p-5 transition-shadow duration-300 hover:bg-white hover:shadow-card sm:p-6 2xl:p-7"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    service.background || "bg-library-forest/5"
                  } ${
                    service.color || "text-library-forest"
                  } transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-16 sm:w-16`}
                >
                  {Icon && <Icon size={28} strokeWidth={1.7} />}
                </div>

                <h3 className="text-lg font-bold leading-snug text-library-forest sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-library-muted">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-library-forest/10 pt-4">
                  <Link
                    to={service.actionLink || "/books"}
                    className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-library-forest transition-colors hover:text-library-gold"
                  >
                    {service.actionLabel || "Learn More"}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-library-gold/10 transition-transform duration-500 group-hover:scale-150" />
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-library-forest/10 bg-library-cream/70 p-5 sm:grid-cols-3 sm:p-6 lg:mt-14 lg:p-8"
        >
          {[
            "Resources for every stage of learning",
            "A welcoming environment for students",
            "Support for research and discovery"
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-library-gold"
              />
              <p className="text-sm font-medium leading-6 text-library-forest">
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
