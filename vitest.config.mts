import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

// `.mts` on purpose: the project has no `"type": "module"`, and Vite's upcoming
// native config loader warns when a `.ts` config uses ESM syntax.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "tests/e2e/**"],
  },
});
