"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Signature 3D motif: a slowly rotating node-constellation — points (nodes)
 * connected by faint lines (edges) — echoing the automation-graph theme.
 * Client + WebGL only; mounted exclusively via HeroSceneMount after gating.
 */

const NODE_COUNT = 90;

function useGraph() {
  return useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // distribute on a wobbly sphere shell
      const r = 3.2 + Math.random() * 1.4;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      positions.set([x, y, z], i * 3);
      pts.push(new THREE.Vector3(x, y, z));
    }

    // connect each node to its nearest few neighbours -> edge line segments
    const linePos: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const dists = pts
        .map((p, j) => ({ j, d: pts[i].distanceTo(p) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      for (const { j } of dists) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
      }
    }
    return { positions, linePositions: new Float32Array(linePos) };
  }, []);
}

function Constellation({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const { positions, linePositions } = useGraph();

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <group ref={group}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.09}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroScene({ color = "#38e1ff" }: { color?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <Constellation color={color} />
      </Float>
    </Canvas>
  );
}
