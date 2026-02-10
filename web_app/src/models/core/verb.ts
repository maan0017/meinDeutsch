export type Person =
  | "ich"
  | "du"
  | "er_sie_es" // Grouped because they are always identical
  | "wir"
  | "ihr"
  | "sie_Sie"; // Plural sie and Formal Sie are identical

export type VerbTense =
  | "present" // Präsens (ich gehe)
  | "simple_past" // Präteritum (ich ging)
  | "perfect" // Perfekt (ich bin gegangen) - The "spoken past"
  | "future"; // Futur I (ich werde gehen)

export type ConjugationSet = {
  [key in Person]: string;
};

/**
 * Weak: Regular (machen -> machte -> gemacht)
 * Strong: Vowel change (fahren -> fuhr -> gefahren)
 * Mixed: Vowel change + t-ending (denken -> dachte -> gedacht)
 */
export type VerbRegularity = "weak" | "strong" | "mixed";

/**
 * Standard German classifications for vowel changes in present tense
 * e.g., "Du liest" (e -> ie) or "Du fährst" (a -> ä)
 */
export type VowelChange = "e-i" | "e-ie" | "a-ä" | null;

/**
 * Semantic Categories for Verbs (similar to Nouns)
 */
export type VerbCategory =
  // --- Existing ---
  | "motion" // gehen, fahren, rennen
  | "cognition" // denken, wissen, lernen
  | "communication" // sagen, sprechen, rufen
  | "perception" // sehen, hören, riechen
  | "possession" // haben, bekommen, besitzen
  | "state" // sein, bleiben, existieren
  | "action_object" // essen, bauen, kaufen

  // --- NEW ESSENTIALS ---

  /**
   * Position (Static)
   * Crucial in German! distinct from "State".
   * These define *how* something is located (usually Dative).
   * e.g., stehen (stand), liegen (lie), sitzen (sit), hängen (hang)
   */
  | "position"

  /**
   * Emotion & Feeling
   * Distinct from "Perception" (physical senses) and "Cognition" (mental).
   * e.g., lieben (love), hassen (hate), fürchten (fear), vermissen (miss)
   */
  | "emotion"

  /**
   * Process / Change of State
   * Verbs where the subject *changes* rather than acts.
   * e.g., werden (become), wachsen (grow), sterben (die), schmelzen (melt)
   */
  | "process"

  /**
   * Modal / Modality
   * These modify other verbs. Even if handled via grammar logic,
   * they are a distinct semantic category for vocabulary lists.
   * e.g., können (can), müssen (must), dürfen (allowed to), wollen (want)
   */
  | "modal"

  /**
   * Weather / Impersonal
   * Verbs that usually only work with "es" (Es regnet).
   * e.g., regnen (rain), schneien (snow), donnern (thunder)
   */
  | "weather";

// --- 2. The Perfect Verb Model ---

export interface VerbWord {
  type: "verb";
  category: VerbCategory;
  germanWord: string;
  hindiPronunciation: string;
  englishMeaning: string[];
  hindiMeaning: string[];
  description?: string;

  // --- Grammar Fundamentals ---
  // Essential for Perfect tense (haben/sein)
  auxiliary: "haben" | "sein";

  regularity: VerbRegularity; // Helps logic predict endings

  // --- The "Stammformen" (Principal Parts) ---
  // These 3 fields are the "DNA" of the verb.
  // From these, you can generate all other conjugations.

  /** * 3rd Person Singular Present
   * e.g., "fährt", "liest", "macht"
   * Stores the vowel change implicitly.
   */
  presentThirdPerson: string;

  /**
   * 1st/3rd Person Präteritum (Simple Past)
   * e.g., "fuhr", "las", "machte"
   * Essential for narrative past tense.
   */
  pastSimple: string;

  /**
   * Partizip II (Past Participle)
   * e.g., "gefahren", "gelesen", "gemacht"
   * Essential for Perfect and Passive voice.
   */
  pastParticiple: string;

  // --- Complexity Handlers ---
  isSeparable: boolean;

  /**
   * If defined, the verb is separable.
   * Store specifically the prefix string (e.g., "auf", "ein").
   * Logic: "aufstehen" -> prefix: "auf" -> "Ich stehe auf".
   */
  separablePrefix?: string;

  /**
   * Explicit metadata about vowel changes for UI highlights.
   * e.g., Show a tooltip: "Watch out! a changes to ä"
   */
  stemVowelChange?: VowelChange;

  /**
   * Does the verb require a reflexive pronoun?
   * e.g., "sich waschen" (Akk) vs "sich schaden" (Dat)
   */
  reflexiveCase?: "accusative" | "dative";

  /**
   * Case Government: Does this verb force a specific case on its object?
   * Default is usually Accusative, but "helfen" takes Dative.
   */
  government: "accusative" | "dative" | "genitive" | "prepositional"; // "What case does it trigger?"

  stem: string;

  // --- Conjugation Storage ---
  /**
   * Stores the fully conjugated strings.
   * Note: For separable verbs, we store the combined form here (e.g. "stehe auf")
   * or your UI logic separates them based on the 'separablePrefix' field.
   */
  conjugations: {
    [key in VerbTense]: ConjugationSet;
  };
}
