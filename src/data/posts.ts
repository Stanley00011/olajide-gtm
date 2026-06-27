/**
 * Writing index registry. Add an entry here when you add a new post at
 * src/app/writing/<slug>/page.mdx — newest first.
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
    slug: "what-is-an-ai-gtm-engineer",
    title: "What is an AI GTM Engineer?",
    description:
      "A plain-language definition of the AI GTM engineer role, what they build, and why go-to-market is becoming an engineering discipline.",
    date: "2026-06-27",
    readingMins: 5,
    tags: ["AI GTM", "Go-to-market", "Automation"],
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
