"use client";

type Position =
  | "LEFT"
  | "RIGHT"
  | "UP"
  | "DOWN"
  | "TOP_LEFT_TOP"
  | "TOP_LEFT_LEFT"
  | "TOP_RIGHT_TOP"
  | "TOP_RIGHT_RIGHT"
  | "BOTTOM_LEFT_BOTTOM"
  | "BOTTOM_LEFT_LEFT"
  | "BOTTOM_RIGHT_BOTTOM"
  | "BOTTOM_RIGHT_RIGHT";

export type ThemeColor =
  | "amber"
  | "light-yellow"
  | "emerald"
  | "green"
  | "blue"
  | "slate"
  | "red"
  | "orange";

interface WordExplainProps {
  word: string;
  meaning: string;
  position?: Position;
  highlight?: boolean;
  className?: string;
  alwaysShow?: boolean;
  offsetX?: number;
  offsetY?: number;
  meaningClassName?: string;
  theme?: ThemeColor;
}

export default function WordExplainComp({
  word,
  meaning,
  position = "LEFT",
  highlight = false,
  className = "",
  alwaysShow = false,
  offsetX = 0,
  offsetY = 0,
  meaningClassName = "",
  theme = "amber",
}: WordExplainProps) {
  // Base gap is 16px. We clamp the minimum size so the arrow doesn't collapse.
  const dx = Math.max(16 + offsetX, 4);
  const dy = Math.max(16 + offsetY, 4);

  return (
    <span className={`relative inline-block group/word ${className}`}>
      {/* The main word - normal text by default, seamlessly blends in */}
      <span
        className={`relative z-10 transition-colors ${
          highlight ? getHighlightClasses(theme) : "text-inherit"
        } ${!alwaysShow ? "underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-help" : ""}`}
      >
        {word}
      </span>

      {/* The meaning container */}
      <span
        className={`absolute z-50 pointer-events-none transition-all duration-200 ${
          alwaysShow
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 group-hover/word:opacity-100 group-hover/word:scale-100"
        }`}
        style={getDynamicStyles(position, dx, dy)}
      >
        <span
          className={`flex items-center justify-center px-2 py-1 rounded-md border shadow-sm text-xs font-semibold whitespace-nowrap backdrop-blur-sm ${getThemeClasses(
            theme
          )} ${meaningClassName}`}
        >
          {meaning}
        </span>
        <Arrow position={position} dx={dx} dy={dy} />
      </span>
    </span>
  );
}

const getThemeClasses = (theme: ThemeColor) => {
  switch (theme) {
    case "light-yellow":
      return "bg-yellow-50/90 dark:bg-yellow-900/40 border-yellow-200 dark:border-yellow-800/50 text-yellow-800 dark:text-yellow-100";
    case "emerald":
      return "bg-emerald-100/90 dark:bg-emerald-900/60 border-emerald-300 dark:border-emerald-700/50 text-emerald-900 dark:text-emerald-200";
    case "green":
      return "bg-green-100/90 dark:bg-green-900/60 border-green-300 dark:border-green-700/50 text-green-900 dark:text-green-200";
    case "blue":
      return "bg-blue-100/90 dark:bg-blue-900/60 border-blue-300 dark:border-blue-700/50 text-blue-900 dark:text-blue-200";
    case "slate":
      return "bg-slate-100/90 dark:bg-slate-800/60 border-slate-300 dark:border-slate-600/50 text-slate-800 dark:text-slate-200";
    case "red":
      return "bg-rose-100/90 dark:bg-rose-900/60 border-rose-300 dark:border-rose-700/50 text-rose-900 dark:text-rose-200";
    case "orange":
      return "bg-orange-100/90 dark:bg-orange-900/60 border-orange-300 dark:border-orange-700/50 text-orange-900 dark:text-orange-200";
    case "amber":
    default:
      return "bg-amber-100/90 dark:bg-amber-900/60 border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-200";
  }
};

