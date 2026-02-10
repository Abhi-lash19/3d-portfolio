import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/3d-portfolio/",
  plugins: [react()],
  build: {
    target: "es2017",
    sourcemap: false,
    cssCodeSplit: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "three";
            if (id.includes("@react-three")) return "react-three";
            if (id.includes("framer-motion")) return "framer";
            return "vendor";
          }
        },
      },
    },
  },
});
