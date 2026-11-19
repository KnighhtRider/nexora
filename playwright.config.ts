import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  // Chromium only for now. Firefox/WebKit projects are added in Phase 8; adding
  // them before the pages exist only slows the loop down.
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // E2E runs against the production build, never `next dev`.
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: BASE_URL,
    // Never reuse: a leftover server would silently test an older build and
    // report a green run for code that is no longer in the tree.
    reuseExistingServer: false,
    timeout: 300_000,
  },
});
