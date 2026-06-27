import { cn } from "@/lib/utils";

/**
 * Ambient backdrop: soft accent aurora blobs + a faint automation grid.
 * Pure CSS, cheap, theme-aware — the static base layer behind the 3D hero.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />
      <div
        className="anim-float absolute -left-40 top-[-15%] size-[40rem] rounded-full opacity-[0.22] blur-[140px]"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--glow)/0.6), transparent 60%)",
        }}
      />
      <div
        className="anim-float absolute -right-40 top-[25%] size-[34rem] rounded-full opacity-[0.14] blur-[150px]"
        style={{
          animationDelay: "-3s",
          background:
            "radial-gradient(circle at center, rgb(var(--glow-2)/0.5), transparent 60%)",
        }}
      />
    </div>
  );
}
