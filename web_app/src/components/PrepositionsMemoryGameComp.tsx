"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import Link from "next/link";
import MemoryGameControls from "@/components/MemoryGameControls";

type PrepItem = {
  word: string;
  en: string;
  hi: string;
  type: string;
  example?: string;
};

// ── Akkusativ Prepositions ──
const AKKUSATIV_PREPS: PrepItem[] = [
  {
    word: "bis",
    en: "until / up to",
    hi: "तक",
    type: "Akk. Präp.",
    example: "Bis morgen!",
  },
  {
    word: "durch",
    en: "through",
    hi: "के ज़रिये / से होकर",
    type: "Akk. Präp.",
    example: "Wir gehen durch den Park.",
  },
  {
    word: "entlang",
    en: "along",
    hi: "के साथ-साथ",
    type: "Akk. Präp.",
    example: "Wir gehen den Fluss entlang.",
  },
  {
    word: "für",
    en: "for",
    hi: "के लिए",
    type: "Akk. Präp.",
    example: "Das ist für dich.",
  },
  {
    word: "gegen",
    en: "against / around",
    hi: "के खिलाफ / लगभग",
    type: "Akk. Präp.",
    example: "Er ist gegen die Wand gelaufen.",
  },
  {
    word: "ohne",
    en: "without",
    hi: "बिना",
    type: "Akk. Präp.",
    example: "Ohne dich geht es nicht.",
  },
  {
    word: "um",
    en: "around / at (time)",
    hi: "के चारों ओर / बजे",
    type: "Akk. Präp.",
    example: "Um 8 Uhr beginnt der Kurs.",
  },
  {
    word: "wider",
    en: "against / contrary to",
    hi: "के विरुद्ध",
    type: "Akk. Präp.",
    example: "Das ist wider die Natur.",
  },
];

// ── Dativ Prepositions ──
const DATIV_PREPS: PrepItem[] = [
  {
    word: "ab",
    en: "from (time/place)",
    hi: "से (समय/जगह)",
    type: "Dat. Präp.",
    example: "Ab morgen bin ich frei.",
  },
  {
    word: "aus",
    en: "from / out of",
    hi: "से (बाहर)",
    type: "Dat. Präp.",
    example: "Ich komme aus Deutschland.",
  },
  {
    word: "außer",
    en: "except / besides",
    hi: "के अलावा",
    type: "Dat. Präp.",
    example: "Außer mir war niemand da.",
  },
  {
    word: "bei",
    en: "at / near / with",
    hi: "के पास / साथ",
    type: "Dat. Präp.",
    example: "Ich wohne bei meinen Eltern.",
  },
  {
    word: "dank",
    en: "thanks to",
    hi: "की बदौलत",
    type: "Dat. Präp.",
    example: "Dank deiner Hilfe habe ich bestanden.",
  },
  {
    word: "gegenüber",
    en: "opposite / across from",
    hi: "के सामने",
    type: "Dat. Präp.",
    example: "Die Bank ist gegenüber dem Bahnhof.",
  },
  {
    word: "gemäß",
    en: "according to",
    hi: "के अनुसार",
    type: "Dat. Präp.",
    example: "Gemäß dem Gesetz ist das verboten.",
  },
  {
    word: "mit",
    en: "with",
    hi: "के साथ",
    type: "Dat. Präp.",
    example: "Ich fahre mit dem Bus.",
  },
  {
    word: "nach",
    en: "to / after / according to",
    hi: "की ओर / के बाद",
    type: "Dat. Präp.",
    example: "Nach der Schule gehe ich nach Hause.",
  },
  {
    word: "seit",
    en: "since / for (time)",
    hi: "से (समय)",
    type: "Dat. Präp.",
    example: "Seit zwei Jahren lerne ich Deutsch.",
  },
  {
    word: "von",
    en: "from / by / of",
    hi: "से / द्वारा / का",
    type: "Dat. Präp.",
    example: "Das Buch ist von Goethe.",
  },
  {
    word: "zu",
    en: "to / at",
    hi: "को / की ओर",
    type: "Dat. Präp.",
    example: "Ich gehe zu meinem Freund.",
  },
  {
    word: "zufolge",
    en: "according to",
    hi: "के अनुसार",
    type: "Dat. Präp.",
    example: "Dem Bericht zufolge regnet es morgen.",
  },
];

