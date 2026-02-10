const HINDI_NUMBERS: string[] = [
  "शून्य",
  "एक",
  "दो",
  "तीन",
  "चार",
  "पाँच",
  "छह",
  "सात",
  "आठ",
  "नौ",
  "दस",
  "ग्यारह",
  "बारह",
  "तेरह",
  "चौदह",
  "पंद्रह",
  "सोलह",
  "सत्रह",
  "अठारह",
  "उन्नीस",
  "बीस",
  "इक्कीस",
  "बाईस",
  "तेईस",
  "चौबीस",
  "पच्चीस",
  "छब्बीस",
  "सताइस",
  "अठाइस",
  "उनतीस",
  "तीस",
  "इकतीस",
  "बतीस",
  "तैंतीस",
  "चौंतीस",
  "पैंतीस",
  "छत्तीस",
  "सैंतीस",
  "अड़तीस",
  "उनतालीस",
  "चालीस",
  "इकतालीस",
  "बयालीस",
  "तैंतालीस",
  "चवालीस",
  "पैंतालीस",
  "छियालीस",
  "सैंतालीस",
  "अड़तालीस",
  "उनचास",
  "पचास",
  "इक्यावन",
  "बावन",
  "तिरेपन",
  "चौवन",
  "पचपन",
  "छप्पन",
  "सतावन",
  "अठावन",
  "उनसठ",
  "साठ",
  "इकसठ",
  "बासठ",
  "तिरसठ",
  "चौंसठ",
  "पैंसठ",
  "छाछठ",
  "सड़सठ",
  "अड़सठ",
  "उनहत्तर",
  "सत्तर",
  "इकहत्तर",
  "बहत्तर",
  "तिहत्तर",
  "चौहत्तर",
  "पचहत्तर",
  "छिहत्तर",
  "सतहत्तर",
  "अठहत्तर",
  "उनासी",
  "अस्सी",
  "इक्यासी",
  "बयासी",
  "तिरासी",
  "चौरासी",
  "पचासी",
  "छियासी",
  "सतासी",
  "अठासी",
  "नवासी",
  "नब्बे",
  "इक्यानवे",
  "बानवे",
  "तिरानवे",
  "चौरानवे",
  "पचानवे",
  "छियानवे",
  "सतानवे",
  "अठानवे",
  "निन्यानवे",
];

export function numberToHindi(n: number): string {
  if (n === 0) return HINDI_NUMBERS[0];

  let str = "";
  let current = n;

  // 1. Arab (अरब) - 10^9 (Billions)
  const arab = Math.floor(current / 1000000000);
  current %= 1000000000;
  if (arab > 0) {
    str += numberToHindi(arab) + " अरब ";
  }

  // 2. Crore (करोड़) - 10^7 (Ten Millions)
  const crores = Math.floor(current / 10000000);
  current %= 10000000;
  if (crores > 0) {
    str += numberToHindi(crores) + " करोड़ ";
  }

  // 3. Lakh (लाख) - 10^5 (Hundred Thousands)
  const lakhs = Math.floor(current / 100000);
  current %= 100000;
  if (lakhs > 0) {
    str += numberToHindi(lakhs) + " लाख ";
  }

  // 4. Thousand (हज़ार) - 10^3
  const thousands = Math.floor(current / 1000);
  current %= 1000;
  if (thousands > 0) {
    str += numberToHindi(thousands) + " हज़ार ";
  }

  // 5. Hundred (सौ) - 10^2
  const hundreds = Math.floor(current / 100);
  current %= 100;
  if (hundreds > 0) {
    str += numberToHindi(hundreds) + " सौ ";
  }

  // 6. The rest (< 100)
  if (current > 0) {
    str += HINDI_NUMBERS[current];
  }

  return str.trim();
}
