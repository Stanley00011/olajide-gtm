import type { Metadata } from "next";
import { Crosshair, Sparkles, MailCheck, MessagesSquare } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { gtmProjects } from "@/data/projects";
import { WorkflowMount } from "@/components/flow/WorkflowMount";
import { gtmWorkflow } from "@/components/flow/workflows";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "GTM Engineering",
  description:
    "Go-to-market as engineered infrastructure: sourcing, enrichment, AI personalization, deliverability, and reply handling — instrumented end to end.",
  keywords: [
    "GTM engineering",
    "GTM engineer",
    "AI GTM engineer",
    "go-to-market engineering",
    "outbound automation",
    "AI lead generation",
    "outbound systems",
  ],
  alternates: { canonical: "/gtm" },
};

const process = [
  {
    step: "01",
    title: "Discovery",
    body: "We start with your goal, your buyer, and what's worked or flopped before. No system gets built until I understand the motion it's meant to drive.",
  },
  {
    step: "02",
    title: "Design the system",
    body: "I map the whole pipeline on paper first — sources, data, messaging, sending, replies — so you can see exactly what we're building and why before a line of it exists.",
  },
  {
    step: "03",
    title: "Build & wire it up",
    body: "Each piece is built and connected: enrichment, AI personalization, warmed inboxes, reply handling. You see it come together, not a black box at the end.",
  },
  {
    step: "04",
    title: "Launch carefully",
    body: "We start small and warm, watch deliverability and replies closely, and scale only once the signals are healthy. No spray-and-pray.",
  },
  {
    step: "05",
    title: "Optimize & compound",
    body: "Every reply teaches the system something. We read the numbers, fix the real bottleneck, and the engine gets sharper month over month.",
  },
];

const stages = [
  {
    icon: Crosshair,
    step: "01",
    title: "Target",
    body: "Translate the ICP into queryable criteria and surface accounts showing real buying intent — not a static, decaying list.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Enrich",
    body: "A cost-ordered waterfall finds and verifies contacts, then AI qualifies them against company and title-level criteria.",
  },
  {
    icon: MailCheck,
    step: "03",
    title: "Engage",
    body: "Per-lead personalization grounded in real signals, sent across a warmed multi-inbox pool with deliverability guardrails.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    title: "Convert",
    body: "An AI response layer triages replies and routes the qualified ones to a human fast — so momentum never stalls.",
  },
];

export default function GtmPage() {
  return (
    <>
      <PageHeader
        kicker="Discipline 02 — GTM Engineering"
        title={
          <>
            Go-to-market is a <span className="text-gradient">system</span>, not a
            headcount problem.
          </>
        }
        intro="I treat outbound as engineered infrastructure: sourcing, enrichment, AI personalization, deliverability, and reply handling — wired together and instrumented so pipeline compounds instead of leaking."
      />

      {/* Pipeline as funnel of stages */}
      <section className="container-page">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="h-full">
              <div className="relative flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-border-strong bg-bg-elev text-accent">
                    <s.icon className="size-5" />
                  </span>
                  <span className="font-display text-3xl font-bold text-border-strong">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The whole machine, visualized */}
      <section className="container-page pt-24 sm:pt-32">
        <SectionHeading
          kicker="The whole machine"
          title={
            <>
              One pipeline, from a name to a{" "}
              <span className="text-gradient">booked conversation</span>.
            </>
          }
          intro="This is the shape of an outbound engine. Every box is a step I build and connect — so nothing is left to a person remembering to do it."
        />
        <Reveal className="mt-12">
          <div className="relative h-[460px] overflow-hidden rounded-[var(--radius)] border border-border bg-surface/30">
            <WorkflowMount
              nodes={gtmWorkflow.nodes}
              edges={gtmWorkflow.edges}
              interactive
              className="size-full"
            />
            <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px] text-fg-faint">
              drag to explore the pipeline
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-24 sm:py-32">
        <SectionHeading
          kicker="Why engineer it"
          title={
            <>
              Quality enforced by <span className="text-gradient">graders</span>,
              not hope.
            </>
          }
          intro="When every stage is instrumented, you stop guessing. You see where leads drop, which copy converts, and which inboxes are healthy — and you fix the system, not the symptom."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { v: "End-to-end", l: "every stage observable" },
            { v: "1:1", l: "personalization at scale" },
            { v: "Closed-loop", l: "engagement re-prioritizes targeting" },
          ].map((m, i) => (
            <Reveal key={m.l} delay={i * 0.06}>
              <div className="rounded-[var(--radius)] border border-border bg-surface/40 p-8 text-center">
                <p className="font-display text-3xl font-bold text-gradient">
                  {m.v}
                </p>
                <p className="mt-2 text-sm text-fg-muted">{m.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How working together actually goes */}
      <section className="container-page py-12 sm:py-16">
        <SectionHeading
          kicker="How I work"
          title={
            <>
              You&apos;ll always know{" "}
              <span className="text-gradient">what we&apos;re building and why</span>.
            </>
          }
          intro="No black boxes, no jargon walls. Here's exactly how an engagement runs."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-6">
                <span className="font-display text-2xl font-bold text-gradient">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-page pb-8">
        <SectionHeading
          kicker="Systems"
          title="How I engineer GTM, in detail"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {gtmProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
