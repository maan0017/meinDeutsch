import germanGrammar from "@/data/germanGrammer";

export interface GrammarQuestion {
  question: string;
  answer: string;
  category: string;
  subCategory: string;
  hint?: string;
}

type QuestionGenerator = () => GrammarQuestion;

const generators: QuestionGenerator[] = [
  // 1. Personal Pronouns (Nominative, Accusative, Dative)
  () => {
    const categories = ["singular", "plural"] as const;
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const list = germanGrammar.personalPronouns[cat];
    const item = list[Math.floor(Math.random() * list.length)];

    const cases = ["nominative", "accusative", "dative"] as const;
    const targetCase = cases[Math.floor(Math.random() * cases.length)];

    let personLabel = item.person;
    if (personLabel === "3rd_masculine") personLabel = "er";
    if (personLabel === "3rd_feminine") personLabel = "sie";
    if (personLabel === "3rd_neuter") personLabel = "es";

    return {
      category: "Personal Pronouns",
      subCategory: `${cat} - ${targetCase}`,
      question: `What is the ${targetCase} form of '${personLabel}'?`,
      answer: item[targetCase],
    };
  },

  // 2. Possessive Pronouns
  () => {
    const list = germanGrammar.possessivePronouns;
    const item = list[Math.floor(Math.random() * list.length)];

    const cases = ["nominative", "accusative", "dative"] as const;
    const targetCase = cases[Math.floor(Math.random() * cases.length)];

    const genders = ["M", "F", "N", "Pl"] as const;
    const targetGender = genders[Math.floor(Math.random() * genders.length)];

    const genderLabelMap: Record<string, string> = {
      M: "Masculine",
      F: "Feminine",
      N: "Neuter",
      Pl: "Plural",
    };

    return {
      category: "Possessive Pronouns",
      subCategory: `${targetCase} - ${genderLabelMap[targetGender]}`,
      question: `Possessive for '${item.person}' (${targetCase}, ${genderLabelMap[targetGender]})?`,
      answer: item[targetCase][targetGender],
    };
  },

  // 3. Definite Articles
  () => {
    const cases = ["nominative", "accusative", "dative"] as const;
    const targetCase = cases[Math.floor(Math.random() * cases.length)];

    const genders = ["M", "F", "N", "Pl"] as const;
    const targetGender = genders[Math.floor(Math.random() * genders.length)];

    const genderLabelMap: Record<string, string> = {
      M: "Masculine",
      F: "Feminine",
      N: "Neuter",
      Pl: "Plural",
    };

    return {
      category: "Definite Articles",
      subCategory: `${targetCase} - ${genderLabelMap[targetGender]}`,
      question: `Definite Article (${targetCase}, ${genderLabelMap[targetGender]})?`,
      answer:
        germanGrammar.definiteArticles.bestimmte[targetCase][targetGender],
    };
  },

  // 4. Indefinite Articles (Unbestimmte & Negative)
  () => {
    const types = ["unbestimmte", "negative"] as const;
    const targetType = types[Math.floor(Math.random() * types.length)];

    const cases = ["nominative", "accusative", "dative"] as const;
    const targetCase = cases[Math.floor(Math.random() * cases.length)];

    const genders = ["M", "F", "N"] as const; // Plural only for negative usually, simplifying logic or handling specifically
    let targetGender = genders[
      Math.floor(Math.random() * genders.length)
    ] as string;

    if (targetType === "negative" && Math.random() > 0.75) {
      targetGender = "Pl"; // Chance for plural in negative
    }

    const genderLabelMap: Record<string, string> = {
      M: "Masculine",
      F: "Feminine",
      N: "Neuter",
      Pl: "Plural",
    };

    // Skip Plural for 'unbestimmte' (ein) as it doesn't exist ("—")
    if (targetType === "unbestimmte" && targetGender === "Pl") {
      targetGender = "M";
    }

    const typeLabel = targetType === "unbestimmte" ? "Indefinite" : "Negative";

    const answer = (
      germanGrammar.indefiniteArticles[targetType][targetCase] as any
    )[targetGender];

    return {
      category: `${typeLabel} Articles`,
      subCategory: `${targetCase} - ${genderLabelMap[targetGender]}`,
      question: `${typeLabel} Article (${targetCase}, ${genderLabelMap[targetGender]})?`,
      answer: answer,
    };
  },

  // 5. Verb Conjugations
  () => {
    const verbTypes = [
      "typeA_regular",
      "nominativeVerbs",
      "dativeVerbs",
    ] as const;
    const targetType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
    const list = germanGrammar.verbConjugations[targetType];
    const verb = list[Math.floor(Math.random() * list.length)];

    const persons = [
      "ich",
      "du",
      "er/sie/es",
      "wir",
      "ihr",
      "sie/Sie",
    ] as const;
    const targetPerson = persons[Math.floor(Math.random() * persons.length)];

    return {
      category: "Verb Conjugation",
      subCategory: `${verb.meaning} (${verb.hindi})`,
      question: `Conjugate '${verb.infinitive}' for '${targetPerson}'`,
      answer: verb.conjugation[targetPerson],
      hint: verb.meaning,
    };
  },
];

export const getRandomGrammarQuestion = (): GrammarQuestion => {
  const generator = generators[Math.floor(Math.random() * generators.length)];
  return generator();
};

export const getTotalQuestionsCount = (): number => {
  // 1. Personal Pronouns
  // Singular: 5 items * 3 cases (Nom, Acc, Dat)
  const personalSingular = germanGrammar.personalPronouns.singular.length * 3;
  // Plural: 4 items * 3 cases
  const personalPlural = germanGrammar.personalPronouns.plural.length * 3;

  // 2. Possessive Pronouns
  // 7 items * 3 cases * 4 genders (M, F, N, Pl)
  const possessive = germanGrammar.possessivePronouns.length * 3 * 4;

  // 3. Definite Articles
  // 3 cases * 4 genders
  const definite = 3 * 4;

  // 4. Indefinite Articles
  // Unbestimmte: 3 cases * 3 genders (M, F, N) - Plural doesn't exist
  const indefiniteUnbestimmte = 3 * 3;
  // Negative: 3 cases * 4 genders (M, F, N, Pl)
  const indefiniteNegative = 3 * 4;

  // 5. Verb Conjugations
  // sum of all verb lists * 6 persons
  const regularVerbs = germanGrammar.verbConjugations.typeA_regular.length * 6;
  const nominativeVerbs =
    germanGrammar.verbConjugations.nominativeVerbs.length * 6;
  const dativeVerbs = germanGrammar.verbConjugations.dativeVerbs.length * 6;

  return (
    personalSingular +
    personalPlural +
    possessive +
    definite +
    indefiniteUnbestimmte +
    indefiniteNegative +
    regularVerbs +
    nominativeVerbs +
    dativeVerbs
  );
};
