import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWork() {
  return (
    <section className="container-page py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          kicker="Selected work"
          title={
            <>
              Systems that did the <span className="text-gradient">heavy lifting</span>.
            </>
          }
        />
        <Reveal>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            All work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06} className="h-full">
            <ProjectCard project={p} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
