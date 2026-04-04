import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette or / miel / ambre / feu
        obsidian: "#0A0604",
        forge: "#120C07",
        ember: "#1E1208",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C16E",
          dark: "#9A7A2E",
        },
        amber: {
          DEFAULT: "#B5651D",
          light: "#D4843A",
          dark: "#7A420E",
        },
        honey: {
          DEFAULT: "#F5A623",
          light: "#F7C05A",
          dark: "#C07D0A",
        },
        fire: {
          DEFAULT: "#E05A00",
          light: "#FF7A20",
          dark: "#9E3E00",
        },
        cream: "#F5E6CC",
        parchment: "#EDD9A3",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "fire-gradient":
          "linear-gradient(135deg, #E05A00 0%, #C9A84C 50%, #F5A623 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0A0604 0%, #1E1208 50%, #0A0604 100%)",
        "gold-gradient":
          "linear-gradient(90deg, #9A7A2E 0%, #E2C16E 50%, #9A7A2E 100%)",
      },
      animation: {
        flicker: "flicker 3s infinite alternate",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-pulse": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.95" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(201,168,76,0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(201,168,76,0.7), 0 0 80px rgba(224,90,0,0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
