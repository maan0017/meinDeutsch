import { germanWords } from "@/data/germanWords";
import { GermanWord } from "@/models/germanWord";

const BOOKMARK_KEY = "bookmarked_words";

export const getTotalBookmarks = (): number => {
  const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  return bookmarks.length;
};

export const getBookmarks = (): GermanWord[] => {
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

export const checkBookmarkExists = (word: string): boolean => {
  const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  return bookmarks.includes(word);
};

export const addBookmark = (word: string) => {
  const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  if (!bookmarks.includes(word)) {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks, word]));
  }
};

export const removeBookmark = (word: string) => {
  const bookmarks = JSON.parse(
    localStorage.getItem(BOOKMARK_KEY) || "[]"
  ).filter((w: string) => w !== word);
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
};
