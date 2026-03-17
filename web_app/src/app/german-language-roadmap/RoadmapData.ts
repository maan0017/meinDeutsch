export type NodeType = "milestone" | "grammar" | "vocabulary";

export interface RoadmapNode {
  id: string;
  title: string;
  type: NodeType;
  level: "A1" | "A2";
  description?: string;
  href?: string;
}

export const roadmapData: RoadmapNode[] = [
  // A1 Level
  {
    id: "a1-start",
    title: "A1 Beginner",
    type: "milestone",
    level: "A1",
    description: "The foundation of German.",
  },
  {
    id: "a1-g1",
    title: "Alphabet & Pronunciation",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v1",
    title: "Greetings & Farewells",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-g2",
    title: "Personal Pronouns",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-g3",
    title: "Present Tense (Präsens) & Verb Position (V2)",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v2",
    title: "Numbers, Time, Days, Months, Seasons",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-g4",
    title: "Articles (der, die, das) & Plurals",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v3",
    title: "Family & Friends",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-g5",
    title: "Negation (nicht/kein) & Questions",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v4",
    title: "Food, Drink & Shopping",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-g6",
    title: "Cases: Nominative & Akkusativ",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v5",
    title: "Daily Routine, Directions & Transport",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-g7",
    title: "Modal Verbs",
    type: "grammar",
    level: "A1",
  },
  {
    id: "a1-v6",
    title: "Work, Basic Hobbies, Emails & Forms",
    type: "vocabulary",
    level: "A1",
  },
  {
    id: "a1-end",
    title: "A1 Mastery",
    type: "milestone",
    level: "A1",
    description: "You have mastered the basics!",
  },

  // A2 Level
  {
    id: "a2-start",
    title: "A2 Elementary",
    type: "milestone",
    level: "A2",
    description: "Building on the basics.",
  },
  {
    id: "a2-g1",
    title: "Past Tense: Perfekt (haben/sein)",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-v1",
    title: "Health, Body & Doctor",
    type: "vocabulary",
    level: "A2",
  },
  {
    id: "a2-g2",
    title: "Separable & Inseparable Verbs",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-v2",
    title: "Travels, Hotels & Directions",
    type: "vocabulary",
    level: "A2",
  },
  {
    id: "a2-g3",
    title: "Dative Case & Two-way Prepositions",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-v3",
    title: "Work & Workplace",
    type: "vocabulary",
    level: "A2",
  },
  {
    id: "a2-g4",
    title: "Comparatives & Superlatives",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-v4",
    title: "Media & Technology",
    type: "vocabulary",
    level: "A2",
  },
  {
    id: "a2-g5",
    title: "Reflexive Verbs & Imperativ",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-v5",
    title: "Simple Opinions",
    type: "vocabulary",
    level: "A2",
  },
  {
    id: "a2-g6",
    title: "Subordinate Clauses (weil, dass, wenn)",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-g7",
    title: "Adjective Endings",
    type: "grammar",
    level: "A2",
  },
  {
    id: "a2-end",
    title: "A2 Mastery",
    type: "milestone",
    level: "A2",
    description: "Ready for intermediate German!",
  },
];
