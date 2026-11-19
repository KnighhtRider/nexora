import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

describe("Container", () => {
  it("applies the content max width and gutters", () => {
    render(<Container>Content</Container>);

    const container = screen.getByText("Content");
    expect(container.className).toContain("max-w-content");
    expect(container.className).toContain("px-5");
  });

  it("supports reading width", () => {
    render(<Container size="reading">Content</Container>);

    const container = screen.getByText("Content");
    expect(container.className).toContain("max-w-reading");
  });
});

describe("SectionHeader", () => {
  it("renders eyebrow, title and lead", () => {
    render(<SectionHeader eyebrow="Eyebrow" title="Title" lead="Lead copy" />);

    expect(screen.getByText("Eyebrow")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeTruthy();
    expect(screen.getByText("Lead copy")).toBeTruthy();
  });
});
