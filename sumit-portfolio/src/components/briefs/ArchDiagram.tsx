"use client";

import { useEffect, useRef } from "react";
import type { DiagramEdge, DiagramNode } from "@/content/systems";

/**
 * Self-drawing architecture diagram.
 * Edges draw themselves (pathLength trick — no runtime measuring),
 * nodes fade in staggered, all triggered once at 35% visibility:
 * the architecture is explained as it appears. Pure SVG + CSS —
 * zero animation-library cost.
 */
export function ArchDiagram({
  viewBox,
  nodes,
  edges,
  title,
}: {
  viewBox: [number, number];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  title: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Anchor an edge to the facing sides of its two nodes.
  const anchor = (a: DiagramNode, b: DiagramNode, offset: number) => {
    const acx = a.x + a.w / 2;
    const acy = a.y + a.h / 2;
    const bcx = b.x + b.w / 2;
    const bcy = b.y + b.h / 2;
    const dx = bcx - acx;
    const dy = bcy - acy;
    if (Math.abs(dx) >= Math.abs(dy)) {
      return {
        x1: dx > 0 ? a.x + a.w : a.x,
        y1: acy + offset,
        x2: dx > 0 ? b.x : b.x + b.w,
        y2: bcy + offset,
      };
    }
    return {
      x1: acx + offset,
      y1: dy > 0 ? a.y + a.h : a.y,
      x2: bcx + offset,
      y2: dy > 0 ? b.y : b.y + b.h,
    };
  };

  // Parallel edges between the same pair get a small offset each.
  const pairCount: Record<string, number> = {};

  return (
    <svg
      ref={ref}
      className="arch h-auto w-full"
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      role="img"
      aria-label={`Architecture diagram: ${title}`}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0.5 L7.5,4 L0,7.5" fill="none" stroke="var(--text-low)" strokeWidth="1" />
        </marker>
      </defs>

      {edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const key = [e.from, e.to].sort().join("|");
        const n = (pairCount[key] = (pairCount[key] ?? 0) + 1);
        const { x1, y1, x2, y2 } = anchor(a, b, n > 1 ? (n - 1) * 14 : 0);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        return (
          <g key={i}>
            {/* dashed edges fade in (dasharray is taken by the dash pattern);
                solid edges draw themselves via the pathLength trick */}
            <path
              className={e.dashed ? "arch-node" : "arch-edge"}
              d={`M ${x1} ${y1} L ${x2} ${y2}`}
              pathLength={e.dashed ? undefined : 1}
              fill="none"
              stroke="var(--text-low)"
              strokeWidth="1"
              strokeDasharray={e.dashed ? "3 5" : undefined}
              markerEnd="url(#arrow)"
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            />
            {e.label && (
              <text
                className="arch-node"
                x={mx}
                y={my - 7}
                textAnchor="middle"
                fill="var(--text-low)"
                fontFamily="var(--font-mono)"
                fontSize="10.5"
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {nodes.map((n, i) => (
        <g
          key={n.id}
          className="arch-node"
          style={{ transitionDelay: `${i * 90}ms` }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx="6"
            fill="var(--bg-1)"
            stroke={n.accent ? "var(--accent)" : "var(--line)"}
            strokeWidth="1"
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + (n.sub ? n.h / 2 - 4 : n.h / 2 + 4)}
            textAnchor="middle"
            fill="var(--text-hi)"
            fontFamily="var(--font-body)"
            fontSize="14"
            fontWeight="600"
          >
            {n.label}
          </text>
          {n.sub && (
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 15}
              textAnchor="middle"
              fill="var(--text-low)"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
            >
              {n.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
