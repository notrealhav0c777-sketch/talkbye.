import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#030304", 1: "#09090c", 2: "#101015", 3: "#18181f", line: "#23232c" },
        tb: { violet: "#8b5cf6", blue: "#3b82f6", indigo: "#5b4bff" },
        mute: "#8b8b97",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: { "tb-grad": "linear-gradient(135deg,#9d5cf6 0%,#4f6bff 55%,#3b9bff 100%)" },
      boxShadow: { glow: "0 0 40px -8px rgba(99,102,241,.55)" },
      keyframes: {
        breathe: { "0%,100%": { opacity: ".45", transform: "scale(1)" }, "50%": { opacity: ".8", transform: "scale(1.06)" } },
        pop: { from: { opacity: "0", transform: "translateY(6px) scale(.98)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { breathe: "breathe 5s ease-in-out infinite", pop: "pop .25s ease-out both" },
    },
  },
  plugins: [],
};
export default config;
