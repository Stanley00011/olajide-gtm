"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Discipline } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

const filters: { label: string; value: Discipline | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Automation", value: "automation" },
  { label: "GTM", value: "gtm" },
];

export function WorkGrid() {
  const [active, setActive] = useState<Discipline | "all">("all");
  const shown =
    active === "all" ? projects : projects.filter((p) => p.discipline === active);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm transition-colors",
              active === f.value
                ? "border-transparent text-accent-fg"
                : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
            )}
          >
            {active === f.value && (
              <motion.span
                layoutId="work-filter"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard project={p} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
