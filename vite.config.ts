import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/components/"],
    }),
  ],
  build: {
    lib: {
      // The entry point for your library
      entry: resolve(__dirname, "src/index.ts"),
      // Global variable name when used in browser via UMD
      name: "ReactLoadingSkeleton",
      // Output file names
      fileName: (format) => `index.${format === "umd" ? "umd.cjs" : "js"}`,
      // Generate both ES module and UMD builds
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ["react", "react-dom", "styled-components"],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
    // Prevent source maps from being generated
    sourcemap: false,
    // Reduce bundle size
    minify: true,
  },
});
