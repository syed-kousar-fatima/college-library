
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, CheckCircle2 } from "lucide-react";

export default function RuleCard({
  rule,
  index = 0,
  expandable = true,
  defaultExpanded = false,
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!rule) return null;

  const {
    title,
    description,
    icon: RuleIcon,
    color = "text-library-forest",
    background = "bg-library-paper",
    guidelines = []
  } = rule;

  const hasGuidelines = Array.isArray(guidelines) && guidelines.length > 0;
  const canExpand = expandable && hasGuidelines;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.07, 0.35),
        ease: "easeOut"
      }}
      className={`group min-w-0 overflow-hidden rounded-2xl border border-library-forest/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-library-gold/40 hover:shadow-card ${className}`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition duration-300 group-hover:scale-105 ${background} ${color}`}
          >
            {RuleIcon ? (
              <RuleIcon size={23} strokeWidth={1.7} />
            ) : (
              <CheckCircle2 size={23} strokeWidth={1.7} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-base font-bold leading-6 text-library-forest sm:text-lg">
              {title}
            </h3>

            {description && (
              <p className="mt-2 text-sm leading-7 text-library-muted">
                {description}
              </p>
            )}
          </div>
        </div>

        {canExpand && (
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="mt-5 inline-flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border border-library-forest/10 px-4 py-2.5 text-left text-sm font-semibold text-library-forest transition hover:border-library-gold/50 hover:bg-library-paper/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-library-forest"
          >
            <span>
              {isExpanded ? "Hide guidelines" : "View guidelines"}
            </span>

            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex shrink-0"
            >
              <ArrowDown size={17} />
            </motion.span>
          </button>
        )}

        <AnimatePresence initial={false}>
          {canExpand && isExpanded && (
            <motion.div
              key="guidelines"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 pt-5">
                {guidelines.map((guideline, guidelineIndex) => (
                  <motion.li
                    key={`${rule.id || title}-${guidelineIndex}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: guidelineIndex * 0.04 }}
                    className="flex items-start gap-2.5 text-sm leading-6 text-library-muted"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-library-gold"
                    />
                    <span>{guideline}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {!canExpand && hasGuidelines && (
          <ul className="mt-5 space-y-3">
            {guidelines.map((guideline, guidelineIndex) => (
              <li
                key={`${rule.id || title}-${guidelineIndex}`}
                className="flex items-start gap-2.5 text-sm leading-6 text-library-muted"
              >
                <CheckCircle2
                  size={17}
                  className="mt-1 shrink-0 text-library-gold"
                />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="h-1 w-full origin-left scale-x-0 bg-library-gold transition-transform duration-300 group-hover:scale-x-100" />
    </motion.article>
  );
}
