import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "./Header";

describe("Header mobile navigation", () => {
  let showModalDescriptor: PropertyDescriptor | undefined;
  let closeDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    showModalDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal");
    closeDescriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "close");
    Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      }),
    });
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.removeAttribute("open");
      }),
    });
  });

  afterEach(() => {
    cleanup();
    if (showModalDescriptor) {
      Object.defineProperty(HTMLDialogElement.prototype, "showModal", showModalDescriptor);
    } else {
      Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
    }
    if (closeDescriptor) {
      Object.defineProperty(HTMLDialogElement.prototype, "close", closeDescriptor);
    } else {
      Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
    }
  });

  it("opens as a modal, locks scrolling, and restores focus after Escape", () => {
    render(<Header />);
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Mobile navigation" });
    expect((dialog as HTMLDialogElement).open).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close navigation menu" }),
    );

    const menuLinks = dialog.querySelectorAll<HTMLAnchorElement>("a[href]");
    const firstLink = menuLinks.item(0);
    const lastLink = menuLinks.item(menuLinks.length - 1);
    lastLink.focus();
    fireEvent.keyDown(lastLink, { key: "Tab" });
    expect(document.activeElement).toBe(firstLink);
    firstLink.focus();
    fireEvent.keyDown(firstLink, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastLink);

    fireEvent(dialog, new Event("cancel", { cancelable: true }));

    expect(screen.queryByRole("dialog", { name: "Mobile navigation" })).toBeNull();
    expect(document.body.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
  });

  it("closes after a visitor chooses a navigation link", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const platformLinks = screen.getAllByRole("link", { name: "Platform" });
    const mobilePlatformLink = platformLinks.at(-1);
    if (!mobilePlatformLink) throw new Error("Mobile Platform link was not rendered");
    mobilePlatformLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(mobilePlatformLink);

    expect(screen.queryByRole("dialog", { name: "Mobile navigation" })).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });
});
