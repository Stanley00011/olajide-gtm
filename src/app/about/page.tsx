import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { stack } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "From data analyst to AI GTM engineer — the story, the stack, and what comes next.",
};

const timeline = [
  {
    year: "Foundations",
    title: "Data analytics",
    body: "Started in data — SQL, Python, Power BI, Tableau, AWS. Built dashboards and models that turned raw, messy data into decisions teams could act on.",
  },
  {
    year: "The realization",
    title: "Insight wasn't enough",
    body: "The bottleneck was rarely the analysis — it was the manual work after it. So I learned to build the systems that act on the insight, not just surface it.",
  },
  {
    year: "Automation program",
    title: "A scrappy Notion site got me the job",
    body: "During an intensive automation program I built a simple — honestly, ugly — Notion portfolio. It worked because the systems behind it were real. Substance over polish.",
  },
  {
    year: "Now",
    title: "AI GTM Engineer",
    body: "Today I engineer go-to-market systems: sourcing, enrichment, AI personalization, deliverability, and reply handling — automation pointed squarely at revenue.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title={
          <>
            I build the systems that turn{" "}
            <span className="text-gradient">effort into output</span>.
          </>
        }
        intro="An AI GTM engineer who came up through data. I care about systems that are simple to use, reliable under load, and honest about where a human still belongs in the loop."
      />

      <section className="container-page grid gap-12 pb-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
          <Reveal>
            <p>
              My approach starts with the business need, not the tool. I figure
              out where time leaks — the copy-paste, the manual research, the
              report nobody has time to build — and design an automation that
              quietly removes it.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              I work across platforms like{" "}
              <span className="text-fg">n8n, Make, Apify, and Airtable</span>,
              wire in <span className="text-fg">APIs and LLMs</span>, and lean on{" "}
              <span className="text-fg">Supabase and Trigger.dev</span> when a
              system needs a real backend. The goal is always the same: turn
              complex, manual processes into seamless ones.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              I&apos;m comfortable across time zones, biased toward clear
              communication, and allergic to systems that only work in a demo.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[var(--radius)] border border-border bg-surface/40 p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">
              Toolkit
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-bg-elev px-3 py-1.5 font-mono text-xs text-fg-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-24 sm:py-32">
        <SectionHeading kicker="The path" title="How I got here" />
        <ol className="mt-14 space-y-10 border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.06} className="relative">
              <span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border border-border-strong bg-bg-elev">
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(var(--glow)/0.8)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {t.year}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">
                {t.title}
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-fg-muted">
                {t.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <Button href="/contact" size="lg">
            Work with me
          </Button>
        </Reveal>
      </section>
    </>
  );
}
