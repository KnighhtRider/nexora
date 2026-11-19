"use client";

// Client Component: scroll/menu interactions use browser events and dialog APIs.

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { navItems, siteConfig } from "@/config/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const dialog = menuDialogRef.current;
    if (!dialog) return;

    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={
        scrolled
          ? "sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur-sm"
          : "sticky top-0 z-40 border-b border-transparent bg-transparent"
      }
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" variant="nav" className="font-semibold text-fg">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} variant="nav">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-base hover:bg-surface-hover focus-visible:outline-none md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
        <Link href="/request-demo" className={buttonVariants({ variant: "primary", size: "md" })}>
          Request a Demo
        </Link>
      </Container>
      <dialog
        ref={menuDialogRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-page p-0 text-fg backdrop:bg-scrim md:hidden"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;

          const focusableElements = event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );
          const first = focusableElements.item(0);
          const last = focusableElements.item(focusableElements.length - 1);

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
      >
        <Container className="flex h-full flex-col py-5">
          <div className="flex h-11 items-center justify-between">
            <Link
              href="/"
              variant="nav"
              className="font-semibold text-fg"
              onClick={() => setMenuOpen(false)}
            >
              {siteConfig.name}
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-fg transition-colors duration-base hover:bg-surface-hover focus-visible:outline-none"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant="nav"
                className="flex min-h-11 items-center rounded-md px-3 text-lg text-fg"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/request-demo"
            className={buttonVariants({ variant: "primary", size: "lg", className: "w-full" })}
            onClick={() => setMenuOpen(false)}
          >
            Request a Demo
          </Link>
        </Container>
      </dialog>
    </header>
  );
}
