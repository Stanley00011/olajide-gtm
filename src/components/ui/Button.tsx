import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-accent text-accent-fg hover:shadow-[0_0_28px_-4px_rgb(var(--glow)/0.7)] hover:-translate-y-0.5",
  ghost:
    "border border-border text-fg hover:border-border-strong hover:bg-surface/60",
  subtle: "text-fg-muted hover:text-fg",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-8 text-base",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
