
import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  light = false,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  showLine = true
}) {
  const isCentered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`w-full ${
        isCentered ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className={`font-display mb-2 text-3xl leading-tight sm:text-4xl lg:text-5xl ${
            light ? "text-library-gold" : "text-library-gold"
          }`}
        >
          {eyebrow}
        </motion.p>
      )}

      <h2
        className={`section-title text-balance ${
          light ? "text-white" : "text-library-forest"
        } ${titleClassName}`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-library-gold">{highlight}</span>
          </>
        )}
      </h2>

      {showLine && (
        <div
          className={`mt-5 flex items-center gap-2 ${
            isCentered ? "justify-center" : "justify-start"
          }`}
          aria-hidden="true"
        >
          <span className="h-1 w-8 rounded-full bg-library-gold" />
          <span
            className={`h-1 w-14 rounded-full ${
              light ? "bg-white/30" : "bg-library-forest/15"
            }`}
          />
        </div>
      )}

      {description && (
        <p
          className={`section-subtitle mt-5 ${
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"
          } ${light ? "text-white/70" : ""} ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
