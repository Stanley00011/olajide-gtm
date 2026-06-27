import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation about automation and GTM systems.",
};

const channels = [
  { label: "Email", value: site.email, href: site.socials.email, icon: Mail },
  {
    label: "LinkedIn",
    value: "in/olajide-ajao",
    href: site.socials.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "Stanley00011",
    href: site.socials.github,
    icon: GithubIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Let&apos;s build the system that{" "}
            <span className="text-gradient">compounds your pipeline</span>.
          </>
        }
        intro="Tell me where the manual work lives, or what go-to-market motion you want to engineer. I read every message."
      />

      <section className="container-page grid gap-12 pb-16 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[var(--radius)] border border-border bg-surface/40 p-6 transition-colors hover:border-border-strong hover:bg-surface"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl border border-border-strong bg-bg-elev text-accent">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-fg">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="size-5 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
