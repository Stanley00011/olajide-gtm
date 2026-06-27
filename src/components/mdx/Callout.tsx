import type { ReactNode } from "react";

/** Emphasis box for a key takeaway inside a post. */
export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-[var(--radius)] border border-border bg-surface/50 p-5 pl-6 [border-left:3px_solid_var(--accent)]">
      <div className="text-fg [&>p]:mt-0 [&>p]:leading-relaxed">{children}</div>
    </div>
  );
}
