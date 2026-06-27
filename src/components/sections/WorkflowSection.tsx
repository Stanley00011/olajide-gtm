import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WorkflowMount } from "@/components/flow/WorkflowMount";
import { homeWorkflow } from "@/components/flow/workflows";

export function WorkflowSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-elev/50 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          kicker="How the work looks"
          title={
            <>
              Not slides. <span className="text-gradient">Running systems.</span>
            </>
          }
          intro="Every engagement becomes a pipeline like this — triggered, enriched, reasoned over by AI, gated by a human, and observable end to end."
        />
      </div>

      <Reveal className="mt-12">
        <div className="container-page">
          <div className="relative h-[420px] overflow-hidden rounded-[var(--radius)] border border-border bg-surface/30">
            <WorkflowMount
              nodes={homeWorkflow.nodes}
              edges={homeWorkflow.edges}
              className="size-full"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
