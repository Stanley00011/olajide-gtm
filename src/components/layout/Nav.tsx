"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-3 flex max-w-[var(--maxw)] items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
          "container-page",
          scrolled
            ? "glass border-border shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border-transparent bg-transparent",
        )}
        style={{ borderWidth: 1 }}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} - home`}
        >
          <span className="grid size-8 place-items-center rounded-lg border border-border-strong bg-surface font-display text-sm font-bold text-fg shadow-[inset_0_0_12px_-6px_rgb(var(--glow))]">
            {site.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-fg sm:block">
            {site.shortName}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-border text-fg md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-page md:hidden"
          >
            <div className="glass mt-2 flex flex-col gap-1 rounded-2xl border border-border p-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-medium text-accent-fg"
              >
                Let&apos;s talk
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
