export type GermanArticle = "der" | "die" | "das" | null;

export type WordCategory =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "pronoun"
  | "personal_pronoun"
  | "possessive_pronoun"
  | "reflexive_pronoun"
  | "interjection"
  | "phrase";

export type GrammaticalCase =
  | "nominative"
  | "accusative"
  | "dative"
  | "genitive";

export interface GermanWord {
  germanWord: string;
  article?: GermanArticle; // Optional because verbs/adjectives don't have articles

  hindiPronunciation: string;
  englishMeaning: string[];
  hindiMeaning: string[];

  // Metadata
  type: WordCategory;
  description?: string; // Contextual usage notes

  // Advanced Grammar (Optional)
  case?: GrammaticalCase; // Useful for tracking if a preposition is "Akkusativ"
  pluralForm?: string; // Useful for nouns
}
