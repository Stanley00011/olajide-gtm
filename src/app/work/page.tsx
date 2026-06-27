import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGrid } from "./WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected AI automation and GTM engineering systems, with the problem, the build, and the outcome for each.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        kicker="Selected work"
        title={
          <>
            Systems that did the{" "}
            <span className="text-gradient">heavy lifting</span>.
          </>
        }
        intro="A selection of automation and GTM systems. Each one started as manual, repetitive work, and ended as infrastructure."
      />
      <section className="container-page pb-8">
        <WorkGrid />
      </section>
    </>
  );
}
