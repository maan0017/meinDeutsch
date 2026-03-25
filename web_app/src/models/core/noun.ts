export interface NounWord {
  type: "noun";
  germanWord: string;
  hindiPronunciation: string;
  englishMeaning: string[];
  hindiMeaning: string[];
  description?: string;
  article: "der" | "die" | "das" | null;
  pluralForm: string | null;

  // 1. Genitive Singular: Crucial for masculine/neuter.
  // Example: "Der Mann" -> "Des Mannes".
  // If undefined, you can assume standard "s" or "es" rules apply.
  genitiveSingular: string | null;

  // 2. N-Declension (Weak Masculine): The most common learner error.
  // If true, this noun adds an "-n" in every case except Nominative singular.
  // Example: "Der Student" -> "Den Studenten" (not Student).
  isWeakMasculine?: boolean;

  isPluralOnly?: boolean;

  priority: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  difficulty: 1 | 2 | 3;
}
