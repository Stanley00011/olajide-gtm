"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useDeviceTier } from "@/hooks/useDeviceTier";

// ssr:false is legal here because this file is a Client Component.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const CanvasConstellation = dynamic(() => import("./CanvasConstellation"), {
  ssr: false,
});

/**
 * Renders the animated node-network behind the hero on every device:
 *  - capable desktop (not reduced-motion) → full WebGL 3D scene
 *  - everything else (mobile, low-end, reduced-motion) → lightweight 2D canvas
 * Only mounts once in view.
 */
export function HeroSceneMount() {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const use3D = !reduced && tier === "high";
  const color = resolvedTheme === "light" ? "#0aa2c0" : "#3ee6ff";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-80 [mask-image:radial-gradient(ellipse_at_60%_40%,black_25%,transparent_72%)]"
    >
      {inView && (use3D ? <HeroScene color={color} /> : <CanvasConstellation />)}
    </div>
  );
}
