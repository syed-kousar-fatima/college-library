
import { Outlet, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  LayoutDashboard,
  Library,
  LogOut,
  UserRound
} from "lucide-react";
import Logo from "./Logo";

const dashboardLinks = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true
  },
  {
    label: "Explore Books",
    path: "/books",
    icon: Library
  },
  {
    label: "My Account",
    path: "/dashboard",
    icon: UserRound
  }
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen w-full bg-library-cream lg:grid lg:grid-cols-[250px_minmax(0,1fr)] 2xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="hidden min-h-screen flex-col border-r border-library-forest/10 bg-white lg:flex">
        <div className="border-b border-library-forest/10 p-5 2xl:p-7">
          <Logo />
        </div>

        <div className="px-5 py-7 2xl:px-7">
          <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-library-muted">
            Student Portal
          </p>

          <nav className="space-y-2" aria-label="Dashboard navigation">
            {dashboardLinks.map(({ label, path, icon: Icon, end }) => (
              <NavLink
                key={label}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-library-forest text-white shadow-soft"
                      : "text-library-muted hover:bg-library-forest/5 hover:text-library-forest"
                  }`
                }
              >
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-5 2xl:p-7">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-library-muted transition hover:bg-library-forest/5 hover:text-library-forest"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-3 border-b border-library-forest/10 bg-library-cream/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8 2xl:px-12">
          <div className="lg:hidden">
            <Logo />
          </div>

          <div className="hidden lg:block">
            <p className="text-xs font-medium text-library-muted">
              PAGENEST STUDENT PORTAL
            </p>
            <h1 className="mt-1 text-lg font-bold text-library-forest 2xl:text-xl">
              My Library Dashboard
            </h1>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-library-forest/10 text-library-forest">
              <UserRound size={19} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-library-forest">
                Student Member
              </p>
              <p className="mt-1 text-xs text-library-muted">
                Library Account
              </p>
            </div>
          </div>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full min-w-0 flex-1 p-4 sm:p-6 lg:p-8 2xl:p-12"
        >
          <Outlet />
        </motion.main>

        <footer className="border-t border-library-forest/10 px-4 py-5 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex flex-col gap-3 text-xs text-library-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} PageNest Library</span>
            <Link
              to="/"
              className="inline-flex items-center gap-2 transition hover:text-library-forest"
            >
              <BookOpen size={15} />
              Return to library home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
