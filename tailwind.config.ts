import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6f9fc",
          100: "#b3eef5",
          200: "#80e3ee",
          300: "#4dd8e7",
          400: "#1acde0",
          500: "#00B4CD",
          600: "#009fb5",
          700: "#007a8c",
          800: "#005563",
          900: "#00303a",
        },
        accent: {
          50: "#fffce6",
          100: "#fff6b3",
          200: "#fff080",
          300: "#ffea4d",
          400: "#FFE458",
          500: "#f5d63d",
          600: "#d4b82e",
          700: "#a38f23",
          800: "#726518",
          900: "#413b0e",
        },
        neutral: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#adb5bd",
          500: "#6c757d",
          600: "#495057",
          700: "#343a40",
          800: "#212529",
          900: "#0d1117",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
