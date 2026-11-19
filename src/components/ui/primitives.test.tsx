import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";
import { Card } from "./Card";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an internal link with the given href", () => {
    render(<Link href="/platform">Platform</Link>);

    const link = screen.getByRole("link", { name: "Platform" });
    expect(link.getAttribute("href")).toBe("/platform");
  });

  it("renders external links with safe attributes", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );

    const link = screen.getByRole("link", { name: "External" });
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});

describe("Card", () => {
  it("renders children on the surface", () => {
    render(<Card>Content</Card>);

    const card = screen.getByText("Content");
    expect(card.className).toContain("bg-surface");
  });

  it("adds hover styles when hoverable", () => {
    render(<Card hoverable>Content</Card>);

    const card = screen.getByText("Content");
    expect(card.className).toContain("hover:border-line-strong");
  });
});

describe("Badge", () => {
  it("renders the concept variant", () => {
    render(<Badge variant="concept">Concept</Badge>);

    const badge = screen.getByText("Concept");
    expect(badge.className).toContain("text-cyan");
  });
});
