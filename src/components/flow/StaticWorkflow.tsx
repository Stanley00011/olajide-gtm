import {
  Webhook,
  Database,
  Bot,
  GitBranch,
  Send,
  Sparkles,
  ChevronDown,
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

const kindLabel: Record<PipelineNodeData["kind"], string> = {
  trigger: "Trigger",
  enrich: "Enrich",
  agent: "AI Agent",
  decision: "Decision",
  outbound: "Outbound",
  data: "Data",
};

/**
 * No-JS / reduced-motion / small-screen fallback for the workflow canvas.
 * A clean vertical flow of the same nodes — readable everywhere, no React
 * Flow, no WebGL, no animation.
 */
export function StaticWorkflow({ nodes }: { nodes: FlowNode[] }) {
  const ordered = nodes.slice(0, 8);
  return (
    <ul className="mx-auto flex max-w-sm flex-col gap-1 px-5 py-8">
      {ordered.map((n, i) => {
        const Icon = icons[n.data.kind];
        return (
          <li key={n.id} className="flex flex-col items-center">
            <div
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 ${
                n.data.accent
                  ? "border-[color-mix(in_oklab,var(--accent)_55%,transparent)] bg-surface"
                  : "border-border bg-surface/70"
              }`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border-strong bg-bg-elev text-accent">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-faint">
                  {kindLabel[n.data.kind]}
                </p>
                <p className="truncate text-sm font-medium text-fg">
                  {n.data.label}
                </p>
                {n.data.sublabel && (
                  <p className="truncate text-xs text-fg-muted">
                    {n.data.sublabel}
                  </p>
                )}
              </div>
            </div>
            {i < ordered.length - 1 && (
              <ChevronDown className="my-1 size-4 text-fg-faint" aria-hidden />
            )}
          </li>
        );
      })}
    </ul>
  );
}
