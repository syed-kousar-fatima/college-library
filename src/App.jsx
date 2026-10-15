
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  Feather,
  GraduationCap,
  LoaderCircle,
  Sparkles
} from "lucide-react";
import Logo from "./components/layout/Logo";
import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";
import AppRoutes from "./routes/AppRoutes";

const splashSteps = [
  {
    title: "Waking up the library",
    description: "Preparing your reading experience",
    icon: BookOpen
  },
  {
    title: "Gathering your books",
    description: "Organizing your knowledge collection",
    icon: BookMarked
  },
  {
    title: "Opening your reading world",
    description: "Getting everything ready for you",
    icon: GraduationCap
  },
  {
    title: "Ready to explore",
    description: "Your next chapter awaits",
    icon: Sparkles
  }
];

function SplashProgress() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStep((current) =>
        Math.min(current + 1, splashSteps.length - 1)
      );
    }, 600);

    return () => window.clearInterval(intervalId);
  }, []);

  const progress = ((step + 1) / splashSteps.length) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-7 space-y-4">
        {splashSteps.map((item, index) => {
          const completed = index < step;
          const active = index === step;
          const StepIcon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{
                opacity: index <= step ? 1 : 0.32,
                y: 0
              }}
              transition={{
                duration: reduceMotion ? 0.15 : 0.4,
                ease: "easeOut"
              }}
              className="flex items-center gap-3 text-left"
            >
              <motion.div
                animate={
                  active && !reduceMotion
                    ? { scale: [1, 1.08, 1] }
                    : { scale: 1 }
                }
                transition={{
                  duration: 1.2,
                  repeat: active && !reduceMotion ? Infinity : 0
                }}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                  completed || active
                    ? "border-library-gold/40 bg-library-gold/10 text-library-gold"
                    : "border-white/10 bg-white/[0.025] text-white/30"
                }`}
              >
                {completed ? (
                  <Check size={17} strokeWidth={2.2} />
                ) : active ? (
                  <StepIcon size={18} strokeWidth={1.7} />
                ) : (
                  <span className="text-xs font-medium">
                    {index + 1}
                  </span>
                )}
              </motion.div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-[13px] font-medium sm:text-sm ${
                    active || completed
                      ? "text-white"
                      : "text-white/45"
                  }`}
                >
                  {item.title}
                </p>
                <p className="mt-1 text-[11px] leading-5 text-white/40 sm:text-xs">
                  {item.description}
                </p>
              </div>

              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                {completed ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0.1 : 0.3,
                      type: "spring",
                      stiffness: 220
                    }}
                  >
                    <Check
                      size={16}
                      className="text-library-gold"
                    />
                  </motion.div>
                ) : active ? (
                  <LoaderCircle
                    size={15}
                    className={
                      reduceMotion
                        ? "text-library-gold"
                        : "animate-spin text-library-gold"
                    }
                  />
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-library-gold/70 via-library-gold to-[#F2D5A4]"
          animate={{ width: `${progress}%` }}
          transition={{
            duration: reduceMotion ? 0.1 : 0.45,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40 sm:text-[10px]">
          Preparing your experience
        </span>
        <span className="text-xs font-semibold tabular-nums text-library-gold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

function SplashScreen() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: reduceMotion ? 1 : 1.02,
        filter: reduceMotion ? "blur(0px)" : "blur(5px)"
      }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.6,
        ease: "easeInOut"
      }}
      className="fixed inset-0 z-[100] flex min-h-screen min-h-[100svh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-[#102E27] px-5 py-8 text-white sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(201,157,91,0.15),transparent_48%)]" />

        <div className="absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full border border-white/[0.045] sm:h-[34rem] sm:w-[34rem]" />

        <div className="absolute -left-24 -top-24 h-[19rem] w-[19rem] rounded-full border border-white/[0.055] sm:h-[25rem] sm:w-[25rem]" />

        <div className="absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full border border-library-gold/10 sm:h-[42rem] sm:w-[42rem]" />

        <div className="absolute -bottom-32 -right-24 h-[23rem] w-[23rem] rounded-full border border-white/[0.05] sm:h-[30rem] sm:w-[30rem]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-library-gold/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-library-gold/30 to-transparent" />
      </div>

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? {}
            : { y: [0, -12, 0], rotate: [0, 5, 0] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="pointer-events-none absolute left-[9%] top-[15%] hidden text-library-gold/20 lg:block"
      >
        <Feather size={38} strokeWidth={1} />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? {}
            : { y: [0, 12, 0], rotate: [0, -8, 0] }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="pointer-events-none absolute bottom-[14%] right-[10%] hidden text-library-gold/20 lg:block"
      >
        <BookMarked size={42} strokeWidth={1} />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.6,
            ease: "easeOut"
          }}
          className="mb-7 flex items-center gap-2 rounded-full border border-library-gold/25 bg-white/[0.045] px-4 py-2 backdrop-blur-md sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-library-gold opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-library-gold shadow-[0_0_10px_rgba(201,157,91,0.7)]" />
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-library-gold sm:text-[10px] sm:tracking-[0.3em]">
            Your Campus Knowledge Hub
          </span>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
            scale: reduceMotion ? 1 : 0.88
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0.2 : 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="relative mb-7 flex h-28 w-28 items-center justify-center sm:mb-8 sm:h-36 sm:w-36"
        >
          <motion.div
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 rounded-[2.2rem] border border-dashed border-library-gold/30 sm:rounded-[2.5rem]"
          />

          <div className="absolute inset-3 rounded-[1.7rem] border border-library-gold/20 bg-gradient-to-br from-white/[0.11] to-white/[0.025] shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:rounded-[2rem]" />

          <motion.div
            animate={
              reduceMotion
                ? {}
                : { y: [0, -4, 0], rotateY: [0, 8, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-library-gold/30 bg-gradient-to-br from-[#1D4A3D] to-[#173F35] shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:h-24 sm:w-24"
          >
            <BookOpen
              size={42}
              strokeWidth={1.2}
              className="text-library-gold sm:h-14 sm:w-14"
            />

            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: [0.45, 1, 0.45],
                      scale: [0.9, 1.12, 0.9]
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity
              }}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#102E27] bg-library-gold text-[#102E27] shadow-lg sm:h-8 sm:w-8"
            >
              <Sparkles size={15} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.12,
            duration: reduceMotion ? 0.2 : 0.65
          }}
          className="mb-4 flex flex-col items-center sm:mb-5"
        >
          <Logo light />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.22,
            duration: reduceMotion ? 0.2 : 0.65
          }}
          className="mb-7 max-w-sm px-2 sm:mb-8"
        >
          <p className="text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            A world of knowledge, one page at a time.
          </p>

          <p className="mt-1 text-xs leading-6 text-white/40 sm:text-sm">
            Discover ideas. Expand your horizons. Shape your future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            delay: 0.3,
            duration: reduceMotion ? 0.2 : 0.7
          }}
          className="mb-7 flex w-40 items-center gap-3 sm:mb-8"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-library-gold/70" />

          <GraduationCap
            size={19}
            strokeWidth={1.5}
            className="text-library-gold/80"
          />

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-library-gold/70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.38,
            duration: reduceMotion ? 0.2 : 0.6
          }}
          className="w-full"
        >
          <SplashProgress />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-7 flex items-center gap-2 text-white/25 sm:mt-8"
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.22em]">
            Every great journey begins with a page
          </span>
          <ArrowRight size={12} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <div className="min-h-screen w-full overflow-x-clip bg-library-cream">
            <AppRoutes />

            <AnimatePresence mode="wait">
              {showSplash && (
                <SplashScreen key="library-splash" />
              )}
            </AnimatePresence>
          </div>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
