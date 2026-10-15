

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        library: {
          forest: "#173F35",
          deep: "#102E27",
          gold: "#C99D5B",
          cream: "#F8F6EF",
          paper: "#EFEBDD",
          ink: "#24332E",
          muted: "#77827B"
        }
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        display: ["Great Vibes", "cursive"]
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px"
      },
      maxWidth: {
        "screen-wide": "2560px"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(23, 63, 53, 0.08)",
        card: "0 18px 50px rgba(16, 46, 39, 0.12)"
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s ease-out both",
        "book-reveal": "bookReveal 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "soft-pulse": "softPulse 2.4s ease-in-out infinite"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        bookReveal: {
          from: { opacity: "0", transform: "translateY(45px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        softPulse: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
