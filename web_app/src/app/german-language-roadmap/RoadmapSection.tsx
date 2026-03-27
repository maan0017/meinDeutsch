"use client";

import React, { useEffect, useRef, useState } from "react";
import { RoadmapNode } from "./RoadmapData";
import { BookOpen, MessageCircle, Flag } from "lucide-react";

interface Props {
  level: string;
  title: string;
  nodes: RoadmapNode[];
  color: string;
  accent: string;
}

const getDeskCoords = (i: number, total: number) => {
  const cols = 5;
  const rows = Math.ceil(total / cols);
  const r = Math.floor(i / cols);
  const c = i % cols;
  const marginX = 12;
  const marginY = 46; // Big space for title + back button at top
  const stepX = (100 - 2 * marginX) / (cols - 1);
  const stepY = rows > 1 ? (100 - marginY - 8) / (rows - 1) : 0;
  const x = r % 2 === 1 ? 100 - marginX - c * stepX : marginX + c * stepX;
  const y = marginY + r * stepY;
  return { x, y: r % 2 !== 0 && i === total - 1 ? y - 1 : y }; // minor adjustment for aesthetics
};

const getMobCoords = (i: number, total: number) => {
  const cols = 3;
  const rows = Math.ceil(total / cols);
  const r = Math.floor(i / cols);
  const c = i % cols;
  const marginX = 16;
  const marginY = 40; // Big space for title at top on mobile
  const stepX = (100 - 2 * marginX) / (cols - 1);
  const stepY = rows > 1 ? (100 - marginY - 8) / (rows - 1) : 0;
  const x = r % 2 === 1 ? 100 - marginX - c * stepX : marginX + c * stepX;
  const y = marginY + r * stepY;
  return { x, y };
};

const genPath = (nodes: any[], getCoordsFn: (i: number, t: number) => any) => {
  let d = "";
  const total = nodes.length;
  for (let i = 0; i < total; i++) {
    const { x, y } = getCoordsFn(i, total);
    if (i === 0) {
      d += `M ${x} ${y} `;
      continue;
    }
    const prev = getCoordsFn(i - 1, total);
    if (prev.y === y) {
      d += `L ${x} ${y} `;
    } else {
      const midY = (prev.y + y) / 2;
      d += `C ${prev.x} ${midY}, ${x} ${midY}, ${x} ${y} `;
    }
  }
  return d;
};

export function RoadmapSection({ level, title, nodes, color, accent }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const total = nodes.length;
  const deskPath = genPath(nodes, getDeskCoords);
  const mobPath = genPath(nodes, getMobCoords);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[500px] md:min-h-[70vh] pb-12 overflow-hidden 
      flex flex-col items-center p-4 bg-slate-50 dark:bg-[#121212] transition-colors 
      duration-500"
      style={
        {
          "--level-color": color,
          "--level-accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Subtle modern background grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Title block */}
      <div className="w-full max-w-6xl mt-4 md:mt-8 mb-0 px-4 md:px-8 z-20 pointer-events-none flex flex-col items-center text-center">
        <div
          className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest 
          uppercase mb-2 pointer-events-auto"
          style={{
            backgroundColor: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          Level {level}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-[#E0E0E0] leading-tight pointer-events-auto mb-1 md:mb-2">
          {title}
        </h2>
        <p className="text-slate-500 dark:text-[#888] text-xs md:text-sm max-w-xl font-medium">
          Follow the nodes to complete the {title.toLowerCase()} course modules.
        </p>
      </div>

      {/* Roadmap Container */}
      <div className="relative w-full max-w-5xl h-[500px] md:h-[60vh] md:min-h-[550px] -mt-24 md:-mt-32 pb-4">
        {/* SVG Canvas for connecting lines */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {/* Mobile Path */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full md:hidden overflow-visible"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1s ease-out 0.2s",
            }}
          >
            <path
              d={mobPath}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              className="opacity-30 dark:opacity-20"
              strokeDasharray="6 8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Desktop Path */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden md:block w-full h-full overflow-visible"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1s ease-out 0.2s",
            }}
          >
            <path
              d={deskPath}
              fill="none"
              stroke={color}
              strokeWidth="3"
              className="opacity-30 dark:opacity-20"
              strokeDasharray="6 10"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Nodes */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-auto">
          {nodes.map((node, i) => {
            const m = getMobCoords(i, total);
            const d = getDeskCoords(i, total);
            const isMilestone = node.type === "milestone";
            const delay = i * 40; // faster cascade

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group top-[calc(var(--y-mob)*1%)] left-[calc(var(--x-mob)*1%)] md:top-[calc(var(--y-desk)*1%)] md:left-[calc(var(--x-desk)*1%)]"
                style={
                  {
                    "--y-mob": m.y,
                    "--x-mob": m.x,
                    "--y-desk": d.y,
                    "--x-desk": d.x,
                    "opacity": isVisible ? 1 : 0,
                    "transition": `all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    transform: `translateY(${isVisible ? 0 : 15}px) scale(${isVisible ? 1 : 0.95})`,
                    transition: `all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
                  }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {isMilestone ? (
                    <div
                      className="relative z-10 flex flex-col items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-md border-2 border-slate-100 dark:border-[#333] cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                      style={{
                        borderColor: isVisible ? color : "transparent",
                      }}
                    >
                      {/* Subtle hover background highlight like home page cards */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: color }}
                      />

                      <Flag
                        className="w-6 h-6 md:w-8 md:h-8 mb-1"
                        style={{ color: accent }}
                      />
                      <span className="font-bold text-[10px] md:text-xs text-slate-800 dark:text-[#E0E0E0] px-1 text-center leading-tight">
                        {node.title.length > 10
                          ? node.title.substring(0, 8) + "..."
                          : node.title}
                      </span>

                      {/* Floating tooltip for full description */}
                      <div className="absolute bottom-[110%] w-48 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-50 left-1/2 -translate-x-1/2">
                        <p className="font-bold text-sm mb-1">{node.title}</p>
                        <p className="opacity-80">
                          {node.description || "Complete the module milestone"}
                        </p>
                        {/* Triangle indicator */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-spacing-4 border-solid border-t-slate-900 border-x-transparent border-b-transparent border-t-8 border-x-8 border-b-0 dark:border-t-slate-100"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 shadow-sm group-hover:border-2"
                        style={{}}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "";
                        }}
                      >
                        {node.type === "grammar" ? (
                          <BookOpen
                            className="w-[18px] h-[18px] md:w-5 md:h-5 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform"
                            style={{
                              color: isVisible ? "" : "",
                              transition: "color 0.2s",
                            }}
                          />
                        ) : (
                          <MessageCircle className="w-[18px] h-[18px] md:w-5 md:h-5 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
                        )}
                      </div>

                      {/* Static Label below node */}
                      <div className="absolute top-full mt-2 w-[80px] md:w-[100px] text-center pointer-events-none">
                        <p className="font-semibold text-[10px] md:text-xs text-slate-700 dark:text-[#E0E0E0] leading-tight">
                          {node.title}
                        </p>
                        <p className="text-[8px] md:text-[9px] text-slate-400 dark:text-[#888888] font-medium mt-0.5">
                          {node.type.charAt(0).toUpperCase() +
                            node.type.slice(1)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
