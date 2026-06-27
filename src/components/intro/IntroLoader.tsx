"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const STEPS = ["init", "connect nodes", "load systems", "ready"];

/**
 * First-load boot sequence. Renders from the very first frame (covers content,
 * no flash). On repeat visits within a session an inline <head> script adds the
 * `intro-seen` class so CSS hides this before paint, and we unmount immediately.
 */
export function IntroLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already shown this session → remove instantly (CSS already hid it).
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("intro-seen");
    } catch {}
    if (seen) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}

    document.documentElement.style.overflow = "hidden";

    const total = reduced ? 900 : 1800;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      setStepIdx(Math.min(STEPS.length - 1, Math.floor(eased * STEPS.length)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setShow(false);
        document.documentElement.style.overflow = "";
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="intro-overlay"
          key="intro"
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: reduced ? 0.3 : 0.6, ease: [0.7, 0, 0.3, 1] },
          }}
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

          <div className="relative flex flex-col items-center">
            <div
              className="grid size-20 place-items-center rounded-2xl border border-border-strong bg-surface font-display text-2xl font-bold text-fg"
              style={{ boxShadow: "0 0 40px -8px rgb(var(--glow)/0.6)" }}
            >
              {site.initials}
              <span className="absolute -right-1 -top-1 size-2.5 animate-ping rounded-full bg-accent-3" />
            </div>

            <div className="mt-8 h-px w-56 overflow-hidden bg-border">
              <div
                className="h-full bg-accent transition-[width] duration-75 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="mt-3 flex w-56 items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
              <span>{STEPS[stepIdx]}</span>
              <span className="tabular-nums text-fg-muted">
                {String(pct).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
