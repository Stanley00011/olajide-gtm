import { BarChart3, Database, Workflow, Bot } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const arc = [
  {
    phase: "Where I started",
    icon: BarChart3,
    title: "Data Analyst",
    body: "SQL, Python, and dashboards. I learned to find the signal in the noise, and turn messy data into decisions people could act on.",
    tags: ["SQL", "Python", "Power BI · Tableau"],
  },
  {
    phase: "The shift",
    icon: Database,
    title: "Automation Engineer",
    body: "Insight isn't enough if a human still has to act on it by hand. I started building the connective tissue: APIs, pipelines, and end-to-end automations that let AI do the repetitive work.",
    tags: ["n8n · Make", "LLMs", "Integration"],
  },
  {
    phase: "Where I am now",
    icon: Bot,
    title: "AI GTM Engineer",
    body: "I point those systems at revenue: sourcing, enrichment, personalization, and reply handling, with go-to-market built as engineered infrastructure instead of manual effort.",
    tags: ["Outbound", "Enrichment", "AI agents"],
  },
  {
    phase: "Where it's going",
    icon: Workflow,
    title: "Self-running pipeline",
    body: "Toward systems that don't just assist the team but run the whole motion, learning from every reply and re-aiming themselves, so growth compounds without more headcount.",
    tags: ["Agents", "Closed-loop", "Compounding"],
  },
];

export function Journey() {
  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading
        kicker="The trajectory"
        title={
          <>
            From reading the data to{" "}
            <span className="text-gradient">building what acts on it</span>.
          </>
        }
        intro="The same instinct, scaled up: see the pattern, then engineer the system that responds to it automatically."
      />

      <div className="relative mt-16">
        {/* connecting spine */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block" />
        <ol className="grid gap-8 lg:grid-cols-4">
          {arc.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08} className="relative">
              <div className="relative z-10 mb-6 inline-grid size-14 place-items-center rounded-2xl border border-border-strong bg-bg-elev text-accent shadow-[0_0_24px_-8px_rgb(var(--glow)/0.6)]">
                <step.icon className="size-6" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {step.phase}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {step.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-surface/40 px-2.5 py-0.5 font-mono text-[11px] text-fg-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
