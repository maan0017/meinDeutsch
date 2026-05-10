// Book vocabulary data organized by CEFR level and chapter (Kapitel)
// Add more words/chapters/levels as needed — the component auto-discovers them.

export interface BuchVocabWord {
  german: string;
  article?: "der" | "die" | "das" | null;
  english: string;
  hindi: string;
  pronunciation: string;
}

export interface BuchChapter {
  chapter: number;
  title?: string; // optional chapter title e.g. "Guten Tag"
  words: BuchVocabWord[];
}

export interface BuchLevel {
  level: string; // "A1", "A2", "B1", etc.
  chapters: BuchChapter[];
}

export const buchVocabs: BuchLevel[] = [
  {
    level: "A1",
    chapters: [
      {
        chapter: 1,
        title: "Guten Tag",
        words: [
          { german: "Hallo", english: "Hello", hindi: "नमस्ते", pronunciation: "हालो" },
          { german: "Guten Morgen", english: "Good morning", hindi: "सुप्रभात", pronunciation: "गूटन मॉर्गन" },
          { german: "Guten Tag", english: "Good day", hindi: "शुभ दिन", pronunciation: "गूटन टाक" },
          { german: "Guten Abend", english: "Good evening", hindi: "शुभ संध्या", pronunciation: "गूटन आबंड" },
          { german: "Gute Nacht", english: "Good night", hindi: "शुभ रात्रि", pronunciation: "गूटे नाख्ट" },
          { german: "Tschüss", english: "Bye", hindi: "अलविदा", pronunciation: "चुस" },
          { german: "Auf Wiedersehen", english: "Goodbye", hindi: "फिर मिलेंगे", pronunciation: "आउफ़ वीडरज़ेन" },
          { german: "Danke", english: "Thank you", hindi: "धन्यवाद", pronunciation: "डांके" },
          { german: "Bitte", english: "Please / You're welcome", hindi: "कृपया / कोई बात नहीं", pronunciation: "बिट्टे" },
          { german: "Entschuldigung", english: "Excuse me / Sorry", hindi: "माफ़ कीजिए", pronunciation: "एन्टशुल्डिगुंग" },
          { german: "Ja", english: "Yes", hindi: "हाँ", pronunciation: "या" },
          { german: "Nein", english: "No", hindi: "नहीं", pronunciation: "नाइन" },
          { german: "Wie heißen Sie?", english: "What is your name?", hindi: "आपका नाम क्या है?", pronunciation: "वी हाइसन ज़ी?" },
          { german: "Ich heiße", english: "My name is", hindi: "मेरा नाम है", pronunciation: "इश हाइसे" },
          { german: "Woher kommen Sie?", english: "Where do you come from?", hindi: "आप कहाँ से आते हैं?", pronunciation: "वोहेर कोमन ज़ी?" },
        ],
      },
      {
        chapter: 2,
        title: "Familie und Freunde",
        words: [
          { german: "Familie", article: "die", english: "Family", hindi: "परिवार", pronunciation: "फ़ामीलिए" },
          { german: "Vater", article: "der", english: "Father", hindi: "पिता", pronunciation: "फ़ाटर" },
          { german: "Mutter", article: "die", english: "Mother", hindi: "माँ", pronunciation: "मुटर" },
          { german: "Bruder", article: "der", english: "Brother", hindi: "भाई", pronunciation: "ब्रूडर" },
          { german: "Schwester", article: "die", english: "Sister", hindi: "बहन", pronunciation: "श्वेस्टर" },
          { german: "Sohn", article: "der", english: "Son", hindi: "बेटा", pronunciation: "ज़ोन" },
          { german: "Tochter", article: "die", english: "Daughter", hindi: "बेटी", pronunciation: "टॉख्टर" },
          { german: "Großvater", article: "der", english: "Grandfather", hindi: "दादा / नाना", pronunciation: "ग्रोसफ़ाटर" },
          { german: "Großmutter", article: "die", english: "Grandmother", hindi: "दादी / नानी", pronunciation: "ग्रोसमुटर" },
          { german: "Freund", article: "der", english: "Friend (male)", hindi: "दोस्त", pronunciation: "फ़्रॉयंड" },
          { german: "Freundin", article: "die", english: "Friend (female)", hindi: "सहेली", pronunciation: "फ़्रॉयंडिन" },
          { german: "Kind", article: "das", english: "Child", hindi: "बच्चा", pronunciation: "किंड" },
          { german: "Eltern", english: "Parents", hindi: "माता-पिता", pronunciation: "एल्टर्न" },
          { german: "Geschwister", english: "Siblings", hindi: "भाई-बहन", pronunciation: "गेश्विस्टर" },
        ],
      },
      {
        chapter: 3,
        title: "Essen und Trinken",
        words: [
          { german: "Wasser", article: "das", english: "Water", hindi: "पानी", pronunciation: "वासर" },
          { german: "Brot", article: "das", english: "Bread", hindi: "रोटी", pronunciation: "ब्रोट" },
          { german: "Milch", article: "die", english: "Milk", hindi: "दूध", pronunciation: "मिल्ख" },
          { german: "Kaffee", article: "der", english: "Coffee", hindi: "कॉफ़ी", pronunciation: "काफ़ी" },
          { german: "Tee", article: "der", english: "Tea", hindi: "चाय", pronunciation: "टे" },
          { german: "Saft", article: "der", english: "Juice", hindi: "जूस", pronunciation: "ज़ाफ़्ट" },
          { german: "Reis", article: "der", english: "Rice", hindi: "चावल", pronunciation: "राइस" },
          { german: "Fleisch", article: "das", english: "Meat", hindi: "मांस", pronunciation: "फ़्लाइश" },
          { german: "Fisch", article: "der", english: "Fish", hindi: "मछली", pronunciation: "फ़िश" },
          { german: "Gemüse", article: "das", english: "Vegetables", hindi: "सब्ज़ी", pronunciation: "गेम्यूज़े" },
          { german: "Obst", article: "das", english: "Fruit", hindi: "फल", pronunciation: "ओब्स्ट" },
          { german: "Zucker", article: "der", english: "Sugar", hindi: "चीनी", pronunciation: "त्सुकर" },
          { german: "Salz", article: "das", english: "Salt", hindi: "नमक", pronunciation: "ज़ाल्त्स" },
          { german: "Butter", article: "die", english: "Butter", hindi: "मक्खन", pronunciation: "बुटर" },
          { german: "Käse", article: "der", english: "Cheese", hindi: "पनीर", pronunciation: "केज़े" },
        ],
      },
      {
        chapter: 4,
        title: "Zahlen und Farben",
        words: [
          { german: "eins", english: "One", hindi: "एक", pronunciation: "आइन्स" },
          { german: "zwei", english: "Two", hindi: "दो", pronunciation: "त्स्वाई" },
          { german: "drei", english: "Three", hindi: "तीन", pronunciation: "ड्राई" },
          { german: "vier", english: "Four", hindi: "चार", pronunciation: "फ़ीर" },
          { german: "fünf", english: "Five", hindi: "पाँच", pronunciation: "फ़ुन्फ़" },
          { german: "sechs", english: "Six", hindi: "छह", pronunciation: "ज़ेक्स" },
          { german: "sieben", english: "Seven", hindi: "सात", pronunciation: "ज़ीबन" },
          { german: "acht", english: "Eight", hindi: "आठ", pronunciation: "आख्ट" },
          { german: "neun", english: "Nine", hindi: "नौ", pronunciation: "नॉयन" },
          { german: "zehn", english: "Ten", hindi: "दस", pronunciation: "त्सेन" },
          { german: "rot", english: "Red", hindi: "लाल", pronunciation: "रोट" },
          { german: "blau", english: "Blue", hindi: "नीला", pronunciation: "ब्लाउ" },
          { german: "grün", english: "Green", hindi: "हरा", pronunciation: "ग्रुन" },
          { german: "gelb", english: "Yellow", hindi: "पीला", pronunciation: "गेल्ब" },
          { german: "schwarz", english: "Black", hindi: "काला", pronunciation: "श्वार्त्स" },
          { german: "weiß", english: "White", hindi: "सफ़ेद", pronunciation: "वाइस" },
        ],
      },
      {
        chapter: 5,
        title: "Im Klassenzimmer",
        words: [
          { german: "Buch", article: "das", english: "Book", hindi: "किताब", pronunciation: "बूख" },
          { german: "Stift", article: "der", english: "Pen", hindi: "कलम", pronunciation: "श्टिफ़्ट" },
          { german: "Heft", article: "das", english: "Notebook", hindi: "कॉपी", pronunciation: "हेफ़्ट" },
          { german: "Tafel", article: "die", english: "Blackboard", hindi: "श्यामपट", pronunciation: "टाफ़ेल" },
          { german: "Tisch", article: "der", english: "Table", hindi: "मेज़", pronunciation: "टिश" },
          { german: "Stuhl", article: "der", english: "Chair", hindi: "कुर्सी", pronunciation: "श्टूल" },
          { german: "Lehrer", article: "der", english: "Teacher (male)", hindi: "अध्यापक", pronunciation: "लेरर" },
          { german: "Lehrerin", article: "die", english: "Teacher (female)", hindi: "अध्यापिका", pronunciation: "लेररिन" },
          { german: "Schüler", article: "der", english: "Student (male)", hindi: "छात्र", pronunciation: "शूलर" },
          { german: "Schülerin", article: "die", english: "Student (female)", hindi: "छात्रा", pronunciation: "शूलरिन" },
          { german: "Klasse", article: "die", english: "Class", hindi: "कक्षा", pronunciation: "क्लासे" },
          { german: "Schule", article: "die", english: "School", hindi: "स्कूल", pronunciation: "शूले" },
        ],
      },
    ],
  },
  {
    level: "A2",
    chapters: [
      {
        chapter: 1,
        title: "Wohnen",
        words: [
          { german: "Wohnung", article: "die", english: "Apartment", hindi: "फ्लैट", pronunciation: "वोनुंग" },
          { german: "Zimmer", article: "das", english: "Room", hindi: "कमरा", pronunciation: "त्सिमर" },
          { german: "Küche", article: "die", english: "Kitchen", hindi: "रसोई", pronunciation: "कुशे" },
          { german: "Badezimmer", article: "das", english: "Bathroom", hindi: "बाथरूम", pronunciation: "बाडेत्सिमर" },
          { german: "Schlafzimmer", article: "das", english: "Bedroom", hindi: "शयनकक्ष", pronunciation: "श्लाफ़्त्सिमर" },
          { german: "Wohnzimmer", article: "das", english: "Living room", hindi: "बैठक", pronunciation: "वोन्त्सिमर" },
          { german: "Balkon", article: "der", english: "Balcony", hindi: "बालकनी", pronunciation: "बाल्कोन" },
          { german: "Garten", article: "der", english: "Garden", hindi: "बगीचा", pronunciation: "गार्टन" },
          { german: "Miete", article: "die", english: "Rent", hindi: "किराया", pronunciation: "मीटे" },
          { german: "Möbel", english: "Furniture", hindi: "फर्नीचर", pronunciation: "मोबेल" },
          { german: "Treppe", article: "die", english: "Stairs", hindi: "सीढ़ियाँ", pronunciation: "ट्रेपे" },
          { german: "Stockwerk", article: "das", english: "Floor / Story", hindi: "मंज़िल", pronunciation: "श्टॉकवेर्क" },
          { german: "Nachbar", article: "der", english: "Neighbor (male)", hindi: "पड़ोसी", pronunciation: "नाख्बार" },
          { german: "Nachbarin", article: "die", english: "Neighbor (female)", hindi: "पड़ोसन", pronunciation: "नाख्बारिन" },
        ],
      },
      {
        chapter: 2,
        title: "Beruf und Arbeit",
        words: [
          { german: "Beruf", article: "der", english: "Profession", hindi: "पेशा", pronunciation: "बेरूफ़" },
          { german: "Arbeit", article: "die", english: "Work", hindi: "काम", pronunciation: "आर्बाइट" },
          { german: "Büro", article: "das", english: "Office", hindi: "कार्यालय", pronunciation: "ब्यूरो" },
          { german: "Chef", article: "der", english: "Boss (male)", hindi: "बॉस", pronunciation: "शेफ़" },
          { german: "Chefin", article: "die", english: "Boss (female)", hindi: "महिला बॉस", pronunciation: "शेफ़िन" },
          { german: "Kollege", article: "der", english: "Colleague (male)", hindi: "सहकर्मी", pronunciation: "कोलेगे" },
          { german: "Kollegin", article: "die", english: "Colleague (female)", hindi: "महिला सहकर्मी", pronunciation: "कोलेगिन" },
          { german: "Gehalt", article: "das", english: "Salary", hindi: "वेतन", pronunciation: "गेहाल्ट" },
          { german: "Urlaub", article: "der", english: "Vacation", hindi: "छुट्टी", pronunciation: "उरलाउब" },
          { german: "Termin", article: "der", english: "Appointment", hindi: "अपॉइंटमेंट", pronunciation: "टेर्मीन" },
          { german: "Besprechung", article: "die", english: "Meeting", hindi: "बैठक", pronunciation: "बेश्प्रेशुंग" },
          { german: "Erfahrung", article: "die", english: "Experience", hindi: "अनुभव", pronunciation: "एर्फ़ारुंग" },
        ],
      },
      {
        chapter: 3,
        title: "Gesundheit",
        words: [
          { german: "Arzt", article: "der", english: "Doctor (male)", hindi: "डॉक्टर", pronunciation: "आर्त्स्ट" },
          { german: "Ärztin", article: "die", english: "Doctor (female)", hindi: "महिला डॉक्टर", pronunciation: "एर्त्स्टिन" },
          { german: "Krankenhaus", article: "das", english: "Hospital", hindi: "अस्पताल", pronunciation: "क्रांकनहाउस" },
          { german: "Apotheke", article: "die", english: "Pharmacy", hindi: "दवाखाना", pronunciation: "अपोटेके" },
          { german: "Medikament", article: "das", english: "Medicine", hindi: "दवाई", pronunciation: "मेडिकामेन्ट" },
          { german: "Kopfschmerzen", english: "Headache", hindi: "सिरदर्द", pronunciation: "कोप्फ़श्मेर्त्सन" },
          { german: "Fieber", article: "das", english: "Fever", hindi: "बुखार", pronunciation: "फ़ीबर" },
          { german: "Husten", article: "der", english: "Cough", hindi: "खांसी", pronunciation: "हुस्टन" },
          { german: "Schnupfen", article: "der", english: "Cold / Runny nose", hindi: "ज़ुकाम", pronunciation: "श्नुप्फ़न" },
          { german: "Rezept", article: "das", english: "Prescription", hindi: "नुस्खा", pronunciation: "रेत्सेप्ट" },
          { german: "Schmerz", article: "der", english: "Pain", hindi: "दर्द", pronunciation: "श्मेर्त्स" },
          { german: "gesund", english: "Healthy", hindi: "स्वस्थ", pronunciation: "गेज़ुन्ड" },
          { german: "krank", english: "Sick", hindi: "बीमार", pronunciation: "क्रांक" },
        ],
      },
    ],
  },
  {
    level: "B1",
    chapters: [
      {
        chapter: 1,
        title: "Reisen und Verkehr",
        words: [
          { german: "Flughafen", article: "der", english: "Airport", hindi: "हवाई अड्डा", pronunciation: "फ़्लूगहाफ़ेन" },
          { german: "Bahnhof", article: "der", english: "Train station", hindi: "रेलवे स्टेशन", pronunciation: "बानहोफ़" },
          { german: "Fahrkarte", article: "die", english: "Ticket", hindi: "टिकट", pronunciation: "फ़ार्कार्टे" },
          { german: "Gepäck", article: "das", english: "Luggage", hindi: "सामान", pronunciation: "गेपेक" },
          { german: "Reisepass", article: "der", english: "Passport", hindi: "पासपोर्ट", pronunciation: "राइज़ेपास" },
          { german: "Visum", article: "das", english: "Visa", hindi: "वीज़ा", pronunciation: "वीज़ुम" },
          { german: "Abflug", article: "der", english: "Departure", hindi: "प्रस्थान", pronunciation: "आबफ़्लूग" },
          { german: "Ankunft", article: "die", english: "Arrival", hindi: "आगमन", pronunciation: "आन्कुन्फ़्ट" },
          { german: "Verspätung", article: "die", english: "Delay", hindi: "देरी", pronunciation: "फ़ेर्श्पेटुंग" },
          { german: "Unterkunft", article: "die", english: "Accommodation", hindi: "आवास", pronunciation: "उन्टर्कुन्फ़्ट" },
          { german: "Sehenswürdigkeit", article: "die", english: "Tourist attraction", hindi: "दर्शनीय स्थल", pronunciation: "ज़ेन्सवूर्डिग्काइट" },
          { german: "Ausland", article: "das", english: "Foreign country", hindi: "विदेश", pronunciation: "आउस्लांड" },
        ],
      },
      {
        chapter: 2,
        title: "Medien und Kommunikation",
        words: [
          { german: "Nachricht", article: "die", english: "Message / News", hindi: "संदेश / समाचार", pronunciation: "नाख्रिश्ट" },
          { german: "Zeitung", article: "die", english: "Newspaper", hindi: "अखबार", pronunciation: "त्साइटुंग" },
          { german: "Zeitschrift", article: "die", english: "Magazine", hindi: "पत्रिका", pronunciation: "त्साइटश्रिफ़्ट" },
          { german: "Sendung", article: "die", english: "Broadcast / Show", hindi: "प्रसारण", pronunciation: "ज़ेन्डुंग" },
          { german: "Werbung", article: "die", english: "Advertisement", hindi: "विज्ञापन", pronunciation: "वेर्बुंग" },
          { german: "Bildschirm", article: "der", english: "Screen", hindi: "स्क्रीन", pronunciation: "बिल्डश्रिर्म" },
          { german: "Drucker", article: "der", english: "Printer", hindi: "प्रिंटर", pronunciation: "ड्रुकर" },
          { german: "Datei", article: "die", english: "File", hindi: "फ़ाइल", pronunciation: "डाटाइ" },
          { german: "herunterladen", english: "To download", hindi: "डाउनलोड करना", pronunciation: "हेरुन्टरलाडन" },
          { german: "Passwort", article: "das", english: "Password", hindi: "पासवर्ड", pronunciation: "पासवोर्ट" },
          { german: "Benutzername", article: "der", english: "Username", hindi: "यूज़रनेम", pronunciation: "बेनुट्सर्नामे" },
        ],
      },
    ],
  },
  {
    level: "B2",
    chapters: [
      {
        chapter: 1,
        title: "Umwelt und Natur",
        words: [
          { german: "Umwelt", article: "die", english: "Environment", hindi: "पर्यावरण", pronunciation: "उम्वेल्ट" },
          { german: "Klimawandel", article: "der", english: "Climate change", hindi: "जलवायु परिवर्तन", pronunciation: "क्लीमावांडेल" },
          { german: "Verschmutzung", article: "die", english: "Pollution", hindi: "प्रदूषण", pronunciation: "फ़ेर्श्मुट्सुंग" },
          { german: "Erneuerbare Energie", english: "Renewable energy", hindi: "नवीकरणीय ऊर्जा", pronunciation: "एर्नॉयेर्बारे एनेर्गी" },
          { german: "Abfall", article: "der", english: "Waste / Garbage", hindi: "कचरा", pronunciation: "आबफ़ाल" },
          { german: "Recycling", article: "das", english: "Recycling", hindi: "पुनर्चक्रण", pronunciation: "रिसायक्लिंग" },
          { german: "Naturschutz", article: "der", english: "Nature conservation", hindi: "प्रकृति संरक्षण", pronunciation: "नाटूर्शुट्स" },
          { german: "Wald", article: "der", english: "Forest", hindi: "जंगल", pronunciation: "वाल्ड" },
          { german: "Gewässer", article: "das", english: "Body of water", hindi: "जलस्रोत", pronunciation: "गेवेसर" },
          { german: "Treibhauseffekt", article: "der", english: "Greenhouse effect", hindi: "ग्रीनहाउस प्रभाव", pronunciation: "ट्राइबहाउसएफ़ेक्ट" },
          { german: "nachhaltig", english: "Sustainable", hindi: "टिकाऊ", pronunciation: "नाख्हाल्टिग" },
        ],
      },
    ],
  },
];
