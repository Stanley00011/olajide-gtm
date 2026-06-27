import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Pre-empts the real objections a prospect has before reaching out. */
const faqs = [
  {
    q: "What exactly do you build?",
    a: "End-to-end AI automation and go-to-market systems: sourcing and enriching leads, personalizing outreach, sending from inboxes that land, handling replies, and the internal automations that remove repetitive work. Whatever process is eating your team's time, I turn it into a system.",
  },
  {
    q: "How do we start, and what do you need from me?",
    a: "A short call about the process you want to automate or the motion you want to engineer. From there I map the whole system on paper so you can see exactly what we're building and why, before anything gets built.",
  },
  {
    q: "How long until it's actually running?",
    a: "Most systems go from design to live in a few weeks, not months. We start small, prove it works on real data, then scale once the signals are healthy.",
  },
  {
    q: "Will cold outreach hurt my main domain?",
    a: "No. Outreach runs on dedicated sending domains with proper authentication and warm-up, kept separate from your primary domain. Your company email's reputation stays protected.",
  },
  {
    q: "Do I stay in control of what goes out?",
    a: "Always. There's a human approval gate wherever judgement matters; the automation removes the grind, not your control. Every run is logged and auditable.",
  },
  {
    q: "What if I don't have a clean list yet?",
    a: "That's step one of the build. Sourcing, enrichment, and verification are part of the system, so you don't need a list to begin, just a clear picture of who you want to reach.",
  },
];

export function FAQ() {
  return (
    <section className="container-page py-24 sm:py-32">
      <SectionHeading
        kicker="Before you ask"
        title="Questions, answered up front"
        intro="The things people usually want to know before starting. If yours isn't here, just ask."
      />

      <div className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left">
                <span className="font-display text-lg font-medium text-fg">
                  {f.q}
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-fg-muted transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-fg-muted">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
