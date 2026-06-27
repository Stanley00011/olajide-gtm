import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Consistent section header: kicker label + display title + optional intro. */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--glow)/0.8)]" />
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
