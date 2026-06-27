"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PipelineNode } from "./PipelineNode";
import type { FlowNode } from "./workflows";

const nodeTypes = { pipeline: PipelineNode };

/**
 * The n8n-style workflow canvas. Rendered client-only via WorkflowMount.
 * `interactive=false` (homepage) locks pan/zoom for an auto-playing teaser;
 * `true` (/automation) lets visitors explore.
 */
export default function WorkflowCanvas({
  nodes,
  edges,
  interactive = false,
}: {
  nodes: FlowNode[];
  edges: Edge[];
  interactive?: boolean;
}) {
  const types = useMemo(() => nodeTypes, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={types}
      fitView
      fitViewOptions={{ padding: 0.18 }}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={interactive}
      nodesConnectable={false}
      elementsSelectable={interactive}
      panOnDrag={interactive}
      zoomOnScroll={false}
      zoomOnPinch={interactive}
      panOnScroll={false}
      preventScrolling={false}
      minZoom={0.4}
      maxZoom={1.6}
      className="!bg-transparent"
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={26}
        size={1}
        color="var(--border)"
      />
    </ReactFlow>
  );
}
