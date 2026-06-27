"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

/**
 * Lightweight 2D node-network (the same motif as the 3D hero) on a canvas.
 * Cheap enough for phones, runs everywhere, pauses when off-screen. Used as the
 * hero background wherever the WebGL scene isn't a good fit (mobile / low-end).
 */
export default function CanvasConstellation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    // Non-null bindings (control-flow narrowing is lost inside nested closures).
    const canvas: HTMLCanvasElement = cv;
    const g: CanvasRenderingContext2D = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rgb = resolvedTheme === "light" ? "10,162,192" : "62,230,255";
    let w = 0;
    let h = 0;
    let raf = 0;

    const count = window.innerWidth < 768 ? 36 : 64;
    const linkDist = window.innerWidth < 768 ? 110 : 140;
    const speed = reduced ? 0.12 : 0.32; // gentle even under reduce-motion

    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];

    function resize() {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    }
    function frame() {
      g.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            g.strokeStyle = `rgba(${rgb},${(1 - d / linkDist) * 0.22})`;
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(a.x, a.y);
            g.lineTo(b.x, b.y);
            g.stroke();
          }
        }
      }
      for (const n of nodes) {
        g.fillStyle = `rgba(${rgb},0.75)`;
        g.beginPath();
        g.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        g.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    seed();
    frame();

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [reduced, resolvedTheme]);

  return <canvas ref={ref} aria-hidden className="size-full" />;
}
