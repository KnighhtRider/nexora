import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // AGENTS.md: no `any`, no non-null assertions without a reason comment.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      // Server handlers must not log request bodies or personal data.
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },
  {
    // Playwright's fixture API hands the test a `use` callback. It is not a
    // React hook, so the app's hook rules must not apply to end-to-end tests.
    files: ["tests/e2e/**/*.ts"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local artefacts
    "coverage/**",
    "test-results/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
