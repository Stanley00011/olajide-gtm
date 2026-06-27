# Olajide Ajao — Portfolio

A modern, futuristic portfolio for an **AI GTM Engineer** — telling the story of an evolution from data analytics into AI automation and go-to-market engineering.

Dark-first with a light toggle, a boot-sequence intro, a 3D node-constellation hero, and an animated **n8n-style workflow canvas** as the signature motif.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** — CSS-variable design tokens, dark/light via `next-themes`
- **motion** (Framer Motion) — reveals, transitions, micro-interactions
- **Lenis** — smooth scroll
- **React Three Fiber + drei** — the 3D hero (lazy, capability-gated, with fallback)
- **@xyflow/react** (React Flow) — the n8n-style workflow canvas (lazy, with static fallback)

Heavy libraries (3D, React Flow) are dynamically imported and gated behind
viewport + device-capability + `prefers-reduced-motion` checks, so they never
load on devices or for users that don't want them.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Structure

```
src/
  app/                 # routes: / /automation /gtm /work /work/[slug] /about /contact
  components/
    layout/            # Nav, Footer, ThemeToggle, SmoothScroll, ThemeProvider
    sections/          # Hero, Journey, TwinPillars, WorkflowSection, FeaturedWork, CTA
    three/             # HeroScene (R3F) + gated mount
    flow/              # WorkflowCanvas (React Flow), nodes, static fallback
    ui/                # Button, Reveal, SectionHeading, ProjectCard, Aurora, …
    intro/             # IntroLoader
  data/                # site config + case-study content
  hooks/               # useMounted, useDeviceTier
```

## Content

- **Automation case studies** are sourced from Olajide's automation portfolio.
- **GTM case studies** are representative; metrics flagged in-app are illustrative
  pending real client figures (see `metricsNote` in `src/data/projects.ts`).

## Deploy

Built for **Vercel** — `git push` to a connected repo for preview/production deploys.

---

Built from scratch.
