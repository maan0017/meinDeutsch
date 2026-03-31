"use client";
import { ReactNode } from "react";

// Highlight matching text
export const HighlightText = (text: string, searchQuery: string) => {
  if (!searchQuery.trim()) return text;

  const searchTerms = searchQuery.toLowerCase().split(" ").filter(Boolean);
  const parts: ReactNode[] = [];
  let remaining = text;
  let lowerRemaining = text.toLowerCase();

  while (remaining) {
    let matchIndex = -1;
    let matchTerm = "";

    for (const term of searchTerms) {
      const idx = lowerRemaining.indexOf(term);
      if (idx >= 0 && (matchIndex === -1 || idx < matchIndex)) {
        matchIndex = idx;
        matchTerm = term;
      }
    }

    if (matchIndex === -1) {
      parts.push(remaining);
      break;
    }

    if (matchIndex > 0) {
      parts.push(remaining.slice(0, matchIndex));
    }

    parts.push(
      <span
        key={parts.length}
        className="bg-amber-200 dark:bg-amber-600 text-amber-950 dark:text-white rounded px-0.5 font-medium box-decoration-clone"
      >
        {remaining.slice(matchIndex, matchIndex + matchTerm.length)}
      </span>
    );

    remaining = remaining.slice(matchIndex + matchTerm.length);
    lowerRemaining = remaining.toLowerCase();
  }

  return parts;
};
