import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FAFAFA",
        surface: "#F4F4F2",
        line: "#E7E7E4",
        "line-dark": "#242424",
        muted: "#67675F",
        faint: "#73736D",
        signal: {
          DEFAULT: "#16A34A",
          bright: "#22C55E",
          dark: "#15803D",
          soft: "#E8F7EE",
        },
        amber: {
          DEFAULT: "#B45309",
          soft: "#FDF3E3",
        },
        red: {
          DEFAULT: "#DC2626",
          soft: "#FDEBEB",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-plex-mono)",
          "IBM Plex Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      maxWidth: {
        wrap: "76rem",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          from: { opacity: "0", transform: "translateY(6px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        bounce3: {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.35" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        rise: "rise .5s cubic-bezier(.16,1,.3,1) both",
        pop: "pop .4s cubic-bezier(.16,1,.3,1) both",
        marquee: "marquee 46s linear infinite",
        "marquee-rev": "marquee-rev 52s linear infinite",
        "flow-dash": "flow-dash 1.2s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
