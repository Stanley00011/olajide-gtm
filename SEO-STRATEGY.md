# Getting found for "AI GTM Engineer" & "AI automation"

Two goals: (1) rank in Google search, and (2) get named by LLMs (ChatGPT, Claude, Perplexity, Google AI) when someone asks "who's a good AI GTM engineer / AI automation engineer."

These overlap a lot. LLMs are trained on, and cite, the same open web Google ranks — plus a few corpora Google doesn't weight as heavily (Reddit, GitHub, Hacker News, YouTube transcripts). Win the web and you win both.

---

## What's already built into the site (done)

- **JSON-LD structured data** (`Person`, `WebSite`, `ProfessionalService`) so machines parse exactly who you are, your job title, what you know, and your links. → `src/components/seo/JsonLd.tsx`
- **`llms.txt`** at the site root — a clean, declarative summary LLM crawlers increasingly read. → `public/llms.txt`
- **Target phrases in real headings/body** — "AI GTM Engineer", "AI Automation & Integration", "GTM Engineering" appear in H1/H2s, not just meta tags.
- **Per-page titles, descriptions, keywords, canonical URLs**; `sitemap.xml`; `robots.txt`; OG image; fast static pages.

The site is now a strong *destination*. The rest is about becoming a recognized *entity* and earning *mentions*.

---

## The strategy, in priority order

### 1. Lock your entity (highest leverage, lowest effort)
LLMs and Google build a profile of "Olajide Ajao" by seeing the **same facts repeated consistently** across the web. Make every profile say the same thing:

- Headline everywhere: **"AI GTM Engineer | AI Automation & Integration"**
- Same name spelling, same one-line bio, same links (this site, GitHub, LinkedIn).
- Update: **LinkedIn** headline + About, **GitHub** bio + profile README, **X/Twitter** bio, any Upwork/contra/directory profiles.
- Put the portfolio URL in all of them. Cross-linking the same entity is the signal.

### 2. Publish writing on the exact topics (the engine)
You can't rank or get cited for "GTM engineering" without *content about GTM engineering*. Add a `/writing` (blog) section and publish concept pieces, not just project pages:

- "What is an AI GTM engineer?" (definitional posts get cited by LLMs constantly)
- "How we build an outbound engine that lands in the inbox"
- "n8n vs Make for AI automation: when to use which"
- Teardowns of real workflows (you already have the material).

Aim for 1–2 solid posts/month. Each should *define terms plainly* — LLMs lift clear, declarative explanations.

### 3. Be present where the training data is
LLMs heavily ingest these. Genuine, helpful presence here pays off in LLM answers:

- **GitHub** — pin your best repos, write keyword-rich READMEs (this is huge; GitHub is crawled deeply).
- **Reddit** — r/automation, r/n8n, r/sales, r/SaaS: answer questions for real, mention your approach when relevant.
- **Hacker News, Indie Hackers, dev.to / Medium** — republish your posts.
- **YouTube** — even short Loom-style walkthroughs; transcripts get indexed.

### 4. Earn mentions & backlinks (moves Google rankings)
- Guest posts on automation/GTM blogs and newsletters.
- Get listed in relevant directories ("AI automation experts", n8n community, etc.).
- Podcasts / interviews — a single good one creates lasting citations.
- Client testimonials with links back to the site.

### 5. Win your own name first, then the category
- Make sure searching **"Olajide Ajao"** returns this site #1 (entity step above handles most of it).
- Then chip at **"AI GTM engineer"**, **"AI automation engineer"** via content + mentions. These are competitive; expect months, not days.

---

## Setup checklist (do once)
- [ ] Pick + connect a real domain (replace `olajide.dev` placeholder in `src/data/site.ts`).
- [ ] Add the site to **Google Search Console** + submit `sitemap.xml`.
- [ ] (Optional) **Bing Webmaster Tools** — Bing's index feeds ChatGPT search.
- [ ] Add a Plausible/GA analytics tag (optional).

## Measure it
- Search Console: impressions/clicks for "GTM", "AI automation" queries over time.
- Monthly, ask ChatGPT / Claude / Perplexity: *"Who are good AI GTM engineers / AI automation freelancers?"* and *"Who is Olajide Ajao?"* — track whether you appear and what it says. That's your LLM-visibility scoreboard.

> Reality check: on-site SEO (done) is necessary but not sufficient. Rankings and LLM citations come from **consistent entity + steady content + real mentions** over months. The site is the foundation; steps 1–4 are the compounding work.
