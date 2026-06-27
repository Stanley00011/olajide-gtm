import { cn } from "@/lib/utils";

/**
 * Ambient backdrop: soft accent aurora blobs + a faint automation grid.
 * Pure CSS, cheap, theme-aware - the static base layer behind the 3D hero.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-grid animate-[grid-pan_26s_linear_infinite] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />
      <div
        className="absolute -left-40 top-[-15%] size-[40rem] animate-[drift-1_16s_ease-in-out_infinite] rounded-full opacity-[0.24] blur-[140px]"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--glow)/0.6), transparent 60%)",
        }}
      />
      <div
        className="absolute -right-40 top-[25%] size-[34rem] animate-[drift-2_21s_ease-in-out_infinite] rounded-full opacity-[0.16] blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--glow-2)/0.5), transparent 60%)",
        }}
      />
    </div>
  );
}
