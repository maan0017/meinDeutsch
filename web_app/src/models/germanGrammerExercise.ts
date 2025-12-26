export type ExerciseType = "conjugation" | "article" | "pronoun";

export interface GrammarExercise {
  id: number;
  type: ExerciseType;
  category: string; // e.g., "Regular Verbs", "Dative Case"
  question: string; // The sentence with the blank
  hint?: string; // e.g., "(to come)", "(Definite Article, Masc.)"
  answer: string; // The correct answer
  options?: string[]; // Optional: for multiple choice questions
  explanation: string; // To explain the rule based on your notes
}
