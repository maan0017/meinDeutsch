"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type AdjectiveItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
  example?: string;
};

// ── Adjectives that take AKKUSATIV ──
const AKKUSATIV_ADJECTIVES: AdjectiveItem[] = [
  {
    word: "breit",
    en: "wide",
    hi: "चौड़ा",
    type: "Akkusativ Adj.",
    example: "Der Fluss ist einen Kilometer breit.",
  },
  {
    word: "gewohnt",
    en: "used to",
    hi: "आदी",
    type: "Akkusativ Adj.",
    example: "Ich bin das Wetter gewohnt.",
  },
  {
    word: "lang",
    en: "long",
    hi: "लंबा",
    type: "Akkusativ Adj.",
    example: "Der Weg ist einen Kilometer lang.",
  },
  {
    word: "leid",
    en: "sorry/tired of",
    hi: "थका हुआ / खेद",
    type: "Akkusativ Adj.",
    example: "Ich bin es leid.",
  },
  {
    word: "los",
    en: "rid of / free from",
    hi: "मुक्त",
    type: "Akkusativ Adj.",
    example: "Ich bin ihn los.",
  },
  {
    word: "satt",
    en: "fed up / full",
    hi: "तंग / भरा हुआ",
    type: "Akkusativ Adj.",
    example: "Ich bin es satt.",
  },
  {
    word: "schuldig",
    en: "guilty / owed",
    hi: "दोषी / ऋणी",
    type: "Akkusativ Adj.",
    example: "Er ist mir eine Antwort schuldig.",
  },
  {
    word: "wert",
    en: "worth",
    hi: "योग्य / लायक",
    type: "Akkusativ Adj.",
    example: "Das ist keinen Cent wert.",
  },
  {
    word: "schwer",
    en: "heavy (weight)",
    hi: "भारी",
    type: "Akkusativ Adj.",
    example: "Der Koffer ist einen Kilo schwer.",
  },
  {
    word: "alt",
    en: "old (age)",
    hi: "पुराना / उम्र",
    type: "Akkusativ Adj.",
    example: "Das Kind ist einen Monat alt.",
  },
  {
    word: "hoch",
    en: "high / tall",
    hi: "ऊँचा",
    type: "Akkusativ Adj.",
    example: "Der Turm ist 100 Meter hoch.",
  },
  {
    word: "tief",
    en: "deep",
    hi: "गहरा",
    type: "Akkusativ Adj.",
    example: "Der See ist zehn Meter tief.",
  },
];

