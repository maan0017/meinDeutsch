// ===== ENUMS / TYPES =====

export type GrammaticalCase = "nominativ" | "akkusativ" | "dativ" | "genitiv";

export type AuxiliaryVerb = "sein" | "haben" | "werden";

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

// ===== CORE MODELS =====

export interface PersonForms {
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
}

export interface Conjugations {
  present?: PersonForms;
  past?: PersonForms;
  perfect?: PersonForms;
  future?: PersonForms;
  konjunktiv1?: PersonForms;
  konjunktiv2?: PersonForms;
}

export interface ImperativeForms {
  du: string;
  ihr: string;
  sie: string;
  wir: string;
}

export interface VerbPreposition {
  preposition: string;
  case: GrammaticalCase;
  meaning?: string;
}

// ===== BASE WORD =====

export interface ExampleSentence {
  german: string;
  english: string;
  hindi?: string;
}

export interface BaseWord {
  germanWord: string;
  hindiPronunciation: string;
  englishMeaning: string[];
  hindiMeaning: string[];
  description?: string;
  type: PartOfSpeech;
  audioUrl?: string;
  tags?: string[];
  priority: number; // 1–10 (not enforced, your job)
  difficulty: number; // 1–10
  germanLevel: string; // a1–c2 (you should make this stricter)
  synonyms?: string[];
  antonyms?: string[];
  exampleSentences?: ExampleSentence[];
}

// ===== VERB MODEL =====

export interface VerbWord extends BaseWord {
  // Core Grammar
  auxiliary?: AuxiliaryVerb;
  isReflexive?: boolean;
  reflexiveCase?: GrammaticalCase;
  separable?: boolean;
  prefix?: string;
  irregular?: boolean;
  stemVowelChange?: string;
  isModalVerb?: boolean;

  // Principal Parts
  thirdPersonSingular?: string;
  simplePast?: string;
  pastParticiple?: string;

  // Advanced
  requiresCase?: GrammaticalCase[];
  prepositions?: VerbPreposition[];

  // Conjugations
  conjugations?: Conjugations;
  imperative?: ImperativeForms;

  // Word Family
  relatedNouns?: string[];
  relatedAdjectives?: string[];
}
