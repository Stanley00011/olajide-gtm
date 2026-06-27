"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders a Mermaid diagram inside a writing post. Theme-aware, lazy-loaded
 * (the heavy mermaid lib only loads when a diagram is actually on the page),
 * and horizontally scrollable on small screens.
 */
export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const dark = resolvedTheme !== "light";
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "Inter, system-ui, sans-serif",
          themeVariables: dark
            ? {
                background: "#0a0a0b",
                primaryColor: "#111114",
                primaryBorderColor: "#34343a",
                primaryTextColor: "#f3f3f4",
                secondaryColor: "#161618",
                tertiaryColor: "#0f0f11",
                lineColor: "#3ee6ff",
                fontSize: "14px",
              }
            : {
                background: "#ffffff",
                primaryColor: "#ffffff",
                primaryBorderColor: "#cfd5e4",
                primaryTextColor: "#0c0f17",
                secondaryColor: "#f0f2f8",
                tertiaryColor: "#ffffff",
                lineColor: "#0aa2c0",
                fontSize: "14px",
              },
        });
        const { svg } = await mermaid.render(`mmd-${rawId}`, chart.trim());
        if (active && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (active) setError(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [chart, resolvedTheme, rawId]);

  return (
    <figure className="my-9 overflow-hidden rounded-[var(--radius)] border border-border bg-bg-elev p-5">
      <div className="overflow-x-auto">
        <div
          ref={ref}
          className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        />
      </div>
      {error && (
        <p className="text-center text-sm text-fg-faint">Diagram unavailable.</p>
      )}
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-fg-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
