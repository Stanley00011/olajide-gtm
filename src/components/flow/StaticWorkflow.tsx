import {
  Webhook,
  Database,
  Bot,
  GitBranch,
  Send,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { FlowNode } from "./workflows";
import type { PipelineNodeData } from "./PipelineNode";

const icons: Record<PipelineNodeData["kind"], LucideIcon> = {
  trigger: Webhook,
  enrich: Sparkles,
  agent: Bot,
  decision: GitBranch,
  outbound: Send,
  data: Database,
};

/**
 * No-JS / reduced-motion / low-end fallback for the workflow canvas.
 * Renders the same nodes as an accessible, static horizontal flow — no
 * React Flow, no WebGL, no animation.
 */
export function StaticWorkflow({ nodes }: { nodes: FlowNode[] }) {
  // de-dupe to a clean linear narrative for the static view
  const ordered = nodes.slice(0, 6);
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 p-6">
      {ordered.map((n, i) => {
        const Icon = icons[n.data.kind];
        return (
          <li key={n.id} className="flex items-center gap-3">
            <div className="flex w-[150px] items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border-strong bg-bg-elev text-accent">
                <Icon className="size-4" />
              </span>
              <span className="truncate text-[13px] font-medium text-fg">
                {n.data.label}
              </span>
            </div>
            {i < ordered.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-fg-faint" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
