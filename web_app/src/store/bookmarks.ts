"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookmarksState {
  bookmarkedVerbs: string[]; // Stores the unique germanWord corresponding to bookmarked verbs
  toggleVerbBookmark: (germanWord: string) => void;
  clearVerbBookmarks: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set) => ({
      bookmarkedVerbs: [],

      toggleVerbBookmark: (germanWord: string) =>
        set((state) => {
          const exists = state.bookmarkedVerbs.includes(germanWord);
          if (exists) {
            return {
              bookmarkedVerbs: state.bookmarkedVerbs.filter(
                (w) => w !== germanWord
              ),
            };
          } else {
            return {
              bookmarkedVerbs: [...state.bookmarkedVerbs, germanWord],
            };
          }
        }),

      clearVerbBookmarks: () => set({ bookmarkedVerbs: [] }),
    }),
    {
      name: "verb-bookmarks", // Persist key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
