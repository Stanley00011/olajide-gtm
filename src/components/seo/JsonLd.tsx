import { site } from "@/data/site";

/**
 * Structured data so search engines AND LLMs can parse exactly who Olajide is,
 * what he does, and how to reach him. Three graphs: Person, WebSite, and the
 * service he offers — all keyed to the phrases people actually search.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        alternateName: "Olajide",
        url: site.url,
        email: site.email,
        jobTitle: "AI GTM Engineer",
        description: site.tagline,
        knowsAbout: [
          "AI GTM Engineering",
          "GTM Engineer",
          "GTM engineering",
          "Go-to-market engineering",
          "AI automation",
          "AI automation engineer",
          "Workflow automation",
          "n8n",
          "Make.com",
          "LLM automation",
          "Lead generation automation",
          "Outbound systems",
          "Data analytics",
        ],
        sameAs: [site.socials.github, site.socials.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.tagline,
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ProfessionalService",
        name: `${site.name} — AI GTM & Automation Engineering`,
        url: site.url,
        provider: { "@id": `${site.url}/#person` },
        areaServed: "Worldwide",
        serviceType: [
          "AI automation & integration",
          "GTM engineering",
          "Outbound systems",
          "AI lead generation",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
