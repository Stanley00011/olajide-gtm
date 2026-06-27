import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const socialLinks = [
  { label: "GitHub", href: site.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "Email", href: site.socials.email, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-bg-elev">
      <div className="container-page py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {site.role}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
              Let&apos;s build the system that compounds your pipeline.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-2.5">
              <span className="mb-1 text-xs uppercase tracking-wider text-fg-faint">
                Explore
              </span>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <span className="mb-1 text-xs uppercase tracking-wider text-fg-faint">
                Connect
              </span>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <p className="font-mono">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
