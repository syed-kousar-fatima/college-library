
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  LibraryBig,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Explore Books", path: "/books" },
  { label: "Categories", path: "/categories" },
  { label: "Library Rules", path: "/rules" },
  { label: "Student Login", path: "/login" },
  { label: "Dashboard", path: "/dashboard" }
];

const socialLinks = [
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/"
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/"
  },
  {
    label: "X",
    icon: FaXTwitter,
    href: "https://x.com/"
  }
];

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-library-deep text-white">
      <div className="mx-auto w-full max-w-[2560px] px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20 2xl:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 2xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <Logo light />

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65 sm:text-base">
              A welcoming space for curious minds, ambitious students, and
              lifelong learners. Discover books, explore ideas, and let
              knowledge shape your future.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition duration-300 hover:-translate-y-1 hover:border-library-gold hover:bg-library-gold hover:text-library-deep sm:h-11 sm:w-11"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold sm:text-lg">
              <span className="h-6 w-1 rounded-full bg-library-gold" />
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-library-gold sm:text-base"
                  >
                    <ArrowUpRight
                      size={15}
                      className="text-library-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold sm:text-lg">
              <span className="h-6 w-1 rounded-full bg-library-gold" />
              Get in Touch
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-library-gold"
                />
                <span className="text-sm leading-6 text-white/65 sm:text-base">
                  College Library
                  <br />
                  Campus Main Building
                  <br />
                  Your College Address
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-library-gold" />
                <a
                  href="tel:+91 9876543210"
                  className="break-all text-sm text-white/65 transition hover:text-library-gold sm:text-base"
                >
                  +91 9876543210
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-library-gold" />
                <a
                  href="mailto:library@example.edu"
                  className="break-all text-sm text-white/65 transition hover:text-library-gold sm:text-base"
                >
                  library@example.edu
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-6 flex items-center gap-2 text-base font-bold sm:text-lg">
              <span className="h-6 w-1 rounded-full bg-library-gold" />
              Library Hours
            </h3>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-library-gold/15 text-library-gold">
                  <Clock3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Opening Hours</p>
                  <p className="mt-1 text-xs text-white/50">
                    Sample schedule
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60">Monday – Friday</span>
                  <span className="text-right font-medium text-white">
                    9 AM – 6 PM
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-right font-medium text-white">
                    9 AM – 2 PM
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60">Sunday</span>
                  <span className="font-medium text-library-gold">Closed</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/55">
              <LibraryBig
                size={19}
                className="mt-1 shrink-0 text-library-gold"
              />
              <span>
                Please carry your valid college ID when visiting the library.
              </span>
            </div>
          </motion.div>
        </div>

        <div className="my-10 h-px bg-white/10 sm:my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-white/50 sm:text-sm">
            © {new Date().getFullYear()} PageNest Library. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50 sm:text-sm">
            <Link
              to="/rules"
              className="transition hover:text-library-gold"
            >
              Library Guidelines
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-library-gold sm:block" />
            <span>Built for curious minds</span>
            <BookOpen size={15} className="text-library-gold" />
          </div>
        </div>
      </div>
    </footer>
  );
}
