"use client";

import { useEffect, useState } from "react";

/**
 * Cheap capability check so we only mount WebGL on devices that can afford it.
 * Returns "high" once confirmed capable; "low" otherwise (mobile / few cores /
 * coarse pointer / data-saver). Starts "low" so SSR + first paint never assume
 * 3D.
 */
export function useDeviceTier(): "low" | "high" {
  const [tier, setTier] = useState<"low" | "high">("low");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cores = navigator.hardwareConcurrency ?? 2;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData ?? false;
    const narrow = window.innerWidth < 768;

    const capable = cores >= 4 && mem >= 4 && !saveData && !(coarse && narrow);
    setTier(capable ? "high" : "low");
  }, []);

  return tier;
}
