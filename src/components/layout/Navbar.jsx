
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Library,
  LogIn,
  Menu,
  Search,
  X
} from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Explore Books", path: "/books" },
  { label: "Categories", path: "/categories" },
  { label: "Library Rules", path: "/rules" },
  { label: "Dashboard", path: "/dashboard" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") || "").trim();

    setSearchOpen(false);
    closeMenu();

    navigate(
      query
        ? `/books?q=${encodeURIComponent(query)}`
        : "/books"
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-library-forest/10 bg-library-cream/95 backdrop-blur-xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[66px] w-full max-w-[2560px] items-center justify-between gap-2 px-3 py-2 sm:min-h-[72px] sm:gap-3 sm:px-5 md:px-6 lg:min-h-[76px] lg:gap-1.5 lg:px-4 xl:gap-2 xl:px-6 2xl:min-h-[88px] 2xl:gap-4 2xl:px-14"
      >
        <div className="min-w-0 shrink">
          <Logo onClick={closeMenu} />
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1 2xl:gap-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative whitespace-nowrap rounded-full px-1.5 py-2 text-[10px] font-semibold transition-colors duration-300 xl:px-2 xl:text-[11px] 2xl:px-3 2xl:py-2.5 2xl:text-sm 3xl:text-base ${
                  isActive
                    ? "bg-library-forest/10 text-library-forest"
                    : "text-library-muted hover:bg-library-forest/5 hover:text-library-forest"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-library-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-1 lg:flex xl:gap-2 2xl:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((current) => !current)}
            aria-label="Toggle book search"
            aria-expanded={searchOpen}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-library-forest/10 text-library-forest transition hover:border-library-gold hover:bg-library-forest/5 xl:h-9 xl:w-9 2xl:h-11 2xl:w-11"
          >
            {searchOpen ? <X size={15} /> : <Search size={15} />}
          </button>

          <Link
            to="/login"
            className="group inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-library-forest px-2 py-2 text-[10px] font-semibold text-white transition duration-300 hover:bg-library-deep hover:shadow-lg xl:gap-1.5 xl:px-2.5 xl:text-[11px] 2xl:gap-2 2xl:px-5 2xl:py-3 2xl:text-sm"
          >
            <LogIn size={14} />
            <span>Login</span>
            <ArrowRight
              size={13}
              className="hidden transition-transform group-hover:translate-x-1 2xl:block"
            />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <Link
            to="/login"
            aria-label="Student login"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-library-forest text-white transition hover:bg-library-deep sm:h-10 sm:w-10"
          >
            <LogIn size={17} />
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-library-forest/15 text-library-forest transition hover:bg-library-forest/5 sm:h-10 sm:w-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.18 }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden overflow-hidden border-t border-library-forest/10 lg:block"
          >
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-3xl items-center gap-3 px-6 py-3"
            >
              <Search size={18} className="shrink-0 text-library-gold" />
              <input
                name="query"
                type="search"
                placeholder="Search books, authors, subjects..."
                aria-label="Search books"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-library-ink outline-none placeholder:text-library-muted"
              />
              <button
                type="submit"
                className="rounded-full bg-library-forest px-4 py-2 text-xs font-semibold text-white transition hover:bg-library-deep xl:px-5 xl:text-sm"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-library-forest/10 bg-library-cream lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[2560px] flex-col px-3 pb-4 pt-3 sm:px-5 sm:pb-5 md:px-6">
              <div className="mb-3 flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-library-muted sm:text-xs">
                <Library size={15} className="text-library-gold" />
                Library Navigation
              </div>

              {navLinks.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.045, duration: 0.25 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-3 text-xs font-semibold transition sm:px-4 sm:py-3.5 sm:text-sm ${
                        isActive
                          ? "bg-library-forest text-white"
                          : "text-library-ink hover:bg-library-forest/5"
                      }`
                    }
                  >
                    {item.label}
                    <ArrowRight size={16} />
                  </NavLink>
                </motion.div>
              ))}

              <form
                onSubmit={handleSearch}
                className="mt-3 flex items-center gap-2 rounded-xl border border-library-forest/15 bg-white px-3 py-1.5 sm:mt-4 sm:py-2"
              >
                <Search size={17} className="shrink-0 text-library-gold" />
                <input
                  name="query"
                  type="search"
                  placeholder="Search books..."
                  aria-label="Search books"
                  className="min-w-0 flex-1 bg-transparent py-2 text-xs outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-library-forest px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-library-deep sm:text-xs"
                >
                  Search
                </button>
              </form>

              <div className="mt-3 flex items-center gap-2 px-1 text-[10px] text-library-muted sm:mt-4 sm:text-xs">
                <ChevronDown size={14} className="text-library-gold" />
                Discover your next great read.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
