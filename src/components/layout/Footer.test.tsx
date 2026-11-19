import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { footerGroups, siteConfig } from "@/config/site";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the brand lock-up and all configured links once", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeTruthy();
    expect(screen.getByText(siteConfig.tagline)).toBeTruthy();

    for (const group of footerGroups) {
      expect(screen.getByRole("heading", { name: group.title, level: 2 })).toBeTruthy();
      for (const item of group.links) {
        const link = screen.getByRole("link", { name: item.label });
        expect(link.getAttribute("href")).toBe(item.href);
      }
    }

    expect(screen.getAllByRole("link", { name: "About" })).toHaveLength(1);
  });
});
