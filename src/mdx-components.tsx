import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Mermaid } from "@/components/mdx/Mermaid";
import { Callout } from "@/components/mdx/Callout";

/** Styles for MDX content (the /writing posts) - matches the site's design. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components usable in any post without an import:
    Mermaid,
    Callout,
    h1: (props) => (
      <h1
        className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-12 font-display text-2xl font-semibold tracking-tight text-fg"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 font-display text-xl font-semibold tracking-tight text-fg"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 leading-relaxed text-fg-muted" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-fg-muted" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-fg-muted" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-6 border-l-2 border-accent pl-5 text-fg-muted italic"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-accent"
        {...props}
      />
    ),
    a: ({ href = "#", ...props }) => (
      <Link
        href={href}
        className="text-accent underline underline-offset-4 hover:opacity-80"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    ...components,
  };
}
