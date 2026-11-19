import { describe, expect, it } from "vitest";

import { estimateReadingTimeMinutes } from "./reading-time";

describe("estimateReadingTimeMinutes", () => {
  it("returns at least one minute for empty or markup-only content", () => {
    expect(estimateReadingTimeMinutes("   ")).toBe(1);
    expect(estimateReadingTimeMinutes("# **`[]()`**")).toBe(1);
  });

  it("counts prose while excluding common Markdown syntax and fenced code", () => {
    const content = `# Title\n\n[Read this guide](https://example.com) about retrieval.\n\n\`\`\`ts\nconst ignored = true;\n\`\`\``;

    expect(estimateReadingTimeMinutes(content)).toBe(1);
  });

  it("rounds up by the configured reading rate", () => {
    const content = Array.from({ length: 201 }, () => "word").join(" ");

    expect(estimateReadingTimeMinutes(content)).toBe(2);
  });
});