// ── Adjectives that take DATIV ──
const DATIV_ADJECTIVES: AdjectiveItem[] = [
  {
    word: "ähnlich",
    en: "similar",
    hi: "समान",
    type: "Dativ Adj.",
    example: "Er ist seinem Vater ähnlich.",
  },
  {
    word: "angenehm",
    en: "pleasant",
    hi: "सुखद",
    type: "Dativ Adj.",
    example: "Das ist mir angenehm.",
  },
  {
    word: "bekannt",
    en: "known / familiar",
    hi: "परिचित",
    type: "Dativ Adj.",
    example: "Das ist mir bekannt.",
  },
  {
    word: "behilflich",
    en: "helpful",
    hi: "सहायक",
    type: "Dativ Adj.",
    example: "Kann ich Ihnen behilflich sein?",
  },
  {
    word: "böse",
    en: "angry / mad at",
    hi: "नाराज़",
    type: "Dativ Adj.",
    example: "Sie ist ihm böse.",
  },
  {
    word: "dankbar",
    en: "grateful",
    hi: "कृतज्ञ",
    type: "Dativ Adj.",
    example: "Ich bin dir dankbar.",
  },
  {
    word: "egal",
    en: "indifferent / doesn't matter",
    hi: "कोई फर्क नहीं",
    type: "Dativ Adj.",
    example: "Das ist mir egal.",
  },
  {
    word: "fremd",
    en: "strange / foreign",
    hi: "अजनबी / अपरिचित",
    type: "Dativ Adj.",
    example: "Das ist mir fremd.",
  },
  {
    word: "gegenüber",
    en: "opposite (to)",
    hi: "के सामने / प्रति",
    type: "Dativ Adj.",
    example: "Er steht mir gegenüber.",
  },
  {
    word: "gelegen",
    en: "convenient",
    hi: "सुविधाजनक",
    type: "Dativ Adj.",
    example: "Das kommt mir gelegen.",
  },
  {
    word: "klar",
    en: "clear",
    hi: "स्पष्ट",
    type: "Dativ Adj.",
    example: "Das ist mir klar.",
  },
  {
    word: "lästig",
    en: "annoying",
    hi: "परेशान करने वाला",
    type: "Dativ Adj.",
    example: "Er ist mir lästig.",
  },
  {
    word: "lieb",
    en: "dear / kind",
    hi: "प्रिय",
    type: "Dativ Adj.",
    example: "Das ist mir lieb.",
  },
  {
    word: "möglich",
    en: "possible",
    hi: "संभव",
    type: "Dativ Adj.",
    example: "Das ist mir nicht möglich.",
  },
  {
    word: "nahe",
    en: "near / close",
    hi: "पास / निकट",
    type: "Dativ Adj.",
    example: "Die Stadt ist mir nahe.",
  },
  {
    word: "nützlich",
    en: "useful",
    hi: "उपयोगी",
    type: "Dativ Adj.",
    example: "Das ist mir nützlich.",
  },
  {
    word: "peinlich",
    en: "embarrassing",
    hi: "शर्मनाक",
    type: "Dativ Adj.",
    example: "Das ist mir peinlich.",
  },
  {
    word: "recht",
    en: "right / fine",
    hi: "ठीक / सही",
    type: "Dativ Adj.",
    example: "Das ist mir recht.",
  },
  {
    word: "schlecht",
    en: "bad / nauseous",
    hi: "बुरा / उल्टी जैसा",
    type: "Dativ Adj.",
    example: "Mir ist schlecht.",
  },
  {
    word: "sympathisch",
    en: "likeable / nice",
    hi: "पसंदीदा",
    type: "Dativ Adj.",
    example: "Er ist mir sympathisch.",
  },
  {
    word: "treu",
    en: "loyal / faithful",
    hi: "वफ़ादार",
    type: "Dativ Adj.",
    example: "Der Hund ist seinem Besitzer treu.",
  },
  {
    word: "überlegen",
    en: "superior",
    hi: "श्रेष्ठ",
    type: "Dativ Adj.",
    example: "Er ist mir überlegen.",
  },
  {
    word: "unterlegen",
    en: "inferior",
    hi: "कमज़ोर / निम्न",
    type: "Dativ Adj.",
    example: "Sie ist ihm unterlegen.",
  },
  {
    word: "wichtig",
    en: "important",
    hi: "महत्वपूर्ण",
    type: "Dativ Adj.",
    example: "Das ist mir wichtig.",
  },
  {
    word: "willkommen",
    en: "welcome",
    hi: "स्वागत",
    type: "Dativ Adj.",
    example: "Du bist mir willkommen.",
  },
];

