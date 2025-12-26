import { GrammarExercise } from "@/models/germanGrammerExercise";

export const grammarExercises: GrammarExercise[] = [
  // ==========================================
  // SECTION 1: VERB CONJUGATION - PRESENT TENSE
  // ==========================================

  // Regular Verbs (Type A)
  {
    id: 1,
    type: "conjugation",
    category: "Regular Verbs - Present Tense",
    question: "Ich ______ (kommen) aus Indien.",
    hint: "kommen → to come",
    answer: "komme",
    explanation: "Regular verbs add -e for 'ich'. Stem: komm + e = komme",
  },
  {
    id: 2,
    type: "conjugation",
    category: "Regular Verbs - Present Tense",
    question: "Du ______ (lernen) Deutsch.",
    hint: "lernen → to learn",
    answer: "lernst",
    explanation: "For 'du', add -st to the stem. Stem: lern + st = lernst",
  },
  {
    id: 3,
    type: "conjugation",
    category: "Regular Verbs - Present Tense",
    question: "Er ______ (wohnen) in Berlin.",
    hint: "wohnen → to live",
    answer: "wohnt",
    explanation: "For 'er/sie/es', add -t to the stem. Stem: wohn + t = wohnt",
  },
  {
    id: 4,
    type: "conjugation",
    category: "Regular Verbs - Present Tense",
    question: "Wir ______ (spielen) Fußball.",
    hint: "spielen → to play",
    answer: "spielen",
    explanation: "For 'wir', use the infinitive form (stem + en).",
  },

  // Type B Verbs (stems ending in -t, -d, -n, -m)
  {
    id: 5,
    type: "conjugation",
    category: "Type B Verbs - Present Tense",
    question: "Du ______ (arbeiten) heute.",
    hint: "arbeiten → to work",
    answer: "arbeitest",
    explanation:
      "Stems ending in -t need an extra 'e' before the ending: arbeit-e-st",
  },
  {
    id: 6,
    type: "conjugation",
    category: "Type B Verbs - Present Tense",
    question: "Sie ______ (finden) das Buch.",
    hint: "finden → to find",
    answer: "findet",
    explanation: "Stems ending in -d add an 'e': find-e-t",
  },
  {
    id: 7,
    type: "conjugation",
    category: "Type B Verbs - Present Tense",
    question: "Ihr ______ (öffnen) die Tür.",
    hint: "öffnen → to open",
    answer: "öffnet",
    explanation: "Stems ending in -n after a consonant add 'e': öffn-e-t",
  },

  // Special cases (Verbs ending in -s, -z, -ß)
  {
    id: 8,
    type: "conjugation",
    category: "Special Verbs - s/z endings",
    question: "Du ______ (tanzen) sehr gut.",
    hint: "tanzen → to dance",
    answer: "tanzt",
    explanation:
      "When stem ends in -z, the 'du' ending loses the 's': tanz-t (not tanzt-st)",
  },
  {
    id: 9,
    type: "conjugation",
    category: "Special Verbs - s/z endings",
    question: "Du ______ (reisen) nach Deutschland.",
    hint: "reisen → to travel",
    answer: "reist",
    explanation: "When stem ends in -s, use only -t for 'du': reis-t",
  },
  {
    id: 10,
    type: "conjugation",
    category: "Special Verbs - s/z endings",
    question: "Du ______ (heißen) Maria.",
    hint: "heißen → to be called",
    answer: "heißt",
    explanation: "Stem ends in -ß, so 'du' takes only -t: heiß-t",
  },

  // Irregular Verbs - sein
  {
    id: 11,
    type: "conjugation",
    category: "Irregular Verbs - sein",
    question: "Ich ______ (sein) Student.",
    hint: "sein → to be",
    answer: "bin",
    options: ["bin", "bist", "ist", "sind"],
    explanation:
      "'Sein' is completely irregular. ich bin, du bist, er/sie/es ist, wir sind",
  },
  {
    id: 12,
    type: "conjugation",
    category: "Irregular Verbs - sein",
    question: "Du ______ (sein) sehr nett.",
    hint: "sein → to be",
    answer: "bist",
    options: ["bin", "bist", "ist", "sind"],
    explanation: "'Du' form of sein is 'bist'.",
  },
  {
    id: 13,
    type: "conjugation",
    category: "Irregular Verbs - sein",
    question: "Wir ______ (sein) Freunde.",
    hint: "sein → to be",
    answer: "sind",
    options: ["bin", "bist", "ist", "sind"],
    explanation: "'Wir' form of sein is 'sind'.",
  },

  // Irregular Verbs - haben
  {
    id: 14,
    type: "conjugation",
    category: "Irregular Verbs - haben",
    question: "Ich ______ (haben) einen Hund.",
    hint: "haben → to have",
    answer: "habe",
    options: ["habe", "hast", "hat", "haben"],
    explanation: "'Haben' conjugation: ich habe, du hast, er/sie/es hat",
  },
  {
    id: 15,
    type: "conjugation",
    category: "Irregular Verbs - haben",
    question: "Du ______ (haben) Zeit.",
    hint: "haben → to have",
    answer: "hast",
    options: ["habe", "hast", "hat", "haben"],
    explanation: "'Du' form of haben is 'hast'.",
  },
  {
    id: 16,
    type: "conjugation",
    category: "Irregular Verbs - haben",
    question: "Er ______ (haben) ein Auto.",
    hint: "haben → to have",
    answer: "hat",
    options: ["habe", "hast", "hat", "haben"],
    explanation: "'Er/sie/es' form of haben is 'hat'.",
  },

  // Irregular Verbs - werden
  {
    id: 17,
    type: "conjugation",
    category: "Irregular Verbs - werden",
    question: "Ich ______ (werden) Arzt.",
    hint: "werden → to become",
    answer: "werde",
    options: ["werde", "wirst", "wird", "werden"],
    explanation: "'Werden': ich werde, du wirst, er/sie/es wird",
  },

  // ==========================================
  // SECTION 2: PERSONAL PRONOUNS
  // ==========================================

  // Nominative Personal Pronouns
  {
    id: 18,
    type: "pronoun",
    category: "Personal Pronouns - Nominative",
    question: "______ bin Student. (I)",
    hint: "Nominativ - Subject",
    answer: "Ich",
    options: ["Ich", "Du", "Er", "Wir"],
    explanation:
      "'I' in German is 'Ich' (Nominative case - subject of sentence).",
  },
  {
    id: 19,
    type: "pronoun",
    category: "Personal Pronouns - Nominative",
    question: "______ bist mein Freund. (You - informal)",
    hint: "Nominativ - Subject",
    answer: "Du",
    options: ["Ich", "Du", "Er", "Sie"],
    explanation: "'You' (informal) is 'Du' (Nominative case).",
  },
  {
    id: 20,
    type: "pronoun",
    category: "Personal Pronouns - Nominative",
    question: "______ sind Lehrer. (They)",
    hint: "Nominativ - Subject",
    answer: "Sie",
    options: ["Wir", "Ihr", "Sie", "Du"],
    explanation: "'They' is 'Sie' (Nominative). Same spelling as formal 'You'.",
  },

  // Accusative Personal Pronouns
  {
    id: 21,
    type: "pronoun",
    category: "Personal Pronouns - Accusative",
    question: "Er sieht ______. (me)",
    hint: "Akkusativ - Direct Object",
    answer: "mich",
    options: ["ich", "mich", "mir", "mein"],
    explanation: "'Me' as direct object is 'mich' (Accusative case).",
  },
  {
    id: 22,
    type: "pronoun",
    category: "Personal Pronouns - Accusative",
    question: "Ich liebe ______. (you - informal)",
    hint: "Akkusativ - Direct Object",
    answer: "dich",
    options: ["du", "dich", "dir", "dein"],
    explanation: "'You' (informal) as direct object is 'dich' (Accusative).",
  },
  {
    id: 23,
    type: "pronoun",
    category: "Personal Pronouns - Accusative",
    question: "Wir besuchen ______. (him)",
    hint: "Akkusativ - Direct Object",
    answer: "ihn",
    options: ["er", "ihn", "ihm", "sein"],
    explanation: "'Him' as direct object is 'ihn' (Accusative case).",
  },
  {
    id: 24,
    type: "pronoun",
    category: "Personal Pronouns - Accusative",
    question: "Sie kennt ______. (her)",
    hint: "Akkusativ - Direct Object",
    answer: "sie",
    options: ["sie", "ihr", "ihnen", "ihre"],
    explanation:
      "'Her' as direct object is 'sie' (Accusative - same as Nominative for sie).",
  },

  // Dative Personal Pronouns
  {
    id: 25,
    type: "pronoun",
    category: "Personal Pronouns - Dative",
    question: "Er hilft ______. (me)",
    hint: "Dativ - Indirect Object",
    answer: "mir",
    options: ["ich", "mich", "mir", "mein"],
    explanation: "'Me' as indirect object is 'mir' (Dative case).",
  },
  {
    id: 26,
    type: "pronoun",
    category: "Personal Pronouns - Dative",
    question: "Ich gebe ______ das Buch. (you - informal)",
    hint: "Dativ - Indirect Object",
    answer: "dir",
    options: ["du", "dich", "dir", "dein"],
    explanation: "'You' (informal) as indirect object is 'dir' (Dative).",
  },
  {
    id: 27,
    type: "pronoun",
    category: "Personal Pronouns - Dative",
    question: "Wir danken ______. (him)",
    hint: "Dativ - Indirect Object",
    answer: "ihm",
    options: ["er", "ihn", "ihm", "sein"],
    explanation: "'Him' as indirect object is 'ihm' (Dative case).",
  },
  {
    id: 28,
    type: "pronoun",
    category: "Personal Pronouns - Dative",
    question: "Das gehört ______. (us)",
    hint: "Dativ - Indirect Object",
    answer: "uns",
    options: ["wir", "unser", "uns", "unsere"],
    explanation:
      "'Us' as indirect object is 'uns' (Dative - same as Accusative).",
  },

  // ==========================================
  // SECTION 3: DEFINITE ARTICLES (DER, DIE, DAS)
  // ==========================================

  // Nominative - Definite Articles
  {
    id: 29,
    type: "article",
    category: "Definite Articles - Nominative",
    question: "______ Mann ist groß. (Masculine)",
    hint: "Nominativ - Subject",
    answer: "Der",
    options: ["Der", "Die", "Das", "Den"],
    explanation: "Masculine Nominative definite article is 'Der'.",
  },
  {
    id: 30,
    type: "article",
    category: "Definite Articles - Nominative",
    question: "______ Frau ist schön. (Feminine)",
    hint: "Nominativ - Subject",
    answer: "Die",
    options: ["Der", "Die", "Das", "Den"],
    explanation: "Feminine Nominative definite article is 'Die'.",
  },
  {
    id: 31,
    type: "article",
    category: "Definite Articles - Nominative",
    question: "______ Kind spielt. (Neuter)",
    hint: "Nominativ - Subject",
    answer: "Das",
    options: ["Der", "Die", "Das", "Den"],
    explanation: "Neuter Nominative definite article is 'Das'.",
  },
  {
    id: 32,
    type: "article",
    category: "Definite Articles - Nominative",
    question: "______ Kinder spielen. (Plural)",
    hint: "Nominativ - Subject",
    answer: "Die",
    options: ["Der", "Die", "Das", "Den"],
    explanation:
      "Plural Nominative definite article is 'Die' (for all genders).",
  },

  // Accusative - Definite Articles
  {
    id: 33,
    type: "article",
    category: "Definite Articles - Accusative",
    question: "Ich sehe ______ Mann. (Masculine)",
    hint: "Akkusativ - Direct Object",
    answer: "den",
    options: ["der", "den", "dem", "des"],
    explanation:
      "Masculine Accusative definite article is 'den' (Der changes to den).",
  },
  {
    id: 34,
    type: "article",
    category: "Definite Articles - Accusative",
    question: "Er kennt ______ Frau. (Feminine)",
    hint: "Akkusativ - Direct Object",
    answer: "die",
    options: ["der", "die", "das", "den"],
    explanation:
      "Feminine Accusative article is 'die' (stays the same as Nominative).",
  },
  {
    id: 35,
    type: "article",
    category: "Definite Articles - Accusative",
    question: "Wir lieben ______ Buch. (Neuter)",
    hint: "Akkusativ - Direct Object",
    answer: "das",
    options: ["der", "die", "das", "den"],
    explanation:
      "Neuter Accusative article is 'das' (stays the same as Nominative).",
  },
  {
    id: 36,
    type: "article",
    category: "Definite Articles - Accusative",
    question: "Sie besucht ______ Kinder. (Plural)",
    hint: "Akkusativ - Direct Object",
    answer: "die",
    options: ["der", "die", "das", "den"],
    explanation:
      "Plural Accusative article is 'die' (stays the same as Nominative).",
  },

  // Dative - Definite Articles
  {
    id: 37,
    type: "article",
    category: "Definite Articles - Dative",
    question: "Ich helfe ______ Mann. (Masculine)",
    hint: "Dativ - Indirect Object",
    answer: "dem",
    options: ["der", "die", "das", "dem"],
    explanation: "Masculine Dative definite article is 'dem'.",
  },
  {
    id: 38,
    type: "article",
    category: "Definite Articles - Dative",
    question: "Er dankt ______ Frau. (Feminine)",
    hint: "Dativ - Indirect Object",
    answer: "der",
    options: ["der", "die", "das", "dem"],
    explanation: "Feminine Dative definite article is 'der'.",
  },
  {
    id: 39,
    type: "article",
    category: "Definite Articles - Dative",
    question: "Wir geben ______ Kind ein Geschenk. (Neuter)",
    hint: "Dativ - Indirect Object",
    answer: "dem",
    options: ["der", "die", "das", "dem"],
    explanation: "Neuter Dative definite article is 'dem'.",
  },
  {
    id: 40,
    type: "article",
    category: "Definite Articles - Dative",
    question: "Sie spricht mit ______ Kindern. (Plural)",
    hint: "Dativ - Indirect Object + Plural noun adds 'n'",
    answer: "den",
    options: ["der", "die", "das", "den"],
    explanation:
      "Plural Dative article is 'den' AND the noun adds 'n' or 'en'.",
  },

  // ==========================================
  // SECTION 4: INDEFINITE ARTICLES (EIN, EINE)
  // ==========================================

  // Nominative - Indefinite Articles
  {
    id: 41,
    type: "article",
    category: "Indefinite Articles - Nominative",
    question: "Das ist ______ Hund. (Masculine)",
    hint: "Nominativ - Indefinite",
    answer: "ein",
    options: ["ein", "eine", "einen", "einem"],
    explanation: "Masculine Nominative indefinite article is 'ein'.",
  },
  {
    id: 42,
    type: "article",
    category: "Indefinite Articles - Nominative",
    question: "Das ist ______ Katze. (Feminine)",
    hint: "Nominativ - Indefinite",
    answer: "eine",
    options: ["ein", "eine", "einen", "einem"],
    explanation: "Feminine Nominative indefinite article is 'eine'.",
  },
  {
    id: 43,
    type: "article",
    category: "Indefinite Articles - Nominative",
    question: "Das ist ______ Auto. (Neuter)",
    hint: "Nominativ - Indefinite",
    answer: "ein",
    options: ["ein", "eine", "einen", "einem"],
    explanation:
      "Neuter Nominative indefinite article is 'ein' (same as Masculine).",
  },

  // Accusative - Indefinite Articles
  {
    id: 44,
    type: "article",
    category: "Indefinite Articles - Accusative",
    question: "Ich habe ______ Hund. (Masculine)",
    hint: "Akkusativ - Indefinite",
    answer: "einen",
    options: ["ein", "eine", "einen", "einem"],
    explanation:
      "Masculine Accusative indefinite article is 'einen' (ein changes!).",
  },
  {
    id: 45,
    type: "article",
    category: "Indefinite Articles - Accusative",
    question: "Er kauft ______ Katze. (Feminine)",
    hint: "Akkusativ - Indefinite",
    answer: "eine",
    options: ["ein", "eine", "einen", "einem"],
    explanation:
      "Feminine Accusative is 'eine' (stays the same as Nominative).",
  },
  {
    id: 46,
    type: "article",
    category: "Indefinite Articles - Accusative",
    question: "Wir sehen ______ Haus. (Neuter)",
    hint: "Akkusativ - Indefinite",
    answer: "ein",
    options: ["ein", "eine", "einen", "einem"],
    explanation: "Neuter Accusative is 'ein' (stays the same as Nominative).",
  },

  // Dative - Indefinite Articles
  {
    id: 47,
    type: "article",
    category: "Indefinite Articles - Dative",
    question: "Ich helfe ______ Mann. (Masculine)",
    hint: "Dativ - Indefinite",
    answer: "einem",
    options: ["ein", "eine", "einen", "einem"],
    explanation: "Masculine Dative indefinite article is 'einem'.",
  },
  {
    id: 48,
    type: "article",
    category: "Indefinite Articles - Dative",
    question: "Er gibt ______ Frau Blumen. (Feminine)",
    hint: "Dativ - Indefinite",
    answer: "einer",
    options: ["ein", "eine", "einen", "einer"],
    explanation: "Feminine Dative indefinite article is 'einer'.",
  },
  {
    id: 49,
    type: "article",
    category: "Indefinite Articles - Dative",
    question: "Sie spricht mit ______ Kind. (Neuter)",
    hint: "Dativ - Indefinite",
    answer: "einem",
    options: ["ein", "eine", "einen", "einem"],
    explanation:
      "Neuter Dative indefinite article is 'einem' (same as Masculine).",
  },

  // ==========================================
  // SECTION 5: POSSESSIVE ARTICLES (MEIN, DEIN, etc.)
  // ==========================================

  // Nominative - Possessive
  {
    id: 50,
    type: "pronoun",
    category: "Possessive Articles - Nominative",
    question: "______ Vater ist Arzt. (My - Masc)",
    hint: "mein - Nominativ Maskulin",
    answer: "Mein",
    options: ["Mein", "Meine", "Meinen", "Meinem"],
    explanation: "Possessive 'my' for Masculine Nominative is 'mein'.",
  },
  {
    id: 51,
    type: "pronoun",
    category: "Possessive Articles - Nominative",
    question: "______ Mutter ist Lehrerin. (My - Fem)",
    hint: "mein - Nominativ Feminin",
    answer: "Meine",
    options: ["Mein", "Meine", "Meinen", "Meiner"],
    explanation: "Possessive 'my' for Feminine Nominative is 'meine'.",
  },
  {
    id: 52,
    type: "pronoun",
    category: "Possessive Articles - Nominative",
    question: "______ Bruder studiert. (Your informal - Masc)",
    hint: "dein - Nominativ Maskulin",
    answer: "Dein",
    options: ["Dein", "Deine", "Deinen", "Deinem"],
    explanation:
      "Possessive 'your' (informal) for Masculine Nominative is 'dein'.",
  },

  // Accusative - Possessive
  {
    id: 53,
    type: "pronoun",
    category: "Possessive Articles - Accusative",
    question: "Ich sehe ______ Vater. (my - Masc)",
    hint: "mein - Akkusativ Maskulin",
    answer: "meinen",
    options: ["mein", "meine", "meinen", "meinem"],
    explanation: "Possessive 'my' for Masculine Accusative is 'meinen'.",
  },
  {
    id: 54,
    type: "pronoun",
    category: "Possessive Articles - Accusative",
    question: "Er liebt ______ Schwester. (his - Fem)",
    hint: "sein - Akkusativ Feminin",
    answer: "seine",
    options: ["sein", "seine", "seinen", "seinem"],
    explanation: "Possessive 'his' for Feminine Accusative is 'seine'.",
  },
  {
    id: 55,
    type: "pronoun",
    category: "Possessive Articles - Accusative",
    question: "Wir besuchen ______ Eltern. (our - Plural)",
    hint: "unser - Akkusativ Plural",
    answer: "unsere",
    options: ["unser", "unsere", "unseren", "unserem"],
    explanation: "Possessive 'our' for Plural Accusative is 'unsere'.",
  },

  // Dative - Possessive
  {
    id: 56,
    type: "pronoun",
    category: "Possessive Articles - Dative",
    question: "Ich helfe ______ Bruder. (my - Masc)",
    hint: "mein - Dativ Maskulin",
    answer: "meinem",
    options: ["mein", "meine", "meinen", "meinem"],
    explanation: "Possessive 'my' for Masculine Dative is 'meinem'.",
  },
  {
    id: 57,
    type: "pronoun",
    category: "Possessive Articles - Dative",
    question: "Er dankt ______ Mutter. (his - Fem)",
    hint: "sein - Dativ Feminin",
    answer: "seiner",
    options: ["sein", "seine", "seinen", "seiner"],
    explanation: "Possessive 'his' for Feminine Dative is 'seiner'.",
  },
  {
    id: 58,
    type: "pronoun",
    category: "Possessive Articles - Dative",
    question: "Sie spricht mit ______ Freunden. (her - Plural)",
    hint: "ihr - Dativ Plural",
    answer: "ihren",
    options: ["ihr", "ihre", "ihren", "ihrem"],
    explanation: "Possessive 'her' for Plural Dative is 'ihren' (adds -n).",
  },

  // ==========================================
  // SECTION 6: NEGATIVE ARTICLES (KEIN/KEINE)
  // ==========================================

  {
    id: 59,
    type: "article",
    category: "Negative Articles - Nominative",
    question: "Das ist ______ Hund. (no dog - Masc)",
    hint: "kein - Nominativ",
    answer: "kein",
    options: ["kein", "keine", "keinen", "keinem"],
    explanation: "Negative article 'kein' for Masculine Nominative.",
  },
  {
    id: 60,
    type: "article",
    category: "Negative Articles - Accusative",
    question: "Ich habe ______ Zeit. (no time - Fem)",
    hint: "kein - Akkusativ",
    answer: "keine",
    options: ["kein", "keine", "keinen", "keinem"],
    explanation: "Negative article 'keine' for Feminine Accusative.",
  },
  {
    id: 61,
    type: "article",
    category: "Negative Articles - Accusative",
    question: "Er hat ______ Auto. (no car - Neut)",
    hint: "kein - Akkusativ",
    answer: "kein",
    options: ["kein", "keine", "keinen", "keinem"],
    explanation:
      "Negative article 'kein' for Neuter Accusative (stays same as Nominative).",
  },
  {
    id: 62,
    type: "article",
    category: "Negative Articles - Dative",
    question: "Ich helfe ______ Mann. (no man - Masc)",
    hint: "kein - Dativ",
    answer: "keinem",
    options: ["kein", "keine", "keinen", "keinem"],
    explanation: "Negative article 'keinem' for Masculine Dative.",
  },

  // ==========================================
  // SECTION 7: SENTENCE STRUCTURE - DATIV & AKKUSATIV
  // ==========================================

  {
    id: 63,
    type: "conjugation",
    category: "Sentence Structure - Dative Verbs",
    question: "Ich gebe ______ Mann ein Brot. (dem/den)",
    hint: "helfen, danken, geben → Dativ",
    answer: "dem",
    options: ["der", "den", "dem", "des"],
    explanation:
      "Verbs like 'geben', 'helfen', 'danken' require DATIVE (indirect object). → dem Mann",
  },
  {
    id: 64,
    type: "conjugation",
    category: "Sentence Structure - Dative Verbs",
    question: "Das Buch gehört ______ Frau. (der/die)",
    hint: "gehören → Dativ",
    answer: "der",
    options: ["der", "die", "den", "dem"],
    explanation: "Verb 'gehören' (to belong to) requires DATIVE. → der Frau",
  },
  {
    id: 65,
    type: "conjugation",
    category: "Sentence Structure - Word Order",
    question: "Ich gebe ______ ______ ein Buch. (ihm/es)",
    hint: "Word order: Dativ before Akkusativ (when both pronouns)",
    answer: "ihm",
    options: ["ihm", "es", "ihn", "sein"],
    explanation:
      "When both objects are pronouns: DATIVE comes before ACCUSATIVE. → ihm es",
  },

  // ==========================================
  // SECTION 8: PREPOSITIONS
  // ==========================================

  // Dative Prepositions (aus, bei, mit, nach, seit, von, zu)
  {
    id: 66,
    type: "article",
    category: "Dative Prepositions",
    question: "Ich komme aus ______ Haus. (dem/den - Neut)",
    hint: "aus → always Dativ",
    answer: "dem",
    options: ["das", "den", "dem", "der"],
    explanation: "'Aus' is a dative preposition. Neuter Dative = dem",
  },
  {
    id: 67,
    type: "article",
    category: "Dative Prepositions",
    question: "Er wohnt bei ______ Eltern. (den - Plural)",
    hint: "bei → always Dativ",
    answer: "den",
    options: ["die", "den", "dem", "der"],
    explanation:
      "'Bei' is a dative preposition. Plural Dative = den (+ noun adds -n)",
  },
  {
    id: 68,
    type: "article",
    category: "Dative Prepositions",
    question: "Sie spricht mit ______ Mann. (dem/den - Masc)",
    hint: "mit → always Dativ",
    answer: "dem",
    options: ["der", "den", "dem", "des"],
    explanation: "'Mit' is a dative preposition. Masculine Dative = dem",
  },
  {
    id: 69,
    type: "article",
    category: "Dative Prepositions",
    question: "Wir fahren zu ______ Schule. (der - Fem)",
    hint: "zu → always Dativ",
    answer: "der",
    options: ["die", "den", "dem", "der"],
    explanation: "'Zu' is a dative preposition. Feminine Dative = der",
  },

  // Accusative Prepositions (durch, für, gegen, ohne, um)
  {
    id: 70,
    type: "article",
    category: "Accusative Prepositions",
    question: "Das Geschenk ist für ______ Vater. (den/dem - Masc)",
    hint: "für → always Akkusativ",
    answer: "den",
    options: ["der", "den", "dem", "des"],
    explanation:
      "'Für' is an accusative preposition. Masculine Accusative = den",
  },
  {
    id: 71,
    type: "article",
    category: "Accusative Prepositions",
    question: "Wir gehen durch ______ Park. (den/dem - Masc)",
    hint: "durch → always Akkusativ",
    answer: "den",
    options: ["der", "den", "dem", "des"],
    explanation:
      "'Durch' is an accusative preposition. Masculine Accusative = den",
  },
  {
    id: 72,
    type: "article",
    category: "Accusative Prepositions",
    question: "Er arbeitet ohne ______ Kollegen. (den/dem - Masc)",
    hint: "ohne → always Akkusativ",
    answer: "den",
    options: ["der", "den", "dem", "des"],
    explanation:
      "'Ohne' is an accusative preposition. Masculine Accusative = den",
  },

  // Two-way Prepositions (Wechselpräpositionen)
  {
    id: 73,
    type: "article",
    category: "Two-way Prepositions - Location",
    question: "Das Buch ist auf ______ Tisch. (dem/den - Masc)",
    hint: "auf + wo? (location) → Dativ",
    answer: "dem",
    options: ["der", "den", "dem", "des"],
    explanation:
      "'Auf' with location (wo?) uses DATIVE. Masculine Dative = dem",
  },
  {
    id: 74,
    type: "article",
    category: "Two-way Prepositions - Direction",
    question: "Ich lege das Buch auf ______ Tisch. (den/dem - Masc)",
    hint: "auf + wohin? (direction) → Akkusativ",
    answer: "den",
    options: ["der", "den", "dem", "des"],
    explanation:
      "'Auf' with direction (wohin?) uses ACCUSATIVE. Masculine Accusative = den",
  },
  {
    id: 75,
    type: "article",
    category: "Two-way Prepositions - Location",
    question: "Er steht in ______ Zimmer. (dem/den - Neut)",
    hint: "in + wo? (location) → Dativ",
    answer: "dem",
    options: ["das", "den", "dem", "der"],
    explanation: "'In' with location (wo?) uses DATIVE. Neuter Dative = dem",
  },
  {
    id: 76,
    type: "article",
    category: "Two-way Prepositions - Direction",
    question: "Sie geht in ______ Zimmer. (das/dem - Neut)",
    hint: "in + wohin? (direction) → Akkusativ",
    answer: "das",
    options: ["das", "den", "dem", "der"],
    explanation:
      "'In' with direction (wohin?) uses ACCUSATIVE. Neuter Accusative = das",
  },

  // ==========================================
  // SECTION 9: NOMINATIVE VERBS (Special Cases)
  // ==========================================

  {
    id: 77,
    type: "article",
    category: "Nominative Verbs",
    question: "Er ist ______ Lehrer. (ein/einen - Masc)",
    hint: "sein, werden, bleiben → Nominativ",
    answer: "ein",
    options: ["ein", "einen", "einem", "eines"],
    explanation:
      "Verbs like 'sein', 'werden', 'bleiben' use NOMINATIVE (not Accusative). → ein Lehrer",
  },
  {
    id: 78,
    type: "article",
    category: "Nominative Verbs",
    question: "Sie wird ______ Ärztin. (eine/einer - Fem)",
    hint: "werden → Nominativ",
    answer: "eine",
    options: ["eine", "einer", "einen", "einem"],
    explanation: "'Werden' uses NOMINATIVE. → eine Ärztin",
  },

  // ==========================================
  // SECTION 10: MIXED PRACTICE
  // ==========================================

  {
    id: 79,
    type: "conjugation",
    category: "Mixed Practice",
    question: "Ich ______ (helfen) dir mit den Hausaufgaben.",
    hint: "helfen → to help",
    answer: "helfe",
    explanation:
      "'Helfen' is irregular but conjugates normally in 'ich' form: ich helfe. It requires DATIVE object (dir).",
  },
  {
    id: 80,
    type: "pronoun",
    category: "Mixed Practice",
    question: "Kannst du ______ (I) helfen? (Dativ)",
    hint: "Personal pronoun - Dative",
    answer: "mir",
    options: ["ich", "mich", "mir", "mein"],
    explanation: "'Me' with dative verb 'helfen' = mir (Dative case)",
  },
  {
    id: 81,
    type: "article",
    category: "Mixed Practice",
    question: "Ich gebe ______ Kind ______ Apfel.",
    hint: "dem (Dativ) / einen (Akk)",
    answer: "dem",
    explanation:
      "'Geben' requires DATIVE (indirect object) + ACCUSATIVE (direct object). → dem Kind einen Apfel",
  },
  {
    id: 82,
    type: "conjugation",
    category: "Mixed Practice",
    question: "______ (You all - ihr) ______ (haben) keine Zeit.",
    hint: "ihr + haben",
    answer: "habt",
    options: ["habe", "hast", "hat", "habt"],
    explanation: "'Ihr' form of 'haben' is 'habt'. → Ihr habt keine Zeit.",
  },
  {
    id: 83,
    type: "article",
    category: "Mixed Practice",
    question: "Das ist das Buch ______ Lehrers. (des/der - Masc)",
    hint: "Genitiv - Maskulin",
    answer: "des",
    options: ["der", "die", "das", "des"],
    explanation:
      "Genitive (possession) for Masculine = des (+ noun adds -s or -es). → des Lehrers",
  },
  {
    id: 84,
    type: "pronoun",
    category: "Mixed Practice - Reflexive",
    question: "Ich wasche ______. (myself)",
    hint: "Reflexive pronoun - Akkusativ",
    answer: "mich",
    options: ["mich", "mir", "sich", "dich"],
    explanation:
      "Reflexive pronoun for 'ich' is 'mich' (Accusative) → Ich wasche mich.",
  },
  {
    id: 85,
    type: "conjugation",
    category: "Modal Verbs - können",
    question: "Ich ______ (können) Deutsch sprechen.",
    hint: "können → can/to be able to",
    answer: "kann",
    options: ["kann", "kannst", "können", "könnt"],
    explanation: "Modal verb 'können': ich kann, du kannst, er/sie/es kann",
  },
  {
    id: 86,
    type: "conjugation",
    category: "Modal Verbs - müssen",
    question: "Du ______ (müssen) heute arbeiten.",
    hint: "müssen → must/have to",
    answer: "musst",
    options: ["muss", "musst", "müssen", "müsst"],
    explanation: "Modal verb 'müssen': ich muss, du musst, er/sie/es muss",
  },
  {
    id: 87,
    type: "conjugation",
    category: "Modal Verbs - wollen",
    question: "Er ______ (wollen) ins Kino gehen.",
    hint: "wollen → to want to",
    answer: "will",
    options: ["will", "willst", "wollen", "wollt"],
    explanation: "Modal verb 'wollen': ich will, du willst, er/sie/es will",
  },
  {
    id: 88,
    type: "conjugation",
    category: "Separable Verbs",
    question: "Ich stehe um 7 Uhr ______. (aufstehen)",
    hint: "aufstehen → to get up (separable)",
    answer: "auf",
    explanation:
      "Separable verbs split: prefix goes to the end. → Ich stehe auf.",
  },
  {
    id: 89,
    type: "conjugation",
    category: "Separable Verbs",
    question: "Er ______ das Fenster ______. (aufmachen)",
    hint: "aufmachen → to open (separable)",
    answer: "macht",
    explanation:
      "Separable verb: 'aufmachen' splits → Er macht das Fenster auf.",
  },
  {
    id: 90,
    type: "article",
    category: "Adjective Endings - Definite Article",
    question: "Der ______ Mann ist nett. (alt)",
    hint: "Adjective after definite article - Nominativ Masc",
    answer: "alte",
    options: ["alt", "alte", "alter", "alten"],
    explanation:
      "After definite article, adjective adds -e (Nominative): der alte Mann",
  },
  {
    id: 91,
    type: "article",
    category: "Adjective Endings - Indefinite Article",
    question: "Ein ______ Mann kommt. (jung)",
    hint: "Adjective after indefinite article - Nominativ Masc",
    answer: "junger",
    options: ["jung", "junge", "junger", "jungen"],
    explanation:
      "After indefinite article (Nominative Masc), adjective adds -er: ein junger Mann",
  },
  {
    id: 92,
    type: "article",
    category: "Adjective Endings - No Article",
    question: "______ Wetter ist schön. (gut - Neut)",
    hint: "Adjective with no article - Nominativ Neut",
    answer: "Gutes",
    options: ["Gut", "Gute", "Guter", "Gutes"],
    explanation:
      "No article, Nominative Neuter: adjective takes the article ending → Gutes Wetter (like 'das')",
  },
  {
    id: 93,
    type: "conjugation",
    category: "Comparative Forms",
    question: "Mein Bruder ist ______ als ich. (groß)",
    hint: "Comparative form of groß",
    answer: "größer",
    explanation:
      "Comparative: add -er and sometimes umlaut. groß → größer (bigger/taller)",
  },
  {
    id: 94,
    type: "conjugation",
    category: "Superlative Forms",
    question: "Das ist das ______ Haus. (schön)",
    hint: "Superlative form of schön",
    answer: "schönste",
    explanation:
      "Superlative: das + adj + -ste. schön → schönste (most beautiful)",
  },
  {
    id: 95,
    type: "conjugation",
    category: "Perfect Tense - haben",
    question: "Ich ______ das Buch ______. (lesen - haben)",
    hint: "Perfect tense with haben",
    answer: "habe",
    explanation:
      "Perfect tense: haben/sein + past participle. → Ich habe gelesen.",
  },
  {
    id: 96,
    type: "conjugation",
    category: "Perfect Tense - sein",
    question: "Er ______ nach Berlin ______. (fahren - sein)",
    hint: "Perfect tense with sein",
    answer: "ist",
    explanation:
      "Verbs of motion use 'sein': Er ist gefahren. (He has driven/traveled)",
  },
  {
    id: 97,
    type: "conjugation",
    category: "Imperative - Du",
    question: "______ die Tür! (öffnen - du form)",
    hint: "Command form for 'du'",
    answer: "Öffne",
    explanation:
      "Imperative (du): use the stem + e (optional). → Öffne! or Öffne die Tür!",
  },
  {
    id: 98,
    type: "conjugation",
    category: "Imperative - Ihr",
    question: "______ leise! (sein - ihr form)",
    hint: "Command form for 'ihr'",
    answer: "Seid",
    explanation:
      "Imperative (ihr): use the 'ihr' form without pronoun. → Seid leise!",
  },
  {
    id: 99,
    type: "conjugation",
    category: "Past Tense - Präteritum",
    question: "Ich ______ (haben) keine Zeit gestern.",
    hint: "Simple past of haben",
    answer: "hatte",
    options: ["habe", "hatte", "hattest", "hatten"],
    explanation:
      "Präteritum (simple past) of haben: ich hatte, du hattest, er/sie/es hatte",
  },
  {
    id: 100,
    type: "conjugation",
    category: "Past Tense - Präteritum",
    question: "Sie ______ (sein) gestern krank.",
    hint: "Simple past of sein",
    answer: "war",
    options: ["ist", "war", "warst", "waren"],
    explanation:
      "Präteritum of sein: ich war, du warst, er/sie/es war, wir waren",
  },
];
