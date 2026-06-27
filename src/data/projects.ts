/**
 * Case studies.
 *
 * `automation` projects are sourced from Olajide's real automation portfolio
 * (descriptions, stacks, demo videos and write-ups pulled from his Notion).
 * `gtm` projects are detailed, representative case studies of the kind of
 * go-to-market systems he engineers, metrics flagged with `metricsNote` are
 * illustrative pending real client figures.
 */

export type Discipline = "automation" | "gtm";

export type Metric = { value: string; label: string };

/** An approach step: a short title and the plain-language reason it matters. */
export type Step = { title: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  discipline: Discipline;
  tagline: string;
  year: string;
  client?: string;
  featured?: boolean;
  /** One-paragraph, plain-language "what this actually is". */
  overview: string;
  /** The business pain that justified building the system. */
  problem: string;
  /** Ordered build steps, also drives the case-study flow diagram. */
  approach: Step[];
  /** The result narrative. */
  outcome: string;
  metrics: Metric[];
  metricsNote?: string;
  stack: string[];
  /** Optional Loom share URL, rendered as an embedded demo. */
  demoUrl?: string;
  /** Optional public write-up / doc. */
  docUrl?: string;
};

export const projects: Project[] = [
  // ---------------------------------------------------------------- AUTOMATION
  {
    slug: "ai-content-pipeline",
    title: "AI Content Pipeline",
    discipline: "automation",
    tagline: "One idea in. SEO-ready posts on every platform out.",
    year: "2025",
    featured: true,
    overview:
      "An automated content engine. A manager drops in a raw idea or a link through a simple web form; the system writes three SEO-optimized drafts, reshapes the chosen one for LinkedIn, X, and an email newsletter, generates matching images, and publishes or schedules everything, logging every step so nothing happens in the dark.",
    problem:
      "The content team did everything by hand: research, drafting, reformatting for each platform, then publishing. It was slow, the voice drifted between posts, and it simply couldn't keep up, so things shipped late, or wrong, or twice.",
    approach: [
      {
        title: "Capture the idea",
        detail:
          "A manager submits a raw idea or a URL through a clean web interface, no logins to five tools, no copy-paste.",
      },
      {
        title: "Draft three angles with AI",
        detail:
          "OpenAI generates three SEO-optimized drafts so the manager picks a direction instead of staring at a blank page.",
      },
      {
        title: "Reshape per platform",
        detail:
          "The chosen draft is rewritten for each channel, PAS copywriting for LinkedIn, a tight 280 characters for X, a 250–600 word newsletter.",
      },
      {
        title: "Generate the visuals",
        detail:
          "DALL·E creates matching images and files them in Google Drive, so every post ships with art, not a placeholder.",
      },
      {
        title: "Publish, schedule, and log",
        detail:
          "Posts go out or get scheduled automatically, with every action recorded in Airtable and instant alerts if anything fails.",
      },
    ],
    outcome:
      "What used to eat hours now takes under five minutes of a manager's attention. The system became the content team's quiet third member, consistent, on-brand, and impossible to forget a step.",
    metrics: [
      { value: "<5 min", label: "of manager input per post" },
      { value: "100%", label: "of posts met SEO requirements" },
      { value: "0", label: "duplicate posts or sends" },
    ],
    stack: [
      "n8n",
      "OpenAI (GPT-4o-mini)",
      "DALL·E",
      "Airtable",
      "Google Drive",
      "Firebase",
      "Apps Script",
    ],
    demoUrl: "https://www.loom.com/share/90039b43411a4fdb88c7ea7d9e4bbf18",
    docUrl:
      "https://docs.google.com/document/d/1KQUPQ6dKc0wo5ZBowxfGAX3_2UrgOxwkKGXE8zcBOS0/edit?usp=sharing",
  },
  {
    slug: "ai-proposal-generation",
    title: "AI Proposal Generation & Delivery",
    discipline: "automation",
    tagline: "Discovery-call notes become a sent, on-brand proposal.",
    year: "2025",
    featured: true,
    overview:
      "A human-in-the-loop proposal machine. Sales drops their discovery notes into a form; AI drafts the proposal; a manager reviews and approves; the system turns it into a branded PDF, shares it with the client, and files everything, all without anyone formatting a document by hand.",
    problem:
      "Writing proposals after a call took hours, and every rep did it slightly differently. The lag let deals go cold, and inconsistent formatting made a sharp team look unsure of itself.",
    approach: [
      {
        title: "Capture and validate",
        detail:
          "Discovery notes come in through a Google Form; Apps Script kicks off the workflow and checks for valid sales emails and unique IDs so nothing gets duplicated.",
      },
      {
        title: "Draft with a quality gate",
        detail:
          "GPT-4o-mini writes the proposal, and a code-based check flags anything incomplete before a human ever sees it.",
      },
      {
        title: "Keep a human in the loop",
        detail:
          "Managers get an automated email with links to review and approve in Google Docs and Airtable, control stays with the team.",
      },
      {
        title: "Finalize and deliver",
        detail:
          "Approved proposals are converted to PDF, share permissions are set automatically, the client receives it, and it's logged for a full audit trail.",
      },
    ],
    outcome:
      "Proposals that took hours now take minutes, and every one follows the official template and brand voice. Deals keep their momentum, and there's a clean record of who approved what.",
    metrics: [
      { value: "Hours → min", label: "to a finished proposal" },
      { value: "100%", label: "on-template, on-brand" },
      { value: "Full", label: "audit trail of approvals" },
    ],
    stack: [
      "n8n",
      "Apps Script",
      "GPT-4o-mini",
      "Airtable",
      "Google Docs",
      "Google Drive",
    ],
    demoUrl: "https://www.loom.com/share/90039b43411a4fdb88c7ea7d9e4bbf18",
    docUrl:
      "https://docs.google.com/document/d/1QFVCSLpQ7OP9iN_8tfKyLJMKBlT9j8tyXJLTLFpmaro/edit?usp=sharing",
  },
  {
    slug: "ai-lead-generation-outreach",
    title: "AI Lead Generation & Outreach Engine",
    discipline: "automation",
    tagline: "A description of your buyer becomes a queue of ready-to-send outreach.",
    year: "2025",
    featured: true,
    overview:
      "Give the system a description of who you want to reach, and it finds matching companies and people, fills in the details that make a message land, checks that the emails are real, and writes personalized cold emails and LinkedIn notes for each one, all stacked neatly in Airtable for a human to approve before anything sends.",
    problem:
      "Finding leads was entirely manual: define the persona, research companies one by one, hunt for emails, then write every message from scratch. It didn't scale, and the quality quietly dropped as the person doing it got tired.",
    approach: [
      {
        title: "Define the target",
        detail:
          "The ideal-customer profile is captured as structured input, so the search looks for the right people instead of anyone.",
      },
      {
        title: "Find the accounts and contacts",
        detail:
          "Scraping and search surface matching companies and the decision-makers inside them.",
      },
      {
        title: "Enrich and verify",
        detail:
          "Company and contact details are filled in and every email is validated, so the list isn't full of dead addresses.",
      },
      {
        title: "Personalize at scale",
        detail:
          "AI writes a tailored cold-email sequence and LinkedIn message for each lead, one-to-one quality, done in bulk.",
      },
      {
        title: "Hand off for review",
        detail:
          "Everything lands in Airtable so a human approves what ships, speed without losing control of the message.",
      },
    ],
    outcome:
      "Days of manual research collapse into a single automated run that produces validated, personalized, ready-to-review outreach, with a person still deciding what actually goes out.",
    metrics: [
      { value: "90%+", label: "less manual research time" },
      { value: "100%", label: "of emails validated pre-send" },
      { value: "1:1", label: "personalization, at volume" },
    ],
    metricsNote: "Representative impact; exact figures vary by ICP and volume.",
    stack: ["n8n", "Apify", "OpenAI", "Email validation", "Airtable"],
  },
  {
    slug: "ai-reporting-dashboard",
    title: "AI Reporting & Dashboard Automation",
    discipline: "automation",
    tagline: "Three departments of scattered data, one live executive view.",
    year: "2025",
    overview:
      "A reporting system that pulls numbers from Sales, Project Delivery, and People Ops, reconciles them, calculates the KPIs the same way every time, and assembles a single executive dashboard that's always current, no more morning spent stitching spreadsheets together.",
    problem:
      "Cross-department reporting meant hours of gathering data from different tools by hand. By the time the report existed it was often wrong, and always a little out of date.",
    approach: [
      {
        title: "Pull from every source",
        detail:
          "Data is collected automatically from Sales, Project Delivery, and People Ops instead of being chased down.",
      },
      {
        title: "Reconcile the records",
        detail:
          "Numbers are normalized across systems so the same thing means the same thing everywhere.",
      },
      {
        title: "Calculate KPIs consistently",
        detail:
          "Validation rules compute the metrics identically each run, removing the human math errors.",
      },
      {
        title: "Assemble and refresh",
        detail:
          "Everything rolls up into one executive view that updates on a schedule, so the numbers are never stale.",
      },
    ],
    outcome:
      "A reliable dashboard that unifies three departments and delivers an accurate executive view in under a minute, replacing hours of fragile manual assembly.",
    metrics: [
      { value: "<60s", label: "to a full executive view" },
      { value: "3", label: "departments unified" },
      { value: "Live", label: "always-current metrics" },
    ],
    metricsNote: "Representative impact based on the implemented workflow.",
    stack: ["n8n", "Google Sheets / DB", "APIs", "Dashboarding"],
  },
  {
    slug: "ai-invoice-inbox",
    title: "AI Invoice Inbox Automation",
    discipline: "automation",
    client: "Novus Realty",
    tagline: "Invoices land in the inbox and quietly file themselves.",
    year: "2025",
    overview:
      "An automation that watches the invoice inbox, reads each incoming invoice, pulls out the details, logs them accurately, and flags anything odd for a human, so the admin team stops doing data entry and the books stay clean and auditable.",
    problem:
      "Novus Realty's admin team logged dozens of invoices a week into a spreadsheet by hand. It was slow, easy to get wrong, and it kept capable people busy with work no one should be doing.",
    approach: [
      {
        title: "Watch the inbox",
        detail:
          "New invoices trigger the workflow the moment they arrive, nothing waits in a pile.",
      },
      {
        title: "Read each invoice",
        detail:
          "Vendor, amount, and date are extracted from every document automatically.",
      },
      {
        title: "Log and validate",
        detail:
          "Entries are written to the ledger with checks, so what's recorded is what was sent.",
      },
      {
        title: "Flag the exceptions",
        detail:
          "Anything unusual is surfaced for human review instead of failing silently, accuracy without blind trust.",
      },
    ],
    outcome:
      "Invoice logging runs itself with a complete, auditable record, freeing the admin team for higher-value work while exceptions still get human eyes.",
    metrics: [
      { value: "Dozens/wk", label: "invoices auto-logged" },
      { value: "0", label: "manual data entry" },
      { value: "Full", label: "audit trail kept" },
    ],
    metricsNote: "Representative impact for the Novus Realty deployment.",
    stack: ["n8n", "OCR / Document AI", "Google Sheets", "Email"],
  },

  // ----------------------------------------------------------------------- GTM
  {
    slug: "gtm-outbound-engine",
    title: "The Outbound Engine",
    discipline: "gtm",
    tagline: "Turn a description of your buyer into booked conversations.",
    year: "2026",
    featured: true,
    overview:
      "Most companies do outbound by hiring people to send more emails. I build the machine instead: a system that knows who to reach, writes to each person like a human who did their homework, sends from inboxes that actually reach the inbox, and makes sure no reply ever gets missed. Your team stops doing busywork and starts talking to interested buyers.",
    problem:
      "Cold outreach has a quiet failure mode, it can look busy while achieving nothing. Lists go stale the week you buy them. Generic 'Hi {firstName}' emails get deleted on sight. Sending too fast from cold inboxes lands you in spam, where no one ever sees you. And the few people who do reply slip through the cracks because everyone's heads-down sending the next batch. More effort doesn't fix any of this. Better plumbing does.",
    approach: [
      {
        title: "Start with who, not how many",
        detail:
          "I translate your ideal customer into something the system can actually go find, so we reach the right 500 people, not a random 50,000.",
      },
      {
        title: "Build a list that's actually real",
        detail:
          "Contacts are enriched and every email is verified before it's used, so you're not burning your reputation on addresses that bounce.",
      },
      {
        title: "Let AI do the homework",
        detail:
          "Each message is personalized from real, specific signals about that person and company, the kind of line that makes someone think 'this wasn't a blast'.",
      },
      {
        title: "Send like a human, not a cannon",
        detail:
          "Emails go out across a pool of warmed inboxes at a natural pace, with deliverability guardrails, so you land in the inbox instead of the spam folder.",
      },
      {
        title: "Catch every reply",
        detail:
          "An AI layer reads incoming replies, sorts the interested from the not, and routes the good ones to a human fast, momentum never leaks.",
      },
      {
        title: "Watch it like a system",
        detail:
          "Every stage is measured, so when something dips we fix the actual cause instead of guessing, the engine gets sharper over time.",
      },
    ],
    outcome:
      "Instead of a team grinding through spreadsheets, you get a pipeline you can see end to end, where quality is enforced by the system, not by whoever's having a good day. The people on your side spend their time on real conversations, and the machine handles everything before and after them.",
    metrics: [
      { value: "Right 500", label: "not a random 50,000" },
      { value: "Inbox", label: "not the spam folder" },
      { value: "0", label: "replies left on the floor" },
    ],
    metricsNote:
      "Illustrative of how the system is built; per-client results shared on request.",
    stack: [
      "Supabase",
      "Trigger.dev",
      "Smartlead",
      "OpenAI",
      "Enrichment APIs",
      "n8n",
    ],
  },
  {
    slug: "gtm-signal-targeting",
    title: "Signal-Based Targeting",
    discipline: "gtm",
    tagline: "Reach people the week they actually start looking.",
    year: "2026",
    featured: true,
    overview:
      "Timing is the part of outreach nobody talks about. The same email that gets ignored in March gets a reply in June, because in June the company just started hiring for the problem you solve. This system watches for those moments across the market and reaches out while the window is open, with a message that names the exact reason you're writing.",
    problem:
      "Blasting one big list treats a company that's urgently shopping the same as one that couldn't care less. But the buying moment is real and it's short: a company starts running ads, posts a telling job, or adopts a tool that signals intent, and then the moment passes. Those signals are scattered across the internet and they go stale in days. Miss the window and you're just noise; catch it and you're the right message at the right time.",
    approach: [
      {
        title: "Watch for the moment",
        detail:
          "The system tracks real buying signals, companies running ads, hiring for a role, or adopting a technology that means they're in-market now.",
      },
      {
        title: "Connect the signal to a person",
        detail:
          "Each signal is traced to the company and the specific decision-maker who owns the problem, not a generic info@ inbox.",
      },
      {
        title: "Verify before you reach out",
        detail:
          "Contacts behind each live signal are enriched and checked, so the outreach is accurate the moment it matters.",
      },
      {
        title: "Reference the real reason",
        detail:
          "The message names the actual trigger, 'saw you're hiring for X', which is why it reads as relevant instead of random.",
      },
      {
        title: "Learn and re-aim",
        detail:
          "What gets engagement feeds back in to prioritize the next wave, so the targeting sharpens itself.",
      },
    ],
    outcome:
      "Outreach that arrives when a company is actually looking, about the thing they're actually dealing with. You don't need a bigger list, you need to reach a smaller one at the right moment, and that's what moves reply rates.",
    metrics: [
      { value: "In-market", label: "timing, not spray-and-pray" },
      { value: "The reason", label: "named in every message" },
      { value: "Self-tuning", label: "targeting that learns" },
    ],
    metricsNote: "Illustrative of the targeting architecture.",
    stack: ["Ad-intel APIs", "Tech detection", "Supabase", "OpenAI", "Smartlead"],
  },
  {
    slug: "gtm-enrichment-waterfall",
    title: "ICP & Enrichment Waterfall",
    discipline: "gtm",
    tagline: "Turn a vague 'our ideal customer' into a verified, qualified list.",
    year: "2026",
    overview:
      "Every outbound campaign lives or dies on the list. This is the system that turns a fuzzy description of your buyer into a clean, verified, qualified list of real people, pulling from multiple sources, filling the gaps each one leaves, and checking every email before it ever gets used.",
    problem:
      "Bought lists are full of dead ends: wrong titles, missing emails, people who left two years ago. Send to that and you torch your sender reputation and waste the campaign before the copy even matters. No single data source is complete either, so relying on one leaves most of your real buyers invisible.",
    approach: [
      {
        title: "Pin down who actually qualifies",
        detail:
          "The ideal-customer profile is turned into concrete, checkable rules, industry, size, role, signals, so 'good fit' stops being a vibe.",
      },
      {
        title: "Pull from several sources",
        detail:
          "Multiple databases and scrapers are combined, because the contact one tool misses, another has.",
      },
      {
        title: "Fill the gaps with a waterfall",
        detail:
          "Each missing email is attempted through providers in cost order, cheap first, premium only when needed, so coverage goes up and spend stays sane.",
      },
      {
        title: "Verify before it counts",
        detail:
          "Every email is validated and risky 'catch-all' addresses are flagged, so the list that ships is the list that lands.",
      },
      {
        title: "Qualify with AI",
        detail:
          "An AI pass checks each company and contact against the criteria, cutting the obvious mismatches a human would waste hours on.",
      },
    ],
    outcome:
      "A list you can actually trust, more real buyers found, dead addresses removed before they cost you, and a clear paper trail of why each person made the cut.",
    metrics: [
      { value: "Multi-source", label: "coverage, not one database" },
      { value: "Cost-ordered", label: "enrichment, no wasted spend" },
      { value: "Verified", label: "before a single send" },
    ],
    metricsNote: "Illustrative of the enrichment architecture.",
    stack: ["Apollo / AI Ark", "Enrichment APIs", "Email verification", "OpenAI", "Supabase"],
  },
  {
    slug: "gtm-deliverability",
    title: "Deliverability Engine",
    discipline: "gtm",
    tagline: "The unglamorous work that decides whether anyone sees your email.",
    year: "2026",
    overview:
      "The best email in the world earns nothing from the spam folder. This is the infrastructure that keeps you in the inbox: dedicated sending domains, mailboxes warmed up properly, sane sending limits, rotation across many inboxes, and health checks that catch trouble before it spreads.",
    problem:
      "Most outbound quietly dies in spam. Send too much too fast from a cold domain and inbox providers flag you, after that, even your warmest leads never see a thing, and you have no idea why your 'great campaign' got silence. Deliverability is invisible until it's the only thing that matters.",
    approach: [
      {
        title: "Separate your reputation from the main domain",
        detail:
          "Outreach goes out on dedicated domains, so a misstep never puts your primary company email at risk.",
      },
      {
        title: "Authenticate everything",
        detail:
          "SPF, DKIM, and DMARC are set up correctly so inbox providers trust that the mail is really from you.",
      },
      {
        title: "Warm up before you scale",
        detail:
          "New mailboxes build a sending reputation gradually instead of blasting on day one and getting flagged.",
      },
      {
        title: "Spread the load and pace it",
        detail:
          "Volume is split across a pool of inboxes at a human pace, so no single mailbox looks like a spammer.",
      },
      {
        title: "Watch the health, fix early",
        detail:
          "Bounce rates, spam placement, and mailbox health are monitored continuously, so problems get caught and rotated out before they sink the whole campaign.",
      },
    ],
    outcome:
      "Your messages reach the inbox, consistently, so the rest of the system actually has a chance to work. It's the foundation everything else quietly depends on.",
    metrics: [
      { value: "Inbox", label: "placement, not spam" },
      { value: "Many", label: "inboxes, warmed + rotated" },
      { value: "Monitored", label: "health, caught early" },
    ],
    metricsNote: "Illustrative of the deliverability setup.",
    stack: ["Sending domains", "SPF/DKIM/DMARC", "Mailbox warmup", "Smartlead", "Monitoring"],
  },
  {
    slug: "gtm-reply-triage",
    title: "AI Reply Triage & Routing",
    discipline: "gtm",
    tagline: "Every reply read, sorted, and routed in seconds, not days.",
    year: "2026",
    overview:
      "Getting replies is the goal, and the moment most teams drop the ball. This system reads every incoming reply, works out what the person actually means, and routes the hot ones to a human immediately, with a suggested response ready to go. Nothing interested ever sits unread.",
    problem:
      "When outreach works, replies arrive faster than anyone can keep up. Interested buyers get buried under out-of-offices and 'not interested' notes, and by the time someone reads them, the moment has passed. The cost of a slow reply isn't a lost email, it's a lost deal.",
    approach: [
      {
        title: "Read every reply automatically",
        detail:
          "Incoming responses are captured the second they land, across every inbox in the pool.",
      },
      {
        title: "Understand the intent",
        detail:
          "AI classifies each reply, interested, question, objection, referral, not now, unsubscribe, instead of treating them all the same.",
      },
      {
        title: "Route by urgency",
        detail:
          "Hot replies are pushed to a human immediately; the rest are handled or queued, so attention goes where it earns the most.",
      },
      {
        title: "Draft the response",
        detail:
          "A suggested, on-context reply is prepared so the human edits and sends in seconds rather than starting cold.",
      },
      {
        title: "Keep the record clean",
        detail:
          "Every conversation and its status is logged, so nothing slips and the team always knows what's live.",
      },
    ],
    outcome:
      "Interested people get a fast, human reply while they're still paying attention. The team spends its time in real conversations, and the system makes sure none of them ever go cold from neglect.",
    metrics: [
      { value: "Seconds", label: "to triage, not days" },
      { value: "Sorted", label: "by real intent" },
      { value: "0", label: "hot leads left waiting" },
    ],
    metricsNote: "Illustrative of the reply-handling architecture.",
    stack: ["OpenAI", "Smartlead", "Trigger.dev", "Supabase", "Slack / CRM"],
  },
];

/**
 * A "case study" is real, delivered work with proof (a demo, a write-up, or a
 * named client). Everything else is a representative build / system design.
 */
export function isCaseStudy(p: Project) {
  return Boolean(p.demoUrl || p.docUrl || p.client);
}

export function projectKindLabel(p: Project) {
  return isCaseStudy(p) ? "Case study" : "Build";
}

export const featuredProjects = projects.filter((p) => p.featured);
export const automationProjects = projects.filter(
  (p) => p.discipline === "automation",
);
export const gtmProjects = projects.filter((p) => p.discipline === "gtm");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
