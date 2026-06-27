"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

const STEPS = ["init", "connect nodes", "load systems", "ready"];

/**
 * First-load boot sequence. Shows a forming-node mark + a real progress sweep
 * tied to font readiness, then choreographs out into the page. Runs once per
 * session; collapses to a fast fade under reduced motion.
 */
export function IntroLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro-seen")) return;

    sessionStorage.setItem("intro-seen", "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const hardStop = reduced ? 350 : 1900;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / hardStop);
      // ease-out so it feels like it's settling
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      setStepIdx(Math.min(STEPS.length - 1, Math.floor(eased * STEPS.length)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };

    function finish() {
      setShow(false);
      document.documentElement.style.overflow = "";
    }

    // Prefer real signal, but never block past hardStop
    if ("fonts" in document) {
      (document as Document).fonts.ready.then(() => {
        /* allow the bar to keep animating to hardStop for polish */
      });
    }
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
          key="intro"
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: reduced ? 0.2 : 0.7, ease: [0.7, 0, 0.3, 1] },
          }}
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid size-20 place-items-center rounded-2xl border border-border-strong bg-surface font-display text-2xl font-bold text-fg"
              style={{ boxShadow: "0 0 40px -8px rgb(var(--glow)/0.6)" }}
            >
              {site.initials}
              <span className="absolute -right-1 -top-1 size-2.5 animate-ping rounded-full bg-accent-3" />
            </motion.div>

            <div className="mt-8 h-px w-56 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
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
