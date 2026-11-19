import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest runs with `globals: false`, so Testing Library cannot self-register
// its cleanup hook. Do it explicitly or mounted trees leak between tests.
afterEach(() => {
  cleanup();
});
