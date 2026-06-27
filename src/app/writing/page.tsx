import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { posts, formatDate } from "@/data/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on AI GTM engineering, AI automation, and building go-to-market systems that compound.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        kicker="Writing"
        title={
          <>
            Notes on building{" "}
            <span className="text-gradient">GTM systems</span>.
          </>
        }
        intro="How I think about AI automation and go-to-market engineering, in plain language."
      />

      <section className="container-page pb-8">
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <Link
                href={`/writing/${p.slug}`}
                className="group flex flex-col gap-3 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div className="max-w-2xl">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-2xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-bg-elev px-2.5 py-0.5 font-mono text-[11px] text-fg-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-fg-faint">
                  <span>{formatDate(p.date)}</span>
                  <span>·</span>
                  <span>{p.readingMins} min</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
