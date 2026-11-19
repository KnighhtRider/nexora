import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children with the default primary variant", () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
    expect(button.className).toContain("bg-brand-solid");
  });

  it("applies variant and size classes", () => {
    render(
      <Button variant="secondary" size="lg">
        Cancel
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Cancel" });
    expect(button.className).toContain("border-line-strong");
    expect(button.className).toContain("h-12");
  });

  it("disables and marks busy while loading", () => {
    render(<Button loading>Saving</Button>);

    const button = screen.getByRole("button", { name: "Saving" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("forwards clicks when enabled", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
