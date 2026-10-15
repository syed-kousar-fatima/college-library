
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import userData from "../data/user";
import { validateLoginForm } from "../utils/validators";

export const AuthContext = createContext(null);

const SESSION_KEY = "pagenest-authenticated";
const REMEMBERED_EMAIL_KEY = "pagenest-remembered-email";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authenticated = localStorage.getItem(SESSION_KEY);

      if (authenticated === "true") {
        setCurrentUser(userData);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ email, password, rememberMe = false }) => {
      const normalizedEmail = email?.trim().toLowerCase() ?? "";

      const errors = validateLoginForm({
        email: normalizedEmail,
        password
      });

      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          message: Object.values(errors)[0],
          errors
        };
      }

      const validCredentials =
        normalizedEmail === userData.email.toLowerCase() &&
        password === "library123";

      if (!validCredentials) {
        return {
          success: false,
          message: "The email or password is incorrect."
        };
      }

      try {
        localStorage.setItem(SESSION_KEY, "true");

        if (rememberMe) {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, normalizedEmail);
        } else {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
      } catch {
        return {
          success: false,
          message: "Your session could not be saved in this browser."
        };
      }

      setCurrentUser(userData);

      return {
        success: true,
        user: userData,
        message: "Welcome back to PageNest Library."
      };
    },
    []
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      return {
        success: false,
        message: "Your session could not be cleared."
      };
    }

    setCurrentUser(null);

    return {
      success: true,
      message: "You have been logged out successfully."
    };
  }, []);

  const getRememberedEmail = useCallback(() => {
    try {
      return localStorage.getItem(REMEMBERED_EMAIL_KEY) ?? "";
    } catch {
      return "";
    }
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      user: currentUser,
      isAuthenticated: Boolean(currentUser),
      isLoading,
      login,
      logout,
      getRememberedEmail
    }),
    [
      currentUser,
      isLoading,
      login,
      logout,
      getRememberedEmail
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthProvider."
    );
  }

  return context;
}

export default AuthContext;
