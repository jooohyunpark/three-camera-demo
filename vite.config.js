import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  // https://vitejs.dev/guide/static-deploy.html#github-pages
  base: "/threejs-camera-comparison/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "docs"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        perspective: resolve(__dirname, "src/perspective/index.html"),
        orthographic: resolve(__dirname, "src/orthographic/index.html"),
      },
    },
  },
});
