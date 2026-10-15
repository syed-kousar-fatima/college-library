
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center bg-library-cream px-4">
        <Loader
          size="lg"
          label="Checking your student account..."
          fullScreen={false}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
