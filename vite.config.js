import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/3d-portfolio/",
  plugins: [react()],
  build: {
    target: "es2017",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
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
