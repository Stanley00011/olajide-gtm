"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Edge } from "@xyflow/react";
import type { FlowNode } from "./workflows";
import { StaticWorkflow } from "./StaticWorkflow";

const WorkflowCanvas = dynamic(() => import("./WorkflowCanvas"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-surface/30" />,
});

/**
 * Mounts the interactive React Flow canvas only when it scrolls into view and
 * motion is allowed; otherwise shows the static fallback. Keeps the heavy
 * React Flow chunk off the initial bundle.
 */
export function WorkflowMount({
  nodes,
  edges,
  interactive = false,
  className,
}: {
  nodes: FlowNode[];
  edges: Edge[];
  interactive?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // The interactive canvas crams on phones; show the static flow there instead.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useStatic = reduced || narrow;

  return (
    <div ref={ref} className={className}>
      {useStatic ? (
        <div className="size-full overflow-y-auto">
          <StaticWorkflow nodes={nodes} />
        </div>
      ) : inView ? (
        <WorkflowCanvas nodes={nodes} edges={edges} interactive={interactive} />
      ) : (
        <div className="size-full" />
      )}
    </div>
  );
}
