import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { homeContent } from "@/content/home";

import HomePage from "./page";

describe("home page scaffold", () => {
  it("renders exactly one h1 inside main#main", () => {
    render(<HomePage />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]?.textContent).toBe(homeContent.hero.h1);

    expect(screen.getByRole("main").id).toBe("main");
  });
});