// ── Adjectives that take BOTH Akkusativ & Dativ ──
const BOTH_ADJECTIVES: AdjectiveItem[] = [
  {
    word: "schuldig",
    en: "owed (to someone, something)",
    hi: "ऋणी (किसी को, कुछ)",
    type: "Akk. + Dat.",
    example: "Er ist mir (Dat.) eine Antwort (Akk.) schuldig.",
  },
  {
    word: "wert",
    en: "worth (to someone)",
    hi: "किसी के लिए योग्य",
    type: "Akk. + Dat.",
    example: "Das Buch ist mir (Dat.) das Geld (Akk.) wert.",
  },
  {
    word: "neidisch",
    en: "envious / jealous",
    hi: "ईर्ष्यालु",
    type: "Akk. + Dat.",
    example: "Er ist neidisch auf mich.",
  },
  {
    word: "stolz",
    en: "proud",
    hi: "गर्वित",
    type: "Akk. + Dat.",
    example: "Ich bin stolz auf dich.",
  },
  {
    word: "eifersüchtig",
    en: "jealous",
    hi: "जलन करने वाला",
    type: "Akk. + Dat.",
    example: "Sie ist eifersüchtig auf ihre Schwester.",
  },
  {
    word: "interessiert",
    en: "interested",
    hi: "रुचि रखने वाला",
    type: "Akk. + Dat.",
    example: "Ich bin an dem Thema interessiert.",
  },
  {
    word: "gewöhnt",
    en: "accustomed to",
    hi: "अभ्यस्त",
    type: "Akk. + Dat.",
    example: "Ich bin an das Klima gewöhnt.",
  },
  {
    word: "verantwortlich",
    en: "responsible",
    hi: "ज़िम्मेदार",
    type: "Akk. + Dat.",
    example: "Er ist für den Fehler verantwortlich.",
  },
];

type CategoryKey = "akkusativ" | "dativ" | "both";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  sublabel: string;
  items: AdjectiveItem[];
  color: string;
  darkColor: string;
  borderColor: string;
  darkBorderColor: string;
  textColor: string;
  darkTextColor: string;
}[] = [
  {
    key: "akkusativ",
    label: "Akkusativ",
    sublabel: "Direct Object",
    items: AKKUSATIV_ADJECTIVES,
    color: "bg-rose-50",
    darkColor: "dark:bg-[#2a1a1a]",
    borderColor: "border-rose-400",
    darkBorderColor: "dark:border-[#6b3d3d]",
    textColor: "text-rose-700",
    darkTextColor: "dark:text-[#e87e7e]",
  },
  {
    key: "dativ",
    label: "Dativ",
    sublabel: "Indirect Object",
    items: DATIV_ADJECTIVES,
    color: "bg-sky-50",
    darkColor: "dark:bg-[#1a1a2a]",
    borderColor: "border-sky-400",
    darkBorderColor: "dark:border-[#3d3d6b]",
    textColor: "text-sky-700",
    darkTextColor: "dark:text-[#7e9ee8]",
  },
  {
    key: "both",
    label: "Akk. + Dat.",
    sublabel: "Both Cases",
    items: BOTH_ADJECTIVES,
    color: "bg-amber-50",
    darkColor: "dark:bg-[#2a2a1a]",
    borderColor: "border-amber-400",
    darkBorderColor: "dark:border-[#6b6b3d]",
    textColor: "text-amber-700",
    darkTextColor: "dark:text-[#e8c87e]",
  },
];

// Sort each category's items alphabetically
const SORTED_CATEGORIES = CATEGORIES.map((cat) => ({
  ...cat,
  items: [...cat.items].sort((a, b) => a.word.localeCompare(b.word, "de")),
}));

