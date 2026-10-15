
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = decodeURIComponent(location.hash.slice(1));
      const timer = window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-library-cream">
      <Navbar />

      <main className="min-w-0 w-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
