"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const menuId = useId();

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const rest = document.querySelectorAll("main, footer");
    rest.forEach((node) => {
      if (open) node.setAttribute("inert", "");
      else node.removeAttribute("inert");
    });
    return () => {
      document.body.classList.remove("nav-open");
      rest.forEach((node) => node.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) menuButton.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const root = panel.current;
    const items = root?.querySelectorAll<HTMLElement>("a");
    items?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !items?.length || !menuButton.current) return;
      const list = [menuButton.current, ...Array.from(items)];
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = [
    ...nav,
    { label: "Book a call", href: site.bookPath },
  ];

  const isCurrent = (href: string) =>
    (href === "/team" && pathname === "/team") ||
    (href === "/book" && pathname === "/book");

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <Link href="/" className="wordmark">
        Vorq
      </Link>
      <nav className="desk-nav" aria-label="Primary">
        {items.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className={item.href === site.bookPath ? "book-link" : undefined}
            aria-current={isCurrent(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        ref={menuButton}
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="menu-icon" data-open={open ? "" : undefined} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      {open ? (
        <div
          ref={panel}
          id={menuId}
          className="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`} onClick={() => setOpen(false)}>
            {site.email}
          </a>
        </div>
      ) : null}
    </header>
  );
}
