import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { isCaseStudy, projectKindLabel } from "@/data/projects";
import { cn } from "@/lib/utils";

const disciplineLabel: Record<Project["discipline"], string> = {
  automation: "Automation",
  gtm: "GTM",
};

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface/40 p-7 transition-all duration-500 hover:border-border-strong hover:bg-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          {disciplineLabel[project.discipline]}
        </span>
        <span className="rounded-full border border-border bg-bg-elev px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
          {projectKindLabel(project)}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-fg sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        {project.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-bg-elev px-2.5 py-1 font-mono text-[11px] text-fg-muted"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1.5 pt-7 text-sm font-medium text-fg-muted transition-colors group-hover:text-accent">
        {project.demoUrl ? (
          <>
            <Play className="size-3.5" /> Watch the demo
          </>
        ) : isCaseStudy(project) ? (
          "Read the case study"
        ) : (
          "Explore the build"
        )}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
