import { stack } from "@/data/site";

/** Infinite tool marquee - pure CSS, duplicated track for seamless loop. */
export function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <section
      aria-label="Tools and platforms"
      className="relative border-y border-border bg-bg-elev/60 py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex overflow-hidden">
        <ul className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12">
          {items.map((tool, i) => (
            <li
              key={`${tool}-${i}`}
              className="whitespace-nowrap font-display text-lg font-medium text-fg-faint transition-colors hover:text-fg"
            >
              {tool}
            </li>
          ))}
        </ul>
        <ul
          aria-hidden
          className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-12 pr-12"
        >
          {items.map((tool, i) => (
            <li
              key={`dup-${tool}-${i}`}
              className="whitespace-nowrap font-display text-lg font-medium text-fg-faint"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
