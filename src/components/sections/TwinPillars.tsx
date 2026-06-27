import Link from "next/link";
import { ArrowUpRight, Workflow, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    href: "/automation",
    icon: Workflow,
    label: "Discipline 01",
    title: "AI Automation & Integration",
    body: "End-to-end systems that connect tools, orchestrate processes, and let AI handle the repetitive work — reliable, scalable, and cost-conscious by design.",
    points: ["n8n & Make orchestration", "LLM & agent pipelines", "API & data integration"],
  },
  {
    href: "/gtm",
    icon: Target,
    label: "Discipline 02",
    title: "GTM Engineering",
    body: "Go-to-market treated as a system: sourcing, enrichment, AI personalization, deliverability, and reply handling — instrumented end to end so pipeline compounds.",
    points: ["Outbound engines", "Signal-based targeting", "AI reply triage"],
  },
];

export function TwinPillars() {
  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading
        kicker="Two disciplines, one system"
        title={
          <>
            I build the machinery between{" "}
            <span className="text-gradient">intent and revenue</span>.
          </>
        }
        intro="The work splits into two tightly-coupled disciplines. Explore each — they feed each other."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {pillars.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.08}>
            <Link
              href={p.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface/40 p-8 transition-all duration-500 hover:border-border-strong hover:bg-surface"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgb(var(--glow)/0.4), transparent 70%)",
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-border-strong bg-bg-elev text-accent">
                  <p.icon className="size-5" />
                </span>
                <ArrowUpRight className="size-5 text-fg-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </div>

              <p className="relative mt-8 font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
                {p.label}
              </p>
              <h3 className="relative mt-2 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                {p.title}
              </h3>
              <p className="relative mt-4 text-fg-muted">{p.body}</p>

              <ul className="relative mt-6 flex flex-wrap gap-2">
                {p.points.map((pt) => (
                  <li
                    key={pt}
                    className="rounded-full border border-border bg-bg-elev px-3 py-1 font-mono text-xs text-fg-muted"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
