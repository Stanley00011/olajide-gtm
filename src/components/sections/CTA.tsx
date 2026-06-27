import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora } from "@/components/ui/Aurora";

export function CTA() {
  return (
    <section className="container-page py-24 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[calc(var(--radius)+8px)] border border-border bg-bg-elev px-8 py-16 text-center sm:px-16 sm:py-24">
          <Aurora />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {site.role}
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
              Have a process that should run itself?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fg-muted sm:text-lg">
              Tell me where the manual work lives. I&apos;ll show you the system
              that removes it — and the pipeline it unlocks.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/contact" size="lg">
                Start a conversation <ArrowUpRight className="size-4" />
              </Button>
              <Button href={site.socials.github} variant="ghost" size="lg">
                See the code
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
