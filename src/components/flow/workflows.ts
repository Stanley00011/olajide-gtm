import type { Edge, Node } from "@xyflow/react";
import type { PipelineNodeData } from "./PipelineNode";

export type FlowNode = Node<PipelineNodeData>;

function edge(source: string, target: string, accent = false): Edge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    type: "smoothstep",
    animated: true,
    style: {
      stroke: accent ? "var(--accent)" : "var(--border-strong)",
      strokeWidth: accent ? 2 : 1.5,
    },
  };
}

/** Compact pipeline shown on the homepage. */
export const homeWorkflow: { nodes: FlowNode[]; edges: Edge[] } = {
  nodes: [
    { id: "t", type: "pipeline", position: { x: 0, y: 120 }, data: { kind: "trigger", label: "New lead / event", sublabel: "Webhook · schedule" } },
    { id: "e", type: "pipeline", position: { x: 230, y: 120 }, data: { kind: "enrich", label: "Enrich + verify", sublabel: "Company · email" } },
    { id: "a", type: "pipeline", position: { x: 460, y: 120 }, data: { kind: "agent", label: "AI personalize", sublabel: "Grounded in signals", accent: true } },
    { id: "d", type: "pipeline", position: { x: 690, y: 120 }, data: { kind: "decision", label: "Qualified?", sublabel: "Rules + grader" } },
    { id: "o", type: "pipeline", position: { x: 920, y: 40 }, data: { kind: "outbound", label: "Sequence send", sublabel: "Warmed inboxes" } },
    { id: "s", type: "pipeline", position: { x: 920, y: 200 }, data: { kind: "data", label: "Store + review", sublabel: "Supabase" } },
  ],
  edges: [
    edge("t", "e"),
    edge("e", "a", true),
    edge("a", "d", true),
    edge("d", "o", true),
    edge("d", "s"),
  ],
};

/** The outbound GTM pipeline shown on the /gtm page. */
export const gtmWorkflow: { nodes: FlowNode[]; edges: Edge[] } = {
  nodes: [
    { id: "icp", type: "pipeline", position: { x: 0, y: 160 }, data: { kind: "trigger", label: "Define ICP", sublabel: "Who to reach" } },
    { id: "src", type: "pipeline", position: { x: 230, y: 60 }, data: { kind: "enrich", label: "Source accounts", sublabel: "Search · scrape" } },
    { id: "sig", type: "pipeline", position: { x: 230, y: 260 }, data: { kind: "trigger", label: "Intent signals", sublabel: "Ads · hiring · tech" } },
    { id: "enr", type: "pipeline", position: { x: 470, y: 160 }, data: { kind: "enrich", label: "Enrich + verify", sublabel: "Real, valid emails", accent: true } },
    { id: "ai", type: "pipeline", position: { x: 710, y: 160 }, data: { kind: "agent", label: "AI personalize", sublabel: "One-to-one, at scale", accent: true } },
    { id: "snd", type: "pipeline", position: { x: 950, y: 60 }, data: { kind: "outbound", label: "Send", sublabel: "Warmed inboxes" } },
    { id: "rep", type: "pipeline", position: { x: 950, y: 260 }, data: { kind: "decision", label: "Reply triage", sublabel: "AI sorts intent" } },
    { id: "crm", type: "pipeline", position: { x: 1190, y: 160 }, data: { kind: "data", label: "Handoff + CRM", sublabel: "Hot leads to humans" } },
  ],
  edges: [
    edge("icp", "src"),
    edge("icp", "sig"),
    edge("src", "enr", true),
    edge("sig", "enr"),
    edge("enr", "ai", true),
    edge("ai", "snd", true),
    edge("snd", "rep"),
    edge("rep", "crm", true),
  ],
};

/** Larger, explorable pipeline shown on the /automation page. */
export const automationWorkflow: { nodes: FlowNode[]; edges: Edge[] } = {
  nodes: [
    { id: "src", type: "pipeline", position: { x: 0, y: 160 }, data: { kind: "trigger", label: "Source / inbox", sublabel: "Apify · webhook" } },
    { id: "ext", type: "pipeline", position: { x: 230, y: 60 }, data: { kind: "enrich", label: "Extract data", sublabel: "Scrape · OCR" } },
    { id: "enr", type: "pipeline", position: { x: 230, y: 260 }, data: { kind: "enrich", label: "Enrich + verify", sublabel: "APIs · validation" } },
    { id: "llm", type: "pipeline", position: { x: 480, y: 160 }, data: { kind: "agent", label: "LLM reasoning", sublabel: "Draft · classify", accent: true } },
    { id: "gate", type: "pipeline", position: { x: 720, y: 160 }, data: { kind: "decision", label: "Human gate", sublabel: "Review · approve" } },
    { id: "act", type: "pipeline", position: { x: 960, y: 60 }, data: { kind: "outbound", label: "Publish / send", sublabel: "Multi-channel" } },
    { id: "log", type: "pipeline", position: { x: 960, y: 260 }, data: { kind: "data", label: "Log + dashboard", sublabel: "Auditable" } },
  ],
  edges: [
    edge("src", "ext"),
    edge("src", "enr"),
    edge("ext", "llm", true),
    edge("enr", "llm", true),
    edge("llm", "gate", true),
    edge("gate", "act", true),
    edge("gate", "log"),
  ],
};
