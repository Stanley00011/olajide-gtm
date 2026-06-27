import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { posts, formatDate } from "@/data/posts";
import Content from "./content.mdx";

const post = posts.find((p) => p.slug === "what-is-an-ai-gtm-engineer")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/writing/${post.slug}` },
  openGraph: { title: post.title, description: post.description, type: "article" },
};

export default function Post() {
  return (
    <>
      <article>
        <header className="relative overflow-hidden pt-40 pb-10">
          <Aurora />
          <div className="container-page relative max-w-3xl">
            <Reveal>
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <ArrowLeft className="size-4" /> All writing
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                <span>{formatDate(post.date)}</span>
                <span className="text-fg-faint">·</span>
                <span className="text-fg-faint">{post.readingMins} min read</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>
          </div>
        </header>

        <div className="container-page max-w-3xl pb-8 text-lg">
          <Content />
        </div>
      </article>

      <CTA />
    </>
  );
}
