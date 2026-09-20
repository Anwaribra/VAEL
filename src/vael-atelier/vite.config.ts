import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone demo host only. When integrating, none of this is needed:
// the `src/vael-atelier` folder is self-contained.
export default defineConfig({
  plugins: [react()],
  server: { port: 5180 },
});
