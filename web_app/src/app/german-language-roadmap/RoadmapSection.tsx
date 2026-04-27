"use client";

import React from "react";
import { RoadmapNode } from "./RoadmapData";

interface Props {
  level: string;
  title: string;
  nodes: RoadmapNode[];
  color: string;
}

export function RoadmapSection({ level, title, nodes, color }: Props) {
  // Separate milestones from content nodes
  const contentNodes = nodes.filter((n) => n.type !== "milestone");

  return (
    <section className="h-dvh flex flex-col items-center justify-center px-4 md:px-6 border-t border-slate-100 dark:border-[#222]">
      <div className="w-full max-w-xl">
        {/* Level header */}
        <div className="flex items-baseline gap-3 mb-6">
          <span
            className="text-5xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ color }}
          >
            {level}
          </span>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-[#ddd] leading-tight">
              {title}
            </h2>
            <p className="text-xs text-slate-400 dark:text-[#666] font-medium mt-0.5">
              {contentNodes.length} topics
            </p>
          </div>
        </div>

        {/* Index list */}
        <ol className="space-y-0">
          {contentNodes.map((node, i) => {
            const isGrammar = node.type === "grammar";

            return (
              <li key={node.id} className="group">
                <div className="flex items-baseline gap-3 py-2 px-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-default">
                  {/* Number */}
                  <span className="text-[11px] font-bold text-slate-300 dark:text-[#444] tabular-nums w-5 text-right shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Type indicator dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px]"
                    style={{
                      backgroundColor: isGrammar ? color : `${color}60`,
                    }}
                  />

                  {/* Title */}
                  <span className="text-sm md:text-[15px] font-medium text-slate-700 dark:text-[#ccc] leading-snug flex-1">
                    {node.title}
                  </span>

                  {/* Type label */}
                  <span
                    className="text-[9px] font-bold tracking-wider uppercase shrink-0"
                    style={{ color: isGrammar ? color : "#94a3b8" }}
                  >
                    {isGrammar ? "GR" : "VO"}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
