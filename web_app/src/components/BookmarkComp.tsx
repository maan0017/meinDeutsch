"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  checkBookmarkExists,
  addBookmark,
  removeBookmark,
} from "@/hooks/useBookmark";

interface BookmarkCompProps {
  word: string;
}

export const BookmarkComp: FC<BookmarkCompProps> = ({ word }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsBookmarked(checkBookmarkExists(word));
  }, [word]);

  const toggleBookmark = useCallback(() => {
    setIsAnimating(true);

    if (isBookmarked) {
      removeBookmark(word);
    } else {
      addBookmark(word);
    }
    setIsBookmarked(!isBookmarked);

    setTimeout(() => setIsAnimating(false), 400);
  }, [isBookmarked, word]);

  useEffect(() => {
    const keyJobs = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "d" &&
        !event.altKey &&
        !event.shiftKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        toggleBookmark();
      }
    };

    document.addEventListener("keydown", keyJobs);

    return () => {
      document.removeEventListener("keydown", keyJobs);
    };
  }, [toggleBookmark]);

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      className={`
        group relative
        inline-flex items-center justify-center
        w-10 h-10
        rounded-full
        transition-all duration-200 ease-out
        ${
          isBookmarked
            ? "bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50"
            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800"
        }
        hover:shadow-lg hover:shadow-red-500/20
        hover:scale-110 active:scale-90
        focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2
        ${isAnimating ? "scale-125" : ""}
      `}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {/* Glow effect on hover */}
      <div
        className={`
        absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200
        ${isBookmarked ? "bg-linear-to-br from-red-400/20 to-rose-500/20" : "bg-linear-to-br from-slate-400/10 to-slate-500/10"}
      `}
      />

      {/* Icon */}
      <div className="relative z-10">
        {isBookmarked ? (
          <BookmarkCheck
            className={`
              w-5 h-5
              text-red-600 dark:text-red-400
              transition-all duration-200
              ${isAnimating ? "scale-110 rotate-6" : "scale-100"}
              drop-shadow-sm
            `}
            strokeWidth={2.5}
            fill="currentColor"
          />
        ) : (
          <Bookmark
            className={`
              w-5 h-5
              text-slate-600 dark:text-slate-400
              group-hover:text-red-600 dark:group-hover:text-red-400
              transition-all duration-200
              group-hover:scale-105
              drop-shadow-sm
            `}
            strokeWidth={2.5}
          />
        )}
      </div>

      {/* Ripple effect */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-75">
          <span className="absolute inset-0 rounded-full bg-red-400/40" />
        </span>
      )}
    </button>
  );
};
