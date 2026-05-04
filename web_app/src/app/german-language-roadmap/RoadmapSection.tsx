"use client";

import { RoadmapNode } from "./RoadmapData";

interface Props {
  level: string;
  title: string;
  nodes: RoadmapNode[];
  color: string;
  softBg: string;
  mutedColor: string;
  textColor: string;
}

export function RoadmapSection({
  level,
  title,
  nodes,
  color,
  softBg,
  mutedColor,
  textColor,
}: Props) {
  const milestones = nodes.filter((n) => n.type === "milestone");
  const contentNodes = nodes.filter((n) => n.type !== "milestone");
  const grammarCount = contentNodes.filter((n) => n.type === "grammar").length;
  const vocabCount = contentNodes.filter((n) => n.type === "vocabulary").length;
  const startMilestone = milestones[0];
  const endMilestone =
    milestones.length > 1 ? milestones[milestones.length - 1] : null;

  return (
    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden relative z-10 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-white relative z-20">
        <span
          className="text-[20px] font-bold tracking-tight leading-none"
          style={{ color }}
        >
          {level}
        </span>
        <span className="w-px h-6 bg-slate-200" />
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-slate-800 leading-none">
            {title}
          </p>
          <p className="text-[12px] text-slate-500 mt-1">
            {grammarCount} grammar · {vocabCount} vocabulary
          </p>
        </div>
        <span
          className="text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: softBg, color: textColor }}
        >
          {contentNodes.length} topics
        </span>
      </div>

      {/* Node rows */}
      <ol className="bg-white relative z-10">
        {contentNodes.map((node, i) => {
          const isGrammar = node.type === "grammar";
          return (
            <li
              key={node.id}
              className="grid items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-150 cursor-pointer bg-white"
              style={{ gridTemplateColumns: "32px 1fr auto" }}
            >
              <span className="text-[11px] text-slate-400 tabular-nums text-right pl-3 pr-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13.5px] font-medium text-slate-700 leading-snug py-2.5 px-2">
                {node.title}
              </span>
              <span
                className="text-[10px] font-bold pr-4 whitespace-nowrap uppercase tracking-wider"
                style={{ color: isGrammar ? color : mutedColor }}
              >
                {isGrammar ? "Grammar" : "Vocabulary"}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
