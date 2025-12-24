"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { germanWords } from "@/data/germanWords";
import { TableVirtuoso } from "react-virtuoso";
import { SearchBar } from "./searchBar";
import { useRouter } from "next/navigation";
import { useGoBack } from "@/hooks/useGoBack";

const getVal = (val: string | string[] | undefined) => {
  if (!val) return "";
  return Array.isArray(val) ? val.join(", ") : val;
};

const WORD_TYPE_DETAILS: Record<string, { label: string; hindi: string }> = {
  noun: { label: "Noun", hindi: "संज्ञा" },
  verb: { label: "Verb", hindi: "क्रिया" },
  adjective: {
    label: "Adjective",
    hindi: "विशेषण",
  },
  adverb: {
    label: "Adverb",
    hindi: "क्रियाविशेषण",
  },
  preposition: {
    label: "Preposition",
    hindi: "पूर्वसर्ग",
  },
  conjunction: {
    label: "Conjunction",
    hindi: "समुच्चयबोधक",
  },
  pronoun: { label: "Pronoun", hindi: "सर्वनाम" },
  personal_pronoun: {
    label: "Personal Pronoun",
    hindi: "पुरुषवाचक सर्वनाम",
  },
  possessive_pronoun: {
    label: "Possessive Pronoun",
    hindi: "संबंधवाचक सर्वनाम",
  },
  reflexive_pronoun: {
    label: "Reflexive Pronoun",
    hindi: "निजवाचक सर्वनाम",
  },
  phrase: {
    label: "Phrase",
    hindi: "मुहावरा",
  },
  nominative: {
    label: "Nominative",
    hindi: "कर्ता कारक",
  },
  accusative: {
    label: "Accusative",
    hindi: "कर्म कारक",
  },
  dative: {
    label: "Dative",
    hindi: "संप्रदान कारक",
  },
  genitive: {
    label: "Genitive",
    hindi: "संबंध कारक",
  },
};

