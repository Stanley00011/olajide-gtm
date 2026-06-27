/**
 * Writing index registry. Add an entry here when you add a new post at
 * src/app/writing/<slug>/page.mdx - newest first.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingMins: number;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "anatomy-of-an-ai-outbound-engine",
    title: "The Anatomy of an AI Outbound Engine",
    description:
      "A stage-by-stage breakdown of the system that turns a description of your buyer into booked conversations, and where AI actually fits.",
    date: "2026-06-27",
    readingMins: 6,
    tags: ["Outbound", "GTM systems", "AI"],
  },
  {
    slug: "what-is-an-ai-gtm-engineer",
    title: "What is an AI GTM Engineer?",
    description:
      "A plain-language definition of the AI GTM engineer role, what they build, and why go-to-market is becoming an engineering discipline.",
    date: "2026-06-24",
    readingMins: 5,
    tags: ["AI GTM", "Go-to-market", "Automation"],
  },
  {
    slug: "how-to-land-in-the-inbox",
    title: "How to Actually Land in the Inbox",
    description:
      "Deliverability, explained plainly: why great cold emails still die in spam, and the setup that keeps you in the inbox.",
    date: "2026-06-19",
    readingMins: 6,
    tags: ["Deliverability", "Outbound", "Email"],
  },
  {
    slug: "n8n-vs-make-for-gtm",
    title: "n8n vs Make for GTM Automation",
    description:
      "A practical take on choosing your automation backbone for go-to-market work, and when each one is the right call.",
    date: "2026-06-13",
    readingMins: 7,
    tags: ["Automation", "n8n", "Tooling"],
  },
];

export function formatDate(iso: string) {
  // Stable formatting (avoid locale/hydration drift)
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
