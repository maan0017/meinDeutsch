// utils/germanTime.ts

export interface GermanTime {
  time: string; // "14:15"
  formalTime: string; // "vierzehn Uhr fünfzehn"
  informalTime: string; // "Viertel nach zwei"
}

// Basic number mapping for 0-59 (reusing logic or simple array for speed)
const NUMBERS: Record<number, string> = {
  0: "null",
  1: "eins",
  2: "zwei",
  3: "drei",
  4: "vier",
  5: "fünf",
  6: "sechs",
  7: "sieben",
  8: "acht",
  9: "neun",
  10: "zehn",
  11: "elf",
  12: "zwölf",
  13: "dreizehn",
  14: "vierzehn",
  15: "fünfzehn",
  16: "sechzehn",
  17: "siebzehn",
  18: "achtzehn",
  19: "neunzehn",
  20: "zwanzig",
  25: "fünfundzwanzig",
  30: "dreißig",
  35: "fünfunddreißig",
  40: "vierzig",
  45: "fünfundvierzig",
  50: "fünfzig",
  55: "fünfundfünfzig",
  // ... in a real app, use the full number generator from the previous step
};

// Helper to get number string (fallback for unmapped numbers if not using full generator)
const getNum = (n: number) => NUMBERS[n] || n.toString();

// 1. FORMAL TIME LOGIC (24h)
// Rule: [Hour] Uhr [Minute]
function getFormalTime(hours: number, minutes: number): string {
  const hWord = getNum(hours);

  if (minutes === 0) {
    return `${hWord} Uhr`;
  }

  // Formal minutes: 13:01 is "dreizehn Uhr eins", 13:10 "dreizehn Uhr zehn"
  const mWord = getNum(minutes);
  return `${hWord} Uhr ${mWord}`;
}

// 2. INFORMAL TIME LOGIC (12h)
// This is the complex part
function getInformalTime(hours: number, minutes: number): string {
  // Convert 24h to 12h (0 and 12 become 12)
  let h12 = hours % 12;
  if (h12 === 0) h12 = 12;

  // "Next Hour" is crucial for "halb" (half) logic
  // e.g. 14:30 is "halb drei" (half of 3), not "half two"
  let nextH = h12 + 1;
  if (nextH > 12) nextH = 1;

  const hWord = getNum(h12).replace("eins", "eins"); // 1:00 is "eins" or "ein Uhr"
  const nextHWord = getNum(nextH).replace("eins", "eins");

  // Exact Hour
  if (minutes === 0) {
    return h12 === 1 ? "ein Uhr" : `${hWord} Uhr`;
  }

  // Logic Tree based on minutes
  if (minutes === 15) {
    return `Viertel nach ${hWord}`;
  }

  if (minutes === 30) {
    return `halb ${nextHWord}`; // 2:30 -> halb drei
  }

  if (minutes === 45) {
    return `Viertel vor ${nextHWord}`;
  }

  // "Vor halb" (Before half) -> 25 min
  if (minutes === 25) {
    return `fünf vor halb ${nextHWord}`;
  }

  // "Nach halb" (After half) -> 35 min
  if (minutes === 35) {
    return `fünf nach halb ${nextHWord}`;
  }

  // Standard Nach (Past) -> 1-24 min (excluding 15)
  if (minutes < 25) {
    return `${getNum(minutes)} nach ${hWord}`;
  }

  // Standard Vor (To) -> 40-59 min (excluding 45)
  if (minutes >= 40) {
    const minsLeft = 60 - minutes;
    return `${getNum(minsLeft)} vor ${nextHWord}`;
  }

  // Fallback (should normally be covered, but for safety)
  return `${getNum(minutes)} nach ${hWord}`;
}

// 3. MASTER FUNCTION
export function createGermanTime(hours: number, minutes: number): GermanTime {
  // Format "14:5" to "14:05"
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return {
    time: timeString,
    formalTime: getFormalTime(hours, minutes),
    informalTime: getInformalTime(hours, minutes),
  };
}

// 4. GENERATOR (Day Loop)
export function generateDayTimes(stepMinutes: number = 5): GermanTime[] {
  const times: GermanTime[] = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      times.push(createGermanTime(h, m));
    }
  }
  return times;
}
