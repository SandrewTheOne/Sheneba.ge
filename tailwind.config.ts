import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { pine: "#245b49", ink: "#182c25" } } },
  plugins: [],
} satisfies Config;
