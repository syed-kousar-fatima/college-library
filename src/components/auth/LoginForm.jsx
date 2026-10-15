
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ShieldCheck
} from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      general: ""
    }));

    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting || isLoading) return;

    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const result = await login(formData);

      if (!result.success) {
        setErrors(result.errors || {
          general: "Unable to sign in. Please check your details."
        });
        return;
      }

      if (rememberEmail) {
        try {
          localStorage.setItem(
            "pagenest-remembered-email",
            formData.email.trim()
          );
        } catch {
          setSuccessMessage("Login successful. Opening your dashboard...");
        }
      } else {
        try {
          localStorage.removeItem("pagenest-remembered-email");
        } catch {
          setSuccessMessage("Login successful. Opening your dashboard...");
        }
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setErrors({
        general: "Something went wrong. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="w-full"
    >
      <div className="mb-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-library-forest text-library-gold shadow-soft">
          <BookOpen size={28} strokeWidth={1.7} />
        </div>

        <p className="font-display text-3xl text-library-gold sm:text-4xl">
          Welcome Back
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-library-forest sm:text-3xl">
          Student Sign In
        </h1>

        <p className="mt-3 text-sm leading-6 text-library-muted sm:text-base">
          Sign in to manage your borrowed books, track due dates, and continue
          your reading journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <ShieldCheck size={19} className="mt-0.5 shrink-0" />
            <p>{errors.general}</p>
          </motion.div>
        )}

        {successMessage && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            <CheckCircle2 size={18} />
            {successMessage}
          </div>
        )}

        <FormField
          label="College Email"
          name="email"
          required
          error={errors.email}
          hint="Use the email registered with your library account."
        >
          <Input
            name="email"
            type="email"
            placeholder="you@college.edu"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
            leftIcon={<GraduationCap size={18} />}
            required
          />
        </FormField>

        <FormField
          label="Password"
          name="password"
          required
          error={errors.password}
          labelAction={
            <span className="text-library-muted">
              Demo account access
            </span>
          }
        >
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            error={errors.password}
          />
        </FormField>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-library-muted">
            <input
              type="checkbox"
              checked={rememberEmail}
              onChange={(event) => setRememberEmail(event.target.checked)}
              className="h-4 w-4 rounded border-library-forest/30 accent-library-forest focus:ring-library-forest"
            />
            Remember my email
          </label>

          <span className="text-xs text-library-muted">
            Password reset unavailable in demo
          </span>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isSubmitting || isLoading}
          disabled={isSubmitting || isLoading}
          rightIcon={<ArrowRight size={18} />}
          className="mt-2"
        >
          Sign In to Your Library
        </Button>
      </form>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-library-forest/10" />
        <span className="text-xs font-medium uppercase tracking-wider text-library-muted">
          Demo access
        </span>
        <div className="h-px flex-1 bg-library-forest/10" />
      </div>

      <div className="rounded-2xl border border-library-gold/25 bg-library-paper/60 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-library-forest">
          <ShieldCheck size={18} className="text-library-gold" />
          Student Demo Credentials
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-library-muted">Email</span>
            <button
              type="button"
              onClick={() =>
                setFormData((previous) => ({
                  ...previous,
                  email: "aarav.sharma@example.edu"
                }))
              }
              className="break-all text-left font-medium text-library-forest underline decoration-library-gold/60 underline-offset-4"
            >
              aarav.sharma@example.edu
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-library-muted">Password</span>
            <button
              type="button"
              onClick={() =>
                setFormData((previous) => ({
                  ...previous,
                  password: "library123"
                }))
              }
              className="font-semibold text-library-forest underline decoration-library-gold/60 underline-offset-4"
            >
              Fill demo password
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-library-muted">
          Select the email and password above to fill the demo credentials.
          Then sign in to explore the student dashboard.
        </p>
      </div>

      <p className="mt-7 text-center text-sm leading-6 text-library-muted">
        Return to the library homepage?{" "}
        <Link
          to="/"
          className="font-semibold text-library-forest transition hover:text-library-gold"
        >
          Explore PageNest
        </Link>
      </p>
    </motion.div>
  );
}