const STORAGE_KEY = "adjective-memory-game-categories";

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function AdjectivesMemoryGameComponent() {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState<Set<CategoryKey>>(
    () => {
      if (typeof window === "undefined")
        return new Set(CATEGORIES.map((c) => c.key));
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as CategoryKey[];
          if (parsed.length > 0) return new Set(parsed);
        }
      } catch {}
      return new Set(CATEGORIES.map((c) => c.key));
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const { playSound } = useSoundEffects();

  // Persist enabled categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...enabledCategories]));
    } catch {}
  }, [enabledCategories]);

  // Build the active word list from enabled categories, with stable IDs
  const activeCats = SORTED_CATEGORIES.filter((c) =>
    enabledCategories.has(c.key)
  );
  const activeWords = activeCats.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, uid: `${cat.key}-${item.word}` }))
  );

  const toggleCategory = (key: CategoryKey) => {
    setEnabledCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size <= 1) return prev; // must keep at least one
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    // Reset progress when categories change
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  };

  // Sequential: must guess the next expected word in order
  const handleGuess = () => {
    const val = normalize(input);
    if (!val) return;
    if (guessed.size >= activeWords.length) return;

    const expectedWord = activeWords[guessed.size];

    if (normalize(expectedWord.word) === val) {
      setGuessed((prev) => new Set([...prev, expectedWord.uid]));
      setFlash(expectedWord.uid);
      setTimeout(() => setFlash(null), 2500);
      playSound("correct");
      setInput("");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      playSound("wrong");
    }
    inputRef.current?.focus();
  };

  const progress =
    activeWords.length > 0
      ? Math.round((guessed.size / activeWords.length) * 100)
      : 0;

  const toggleShow = useCallback(
    () => setShowAll(!showAll),
    [showAll, setShowAll]
  );

  const resetFunction = useCallback(() => {
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!shake) inputRef.current?.focus();
  }, [shake, guessed]);

  const allDone = activeWords.length > 0 && guessed.size === activeWords.length;

  // Build per-category offset for sequential id lookup
  let runningIdx = 0;
  const categoryOffsets = activeCats.map((cat) => {
    const start = runningIdx;
    runningIdx += cat.items.length;
    return { ...cat, startIdx: start };
  });

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col items-center bg-slate-50 dark:bg-[#0e0e12] text-slate-900 dark:text-[#e8e2d6] pt-2 pb-1 px-4 relative">
      <Link
        href="/juwelen"
        className="absolute top-4 left-4 p-1.5 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#2a2a35] text-slate-500 dark:text-[#B0B0B0] transition-colors inline-flex items-center justify-center z-50"
        title="Back to Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden md:inline text-sm font-semibold ml-1">
          Back
        </span>
      </Link>

      <div className="flex-none flex flex-col items-center w-full max-w-[1100px]">
        <h1 className="text-[1.4rem] tracking-[0.06em] z-10 text-slate-800 dark:text-[#c8c0b0] mb-0 text-center">
          Adjektive
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-1.5 text-center">
          German Adjective Cases Memory Game
        </p>

        {/* Category toggles */}
        <div className="flex gap-2 mb-2 flex-wrap justify-center z-10">
          {SORTED_CATEGORIES.map((cat) => {
            const isOn = enabledCategories.has(cat.key);
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => toggleCategory(cat.key)}
                className={`px-2.5 py-1 rounded-md text-[0.75rem] font-medium transition-all duration-200 border cursor-pointer ${
                  isOn
                    ? `${cat.color} ${cat.darkColor} ${cat.borderColor} ${cat.darkBorderColor} ${cat.textColor} ${cat.darkTextColor}`
                    : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#8a8a90] dark:hover:bg-[#1e1e28]"
                }`}
              >
                {cat.label} ({cat.items.length})
              </button>
            );
          })}
        </div>

        <MemoryGameControls
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          resetFunction={resetFunction}
          showAll={showAll}
          toggleShow={toggleShow}
          shake={shake}
          inputRef={inputRef}
          placeholder="Type the next adjective…"
        />

        <p className="text-[0.75rem] text-slate-600 dark:text-[#555560] mb-1">
          <span className="text-green-600 dark:text-[#7ec87e]">
            {guessed.size}
          </span>{" "}
          / {activeWords.length} guessed
        </p>

        <div className="h-1 bg-slate-200 dark:bg-[#2a2a35] rounded-sm w-full overflow-hidden my-0 mb-3 inline-block">
          <div
            className="h-full bg-linear-to-r from-green-500 to-green-400 dark:from-[#3d6b3d] dark:to-[#7ec87e] rounded-sm transition-all duration-400 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1100px] flex flex-col items-center relative pb-1">
        {allDone && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/95 dark:bg-[#15151c]/95 p-6 rounded-xl shadow-2xl backdrop-blur-md animate-popIn border border-green-200 dark:border-green-800">
              <div className="text-[1.8rem] text-green-600 dark:text-[#7ec87e] tracking-wider text-center mb-1">
                ✦ Ausgezeichnet! ✦
              </div>
              <div className="text-slate-600 dark:text-[#9a9aa0] text-center tracking-widest text-[0.9rem]">
                All adjectives found.
              </div>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col z-10 w-full gap-4 transition-opacity duration-700 ${allDone ? "opacity-30" : "opacity-100"}`}
        >
          {categoryOffsets.map((cat) => (
            <div key={cat.key}>
              {/* Section heading */}
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${cat.color} ${cat.darkColor} border ${cat.borderColor} ${cat.darkBorderColor}`}
                />
                <span
                  className={`text-[0.8rem] font-semibold tracking-wide ${cat.textColor} ${cat.darkTextColor}`}
                >
                  {cat.label}
                </span>
                <span className="text-[0.65rem] text-slate-400 dark:text-[#555560] tracking-wider uppercase">
                  — {cat.sublabel}
                </span>
              </div>

              <div className="flex gap-1.5 flex-wrap justify-center">
                {cat.items.map((item, itemIdx) => {
                  const uid = `${cat.key}-${item.word}`;
                  const seqIdx = cat.startIdx + itemIdx;
                  const isRevealed = guessed.has(uid);
                  const isVisible = isRevealed || showAll;
                  const isFlashing = flash === uid;
                  const isExpected = seqIdx === guessed.size && !showAll;

                  let cellClasses = `group inline-flex items-center justify-center min-w-[90px] h-[30px] border rounded text-[0.8rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out px-2 relative cursor-default `;

                  if (isVisible) {
                    if (isRevealed) {
                      cellClasses +=
                        "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] ";
                    } else {
                      cellClasses +=
                        "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
                    }
                  } else {
                    if (isExpected) {
                      cellClasses +=
                        "text-transparent z-10 border-blue-400 dark:border-[#4a7ac8] bg-blue-50 dark:bg-[#121c2b] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2 after:rounded-sm after:bg-blue-300 dark:after:bg-[#325a96] shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse ";
                    } else {
                      cellClasses +=
                        "text-transparent z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2 after:rounded-sm after:bg-slate-200 dark:after:bg-[#2a2a35] ";
                    }
                  }

                  if (isFlashing) {
                    cellClasses +=
                      " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";
                  }

                  return (
                    <div
                      key={uid}
                      className={`relative ${isFlashing ? "z-50" : "z-10 hover:z-50"}`}
                    >
                      <div className={cellClasses}>
                        {item.word}
                        {isVisible && (
                          <div
                            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 ${isFlashing && !showAll ? "flex" : "hidden group-hover:flex"} flex-col bg-white dark:bg-[#2a2a35] text-black dark:text-[#e8e2d6] text-xs rounded-md shadow-lg py-2 px-3 z-60 w-max min-w-30 max-w-60 pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-slate-800 dark:before:border-t-[#2a2a35]`}
                          >
                            <span className="font-bold text-green-600 dark:text-[#7ec87e] mb-1 tracking-wide uppercase text-[0.65rem] border-b border-slate-200 dark:border-[#4a4a5a] pb-1">
                              {item.type}
                            </span>
                            <span
                              className="mt-0.5"
                              style={{ fontFamily: "sans-serif" }}
                            >
                              {item.en}
                            </span>
                            <span
                              className="mt-0.5"
                              style={{ fontFamily: "sans-serif" }}
                            >
                              {item.hi}
                            </span>
                            {item.example && (
                              <span className="mt-1.5 pt-1 border-t border-slate-200 dark:border-[#4a4a5a] text-[0.65rem] italic text-slate-500 dark:text-[#777780]">
                                {item.example}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
