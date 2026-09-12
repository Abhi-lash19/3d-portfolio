import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Split third-party code into cacheable chunks.
//
// The goal is that three.js / react-three code ends up in chunks that nothing
// in the eager graph imports, so they are fetched only when a lazy 3D canvas
// mounts. "vendor" therefore lists the libraries used by the always-loaded UI
// explicitly (including shared helpers) — if one of those were left to land in
// a 3D chunk it would drag three.js into the first page load. Anything not
// listed is left to Rollup's own chunking.
const manualChunks = (id) => {
  // normalise Windows backslashes so one set of checks works on every platform
  const path = id.split("\\").join("/");

  // Vite's dynamic-import helper is a virtual module (no node_modules in its
  // id) that the entry chunk needs. Pin it to an eager chunk, otherwise it can
  // get grouped into a 3D chunk and force three.js into the initial load.
  if (path.includes("vite/preload-helper")) return "vendor";

  if (!path.includes("/node_modules/")) return;

  const inPkg = (...names) =>
    names.some((n) => path.includes(`/node_modules/${n}/`));

  if (inPkg("three", "three-stdlib", "three-mesh-bvh")) return "three-vendor";
  if (inPkg("@react-three", "postprocessing", "maath")) return "r3f-vendor";
  if (inPkg("react", "react-dom", "scheduler")) return "react-vendor";
  if (inPkg("framer-motion", "motion-dom", "motion-utils")) return "motion-vendor";
  if (
    inPkg(
      "@babel/runtime",
      "prop-types",
      "react-is",
      "object-assign",
      "classnames",
      "goober",
      "react-parallax-tilt",
      "react-vertical-timeline-component",
      "react-hot-toast",
      "@emailjs/browser"
    )
  )
    return "vendor";
};

export default defineConfig({
  base: "/3d-portfolio/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks },
    },
  },
});
