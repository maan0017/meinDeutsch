import { GermanTime } from "@/models/germanTime";

export const germanTimes: GermanTime[] = [
  // Full Hours
  { time: "07:00", formalTime: "sieben Uhr", informalTime: "sieben Uhr" },
  { time: "12:00", formalTime: "zwölf Uhr", informalTime: "zwölf Uhr" }, // Mittag
  { time: "15:00", formalTime: "fünfzehn Uhr", informalTime: "drei Uhr" },
  { time: "20:00", formalTime: "zwanzig Uhr", informalTime: "acht Uhr" },
  { time: "00:00", formalTime: "null Uhr", informalTime: "zwölf Uhr" }, // Mitternacht

  // Half Hours (halb + next hour)
  { time: "08:30", formalTime: "acht Uhr dreißig", informalTime: "halb neun" },
  {
    time: "13:30",
    formalTime: "dreizehn Uhr dreißig",
    informalTime: "halb zwei",
  },
  {
    time: "16:30",
    formalTime: "sechzehn Uhr dreißig",
    informalTime: "halb fünf",
  },
  {
    time: "21:30",
    formalTime: "einundzwanzig Uhr dreißig",
    informalTime: "halb zehn",
  },
  { time: "01:30", formalTime: "ein Uhr dreißig", informalTime: "halb zwei" },

  // Quarter Past (Viertel nach)
  {
    time: "09:15",
    formalTime: "neun Uhr fünfzehn",
    informalTime: "Viertel nach neun",
  },
  {
    time: "14:15",
    formalTime: "vierzehn Uhr fünfzehn",
    informalTime: "Viertel nach zwei",
  },
  {
    time: "17:15",
    formalTime: "siebzehn Uhr fünfzehn",
    informalTime: "Viertel nach fünf",
  },
  {
    time: "22:15",
    formalTime: "zweiundzwanzig Uhr fünfzehn",
    informalTime: "Viertel nach zehn",
  },
  {
    time: "02:15",
    formalTime: "zwei Uhr fünfzehn",
    informalTime: "Viertel nach zwei",
  },

  // Quarter To (Viertel vor)
  {
    time: "10:45",
    formalTime: "zehn Uhr fünfundvierzig",
    informalTime: "Viertel vor elf",
  },
  {
    time: "15:45",
    formalTime: "fünfzehn Uhr fünfundvierzig",
    informalTime: "Viertel vor vier",
  },
  {
    time: "18:45",
    formalTime: "achtzehn Uhr fünfundvierzig",
    informalTime: "Viertel vor sieben",
  },
  {
    time: "23:45",
    formalTime: "dreiundzwanzig Uhr fünfundvierzig",
    informalTime: "Viertel vor zwölf",
  },
  {
    time: "03:45",
    formalTime: "drei Uhr fünfundvierzig",
    informalTime: "Viertel vor vier",
  },

  // 5 Past (fünf nach)
  { time: "11:05", formalTime: "elf Uhr fünf", informalTime: "fünf nach elf" },
  {
    time: "16:05",
    formalTime: "sechzehn Uhr fünf",
    informalTime: "fünf nach vier",
  },
  {
    time: "19:05",
    formalTime: "neunzehn Uhr fünf",
    informalTime: "fünf nach sieben",
  },
  {
    time: "00:05",
    formalTime: "null Uhr fünf",
    informalTime: "fünf nach zwölf",
  },
  {
    time: "04:05",
    formalTime: "vier Uhr fünf",
    informalTime: "fünf nach vier",
  },

  // 5 To (fünf vor)
  {
    time: "06:55",
    formalTime: "sechs Uhr fünfundfünfzig",
    informalTime: "fünf vor sieben",
  },
  {
    time: "12:55",
    formalTime: "zwölf Uhr fünfundfünfzig",
    informalTime: "fünf vor eins",
  },
  {
    time: "17:55",
    formalTime: "siebzehn Uhr fünfundfünfzig",
    informalTime: "fünf vor sechs",
  },
  {
    time: "21:55",
    formalTime: "einundzwanzig Uhr fünfundfünfzig",
    informalTime: "fünf vor zehn",
  },
  {
    time: "05:55",
    formalTime: "fünf Uhr fünfundfünfzig",
    informalTime: "fünf vor sechs",
  },

  // 10 Past (zehn nach)
  {
    time: "07:10",
    formalTime: "sieben Uhr zehn",
    informalTime: "zehn nach sieben",
  },
  {
    time: "13:10",
    formalTime: "dreizehn Uhr zehn",
    informalTime: "zehn nach eins",
  },
  {
    time: "18:10",
    formalTime: "achtzehn Uhr zehn",
    informalTime: "zehn nach sechs",
  },
  {
    time: "22:10",
    formalTime: "zweiundzwanzig Uhr zehn",
    informalTime: "zehn nach zehn",
  },
  {
    time: "04:10",
    formalTime: "vier Uhr zehn",
    informalTime: "zehn nach vier",
  },

  // 10 To (zehn vor)
  {
    time: "08:50",
    formalTime: "acht Uhr funfzig",
    informalTime: "zehn vor neun",
  },
  {
    time: "14:50",
    formalTime: "vierzehn Uhr funfzig",
    informalTime: "zehn vor drei",
  },
  {
    time: "19:50",
    formalTime: "neunzehn Uhr funfzig",
    informalTime: "zehn vor acht",
  },
  {
    time: "23:50",
    formalTime: "dreiundzwanzig Uhr funfzig",
    informalTime: "zehn vor zwölf",
  },
  {
    time: "05:50",
    formalTime: "fünf Uhr funfzig",
    informalTime: "zehn vor sechs",
  },

  // 25 Minutes (fünf vor halb)
  {
    time: "09:25",
    formalTime: "neun Uhr fünfundzwanzig",
    informalTime: "fünf vor halb zehn",
  },
  {
    time: "14:25",
    formalTime: "vierzehn Uhr fünfundzwanzig",
    informalTime: "fünf vor halb drei",
  },
  {
    time: "19:25",
    formalTime: "neunzehn Uhr fünfundzwanzig",
    informalTime: "fünf vor halb acht",
  },
  {
    time: "23:25",
    formalTime: "dreiundzwanzig Uhr fünfundzwanzig",
    informalTime: "fünf vor halb zwölf",
  },
  {
    time: "06:25",
    formalTime: "sechs Uhr fünfundzwanzig",
    informalTime: "fünf vor halb sieben",
  },

  // 35 Minutes (fünf nach halb)
  {
    time: "10:35",
    formalTime: "zehn Uhr fünfunddreißig",
    informalTime: "fünf nach halb elf",
  },
  {
    time: "15:35",
    formalTime: "fünfzehn Uhr fünfunddreißig",
    informalTime: "fünf nach halb vier",
  },
  {
    time: "20:35",
    formalTime: "zwanzig Uhr fünfunddreißig",
    informalTime: "fünf nach halb neun",
  },
  {
    time: "01:35",
    formalTime: "ein Uhr fünfunddreißig",
    informalTime: "fünf nach halb zwei",
  },
  {
    time: "05:35",
    formalTime: "fünf Uhr fünfunddreißig",
    informalTime: "fünf nach halb sechs",
  },
  // 20 Past (zwanzig nach / zehn vor halb)
  {
    time: "08:20",
    formalTime: "acht Uhr zwanzig",
    informalTime: "zwanzig nach acht",
  },
  {
    time: "12:20",
    formalTime: "zwölf Uhr zwanzig",
    informalTime: "zwanzig nach zwölf",
  },
  {
    time: "15:20",
    formalTime: "fünfzehn Uhr zwanzig",
    informalTime: "zwanzig nach drei",
  },
  {
    time: "18:20",
    formalTime: "achtzehn Uhr zwanzig",
    informalTime: "zwanzig nach sechs",
  },
  {
    time: "21:20",
    formalTime: "einundzwanzig Uhr zwanzig",
    informalTime: "zwanzig nach neun",
  },

  // 20 To (zwanzig vor / zehn nach halb)
  {
    time: "07:40",
    formalTime: "sieben Uhr vierzig",
    informalTime: "zwanzig vor acht",
  },
  {
    time: "11:40",
    formalTime: "elf Uhr vierzig",
    informalTime: "zwanzig vor zwölf",
  },
  {
    time: "14:40",
    formalTime: "vierzehn Uhr vierzig",
    informalTime: "zwanzig vor drei",
  },
  {
    time: "19:40",
    formalTime: "neunzehn Uhr vierzig",
    informalTime: "zwanzig vor acht",
  },
  {
    time: "22:40",
    formalTime: "zweiundzwanzig Uhr vierzig",
    informalTime: "zwanzig vor elf",
  },

  // More Full Hours
  { time: "01:00", formalTime: "ein Uhr", informalTime: "ein Uhr" },
  { time: "06:00", formalTime: "sechs Uhr", informalTime: "sechs Uhr" },
  { time: "11:00", formalTime: "elf Uhr", informalTime: "elf Uhr" },
  { time: "16:00", formalTime: "sechzehn Uhr", informalTime: "vier Uhr" },
  { time: "18:00", formalTime: "achtzehn Uhr", informalTime: "sechs Uhr" },

  // More Half Hours (halb)
  { time: "02:30", formalTime: "zwei Uhr dreißig", informalTime: "halb drei" },
  {
    time: "06:30",
    formalTime: "sechs Uhr dreißig",
    informalTime: "halb sieben",
  },
  { time: "10:30", formalTime: "zehn Uhr dreißig", informalTime: "halb elf" },
  {
    time: "15:30",
    formalTime: "fünfzehn Uhr dreißig",
    informalTime: "halb vier",
  },
  {
    time: "18:30",
    formalTime: "achtzehn Uhr dreißig",
    informalTime: "halb sieben",
  },

  // More Quarter Past (Viertel nach)
  {
    time: "06:15",
    formalTime: "sechs Uhr fünfzehn",
    informalTime: "Viertel nach sechs",
  },
  {
    time: "11:15",
    formalTime: "elf Uhr fünfzehn",
    informalTime: "Viertel nach elf",
  },
  {
    time: "13:15",
    formalTime: "dreizehn Uhr fünfzehn",
    informalTime: "Viertel nach eins",
  },
  {
    time: "18:15",
    formalTime: "achtzehn Uhr fünfzehn",
    informalTime: "Viertel nach sechs",
  },
  {
    time: "20:15",
    formalTime: "zwanzig Uhr fünfzehn",
    informalTime: "Viertel nach acht",
  },

  // More Quarter To (Viertel vor)
  {
    time: "07:45",
    formalTime: "sieben Uhr fünfundvierzig",
    informalTime: "Viertel vor acht",
  },
  {
    time: "12:45",
    formalTime: "zwölf Uhr fünfundvierzig",
    informalTime: "Viertel vor eins",
  },
  {
    time: "16:45",
    formalTime: "sechzehn Uhr fünfundvierzig",
    informalTime: "Viertel vor fünf",
  },
  {
    time: "20:45",
    formalTime: "zwanzig Uhr fünfundvierzig",
    informalTime: "Viertel vor neun",
  },
  {
    time: "01:45",
    formalTime: "ein Uhr fünfundvierzig",
    informalTime: "Viertel vor zwei",
  },

  // More 5 Past (fünf nach)
  {
    time: "08:05",
    formalTime: "acht Uhr fünf",
    informalTime: "fünf nach acht",
  },
  {
    time: "13:05",
    formalTime: "dreizehn Uhr fünf",
    informalTime: "fünf nach eins",
  },
  {
    time: "17:05",
    formalTime: "siebzehn Uhr fünf",
    informalTime: "fünf nach fünf",
  },
  {
    time: "21:05",
    formalTime: "einundzwanzig Uhr fünf",
    informalTime: "fünf nach neun",
  },
  {
    time: "02:05",
    formalTime: "zwei Uhr fünf",
    informalTime: "fünf nach zwei",
  },

  // More 5 To (fünf vor)
  {
    time: "09:55",
    formalTime: "neun Uhr fünfundfünfzig",
    informalTime: "fünf vor zehn",
  },
  {
    time: "14:55",
    formalTime: "vierzehn Uhr fünfundfünfzig",
    informalTime: "fünf vor drei",
  },
  {
    time: "18:55",
    formalTime: "achtzehn Uhr fünfundfünfzig",
    informalTime: "fünf vor sieben",
  },
  {
    time: "23:55",
    formalTime: "dreiundzwanzig Uhr fünfundfünfzig",
    informalTime: "fünf vor zwölf",
  },
  {
    time: "03:55",
    formalTime: "drei Uhr fünfundfünfzig",
    informalTime: "fünf vor vier",
  },

  // More 10 Past (zehn nach)
  {
    time: "05:10",
    formalTime: "fünf Uhr zehn",
    informalTime: "zehn nach fünf",
  },
  {
    time: "09:10",
    formalTime: "neun Uhr zehn",
    informalTime: "zehn nach neun",
  },
  {
    time: "15:10",
    formalTime: "fünfzehn Uhr zehn",
    informalTime: "zehn nach drei",
  },
  {
    time: "20:10",
    formalTime: "zwanzig Uhr zehn",
    informalTime: "zehn nach acht",
  },
  { time: "01:10", formalTime: "ein Uhr zehn", informalTime: "zehn nach eins" },

  // More 10 To (zehn vor)
  {
    time: "06:50",
    formalTime: "sechs Uhr fünfzig",
    informalTime: "zehn vor sieben",
  },
  {
    time: "11:50",
    formalTime: "elf Uhr fünfzig",
    informalTime: "zehn vor zwölf",
  },
  {
    time: "16:50",
    formalTime: "sechzehn Uhr fünfzig",
    informalTime: "zehn vor fünf",
  },
  {
    time: "21:50",
    formalTime: "einundzwanzig Uhr fünfzig",
    informalTime: "zehn vor zehn",
  },
  {
    time: "02:50",
    formalTime: "zwei Uhr fünfzig",
    informalTime: "zehn vor drei",
  },
  // 25 Minutes (fünf vor halb) - New Hours
  {
    time: "03:25",
    formalTime: "drei Uhr fünfundzwanzig",
    informalTime: "fünf vor halb vier",
  },
  {
    time: "08:25",
    formalTime: "acht Uhr fünfundzwanzig",
    informalTime: "fünf vor halb neun",
  },
  {
    time: "12:25",
    formalTime: "zwölf Uhr fünfundzwanzig",
    informalTime: "fünf vor halb eins",
  },
  {
    time: "17:25",
    formalTime: "siebzehn Uhr fünfundzwanzig",
    informalTime: "fünf vor halb sechs",
  },
  {
    time: "21:25",
    formalTime: "einundzwanzig Uhr fünfundzwanzig",
    informalTime: "fünf vor halb zehn",
  },

  // 35 Minutes (fünf nach halb) - New Hours
  {
    time: "02:35",
    formalTime: "zwei Uhr fünfunddreißig",
    informalTime: "fünf nach halb drei",
  },
  {
    time: "07:35",
    formalTime: "sieben Uhr fünfunddreißig",
    informalTime: "fünf nach halb acht",
  },
  {
    time: "12:35",
    formalTime: "zwölf Uhr fünfunddreißig",
    informalTime: "fünf nach halb eins",
  },
  {
    time: "18:35",
    formalTime: "achtzehn Uhr fünfunddreißig",
    informalTime: "fünf nach halb sieben",
  },
  {
    time: "22:35",
    formalTime: "zweiundzwanzig Uhr fünfunddreißig",
    informalTime: "fünf nach halb elf",
  },

  // 20 Past (zwanzig nach) - New Hours
  {
    time: "04:20",
    formalTime: "vier Uhr zwanzig",
    informalTime: "zwanzig nach vier",
  },
  {
    time: "09:20",
    formalTime: "neun Uhr zwanzig",
    informalTime: "zwanzig nach neun",
  },
  {
    time: "14:20",
    formalTime: "vierzehn Uhr zwanzig",
    informalTime: "zwanzig nach zwei",
  },
  {
    time: "19:20",
    formalTime: "neunzehn Uhr zwanzig",
    informalTime: "zwanzig nach sieben",
  },
  {
    time: "23:20",
    formalTime: "dreiundzwanzig Uhr zwanzig",
    informalTime: "zwanzig nach elf",
  },

  // 20 To (zwanzig vor) - New Hours
  {
    time: "02:40",
    formalTime: "zwei Uhr vierzig",
    informalTime: "zwanzig vor drei",
  },
  {
    time: "05:40",
    formalTime: "fünf Uhr vierzig",
    informalTime: "zwanzig vor sechs",
  },
  {
    time: "10:40",
    formalTime: "zehn Uhr vierzig",
    informalTime: "zwanzig vor elf",
  },
  {
    time: "16:40",
    formalTime: "sechzehn Uhr vierzig",
    informalTime: "zwanzig vor fünf",
  },
  {
    time: "21:40",
    formalTime: "einundzwanzig Uhr vierzig",
    informalTime: "zwanzig vor zehn",
  },

  // Remaining Full Hours
  { time: "02:00", formalTime: "zwei Uhr", informalTime: "zwei Uhr" },
  { time: "05:00", formalTime: "fünf Uhr", informalTime: "fünf Uhr" },
  { time: "10:00", formalTime: "zehn Uhr", informalTime: "zehn Uhr" },
  { time: "14:00", formalTime: "vierzehn Uhr", informalTime: "zwei Uhr" },
  { time: "21:00", formalTime: "einundzwanzig Uhr", informalTime: "neun Uhr" },

  // Remaining Half Hours
  { time: "04:30", formalTime: "vier Uhr dreißig", informalTime: "halb fünf" },
  { time: "09:30", formalTime: "neun Uhr dreißig", informalTime: "halb zehn" },
  { time: "11:30", formalTime: "elf Uhr dreißig", informalTime: "halb zwölf" },
  {
    time: "19:30",
    formalTime: "neunzehn Uhr dreißig",
    informalTime: "halb acht",
  },
  {
    time: "23:30",
    formalTime: "dreiundzwanzig Uhr dreißig",
    informalTime: "halb zwölf",
  },

  // Remaining Quarter Past
  {
    time: "04:15",
    formalTime: "vier Uhr fünfzehn",
    informalTime: "Viertel nach vier",
  },
  {
    time: "08:15",
    formalTime: "acht Uhr fünfzehn",
    informalTime: "Viertel nach acht",
  },
  {
    time: "12:15",
    formalTime: "zwölf Uhr fünfzehn",
    informalTime: "Viertel nach zwölf",
  },
  {
    time: "19:15",
    formalTime: "neunzehn Uhr fünfzehn",
    informalTime: "Viertel nach sieben",
  },
  {
    time: "23:15",
    formalTime: "dreiundzwanzig Uhr fünfzehn",
    informalTime: "Viertel nach elf",
  },

  // Remaining Quarter To
  {
    time: "06:45",
    formalTime: "sechs Uhr fünfundvierzig",
    informalTime: "Viertel vor sieben",
  },
  {
    time: "09:45",
    formalTime: "neun Uhr fünfundvierzig",
    informalTime: "Viertel vor zehn",
  },
  {
    time: "11:45",
    formalTime: "elf Uhr fünfundvierzig",
    informalTime: "Viertel vor zwölf",
  },
  {
    time: "14:45",
    formalTime: "vierzehn Uhr fünfundvierzig",
    informalTime: "Viertel vor drei",
  },
  {
    time: "19:45",
    formalTime: "neunzehn Uhr fünfundvierzig",
    informalTime: "Viertel vor acht",
  },

  // Mixed 10 Past / 10 To
  {
    time: "02:10",
    formalTime: "zwei Uhr zehn",
    informalTime: "zehn nach zwei",
  },
  {
    time: "12:10",
    formalTime: "zwölf Uhr zehn",
    informalTime: "zehn nach zwölf",
  },
  {
    time: "06:10",
    formalTime: "sechs Uhr zehn",
    informalTime: "zehn nach sechs",
  },
  {
    time: "03:50",
    formalTime: "drei Uhr fünfzig",
    informalTime: "zehn vor vier",
  },
  {
    time: "07:50",
    formalTime: "sieben Uhr fünfzig",
    informalTime: "zehn vor acht",
  },
  {
    time: "05:05",
    formalTime: "fünf Uhr fünf",
    informalTime: "fünf nach fünf",
  },
  {
    time: "23:05",
    formalTime: "dreiundzwanzig Uhr fünf",
    informalTime: "fünf nach elf",
  },
  {
    time: "07:05",
    formalTime: "sieben Uhr fünf",
    informalTime: "fünf nach sieben",
  },
  {
    time: "01:55",
    formalTime: "ein Uhr fünfundfünfzig",
    informalTime: "fünf vor zwei",
  },
  {
    time: "08:55",
    formalTime: "acht Uhr fünfundfünfzig",
    informalTime: "fünf vor neun",
  },
  // --- The "Kurz vor" (Shortly before full hour) ---
  {
    time: "06:59",
    formalTime: "sechs Uhr neunundfünfzig",
    informalTime: "kurz vor sieben",
  },
  {
    time: "11:58",
    formalTime: "elf Uhr achtundfünfzig",
    informalTime: "kurz vor zwölf",
  },
  {
    time: "14:57",
    formalTime: "vierzehn Uhr siebenundfünfzig",
    informalTime: "kurz vor drei",
  },
  {
    time: "20:58",
    formalTime: "zwanzig Uhr achtundfünfzig",
    informalTime: "kurz vor neun",
  },
  {
    time: "23:59",
    formalTime: "dreiundzwanzig Uhr neunundfünfzig",
    informalTime: "kurz vor zwölf (Mitternacht)",
  },

  // --- The "Kurz nach" (Shortly after full hour) ---
  {
    time: "09:01",
    formalTime: "neun Uhr eins",
    informalTime: "kurz nach neun",
  },
  {
    time: "13:02",
    formalTime: "dreizehn Uhr zwei",
    informalTime: "kurz nach eins",
  },
  {
    time: "16:03",
    formalTime: "sechzehn Uhr drei",
    informalTime: "kurz nach vier",
  },
  {
    time: "18:02",
    formalTime: "achtzehn Uhr zwei",
    informalTime: "kurz nach sechs",
  },
  {
    time: "00:01",
    formalTime: "null Uhr eins",
    informalTime: "kurz nach zwölf",
  },

  // --- The "Kurz vor Halb" (Shortly before half - Advanced) ---
  // Requires calculating ahead to the half hour
  {
    time: "08:28",
    formalTime: "acht Uhr achtundzwanzig",
    informalTime: "kurz vor halb neun",
  },
  {
    time: "10:29",
    formalTime: "zehn Uhr neunundzwanzig",
    informalTime: "kurz vor halb elf",
  },
  {
    time: "14:27",
    formalTime: "vierzehn Uhr siebenundzwanzig",
    informalTime: "kurz vor halb drei",
  },
  {
    time: "19:28",
    formalTime: "neunzehn Uhr achtundzwanzig",
    informalTime: "kurz vor halb acht",
  },
  {
    time: "23:29",
    formalTime: "dreiundzwanzig Uhr neunundzwanzig",
    informalTime: "kurz vor halb zwölf",
  },

  // --- The "Kurz nach Halb" (Shortly after half - Advanced) ---
  {
    time: "07:31",
    formalTime: "sieben Uhr einunddreißig",
    informalTime: "kurz nach halb acht",
  },
  {
    time: "12:32",
    formalTime: "zwölf Uhr zweiunddreißig",
    informalTime: "kurz nach halb eins",
  },
  {
    time: "15:33",
    formalTime: "fünfzehn Uhr dreiunddreißig",
    informalTime: "kurz nach halb vier",
  },
  {
    time: "21:32",
    formalTime: "einundzwanzig Uhr zweiunddreißig",
    informalTime: "kurz nach halb zehn",
  },
  {
    time: "02:31",
    formalTime: "zwei Uhr einunddreißig",
    informalTime: "kurz nach halb drei",
  },

  // --- The Midnight / Late Night Traps (00:00 - 01:00) ---
  {
    time: "00:03",
    formalTime: "null Uhr drei",
    informalTime: "drei nach zwölf",
  },
  {
    time: "00:12",
    formalTime: "null Uhr zwölf",
    informalTime: "zwölf nach zwölf",
  },
  {
    time: "00:17",
    formalTime: "null Uhr siebzehn",
    informalTime: "siebzehn nach zwölf",
  },
  {
    time: "00:38",
    formalTime: "null Uhr achtunddreißig",
    informalTime: "acht nach halb eins",
  },
  {
    time: "00:43",
    formalTime: "null Uhr dreiundvierzig",
    informalTime: "siebzehn vor eins",
  },

  // --- Complex Numbers: 11-14 Minutes Past (Tongue twisters) ---
  { time: "08:11", formalTime: "acht Uhr elf", informalTime: "elf nach acht" },
  {
    time: "17:12",
    formalTime: "siebzehn Uhr zwölf",
    informalTime: "zwölf nach fünf",
  },
  {
    time: "14:13",
    formalTime: "vierzehn Uhr dreizehn",
    informalTime: "dreizehn nach zwei",
  },
  {
    time: "19:14",
    formalTime: "neunzehn Uhr vierzehn",
    informalTime: "vierzehn nach sieben",
  },
  { time: "11:11", formalTime: "elf Uhr elf", informalTime: "elf nach elf" },

  // --- Complex Numbers: 16-19 Minutes Past (Tricky pronunciation) ---
  {
    time: "09:16",
    formalTime: "neun Uhr sechzehn",
    informalTime: "sechzehn nach neun",
  },
  {
    time: "13:17",
    formalTime: "dreizehn Uhr siebzehn",
    informalTime: "siebzehn nach eins",
  },
  {
    time: "15:18",
    formalTime: "fünfzehn Uhr achtzehn",
    informalTime: "achtzehn nach drei",
  },
  {
    time: "20:19",
    formalTime: "zwanzig Uhr neunzehn",
    informalTime: "neunzehn nach acht",
  },
  {
    time: "05:17",
    formalTime: "fünf Uhr siebzehn",
    informalTime: "siebzehn nach fünf",
  },

  // --- High Math: 41-44 Minutes (Calculated as 'X minutes to next hour') ---
  {
    time: "07:41",
    formalTime: "sieben Uhr einundvierzig",
    informalTime: "neunzehn vor acht",
  },
  {
    time: "10:42",
    formalTime: "zehn Uhr zweiundvierzig",
    informalTime: "achtzehn vor elf",
  },
  {
    time: "14:43",
    formalTime: "vierzehn Uhr dreiundvierzig",
    informalTime: "siebzehn vor drei",
  },
  {
    time: "18:44",
    formalTime: "achtzehn Uhr vierundvierzig",
    informalTime: "sechzehn vor sieben",
  },
  {
    time: "21:41",
    formalTime: "einundzwanzig Uhr einundvierzig",
    informalTime: "neunzehn vor zehn",
  },

  // --- Palindromes & Doubles (Cognitive load check) ---
  {
    time: "06:06",
    formalTime: "sechs Uhr sechs",
    informalTime: "sechs nach sechs",
  },
  {
    time: "12:12",
    formalTime: "zwölf Uhr zwölf",
    informalTime: "zwölf nach zwölf",
  },
  {
    time: "10:10",
    formalTime: "zehn Uhr zehn",
    informalTime: "zehn nach zehn",
  },
  {
    time: "13:13",
    formalTime: "dreizehn Uhr dreizehn",
    informalTime: "dreizehn nach eins",
  },
  {
    time: "22:22",
    formalTime: "zweiundzwanzig Uhr zweiundzwanzig",
    informalTime: "zweiundzwanzig nach zehn",
  },

  // --- Specific "Between" Times (21-24 and 36-39 min) ---
  {
    time: "09:23",
    formalTime: "neun Uhr dreiundzwanzig",
    informalTime: "dreiundzwanzig nach neun",
  },
  {
    time: "15:24",
    formalTime: "fünfzehn Uhr vierundzwanzig",
    informalTime: "vierundzwanzig nach drei",
  },
  {
    time: "18:36",
    formalTime: "achtzehn Uhr sechsunddreißig",
    informalTime: "sechs nach halb sieben",
  },
  {
    time: "22:37",
    formalTime: "zweiundzwanzig Uhr siebenunddreißig",
    informalTime: "sieben nach halb elf",
  },
  {
    time: "04:39",
    formalTime: "vier Uhr neununddreißig",
    informalTime: "neun nach halb fünf",
  },
] as const;