// ── Wechselpräpositionen (Akk. or Dat.) ──
const WECHSEL_PREPS: PrepItem[] = [
  {
    word: "an",
    en: "at / on (vertical)",
    hi: "पर (खड़ी सतह)",
    type: "Wechsel.",
    example: "Das Bild hängt an der Wand.",
  },
  {
    word: "auf",
    en: "on (horizontal)",
    hi: "पर (सपाट सतह)",
    type: "Wechsel.",
    example: "Das Buch liegt auf dem Tisch.",
  },
  {
    word: "hinter",
    en: "behind",
    hi: "के पीछे",
    type: "Wechsel.",
    example: "Der Garten ist hinter dem Haus.",
  },
  {
    word: "in",
    en: "in / into",
    hi: "में / अंदर",
    type: "Wechsel.",
    example: "Ich bin in der Schule.",
  },
  {
    word: "neben",
    en: "next to / beside",
    hi: "के बगल में",
    type: "Wechsel.",
    example: "Er sitzt neben mir.",
  },
  {
    word: "über",
    en: "over / above / about",
    hi: "ऊपर / के बारे में",
    type: "Wechsel.",
    example: "Die Lampe hängt über dem Tisch.",
  },
  {
    word: "unter",
    en: "under / below / among",
    hi: "नीचे / के बीच",
    type: "Wechsel.",
    example: "Die Katze ist unter dem Bett.",
  },
  {
    word: "vor",
    en: "in front of / before / ago",
    hi: "के सामने / पहले",
    type: "Wechsel.",
    example: "Vor dem Haus steht ein Baum.",
  },
  {
    word: "zwischen",
    en: "between",
    hi: "के बीच",
    type: "Wechsel.",
    example: "Der Park liegt zwischen zwei Straßen.",
  },
];

// ── Genitiv Prepositions ──
const GENITIV_PREPS: PrepItem[] = [
  {
    word: "anstatt",
    en: "instead of",
    hi: "की जगह",
    type: "Gen. Präp.",
    example: "Anstatt des Kuchens esse ich Obst.",
  },
  {
    word: "außerhalb",
    en: "outside of",
    hi: "के बाहर",
    type: "Gen. Präp.",
    example: "Außerhalb der Stadt ist es ruhig.",
  },
  {
    word: "innerhalb",
    en: "within / inside of",
    hi: "के अंदर",
    type: "Gen. Präp.",
    example: "Innerhalb einer Woche ist es fertig.",
  },
  {
    word: "statt",
    en: "instead of",
    hi: "की जगह",
    type: "Gen. Präp.",
    example: "Statt eines Autos kaufte er ein Fahrrad.",
  },
  {
    word: "trotz",
    en: "despite / in spite of",
    hi: "के बावजूद",
    type: "Gen. Präp.",
    example: "Trotz des Regens gingen wir spazieren.",
  },
  {
    word: "während",
    en: "during",
    hi: "के दौरान",
    type: "Gen. Präp.",
    example: "Während des Unterrichts darf man nicht reden.",
  },
  {
    word: "wegen",
    en: "because of",
    hi: "की वजह से",
    type: "Gen. Präp.",
    example: "Wegen des Wetters bleiben wir zu Hause.",
  },
  {
    word: "oberhalb",
    en: "above",
    hi: "के ऊपर",
    type: "Gen. Präp.",
    example: "Oberhalb des Dorfes liegt der See.",
  },
  {
    word: "unterhalb",
    en: "below",
    hi: "के नीचे",
    type: "Gen. Präp.",
    example: "Unterhalb der Brücke fließt der Fluss.",
  },
  {
    word: "infolge",
    en: "as a result of",
    hi: "के परिणामस्वरूप",
    type: "Gen. Präp.",
    example: "Infolge des Unfalls gab es einen Stau.",
  },
  {
    word: "laut",
    en: "according to",
    hi: "के अनुसार",
    type: "Gen. Präp.",
    example: "Laut des Berichts steigen die Preise.",
  },
  {
    word: "mangels",
    en: "due to lack of",
    hi: "की कमी के कारण",
    type: "Gen. Präp.",
    example: "Mangels Beweisen wurde er freigesprochen.",
  },
];

