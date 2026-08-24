import type { Config } from "tailwindcss";

// Brand tokens are pulled from apps/mobile/src/screens/study/studyTheme.ts
// (see BRAND-AND-COPY-DECK.md §1). Use these exact values; never invent hues.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6d28d9",
          soft: "#ede9fe",
        },
        accent: {
          DEFAULT: "#f59e0b",
          soft: "#fef3c7",
          on: "#78350f",
        },
        canvas: {
          DEFAULT: "#f6f5fb",
          alt: "#efedf8",
        },
        surface: "#ffffff",
        ink: {
          DEFAULT: "#1c1a2e",
          soft: "#5f5b72",
          faint: "#a09cb3",
        },
        line: {
          DEFAULT: "#eae7f4",
          strong: "#d6d1e6",
        },
        correct: {
          DEFAULT: "#16a34a",
          soft: "#dcfce7",
        },
        wrong: {
          DEFAULT: "#dc2626",
          soft: "#fee2e2",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Warmer face for headlines only — see BRAND-AND-COPY-DECK.md §1.
        display: [
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      fontFeatureSettings: {
        // Tabular figures everywhere — numbers are load-bearing (brief §1, DoD).
        tabular: '"tnum" 1, "lnum" 1',
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 26, 46, 0.04), 0 4px 24px rgba(28, 26, 46, 0.06)",
        cardHover: "0 4px 8px rgba(28, 26, 46, 0.06), 0 12px 32px rgba(28, 26, 46, 0.08)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 320ms ease-out both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
