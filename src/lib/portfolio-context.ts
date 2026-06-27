import { projects } from "@/data/projects";
import { site, stack } from "@/data/site";

/**
 * The entire portfolio as a compact knowledge doc. Small enough to stuff into a
 * system prompt, so the chat is grounded with zero vector-DB/embeddings cost.
 */
export function buildPortfolioContext(): string {
  const proj = projects
    .map(
      (p) =>
        `### ${p.title} [${p.discipline.toUpperCase()}] · /work/${p.slug}\n` +
        `Tagline: ${p.tagline}\n` +
        `What it is: ${p.overview}\n` +
        `Problem: ${p.problem}\n` +
        `Outcome: ${p.outcome}\n` +
        `Stack: ${p.stack.join(", ")}` +
        (p.demoUrl ? `\nHas a demo video.` : "") +
        (p.docUrl ? `\nHas a written breakdown.` : ""),
    )
    .join("\n\n");

  return `# Olajide Ajao
${site.name} is an ${site.role}. ${site.tagline}
Guiding idea: ${site.spine}
Background: came up through data analytics (SQL, Python, Power BI, Tableau, AWS) and grew into AI automation and go-to-market (GTM) engineering.
Location: ${site.location}.
Contact: email ${site.email}; GitHub ${site.socials.github}; LinkedIn ${site.socials.linkedin}; or the /contact page.
Tools he works with: ${stack.join(", ")}.

# Two disciplines
1. AI Automation & Integration (page: /automation): end-to-end automations using n8n, Make, and LLMs that connect tools, orchestrate processes, and remove repetitive, judgement-light work, always with a human approval gate where it matters.
2. GTM Engineering (page: /gtm): go-to-market built as engineered infrastructure: targeting, enrichment, AI personalization, deliverability, and reply handling, instrumented end to end.

# Projects & case studies (page: /work)
${proj}

# How an engagement works
Discovery → design the whole system on paper → build and wire it up → launch carefully (start small and warm, then scale once signals are healthy) → optimize and compound. No black boxes; the client always sees what is being built and why.

# Availability
Open to work and new projects. Best next step: the /contact page or email ${site.email}.`;
}

export const SUGGESTED_QUESTIONS = [
  "What does Olajide actually build?",
  "Show me a GTM system he's built",
  "How does working with him work?",
  "Is he available, and how do I reach him?",
];
