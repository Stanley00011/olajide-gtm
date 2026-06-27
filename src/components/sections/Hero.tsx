"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { HeroSceneMount } from "@/components/three/HeroSceneMount";

const words = site.tagline.split(" ");

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <Aurora />
      {/* 3D layer sits behind the copy; gated + lazy inside the mount */}
      <HeroSceneMount />

      <div className="container-page relative z-10">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted backdrop-blur"
        >
          {site.role}
        </motion.p>

        <h1 className="mt-7 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          <span className="block overflow-hidden">
            <motion.span
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block text-fg"
            >
              I&apos;m {site.shortName}.
            </motion.span>
          </span>
          <span className="mt-1 block">
            <span className="text-gradient">{flow(words, reduced)}</span>
          </span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted"
        >
          {site.spine}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button href="/automation" size="lg">
            See the systems <ArrowUpRight className="size-4" />
          </Button>
          <Button href="/work" variant="ghost" size="lg">
            Selected work
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
          <ArrowDown className="size-3.5 animate-bounce" />
          Scroll to follow the signal
        </span>
      </motion.div>
    </section>
  );
}

/** Render the tagline word-by-word with a subtle stagger. */
function flow(parts: string[], reduced: boolean | null) {
  return parts.map((w, i) => (
    <motion.span
      key={`${w}-${i}`}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
      className="inline-block"
    >
      {w}&nbsp;
    </motion.span>
  ));
}
