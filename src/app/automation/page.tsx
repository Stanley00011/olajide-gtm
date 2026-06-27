import type { Metadata } from "next";
import {
  Workflow,
  Bot,
  Plug,
  Database,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { WorkflowMount } from "@/components/flow/WorkflowMount";
import { automationWorkflow } from "@/components/flow/workflows";
import { automationProjects } from "@/data/projects";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "AI Automation & Integration",
  description:
    "End-to-end AI automations that connect tools, orchestrate processes, and remove repetitive work — reliable, scalable, and cost-conscious.",
  keywords: [
    "AI automation",
    "AI automation engineer",
    "workflow automation",
    "n8n developer",
    "Make.com automation",
    "LLM automation",
    "AI integration",
  ],
  alternates: { canonical: "/automation" },
};

const capabilities = [
  {
    icon: Workflow,
    title: "Workflow orchestration",
    body: "Multi-step automations in n8n and Make that connect your stack and run unattended — with retries, error handling, and observability built in.",
  },
  {
    icon: Bot,
    title: "LLM & agent pipelines",
    body: "AI that drafts, classifies, extracts, and decides — grounded in your data, with a human gate wherever judgement matters.",
  },
  {
    icon: Plug,
    title: "API & tool integration",
    body: "Glue between systems that don't talk: CRMs, sheets, inboxes, scrapers, and SaaS APIs stitched into one coherent flow.",
  },
  {
    icon: Database,
    title: "Data layer",
    body: "Structured storage and review surfaces — Supabase, Airtable, sheets — so every run is logged, auditable, and human-reviewable.",
  },
  {
    icon: ShieldCheck,
    title: "Human-in-the-loop",
    body: "Approval gates and audit trails by default. Automation removes the grind without removing your control.",
  },
  {
    icon: Gauge,
    title: "Cost-conscious by design",
    body: "Right-sized models, caching, and batching so the system stays cheap to run as it scales.",
  },
];

export default function AutomationPage() {
  return (
    <>
      <PageHeader
        kicker="Discipline 01 — AI Automation & Integration"
        title={
          <>
            Turn manual, repetitive work into{" "}
            <span className="text-gradient">systems that run themselves</span>.
          </>
        }
        intro="I design practical, end-to-end automations that connect tools, orchestrate processes, and use AI for the judgement-light work — built to be efficient, scalable, and reliable."
      />

      {/* Interactive canvas centerpiece */}
      <section className="container-page">
        <Reveal>
          <div className="relative h-[460px] overflow-hidden rounded-[var(--radius)] border border-border bg-surface/30">
            <WorkflowMount
              nodes={automationWorkflow.nodes}
              edges={automationWorkflow.edges}
              interactive
              className="size-full"
            />
            <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px] text-fg-faint">
              drag to explore · a representative pipeline shape
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-24 sm:py-32">
        <SectionHeading
          kicker="What I build"
          title="The building blocks"
          intro="Every automation is assembled from these — composed to fit the exact shape of your process."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface/40 p-7">
                <span className="grid size-11 place-items-center rounded-xl border border-border-strong bg-bg-elev text-accent">
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-8">
        <SectionHeading kicker="Proof" title="Automations in the wild" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {automationProjects.map((p, i) => (
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