const getHighlightClasses = (theme: ThemeColor) => {
  const base = "font-bold text-slate-800 dark:text-slate-100 px-1 rounded ";
  switch (theme) {
    case "light-yellow":
      return base + "bg-yellow-50 dark:bg-yellow-900/30";
    case "emerald":
      return base + "bg-emerald-100 dark:bg-emerald-900/30";
    case "green":
      return base + "bg-green-100 dark:bg-green-900/30";
    case "blue":
      return base + "bg-blue-100 dark:bg-blue-900/30";
    case "slate":
      return base + "bg-slate-200 dark:bg-slate-800/50";
    case "red":
      return base + "bg-rose-100 dark:bg-rose-900/30";
    case "orange":
      return base + "bg-orange-100 dark:bg-orange-900/30";
    case "amber":
    default:
      return base + "bg-amber-100 dark:bg-amber-900/30";
  }
};

const getDynamicStyles = (
  pos: Position,
  dx: number,
  dy: number
): React.CSSProperties => {
  switch (pos) {
    case "LEFT":
      return {
        right: `calc(100% + ${dx}px)`,
        bottom: "50%",
        transform: "translateY(50%)",
      };
    case "RIGHT":
      return {
        left: `calc(100% + ${dx}px)`,
        bottom: "50%",
        transform: "translateY(50%)",
      };
    case "UP":
      return {
        bottom: `calc(100% + ${dy}px)`,
        right: "50%",
        transform: "translateX(50%)",
      };
    case "DOWN":
      return {
        top: `calc(100% + ${dy}px)`,
        right: "50%",
        transform: "translateX(50%)",
      };
    case "TOP_LEFT_TOP":
      return { right: `calc(50% + ${dx}px)`, bottom: `calc(100% + ${dy}px)` };
    case "TOP_LEFT_LEFT":
      return { right: `calc(100% + ${dx}px)`, bottom: `calc(50% + ${dy}px)` };
    case "TOP_RIGHT_TOP":
      return { left: `calc(50% + ${dx}px)`, bottom: `calc(100% + ${dy}px)` };
    case "TOP_RIGHT_RIGHT":
      return { left: `calc(100% + ${dx}px)`, bottom: `calc(50% + ${dy}px)` };
    case "BOTTOM_LEFT_BOTTOM":
      return { right: `calc(50% + ${dx}px)`, top: `calc(100% + ${dy}px)` };
    case "BOTTOM_LEFT_LEFT":
      return { right: `calc(100% + ${dx}px)`, top: `calc(50% + ${dy}px)` };
    case "BOTTOM_RIGHT_BOTTOM":
      return { left: `calc(50% + ${dx}px)`, top: `calc(100% + ${dy}px)` };
    case "BOTTOM_RIGHT_RIGHT":
      return { left: `calc(100% + ${dx}px)`, top: `calc(50% + ${dy}px)` };
    default:
      return {};
  }
};