export default function GermanWordsTable() {
  const [filterGerman, setFilterGerman] = useState("");
  const [filterEnglish, setFilterEnglish] = useState("");

  const WORDS_GROUP_SIZE = 50;
  const [currentGroup, setCurrentGroup] = useState(0);
  const [allIn, setAllIn] = useState(false);

  const totalGroups = Math.ceil(germanWords.length / WORDS_GROUP_SIZE);

  const [focusedInput, setFocusedInput] = useState<"german" | "english" | null>(
    null,
  );

  // search bars refs
  const germanSearchBarRef = useRef<HTMLInputElement | null>(null);
  const englishSearchBarRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  useGoBack();

  const filteredWords = useMemo(() => {
    // 0. Group Slicing
    let baseItems = germanWords;
    if (!allIn) {
      const start = currentGroup * WORDS_GROUP_SIZE;
      const end = start + WORDS_GROUP_SIZE;
      baseItems = germanWords.slice(start, end);
    }

    // 1. Filter first
    const items = baseItems.filter((word) => {
      const gMatch = word.germanWord
        .toLowerCase()
        .includes(filterGerman.toLowerCase());
      const eMatch = getVal(word.englishMeaning)
        .toLowerCase()
        .includes(filterEnglish.toLowerCase());
      return gMatch && eMatch;
    });

    // 2. Sort based on search state
    const isSearching = filterGerman || filterEnglish;

    if (!isSearching) {
      // Not searching: Alphabetical order
      // Note: If grouped, they are already likely sorted in source, but we sort to be safe/consistent
      return items.sort((a, b) => a.germanWord.localeCompare(b.germanWord));
    } else {
      // Searching logic
      return items.sort((a, b) => {
        // Priority 1: German Search
        if (filterGerman) {
          const aWord = a.germanWord.toLowerCase();
          const bWord = b.germanWord.toLowerCase();
          const searchG = filterGerman.toLowerCase();

          // Exact Match
          const aExact = aWord === searchG;
          const bExact = bWord === searchG;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;

          // Length (Shortest first)
          if (aWord.length !== bWord.length) {
            return aWord.length - bWord.length;
          }
        }

        // Priority 2: English Search
        if (filterEnglish) {
          const aWord = getVal(a.englishMeaning).toLowerCase();
          const bWord = getVal(b.englishMeaning).toLowerCase();
          const searchE = filterEnglish.toLowerCase();

          // Exact Match
          const aExact = aWord === searchE;
          const bExact = bWord === searchE;
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;

          // Length (Shortest first)
          if (aWord.length !== bWord.length) {
            return aWord.length - bWord.length;
          }
        }

        // Fallback: Alphabetical
        return a.germanWord.localeCompare(b.germanWord);
      });
    }
  }, [filterGerman, filterEnglish, currentGroup, allIn]);

  // shortcut key binding
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      // 1. Handle Escape (only if in input)
      if (isInput && key.toLowerCase() === "escape") {
        germanSearchBarRef.current?.blur();
        englishSearchBarRef.current?.blur();
        return;
      }

      if (isInput) {
        if (key.toLowerCase() === "g" && event.ctrlKey) {
          event.preventDefault();
          germanSearchBarRef.current?.focus();
        }

        if (key.toLowerCase() === "e" && event.ctrlKey) {
          event.preventDefault();
          englishSearchBarRef.current?.focus();
        }
        return;
      }

      // 2. Handle Ctrl + G (German Search)
      if (key.toLowerCase() === "g" && event.ctrlKey) {
        event.preventDefault();
        germanSearchBarRef.current?.focus();
        return;
      }

      // 3. Handle Ctrl + E (English Search)
      if (key.toLowerCase() === "e" && event.ctrlKey) {
        event.preventDefault();
        englishSearchBarRef.current?.focus();
        return;
      }

      if (key.toLowerCase() === "p" && event.ctrlKey) {
        event.preventDefault();
        import("@/helper/ExportPdf").then((mod) =>
          mod.exportPdf(filteredWords),
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fixed Header for Virtuoso (Labels Only)
  const fixedHeaderContent = () => (
    <tr className="bg-slate-50 dark:bg-[#1E1E1E] border-b border-slate-200 dark:border-[#333333] text-left sticky top-0 z-20 shadow-sm">
      <th className="py-3 px-4 w-[15%] text-xs font-semibold text-slate-500 dark:text-[#888888] uppercase tracking-wider sticky top-0 bg-slate-50 dark:bg-[#1E1E1E] z-20">
        Type
      </th>
      <th className="py-3 px-4 w-[10%] text-xs font-semibold text-slate-500 dark:text-[#888888] uppercase tracking-wider sticky top-0 bg-slate-50 dark:bg-[#1E1E1E] z-20">
        Article
      </th>
      <th className="py-3 px-4 w-[25%] text-xs font-semibold text-slate-500 dark:text-[#888888] uppercase tracking-wider sticky top-0 bg-slate-50 dark:bg-[#1E1E1E] z-20">
        German Word
      </th>
      <th className="py-3 px-4 w-[25%] text-xs font-semibold text-slate-500 dark:text-[#888888] uppercase tracking-wider sticky top-0 bg-slate-50 dark:bg-[#1E1E1E] z-20">
        English Meaning
      </th>
      <th className="py-3 px-4 w-[25%] text-xs font-semibold text-slate-500 dark:text-[#888888] uppercase tracking-wider sticky top-0 bg-slate-50 dark:bg-[#1E1E1E] z-20">
        Hindi Meaning
      </th>
    </tr>
  );

  // Row Content
  const rowContent = (_index: number, word: (typeof germanWords)[0]) => {
    // Highlight if exact match on German Word
    const isExactMatch =
      filterGerman &&
      word.germanWord.toLowerCase() === filterGerman.toLowerCase();

    // English Value
    const englishVal = getVal(word.englishMeaning);
    const isExactMatchEnglish =
      filterEnglish && englishVal.toLowerCase() === filterEnglish.toLowerCase();

    // Type Details
    const typeDetail = WORD_TYPE_DETAILS[word.type || ""] || {
      label: word.type,
      hindi: "",
    };

    return (
      <>
        <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-[#888888] border-b border-slate-100 dark:border-[#2C2C2C] bg-white dark:bg-[#121212] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] transition-colors">
          <div className="font-medium uppercase tracking-wide opacity-80">
            {typeDetail.label}
          </div>
          {typeDetail.hindi && (
            <div className="text-slate-400 dark:text-[#666666] mt-0.5 font-hindi text-[10px]">
              {typeDetail.hindi}
            </div>
          )}
        </td>
        <td
          className={`px-4 py-3.5 text-sm border-b border-slate-100 dark:border-[#2C2C2C] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] transition-colors ${
            isExactMatch
              ? "bg-blue-50/50 dark:bg-blue-900/10"
              : "bg-white dark:bg-[#121212]"
          }`}
        >
          <span className="italic text-slate-500 dark:text-[#888888] font-medium">
            {word.article}
          </span>
        </td>
        <td
          className={`px-4 py-3.5 text-sm border-b border-slate-100 dark:border-[#2C2C2C] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] transition-colors ${
            isExactMatch
              ? "bg-blue-50/50 dark:bg-blue-900/10"
              : "bg-white dark:bg-[#121212]"
          }`}
        >
          <div
            className={`font-bold text-[15px] ${
              isExactMatch
                ? "text-blue-700 dark:text-blue-400"
                : "text-slate-900 dark:text-[#EEEEEE]"
            }`}
          >
            {word.germanWord}
          </div>
          <div className="text-xs text-slate-500 dark:text-[#888888] font-hindi mt-1 opacity-90">
            {Array.isArray(word.hindiPronunciation)
              ? word.hindiPronunciation.join(", ")
              : word.hindiPronunciation}
          </div>
        </td>
        <td
          className={`px-4 py-3.5 text-sm border-b border-slate-100 dark:border-[#2C2C2C] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] transition-colors ${
            isExactMatchEnglish
              ? "bg-blue-50/50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 font-semibold"
              : "text-slate-700 dark:text-[#CCCCCC] bg-white dark:bg-[#121212]"
          }`}
        >
          {englishVal}
        </td>
        <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-[#AAAAAA] border-b border-slate-100 dark:border-[#2C2C2C] font-hindi bg-white dark:bg-[#121212] group-hover:bg-slate-50 dark:group-hover:bg-[#1E1E1E] transition-colors">
          {Array.isArray(word.hindiMeaning)
            ? word.hindiMeaning.join(", ")
            : word.hindiMeaning}
        </td>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#0a0a0a] flex flex-col items-center">
      <div className="w-full h-full max-w-7xl flex flex-col bg-white dark:bg-[#121212] shadow-xl border border-slate-200 dark:border-[#333333] overflow-hidden">
        {/* Top Bar / Header */}
        <div className="w-full px-4 md:px-6 py-4 bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-[#333333] flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0 z-30">
          {/* Title Area */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#2C2C2C] text-slate-500 dark:text-[#888888] transition-colors"
              title="Back to Home (Backspace)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                German Core Vocabulary
              </h1>
              <p className="text-xs text-slate-500 dark:text-[#888888] mt-0.5">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {germanWords.length}
                </span>{" "}
                words available
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              {/* Separator above ^ */}

              {/* Group Controls */}
              <div
                className={`
                    flex items-center justify-center gap-2 
                    bg-gray-50 dark:bg-[#1a1a1a] 
                    rounded-full px-3 py-1 
                    border border-gray-100 dark:border-[#333]
                    transition-all duration-300
                    ${
                      allIn
                        ? "opacity-40 grayscale pointer-events-none select-none"
                        : "opacity-100"
                    }
                  `}
              >
                <button
                  disabled={currentGroup === 0 || allIn}
                  onClick={() => setCurrentGroup((p) => Math.max(0, p - 1))}
                  className="
                      p-1 rounded-full 
                      text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                      disabled:opacity-30 disabled:cursor-not-allowed
                      transition-colors
                    "
                  title="Previous Group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono min-w-[5ch] text-center">
                  {currentGroup + 1}/{totalGroups}
                </span>

                <button
                  onClick={() =>
                    setCurrentGroup((p) => Math.min(totalGroups - 1, p + 1))
                  }
                  disabled={currentGroup === totalGroups - 1 || allIn}
                  className="
                      p-1 rounded-full 
                      text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 
                      disabled:opacity-30 disabled:cursor-not-allowed
                      transition-colors
                    "
                  title="Next Group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* All In Toggle */}
              <label
                htmlFor="allIn"
                title="Show all words at once"
                className={`
                    flex items-center gap-1.5 cursor-pointer select-none 
                    text-xs font-medium 
                    transition-colors duration-200
                    px-2 py-0.5 rounded-md border
                    ${
                      allIn
                        ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                        : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                    }
                  `}
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="allIn"
                    checked={allIn}
                    onChange={(e) => setAllIn(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`
                        w-3 h-3 rounded-full border mr-1.5 transition-colors
                        ${
                          allIn
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600 bg-transparent"
                        }
                      `}
                  >
                    {allIn && (
                      <svg
                        className="w-full h-full text-white p-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                All
              </label>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full xl:w-auto">
            <div className="flex flex-1 md:flex-initial gap-3 w-full xl:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
              <div className="min-w-[200px] flex-1 md:w-64">
                <SearchBar
                  placeholder="Search German term..."
                  inputRef={germanSearchBarRef}
                  shortcutKeys={focusedInput === "german" ? "Esc" : "Ctrl + G"}
                  isFocused={focusedInput === "german"}
                  onFocus={() => setFocusedInput("german")}
                  onBlur={() => setFocusedInput(null)}
                  value={filterGerman}
                  onChange={(value: string) => setFilterGerman(value)}
                />
              </div>
              <div className="min-w-[200px] flex-1 md:w-64">
                <SearchBar
                  placeholder="Search English meaning..."
                  inputRef={englishSearchBarRef}
                  shortcutKeys={focusedInput === "english" ? "Esc" : "Ctrl + E"}
                  isFocused={focusedInput === "english"}
                  onFocus={() => setFocusedInput("english")}
                  onBlur={() => setFocusedInput(null)}
                  value={filterEnglish}
                  onChange={(value: string) => setFilterEnglish(value)}
                />
              </div>
            </div>

            <button
              onClick={() =>
                import("@/helper/ExportPdf").then((mod) =>
                  mod.exportPdf(filteredWords),
                )
              }
              className="hidden md:flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-[#E0E0E0] bg-white dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#444444] rounded-lg hover:bg-slate-50 dark:hover:bg-[#2C2C2C] active:translate-y-px transition-all ml-auto xl:ml-0 shadow-sm"
              title="Export to PDF (Ctrl + P)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <span className="hidden lg:inline">Export PDF</span>
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 w-full min-h-0 relative bg-white dark:bg-[#121212]">
          <TableVirtuoso
            style={{ height: "100%" }}
            data={filteredWords}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
            components={{
              Table: ({ style, ...props }) => (
                <table
                  {...props}
                  style={{
                    ...style,
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    width: "100%",
                  }}
                  className="w-full"
                />
              ),
              TableRow: (props) => (
                <tr
                  {...props}
                  className="group hover:bg-slate-50 dark:hover:bg-[#1E1E1E] transition-colors duration-150 odd:bg-white even:bg-slate-50/30 dark:odd:bg-[#121212] dark:even:bg-[#161616]"
                />
              ),
            }}
          />
          {filteredWords.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-[#666666] bg-white/50 dark:bg-[#121212]/50 pointer-events-none">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg font-medium">No words found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
