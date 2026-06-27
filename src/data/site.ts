/** Global site/profile config — single source of truth for identity + nav. */

export const site = {
  name: "Olajide Ajao",
  shortName: "Olajide",
  initials: "OA",
  role: "AI GTM Engineer",
  tagline: "I engineer AI systems that turn go-to-market motion into revenue.",
  // The one-sentence story spine the whole site is built around.
  spine:
    "Data taught me to see the patterns. Now I build the AI systems that act on them.",
  location: "Remote · Worldwide",
  email: "stanleyajao123@gmail.com",
  url: "https://olajide.dev",
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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Tools / platforms — used for the marquee + skills strip. */
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
