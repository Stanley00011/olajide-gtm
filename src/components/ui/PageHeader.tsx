import { Aurora } from "./Aurora";
import { Reveal } from "./Reveal";

/** Consistent hero band for interior pages. */
export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-40 pb-16 sm:pb-24">
      <Aurora />
      <div className="container-page relative">
        <Reveal>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--glow)/0.8)]" />
            {kicker}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
