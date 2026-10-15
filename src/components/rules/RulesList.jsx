
import { motion } from "framer-motion";
import { BookOpenCheck, ShieldCheck } from "lucide-react";
import libraryRules from "../../data/libraryRules";
import RuleCard from "./RuleCard";
import SectionHeading from "../common/SectionHeading";

export default function RulesList({
  rules = libraryRules,
  className = "",
  columns = 2,
  expandable = true,
  showHeading = true
}) {
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
  };

  const selectedColumns = gridColumns[columns] || gridColumns[2];
  const validRules = Array.isArray(rules) ? rules.filter(Boolean) : [];

  return (
    <section
      className={`w-full bg-library-cream py-14 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="section-container">
        {showHeading && (
          <SectionHeading
            eyebrow="A Better Library Experience"
            title="Library Rules & Guidelines"
            highlight="Guidelines"
            description="A few simple practices help keep our library welcoming, peaceful, and useful for every student."
            align="center"
          />
        )}

        {validRules.length > 0 ? (
          <div className={`grid ${selectedColumns} gap-5 lg:gap-6`}>
            {validRules.map((rule, index) => (
              <RuleCard
                key={rule.id || rule.title || index}
                rule={rule}
                index={index}
                expandable={expandable}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-library-forest/10 bg-white px-6 py-12 text-center">
            <BookOpenCheck
              size={36}
              className="mx-auto text-library-gold"
            />
            <h3 className="mt-4 text-lg font-bold text-library-forest">
              No guidelines available
            </h3>
            <p className="mt-2 text-sm text-library-muted">
              Library guidelines will appear here when they are added.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-library-gold/25 bg-white p-5 sm:flex-row sm:items-center sm:p-6 lg:mt-10"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-library-gold/15 text-library-forest">
            <ShieldCheck size={25} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-library-forest">
              Help us care for our shared space
            </h3>
            <p className="mt-1 text-sm leading-6 text-library-muted">
              Please check with your librarian for official borrowing periods,
              renewal procedures, overdue charges, and institution-specific
              policies.
            </p>
          </div>

          <div className="shrink-0 rounded-full bg-library-paper px-4 py-2 text-xs font-semibold text-library-forest">
            Learn • Respect • Return
          </div>
        </motion.div>
      </div>
    </section>
  );
}
