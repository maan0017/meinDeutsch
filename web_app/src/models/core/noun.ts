export type NounCategory =
  // --- ANIMALS (Expanded) ---
  | "animal_mammal" // Mammals (Hund, Katze, Löwe, Elefant)
  | "animal_bird" // Birds (Vogel, Ente, Adler)
  | "animal_fish" // Fish & Marine Life (Fisch, Hai, Wal)
  | "animal_insect" // Insects & Spiders (Biene, Spinne, Ameise)
  | "animal_reptile" // Reptiles & Amphibians (Schlange, Frosch, Schildkröte)

  // --- Living & People ---
  | "person" // Family, generic people
  | "profession" // Jobs
  | "body_part" // Anatomy

  // --- Food & Kitchen ---
  | "fruit"
  | "vegetable"
  | "food_drink" // General meals, dairy, meat

  // --- Objects & Daily Life ---
  | "clothing"
  | "furniture"
  | "household"
  | "electronics"
  | "technology"
  | "tool"

  // --- Places & Nature ---
  | "place"
  | "transport"
  | "geography"
  | "nature" // Trees, flowers, weather

  // --- Abstract ---
  | "time"
  | "education"
  | "health"
  | "finance"
  | "concept"
  | "measurement";

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

  category: NounCategory;
}
