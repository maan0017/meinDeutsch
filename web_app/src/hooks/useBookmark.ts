import { germanWords } from "@/data/germanWords";
import { GermanWord } from "@/models/germanWord";

export const useBookmark = (BOOKMARK_KEY: string) => {
  const getTotalBookmarks = (): number => {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    return bookmarks.length;
  };

  const getBookmarks = (): GermanWord[] => {
    if (typeof window === "undefined" || getTotalBookmarks() === 0) return [];

    try {
      const bookmarks = JSON.parse(
        localStorage.getItem(BOOKMARK_KEY) || "[]"
      ) as string[];
      if (!germanWords || germanWords.length === 0) return [];
      return germanWords.filter((word) => {
        return bookmarks.includes(word.germanWord);
      });
    } catch {
      return [];
    }
  };

  const getBookmarkStrings = (): string[] => {
    if (typeof window === "undefined" || getTotalBookmarks() === 0) return [];

    try {
      return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]") as string[];
    } catch {
      return [];
    }
  };

  const checkBookmarkExists = (word: string): boolean => {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    return bookmarks.includes(word);
  };

  const addBookmark = (word: string) => {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    if (!bookmarks.includes(word)) {
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks, word]));
    }
  };

  const removeBookmark = (word: string) => {
    const bookmarks = JSON.parse(
      localStorage.getItem(BOOKMARK_KEY) || "[]"
    ).filter((w: string) => w !== word);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
  };

  const toggleBookmark = (word: string) => {
    const isExists = checkBookmarkExists(word);
    if (isExists) {
      removeBookmark(word);
      return;
    }
    addBookmark(word);
  };

  return {
    getTotalBookmarks,
    getBookmarks,
    getBookmarkStrings,
    checkBookmarkExists,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  };
};
