const germanGrammar = {
  // Personal Pronouns
  personalPronouns: {
    singular: [
      {
        person: "1st",
        nominative: "ich",
        accusative: "mich",
        dative: "mir",
        hindi: "मैं / मुझे / मुझको",
      },
      {
        person: "2nd",
        nominative: "du",
        accusative: "dich",
        dative: "dir",
        hindi: "तू / तुम / तुझे",
      },
      {
        person: "3rd_masculine",
        nominative: "er",
        accusative: "ihn",
        dative: "ihm",
        hindi: "वह / उसको / उसे",
      },
      {
        person: "3rd_feminine",
        nominative: "sie",
        accusative: "sie",
        dative: "ihr",
        hindi: "वह / उसको / उसे",
      },
      {
        person: "3rd_neuter",
        nominative: "es",
        accusative: "es",
        dative: "ihm",
        hindi: "वह / उसको / उसे",
      },
    ],
    plural: [
      {
        person: "1st",
        nominative: "wir",
        accusative: "uns",
        dative: "uns",
        hindi: "हम / हमें / हम लोग",
      },
      {
        person: "2nd",
        nominative: "ihr",
        accusative: "euch",
        dative: "euch",
        hindi: "तुम लोग / आप लोग",
      },
      {
        person: "3rd",
        nominative: "sie",
        accusative: "sie",
        dative: "ihnen",
        hindi: "वे / उनको / उन्हें",
      },
      {
        person: "formal",
        nominative: "Sie",
        accusative: "Sie",
        dative: "Ihnen",
        hindi: "आप / आपको / आप सब को",
      },
    ],
  },

  // Possessive Pronouns (Nominative, Accusative, Dative)
  possessivePronouns: [
    {
      person: "ich",
      nominative: { M: "mein", F: "meine", N: "mein", Pl: "meine" },
      accusative: { M: "meinen", F: "meine", N: "mein", Pl: "meine" },
      dative: { M: "meinem", F: "meiner", N: "meinem", Pl: "meinen" },
      hindi: "मेरा / मेरी / मेरे",
    },
    {
      person: "du",
      nominative: { M: "dein", F: "deine", N: "dein", Pl: "deine" },
      accusative: { M: "deinen", F: "deine", N: "dein", Pl: "deine" },
      dative: { M: "deinem", F: "deiner", N: "deinem", Pl: "deinen" },
      hindi: "तेरा / तेरी / तेरे",
    },
    {
      person: "er/es",
      nominative: { M: "sein", F: "seine", N: "sein", Pl: "seine" },
      accusative: { M: "seinen", F: "seine", N: "sein", Pl: "seine" },
      dative: { M: "seinem", F: "seiner", N: "seinem", Pl: "seinen" },
      hindi: "उसका / उसकी / उसके",
    },
    {
      person: "sie",
      nominative: { M: "ihr", F: "ihre", N: "ihr", Pl: "ihre" },
      accusative: { M: "ihren", F: "ihre", N: "ihr", Pl: "ihre" },
      dative: { M: "ihrem", F: "ihrer", N: "ihrem", Pl: "ihren" },
      hindi: "उसका / उसकी / उसके",
    },
    {
      person: "wir",
      nominative: { M: "unser", F: "unsere", N: "unser", Pl: "unsere" },
      accusative: { M: "unseren", F: "unsere", N: "unser", Pl: "unsere" },
      dative: { M: "unserem", F: "unserer", N: "unserem", Pl: "unseren" },
      hindi: "हमारा / हमारी / हमारे",
    },
    {
      person: "ihr",
      nominative: { M: "euer", F: "eure", N: "euer", Pl: "eure" },
      accusative: { M: "euren", F: "eure", N: "euer", Pl: "eure" },
      dative: { M: "eurem", F: "eurer", N: "eurem", Pl: "euren" },
      hindi: "तुम्हारा / तुम्हारी / तुम्हारे",
    },
    {
      person: "sie/Sie",
      nominative: {
        M: "ihr/Ihr",
        F: "ihre/Ihre",
        N: "ihr/Ihr",
        Pl: "ihre/Ihre",
      },
      accusative: {
        M: "ihren/Ihren",
        F: "ihre/Ihre",
        N: "ihr/Ihr",
        Pl: "ihre/Ihre",
      },
      dative: {
        M: "ihrem/Ihrem",
        F: "ihrer/Ihrer",
        N: "ihrem/Ihrem",
        Pl: "ihren/Ihren",
      },
      hindi: "उनका / आपका",
    },
  ],

  // Definite Articles (der, die, das)
  definiteArticles: {
    bestimmte: {
      nominative: { M: "der", F: "die", N: "das", Pl: "die" },
      accusative: { M: "den", F: "die", N: "das", Pl: "die" },
      dative: { M: "dem", F: "der", N: "dem", Pl: "den" },
    },
  },

  // Indefinite Articles (ein, eine)
  indefiniteArticles: {
    unbestimmte: {
      nominative: { M: "ein", F: "eine", N: "ein", Pl: "—" },
      accusative: { M: "einen", F: "eine", N: "ein", Pl: "—" },
      dative: { M: "einem", F: "einer", N: "einem", Pl: "—" },
    },
    negative: {
      nominative: { M: "kein", F: "keine", N: "kein", Pl: "keine" },
      accusative: { M: "keinen", F: "keine", N: "kein", Pl: "keine" },
      dative: { M: "keinem", F: "keiner", N: "keinem", Pl: "keinen" },
    },
  },

  // Sentence Structure Rules
  sentenceStructure: {
    NVDA: {
      description: "Nominative + Verb + Dative + Accusative",
      example: {
        german: "Ich gebe dem Mann ein Brot",
        structure: "N(ich) + V(gebe) + D(dem Mann) + A(ein Brot)",
        english: "I give the man a bread",
        hindi: "मैं आदमी को एक रोटी देता हूं",
      },
    },
  },

  // Pronoun endings patterns
  pronounEndings: {
    personToEnding: [
      { pronoun: "ich", ending: "-e" },
      { pronoun: "du", ending: "-st" },
      { pronoun: "er/sie/es", ending: "-t" },
      { pronoun: "wir", ending: "-en" },
      { pronoun: "ihr", ending: "-t" },
      { pronoun: "sie/Sie", ending: "-en" },
    ],
  },
};

// Export for use
export default germanGrammar;
