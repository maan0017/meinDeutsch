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

  // Refined Logic for < 100 to handle "eins" vs "ein"
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

  return num.toString(); // Fallback for very large numbers
}
