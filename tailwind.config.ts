import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0A08",     // warm near-black
        surface: "#131009",
        panel: "#17130E",
        ink: "#F5EFE6",      // warm off-white
        muted: "#B7AD9C",
        ember: {
          DEFAULT: "#FF6A21",
          soft: "#FF8A4C",
          ink: "#150E07",
        },
        hair: "rgba(245,239,230,0.13)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // fluid scale via clamp
        "fluid-eyebrow": "clamp(0.72rem, 0.68rem + 0.2vw, 0.85rem)",
        "fluid-body": "clamp(1rem, 0.96rem + 0.34vw, 1.2rem)",
        "fluid-lead": "clamp(1.2rem, 1rem + 1vw, 1.9rem)",
        "fluid-h3": "clamp(1.35rem, 1.1rem + 1.2vw, 2rem)",
        "fluid-h2": "clamp(1.9rem, 1.25rem + 3.1vw, 3.8rem)",
        "fluid-hero": "clamp(2.8rem, 1.1rem + 10vw, 9.5rem)",
      },
      spacing: {
        gutter: "clamp(1.25rem, 0.6rem + 3.1vw, 4rem)",
        section: "clamp(4.5rem, 2rem + 9vw, 10rem)",
      },
      maxWidth: {
        wrap: "82rem",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(-4%, 3%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
