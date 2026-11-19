import { describe, expect, it } from "vitest";

import { articleFrontmatterSchema } from "./mdx";

const validFrontmatter = {
  title: "A working title",
  description: "A short article description.",
  date: "2026-11-19",
  author: "Author pending",
  tags: ["workflow"],
  draft: true,
};

describe("articleFrontmatterSchema", () => {
  it("accepts the required fields with an ISO calendar date", () => {
    expect(articleFrontmatterSchema.safeParse(validFrontmatter).success).toBe(true);
  });

  it("rejects impossible dates and missing required fields", () => {
    expect(
      articleFrontmatterSchema.safeParse({ ...validFrontmatter, date: "2026-02-30" }).success,
    ).toBe(false);
    expect(articleFrontmatterSchema.safeParse({ ...validFrontmatter, author: " " }).success).toBe(
      false,
    );
  });

  it("rejects empty tags and non-boolean draft values", () => {
    expect(articleFrontmatterSchema.safeParse({ ...validFrontmatter, tags: [] }).success).toBe(
      false,
    );
    expect(articleFrontmatterSchema.safeParse({ ...validFrontmatter, draft: "true" }).success).toBe(
      false,
    );
  });
});
