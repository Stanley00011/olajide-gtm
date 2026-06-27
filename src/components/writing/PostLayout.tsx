import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { posts, formatDate } from "@/data/posts";

/** Metadata for a post page, pulled from the registry. */
export function postMeta(slug: string): Metadata {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

/** Shared frame for a writing post: header + prose container + CTA. */
export function PostLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

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

        <div className="container-page max-w-3xl pb-8 text-lg">{children}</div>
      </article>

      <CTA />
    </>
  );
}
