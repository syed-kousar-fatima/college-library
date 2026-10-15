
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import RulesList from "../components/rules/RulesList";

const principles = [
  {
    icon: BookOpen,
    title: "Care for Books",
    description: "Keep borrowed books clean and return them on time."
  },
  {
    icon: HeartHandshake,
    title: "Respect Others",
    description: "Help maintain a quiet, welcoming study environment."
  },
  {
    icon: Clock3,
    title: "Be Responsible",
    description: "Follow borrowing limits and check your due dates."
  }
];

export default function LibraryRules() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-library-cream">
      <section className="relative w-full overflow-hidden bg-library-deep">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,157,91,0.19),transparent_48%),linear-gradient(135deg,#173F35_0%,#102E27_100%)]" />

        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -right-8 top-12 h-56 w-56 rounded-full border border-library-gold/20 sm:h-72 sm:w-72" />

        <div className="section-container relative py-14 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-library-gold"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-library-gold/30 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-library-gold">
              <ShieldCheck size={15} />
              Library Code of Conduct
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              A Shared Space for
              <span className="mt-2 block font-display text-5xl font-normal text-library-gold sm:text-6xl lg:text-7xl">
                Learning & Discovery
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
              Our library is a place for curiosity, concentration, and
              collaboration. These guidelines help everyone enjoy a better
              learning experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6"
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-library-gold/15 text-library-gold">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-white">
                      {principle.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <RulesList />

      <section className="w-full bg-white py-14 sm:py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl bg-library-paper p-6 sm:p-9 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-library-gold/20 sm:h-64 sm:w-64" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-display text-2xl text-library-gold sm:text-3xl">
                  Need clarification?
                </span>

                <h2 className="mt-2 text-2xl font-bold leading-tight text-library-forest sm:text-3xl lg:text-4xl">
                  Your librarian is here to help.
                </h2>

                <p className="mt-4 text-sm leading-7 text-library-muted sm:text-base">
                  For official policies, book renewals, borrowing questions,
                  or access assistance, contact your college library staff.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/books"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-library-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-library-deep"
                >
                  <BookOpen size={18} />
                  Explore Books
                </Link>

                <Link
                  to="/"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-library-forest/15 bg-white px-6 py-3 text-sm font-semibold text-library-forest transition hover:border-library-gold/50"
                >
                  <CheckCircle2 size={18} />
                  Return to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
