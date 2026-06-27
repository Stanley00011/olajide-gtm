"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Webhook,
  Database,
  Bot,
  GitBranch,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type PipelineNodeData = {
  label: string;
  sublabel?: string;
  kind: "trigger" | "enrich" | "agent" | "decision" | "outbound" | "data";
  accent?: boolean;
};

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

/** A single glassy, glowing node in the workflow canvas — styled like n8n. */
export function PipelineNode({ data }: NodeProps & { data: PipelineNodeData }) {
  const Icon = icons[data.kind];
  return (
    <div
      className={`group relative flex w-[176px] items-center gap-3 rounded-xl border px-3.5 py-3 backdrop-blur transition-colors ${
        data.accent
          ? "border-[color-mix(in_oklab,var(--accent)_55%,transparent)] bg-surface"
          : "border-border bg-surface/80"
      }`}
      style={
        data.accent
          ? { boxShadow: "0 0 24px -6px rgb(var(--glow)/0.5)" }
          : undefined
      }
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-0 !bg-[var(--border-strong)]"
      />
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg border"
        style={{
          borderColor: "var(--border-strong)",
          background: "var(--bg-elev)",
          color: "var(--accent)",
        }}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fg-faint">
          {kindLabel[data.kind]}
        </p>
        <p className="truncate text-[13px] font-medium text-fg">{data.label}</p>
        {data.sublabel && (
          <p className="truncate text-[11px] text-fg-muted">{data.sublabel}</p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-0 !bg-[var(--accent)]"
      />
    </div>
  );
}
