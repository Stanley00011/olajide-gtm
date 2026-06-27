"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useDeviceTier } from "@/hooks/useDeviceTier";

// ssr:false is legal here because this file is a Client Component.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Decides whether the WebGL hero is worth mounting, and only mounts it once
 * it's on screen. Falls back to the CSS Aurora (already behind it) otherwise,
 * so there's always a graceful, performant base layer.
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

  const enabled = !reduced && tier === "high";
  const color = resolvedTheme === "light" ? "#0aa2c0" : "#38e1ff";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-80 [mask-image:radial-gradient(ellipse_at_60%_40%,black_25%,transparent_72%)]"
    >
      {enabled && inView && <HeroScene color={color} />}
    </div>
  );
}
