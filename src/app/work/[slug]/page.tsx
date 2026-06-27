import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Play, FileText } from "lucide-react";
import { projects, getProject, projectKindLabel } from "@/data/projects";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <article>
        <header className="relative overflow-hidden pt-40 pb-14">
          <Aurora />
          <div className="container-page relative">
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <ArrowLeft className="size-4" /> All work
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                <span>{project.discipline === "gtm" ? "GTM" : "Automation"}</span>
                <span className="text-fg-faint">·</span>
                <span className="text-fg-faint">{project.year}</span>
                {project.client && (
                  <>
                    <span className="text-fg-faint">·</span>
                    <span className="text-fg-faint">{project.client}</span>
                  </>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg text-fg-muted">
                {project.tagline}
              </p>
            </Reveal>
          </div>
        </header>

        <div className="container-page grid gap-16 pb-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-14">
            <Section title="In plain terms">
              <p className="text-xl leading-relaxed text-fg">
                {project.overview}
              </p>
            </Section>

            {project.demoUrl && (
              <Reveal>
                <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-bg-elev">
                  <div className="aspect-video">
                    <iframe
                      src={toLoomEmbed(project.demoUrl)}
                      title={`${project.title} — demo`}
                      allowFullScreen
                      loading="lazy"
                      className="size-full"
                    />
                  </div>
                </div>
              </Reveal>
            )}

            <Section title="The problem">
              <p className="text-lg leading-relaxed text-fg-muted">
                {project.problem}
              </p>
            </Section>

            <Section title="How it works">
              <ol className="relative space-y-6 border-l border-border pl-6">
                {project.approach.map((step, i) => (
                  <Reveal as="li" key={i} delay={i * 0.05} className="relative">
                    <span className="absolute -left-[31px] grid size-6 place-items-center rounded-full border border-border-strong bg-bg-elev font-mono text-[10px] text-accent">
                      {i + 1}
                    </span>
                    <p className="font-display font-semibold text-fg">
                      {step.title}
                    </p>
                    <p className="mt-1 leading-relaxed text-fg-muted">
                      {step.detail}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </Section>

            <Section title="The outcome">
              <p className="text-lg leading-relaxed text-fg-muted">
                {project.outcome}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-[var(--radius)] border border-border bg-surface/40 p-6"
                  >
                    <p className="font-display text-3xl font-bold text-gradient">
                      {m.value}
                    </p>
                    <p className="mt-1.5 text-sm text-fg-muted">{m.label}</p>
                  </div>
                ))}
              </div>
              {project.metricsNote && (
                <p className="mt-4 font-mono text-xs text-fg-faint">
                  {project.metricsNote}
                </p>
              )}
            </Section>
          </div>

          {/* sticky meta rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius)] border border-border bg-surface/40 p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
                Stack
              </h3>
              <ul className="mt-4 space-y-2.5">
                {project.stack.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-fg">
                    <Check className="size-4 shrink-0 text-accent" />
                    {s}
                  </li>
                ))}
              </ul>
              {(project.demoUrl || project.docUrl) && (
                <div className="mt-6 space-y-2 border-t border-border pt-6">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-bg-elev px-4 py-3 text-sm text-fg transition-colors hover:border-border-strong hover:text-accent"
                    >
                      <Play className="size-4 shrink-0 text-accent" /> Watch the demo
                    </a>
                  )}
                  {project.docUrl && (
                    <a
                      href={project.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-bg-elev px-4 py-3 text-sm text-fg transition-colors hover:border-border-strong hover:text-accent"
                    >
                      <FileText className="size-4 shrink-0 text-accent" /> Full
                      write-up
                    </a>
                  )}
                </div>
              )}

              <div className="mt-6 border-t border-border pt-6">
                <Button href="/contact" className="w-full">
                  Build something like this
                </Button>
              </div>
            </div>
          </aside>
        </div>

        <div className="container-page">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-[var(--radius)] border border-border bg-surface/40 p-7 transition-colors hover:border-border-strong hover:bg-surface"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
                Next {projectKindLabel(next).toLowerCase()}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-fg">
                {next.title}
              </p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </div>
      </article>

      <CTA />
    </>
  );
}

/** Convert a Loom share URL to its embeddable form. */
function toLoomEmbed(url: string) {
  return url.replace("loom.com/share/", "loom.com/embed/");
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Reveal>
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
          {title}
        </h2>
      </Reveal>
      <div className="mt-5">{children}</div>
    </section>
  );
}
