import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Honest, specific outcomes drawn from real systems Olajide has shipped.
 * Specificity > adjectives (the ColdIQ lesson), without fabricating metrics.
 */
const stats = [
  { value: "90%+", label: "less manual research per outreach run" },
  { value: "<5 min", label: "of human input per content batch" },
  { value: "<60s", label: "to a full cross-department dashboard" },
  { value: "100%", label: "of emails verified before a single send" },
];

export function ProofStrip() {
  return (
    <section className="container-page py-20 sm:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Proof, not promises.
          </h2>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
          >
            Two of these ship with demos you can watch
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className="h-full bg-bg p-7">
              <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-5 font-mono text-xs text-fg-faint">
          Outcomes from real systems shipped. Per-engagement results vary with
          scope and volume.
        </p>
      </Reveal>
    </section>
  );
}