const Arrow = ({
  position,
  dx,
  dy,
}: {
  position: Position;
  dx: number;
  dy: number;
}) => {
  const baseSvgClass =
    "absolute text-slate-400 dark:text-slate-500 overflow-visible";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (position) {
    case "LEFT":
      return (
        <svg
          className={`${baseSvgClass} top-1/2 -translate-y-1/2 left-full`}
          width={dx}
          height={16}
          viewBox={`0 0 ${dx} 16`}
          {...strokeProps}
        >
          <path d={`M 0 8 L ${dx - 3} 8`} />
          <path d={`M ${dx - 7} 4 L ${dx - 3} 8 L ${dx - 7} 12`} />
        </svg>
      );
    case "RIGHT":
      return (
        <svg
          className={`${baseSvgClass} top-1/2 -translate-y-1/2 right-full`}
          width={dx}
          height={16}
          viewBox={`0 0 ${dx} 16`}
          {...strokeProps}
        >
          <path d={`M ${dx} 8 L 3 8`} />
          <path d={`M 7 4 L 3 8 L 7 12`} />
        </svg>
      );
    case "UP":
      return (
        <svg
          className={`${baseSvgClass} left-1/2 -translate-x-1/2 top-full`}
          width={16}
          height={dy}
          viewBox={`0 0 16 ${dy}`}
          {...strokeProps}
        >
          <path d={`M 8 0 L 8 ${dy - 3}`} />
          <path d={`M 4 ${dy - 7} L 8 ${dy - 3} L 12 ${dy - 7}`} />
        </svg>
      );
    case "DOWN":
      return (
        <svg
          className={`${baseSvgClass} left-1/2 -translate-x-1/2 bottom-full`}
          width={16}
          height={dy}
          viewBox={`0 0 16 ${dy}`}
          {...strokeProps}
        >
          <path d={`M 8 ${dy} L 8 3`} />
          <path d={`M 4 7 L 8 3 L 12 7`} />
        </svg>
      );
    case "TOP_LEFT_TOP":
      return (
        <svg
          className={`${baseSvgClass} top-full left-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M 0 0 Q ${dx} 0 ${dx} ${dy - 3}`} />
          <path
            d={`M ${dx - 4} ${dy - 7} L ${dx} ${dy - 3} L ${dx + 4} ${dy - 7}`}
          />
        </svg>
      );
    case "TOP_LEFT_LEFT":
      return (
        <svg
          className={`${baseSvgClass} top-full left-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M 0 0 Q 0 ${dy} ${dx - 3} ${dy}`} />
          <path
            d={`M ${dx - 7} ${dy - 4} L ${dx - 3} ${dy} L ${dx - 7} ${dy + 4}`}
          />
        </svg>
      );
    case "TOP_RIGHT_TOP":
      return (
        <svg
          className={`${baseSvgClass} top-full right-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M ${dx} 0 Q 0 0 0 ${dy - 3}`} />
          <path d={`M -4 ${dy - 7} L 0 ${dy - 3} L 4 ${dy - 7}`} />
        </svg>
      );
    case "TOP_RIGHT_RIGHT":
      return (
        <svg
          className={`${baseSvgClass} top-full right-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M ${dx} 0 Q ${dx} ${dy} 3 ${dy}`} />
          <path d={`M 7 ${dy - 4} L 3 ${dy} L 7 ${dy + 4}`} />
        </svg>
      );
    case "BOTTOM_LEFT_BOTTOM":
      return (
        <svg
          className={`${baseSvgClass} bottom-full left-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M 0 ${dy} Q ${dx} ${dy} ${dx} 3`} />
          <path d={`M ${dx - 4} 7 L ${dx} 3 L ${dx + 4} 7`} />
        </svg>
      );
    case "BOTTOM_LEFT_LEFT":
      return (
        <svg
          className={`${baseSvgClass} bottom-full left-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M 0 ${dy} Q 0 0 ${dx - 3} 0`} />
          <path d={`M ${dx - 7} -4 L ${dx - 3} 0 L ${dx - 7} 4`} />
        </svg>
      );
    case "BOTTOM_RIGHT_BOTTOM":
      return (
        <svg
          className={`${baseSvgClass} bottom-full right-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M ${dx} ${dy} Q 0 ${dy} 0 3`} />
          <path d={`M -4 7 L 0 3 L 4 7`} />
        </svg>
      );
    case "BOTTOM_RIGHT_RIGHT":
      return (
        <svg
          className={`${baseSvgClass} bottom-full right-full`}
          width={dx}
          height={dy}
          viewBox={`0 0 ${dx} ${dy}`}
          {...strokeProps}
        >
          <path d={`M ${dx} ${dy} Q ${dx} 0 3 0`} />
          <path d={`M 7 -4 L 3 0 L 7 4`} />
        </svg>
      );
    default:
      return null;
  }
};

// fix this comp styling and alignment, like main comp. is the word and the meaning is a outside component, it will show with an bending arrow not a straignt arrow towards the word
