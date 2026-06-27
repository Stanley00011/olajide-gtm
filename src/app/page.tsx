import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Journey } from "@/components/sections/Journey";
import { TwinPillars } from "@/components/sections/TwinPillars";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <Journey />
      <TwinPillars />
      <WorkflowSection />
      <FeaturedWork />
      <CTA />
    </>
  );
}
