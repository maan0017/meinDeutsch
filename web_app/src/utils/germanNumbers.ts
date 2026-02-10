// utils/germanNumbers.ts

import { GermanNumber } from "@/models/germanNumber";

const UNITS = [
  "",
  "ein",
  "zwei",
  "drei",
  "vier",
  "fünf",
  "sechs",
  "sieben",
  "acht",
  "neun",
];
const TEENS = [
  "zehn",
  "elf",
  "zwölf",
  "dreizehn",
  "vierzehn",
  "fünfzehn",
  "sechzehn",
  "siebzehn",
  "achtzehn",
  "neunzehn",
];
const TENS = [
  "",
  "",
  "zwanzig",
  "dreißig",
  "vierzig",
  "fünfzig",
  "sechzig",
  "siebzig",
  "achtzig",
  "neunzig",
];

// Helper to convert small chunks (0-999)
function convertUnder1000(n: number): string {
  if (n === 0) return ""; // Return empty for 0 inside chunks, handled separately if main number is 0

  let result = "";

  // Handle Hundreds
  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;

  if (hundreds > 0) {
    result += UNITS[hundreds] + "hundert";
  }

  // Handle Remainder (0-99)
  if (remainder > 0) {
    if (remainder < 10) {
      result += UNITS[remainder];
    } else if (remainder < 20) {
      result += TEENS[remainder - 10];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      if (one > 0) {
        result += UNITS[one] + "und" + TENS[ten];
      } else {
        result += TENS[ten];
      }
    }
  }
  return result;
}

export function numberToGerman(n: number): string {
  if (n === 0) return "null";
  if (n === 1) return "eins"; // Special case

  let str = "";
  let current = n;

  // 1. Billions (Milliarden) - 10^9
  const billions = Math.floor(current / 1000000000);
  current %= 1000000000;
  if (billions > 0) {
    const suffix = billions === 1 ? " Milliarde " : " Milliarden ";
    str += numberToGerman(billions).replace("eins", "eine") + suffix;
  }

  // 2. Millions (Millionen) - 10^6
  const millions = Math.floor(current / 1000000);
  current %= 1000000;
  if (millions > 0) {
    const suffix = millions === 1 ? " Million " : " Millionen ";
    str += numberToGerman(millions).replace("eins", "eine") + suffix;
  }

  // 3. Thousands (tausend) - 10^3
  const thousands = Math.floor(current / 1000);
  current %= 1000;
  if (thousands > 0) {
    str += convertUnder1000(thousands) + "tausend";
  }

  // 4. The rest (< 1000)
  if (current > 0) {
    str += convertUnder1000(current);
  }

  str = str.trim();

  // Grammar correction: if ends in "ein", make it "eins" (e.g. 101 -> einhunderteins)
  // This check is safe because no other number word ends in "ein" (nein is not a number)
  if (str.endsWith("ein")) {
    str += "s";
  }

  return str;
}

// utils/germanNumbers.ts

/**
 * Converts a number to its German word representation
 */
export function numberToGermanWords(num: number): string {
  if (num === 0) return "null";

  const units = [
    "",
    "eins",
    "zwei",
    "drei",
    "vier",
    "fünf",
    "sechs",
    "sieben",
    "acht",
    "neun",
    "zehn",
    "elf",
    "zwölf",
    "dreizehn",
    "vierzehn",
    "fünfzehn",
    "sechzehn",
    "siebzehn",
    "achtzehn",
    "neunzehn",
  ];

  const tens = [
    "",
    "zehn",
    "zwanzig",
    "dreißig",
    "vierzig",
    "fünfzig",
    "sechzig",
    "siebzig",
    "achtzig",
    "neunzig",
  ];

  if (num < 20) return units[num];

  if (num < 100) {
    const unit = num % 10;
    const ten = Math.floor(num / 10);
    if (unit === 0) return tens[ten];
    const unitStr = unit === 1 ? "ein" : units[unit];
    return unitStr + "und" + tens[ten];
  }

  if (num < 1000) {
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    const hundredStr = (hundred === 1 ? "ein" : units[hundred]) + "hundert";
    if (rest === 0) return hundredStr;
    return hundredStr + numberToGermanWords(rest);
  }

  if (num < 1000000) {
    const thousand = Math.floor(num / 1000);
    const rest = num % 1000;
    const thousandStr =
      (thousand === 1 ? "ein" : numberToGermanWords(thousand)) + "tausend";
    if (rest === 0) return thousandStr;
    return thousandStr + numberToGermanWords(rest);
  }

  return num.toString();
}

/**
 * Returns all possible German word forms for a number
 * Includes variations like "eins" vs "ein"
 */
export function getNumberVariants(num: number): string[] {
  const baseForm = numberToGermanWords(num);
  const variants = [baseForm, num.toString()];

  // Special case: "eins" can be "ein" or "eins"
  if (num === 1) {
    variants.push("ein", "eins");
  }

  // For compound numbers ending in 1, add variant without the final 's'
  if (num % 10 === 1 && num !== 1 && num !== 11) {
    const withoutS = baseForm.replace(/eins/g, "ein");
    if (withoutS !== baseForm) {
      variants.push(withoutS);
    }
  }

  return [...new Set(variants)]; // Remove duplicates
}
