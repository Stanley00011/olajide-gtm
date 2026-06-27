/** Global site/profile config, single source of truth for identity + nav. */

/**
 * Canonical site URL. Resolves automatically:
 *  1. NEXT_PUBLIC_SITE_URL (set this in Vercel once you have a custom domain)
 *  2. Vercel's production URL (auto-set on Vercel, correct on the *.vercel.app deploy)
 *  3. local fallback
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://olajide-gtm.vercel.app");

export const site = {
  name: "Olajide Ajao",
  shortName: "Olajide",
  initials: "OA",
  role: "AI GTM Engineer",
  tagline: "I engineer AI systems that turn go-to-market motion into revenue.",
  // The one-sentence story spine the whole site is built around.
  spine:
    "Data taught me to see the patterns. Now I build the AI systems that act on them.",
  location: "Remote · Working worldwide",
  // Used for geo-discoverability signals (structured data / metadata), not as a
  // headline identity. Keeps the brand global while staying findable locally.
  country: "Nigeria",
  email: "stanleyajao123@gmail.com",
  url: SITE_URL,
  socials: {
    github: "https://github.com/Stanley00011",
    linkedin: "https://www.linkedin.com/in/olajide-ajao/",
    email: "mailto:stanleyajao123@gmail.com",
  },
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Automation", href: "/automation" },
  { label: "GTM", href: "/gtm" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Tools / platforms, used for the marquee + skills strip. */
export const stack: string[] = [
  "n8n",
  "Make.com",
  "Trigger.dev",
  "Supabase",
  "Apify",
  "Airtable",
  "OpenAI / LLMs",
  "Smartlead",
  "Python",
  "SQL",
  "Next.js",
  "Vector DBs",
];
