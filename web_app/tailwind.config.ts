import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        // These resolve through CSS variables set by FontProvider.
        // If the variable is undefined (font not active), the browser
        // falls back to the generic family listed last.
        literata: ["var(--font-literata)", "serif"],
        fell: ["var(--font-fell)", "serif"],
        courier: ["var(--font-courier)", "monospace"],
      },
      keyframes: {
        popIn: {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.12)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        popIn: "popIn 0.5s ease forwards",
        shake: "shake 0.4s ease",
      },
    },
  },
  plugins: [],
};

export default config;
