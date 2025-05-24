import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/hooks": path.resolve(__dirname, "src/hooks")
    },
  },
});
