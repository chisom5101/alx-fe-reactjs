// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ Add this line

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ And this
  ],
});
