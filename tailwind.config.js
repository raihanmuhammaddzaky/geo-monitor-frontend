import { mtConfig } from "@material-tailwind/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          "primary": "#11d4c4",
          "background-light": "#f6f8f8",
          "background-dark": "#102220",
          "surface": "#F3F4F6",
          "text-main": "#111827",
          "muted": "#6B7280",
          "accent": "#E85D04",
          "border-subtle": "#E5E7EB"
        },
        fontFamily: {
          "display": ["Plus Jakarta Sans", "sans-serif"],
          "mono": ["JetBrains Mono", "monospace"]
        },
        boxShadow: {
          'float': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }
    },
  },
  plugins: [mtConfig, require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};
