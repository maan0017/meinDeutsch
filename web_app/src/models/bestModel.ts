// types/germanWord.ts

/**
 * German grammatical cases
 */
export type GrammaticalCase =
  | "nominative"
  | "accusative"
  | "dative"
  | "genitive";

/**
 * Part of speech categories
 */
export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "pronoun"
  | "interjection"
  | "phrase";

/**
 * Types of pronouns in German
 */
export type PronounType =
  | "personal"
  | "possessive"
  | "reflexive"
  | "demonstrative"
  | "interrogative"
  | "relative";

/**
 * German articles
 */
export type GermanArticle = "der" | "die" | "das";

/**
 * Auxiliary verbs for perfect tense
 */
export type AuxiliaryVerb = "haben" | "sein";

/**
 * Phrase categories
 */
export type PhraseCategory = "idiom" | "collocation" | "fixed_expression";

/**
 * Base interface for all German words
 */
interface BaseWord {
  germanWord: string;
  hindiPronunciation: string;
  readonly englishMeaning: readonly string[];
  readonly hindiMeaning: readonly string[];
  description?: string;
}

/**
 * German noun with article, plural, and genitive forms
 */
export interface NounWord extends BaseWord {
  type: "noun";
  article: GermanArticle;
  pluralForm?: string;
  genitiveSingular?: string;
}

/**
 * German pronoun with specific pronoun type
 */
export interface PronounWord extends BaseWord {
  type: "pronoun";
  pronounType: PronounType;
  declensionNote?: string; // e.g., "declines like definite article"
}

/**
 * German preposition with case governance
 */
export interface PrepositionWord extends BaseWord {
  type: "preposition";
  governsCase: GrammaticalCase | readonly GrammaticalCase[];
  contractedForms?: readonly string[]; // e.g., ["am", "ans"] for "an"
}

/**
 * German verb with conjugation properties
 */
export interface VerbWord extends BaseWord {
  type: "verb";
  auxiliary?: AuxiliaryVerb;
  separable?: boolean;
  irregular?: boolean;
  stemVowelChange?: string; // e.g., "e→i", "a→ä"
  thirdPersonSingular?: string; // er/sie/es form
  pastParticiple?: string;
}

/**
 * German adjective with comparative and superlative forms
 */
export interface AdjectiveWord extends BaseWord {
  type: "adjective";
  comparativeForm?: string;
  superlativeForm?: string;
  predicativeOnly?: boolean; // like "klasse"
}

/**
 * German adverb
 */
export interface AdverbWord extends BaseWord {
  type: "adverb";
  category?: "time" | "place" | "manner" | "degree";
}

/**
 * German conjunction
 */
export interface ConjunctionWord extends BaseWord {
  type: "conjunction";
  subordinating?: boolean; // affects word order (verb to end)
  coordinatingType?: "main" | "causal" | "adversative"; // und, denn, aber
}

/**
 * German interjection
 */
export interface InterjectionWord extends BaseWord {
  type: "interjection";
  emotionalContext?: string; // e.g., "surprise", "pain", "joy"
}

/**
 * German phrase or fixed expression
 */
export interface PhraseWord extends BaseWord {
  type: "phrase";
  category?: PhraseCategory;
  literalTranslation?: string;
}

/**
 * Discriminated union of all German word types
 */
export type GermanWord =
  | NounWord
  | PronounWord
  | PrepositionWord
  | VerbWord
  | AdjectiveWord
  | AdverbWord
  | ConjunctionWord
  | InterjectionWord
  | PhraseWord;

/**
 * Type guards for runtime type checking
 */
export const isNounWord = (word: GermanWord): word is NounWord =>
  word.type === "noun";

export const isVerbWord = (word: GermanWord): word is VerbWord =>
  word.type === "verb";

export const isAdjectiveWord = (word: GermanWord): word is AdjectiveWord =>
  word.type === "adjective";

export const isPronounWord = (word: GermanWord): word is PronounWord =>
  word.type === "pronoun";

export const isPrepositionWord = (word: GermanWord): word is PrepositionWord =>
  word.type === "preposition";

export const isAdverbWord = (word: GermanWord): word is AdverbWord =>
  word.type === "adverb";

export const isConjunctionWord = (word: GermanWord): word is ConjunctionWord =>
  word.type === "conjunction";

export const isInterjectionWord = (
  word: GermanWord,
): word is InterjectionWord => word.type === "interjection";

export const isPhraseWord = (word: GermanWord): word is PhraseWord =>
  word.type === "phrase";

/**
 * Helper function to get article color for UI
 */
export const getArticleColor = (article: GermanArticle): string => {
  const colors = {
    der: "blue",
    die: "red",
    das: "green",
  };
  return colors[article];
};

/**
 * Helper function to format word with article
 */
export const formatWordWithArticle = (word: GermanWord): string => {
  if (isNounWord(word)) {
    return `${word.article} ${word.germanWord}`;
  }
  return word.germanWord;
};

/**
 * Collection of German words
 */
export interface GermanWordCollection {
  words: readonly GermanWord[];
  version: string;
  lastUpdated: string;
}

/**
 * Search filters for querying words
 */
export interface WordSearchFilter {
  type?: PartOfSpeech;
  article?: GermanArticle;
  case?: GrammaticalCase;
  searchTerm?: string;
}
