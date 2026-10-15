
import { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { BookOpen, GraduationCap, Layers3, TrendingUp } from "lucide-react";
import { useRef } from "react";

const statistics = [
  {
    id: "books",
    value: 12500,
    suffix: "+",
    label: "Books in Collection",
    description: "Knowledge across countless subjects",
    icon: BookOpen
  },
  {
    id: "students",
    value: 3200,
    suffix: "+",
    label: "Student Readers",
    description: "A community that loves learning",
    icon: GraduationCap
  },
  {
    id: "categories",
    value: 45,
    suffix: "+",
    label: "Subject Categories",
    description: "Something for every curious mind",
    icon: Layers3
  },
  {
    id: "engagement",
    value: 98,
    suffix: "%",
    label: "Student Satisfaction",
    description: "A welcoming place to grow",
    icon: TrendingUp
  }
];

function AnimatedNumber({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
    mass: 0.8
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [springValue]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function LibraryStats() {
  return (
    <section
      id="library-stats"
      className="relative w-full overflow-hidden bg-library-forest py-16 sm:py-20 lg:py-24 2xl:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,157,91,0.15),transparent_45%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full border border-white/5 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-library-gold/15 sm:h-96 sm:w-96" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        >
          <span className="font-script text-2xl text-library-gold sm:text-3xl">
            Our Growing Community
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            A World of Knowledge,
            <span className="mt-1 block text-library-gold">
              One Page at a Time
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Every number represents a student discovering a new idea, a book
            opening a new perspective, and a community growing through learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-6 2xl:gap-8">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-7 text-center transition duration-300 hover:-translate-y-1 hover:border-library-gold/40 hover:bg-white/[0.075] sm:px-6 sm:py-8 2xl:py-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-library-gold/20 bg-library-gold/10 text-library-gold transition duration-300 group-hover:scale-110 group-hover:bg-library-gold group-hover:text-library-deep sm:h-14 sm:w-14">
                  <Icon size={25} strokeWidth={1.7} />
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl 2xl:text-5xl">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </p>

                <h3 className="mt-3 text-sm font-bold text-library-gold sm:text-base">
                  {stat.label}
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/55 sm:text-sm">
                  {stat.description}
                </p>

                <div className="mt-5 h-0.5 w-10 rounded-full bg-library-gold/50 transition-all duration-300 group-hover:w-16 group-hover:bg-library-gold" />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center text-xs leading-6 text-white/45 sm:mt-10 sm:text-sm"
        >
          Every great journey begins with a single page.
        </motion.p>
      </div>
    </section>
  );
}