type CategoryKey = "akkusativ" | "dativ" | "wechsel" | "genitiv";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  sublabel: string;
  items: PrepItem[];
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
    items: AKKUSATIV_PREPS,
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
    items: DATIV_PREPS,
    color: "bg-sky-50",
    darkColor: "dark:bg-[#1a1a2a]",
    borderColor: "border-sky-400",
    darkBorderColor: "dark:border-[#3d3d6b]",
    textColor: "text-sky-700",
    darkTextColor: "dark:text-[#7e9ee8]",
  },
  {
    key: "wechsel",
    label: "Wechsel",
    sublabel: "Two-Way (Akk./Dat.)",
    items: WECHSEL_PREPS,
    color: "bg-violet-50",
    darkColor: "dark:bg-[#221a2a]",
    borderColor: "border-violet-400",
    darkBorderColor: "dark:border-[#5a3d6b]",
    textColor: "text-violet-700",
    darkTextColor: "dark:text-[#b07ee8]",
  },
  {
    key: "genitiv",
    label: "Genitiv",
    sublabel: "Possessive Case",
    items: GENITIV_PREPS,
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

const STORAGE_KEY = "prepositions-memory-game-categories";

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export default function PrepositionsMemoryGameComponent() {
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

  // Persist enabled categories
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...enabledCategories]));
    } catch {}
  }, [enabledCategories]);

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
        if (next.size <= 1) return prev;
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setGuessed(new Set());
    setInput("");
    setFlash(null);
    setShake(false);
    setShowAll(false);
    inputRef.current?.focus();
  };

  const handleGuess = () => {
    const val = normalize(input);
    if (!val || guessed.size >= activeWords.length) return;
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
  const toggleShow = useCallback(() => setShowAll(!showAll), [showAll]);
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
          Präpositionen
        </h1>
        <p className="text-[0.65rem] text-slate-600 z-10 dark:text-[#555560] tracking-[0.12em] uppercase mb-1.5 text-center">
          German Prepositions Memory Game
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
          placeholder="Type the next preposition…"
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
                All prepositions found.
              </div>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col z-10 w-full gap-4 transition-opacity duration-700 ${allDone ? "opacity-30" : "opacity-100"}`}
        >
          {categoryOffsets.map((cat) => (
            <div key={cat.key}>
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

                  let c = `group inline-flex items-center justify-center min-w-[90px] h-[30px] border rounded text-[0.8rem] tracking-[0.04em] transition-all duration-[400ms] ease-in-out px-2 relative cursor-default `;
                  if (isVisible) {
                    c += isRevealed
                      ? "bg-green-50 z-10 border-green-400 text-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)] dark:bg-[#1a2a1a] dark:border-[#3d6b3d] dark:text-[#7ec87e] dark:shadow-[0_0_12px_rgba(126,200,126,0.15)] "
                      : "bg-slate-50 z-10 border-slate-300 text-slate-600 dark:bg-[#15151c] dark:border-[#3a3a4a] dark:text-[#9a9aa0] ";
                  } else {
                    c += isExpected
                      ? "text-transparent z-10 border-blue-400 dark:border-[#4a7ac8] bg-blue-50 dark:bg-[#121c2b] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2 after:rounded-sm after:bg-blue-300 dark:after:bg-[#325a96] shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse "
                      : "text-transparent z-10 border-slate-200 dark:border-[#2a2a35] bg-white dark:bg-[#0e0e12] after:content-[''] after:absolute after:inset-y-[4px] after:inset-x-2 after:rounded-sm after:bg-slate-200 dark:after:bg-[#2a2a35] ";
                  }
                  if (isFlashing)
                    c += " animate-popIn dark:bg-[#2a4a2a] bg-green-200 z-20 ";

                  return (
                    <div
                      key={uid}
                      className={`relative ${isFlashing ? "z-50" : "z-10 hover:z-50"}`}
                    >
                      <div className={c}>
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
