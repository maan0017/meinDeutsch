import { KeyInterface } from "./key";

export const keys: KeyInterface[][] = [
  // --- ROW 1: Numbers (Standard Shift symbols preserved) ---
  [
    {
      label: "`",
      smallLabel: "`",
      capitalLabel: "`",
      shiftLabel: "~",
      specialLabel: "¬", // Logical NOT
      capitalSpecialLabel: "¦", // Broken bar
      value: "`",
      type: "number",
    },
    {
      label: "1",
      smallLabel: "1",
      capitalLabel: "1",
      shiftLabel: "!",
      specialLabel: "¹", // Superscript 1
      capitalSpecialLabel: "¡", // Inverted !
      value: "1",
      type: "number",
    },
    {
      label: "2",
      smallLabel: "2",
      capitalLabel: "2",
      shiftLabel: "@", // Kept original position
      specialLabel: "²", // Superscript 2
      capitalSpecialLabel: "⅛",
      value: "2",
      type: "number",
    },
    {
      label: "3",
      smallLabel: "3",
      capitalLabel: "3",
      shiftLabel: "#",
      specialLabel: "³", // Superscript 3
      capitalSpecialLabel: "£", // Pound Sterling
      value: "3",
      type: "number",
    },
    {
      label: "4",
      smallLabel: "4",
      capitalLabel: "4",
      shiftLabel: "$",
      specialLabel: "¢", // Cent
      capitalSpecialLabel: "¼",
      value: "4",
      type: "number",
    },
    {
      label: "5",
      smallLabel: "5",
      capitalLabel: "5",
      shiftLabel: "%",
      specialLabel: "‰", // Per mille
      capitalSpecialLabel: "½",
      value: "5",
      type: "number",
    },
    {
      label: "6",
      smallLabel: "6",
      capitalLabel: "6",
      shiftLabel: "^",
      specialLabel: "∞", // Infinity
      capitalSpecialLabel: "¾",
      value: "6",
      type: "number",
    },
    {
      label: "7",
      smallLabel: "7",
      capitalLabel: "7",
      shiftLabel: "&",
      specialLabel: "\\", // Fallback
      capitalSpecialLabel: "{", // Fallback
      value: "7",
      type: "number",
    },
    {
      label: "8",
      smallLabel: "8",
      capitalLabel: "8",
      shiftLabel: "*",
      specialLabel: "•", // Bullet point
      capitalSpecialLabel: "[", // Fallback
      value: "8",
      type: "number",
    },
    {
      label: "9",
      smallLabel: "9",
      capitalLabel: "9",
      shiftLabel: "(",
      specialLabel: "±", // Plus-Minus
      capitalSpecialLabel: "]", // Fallback
      value: "9",
      type: "number",
    },
    {
      label: "0",
      smallLabel: "0",
      capitalLabel: "0",
      shiftLabel: ")",
      specialLabel: "≠", // Not Equal
      capitalSpecialLabel: "}", // Fallback
      value: "0",
      type: "number",
    },
    {
      label: "-",
      smallLabel: "-",
      capitalLabel: "-",
      shiftLabel: "_",
      specialLabel: "–", // En Dash
      capitalSpecialLabel: "—", // Em Dash
      value: "-",
      type: "number",
    },
    {
      label: "=",
      smallLabel: "=",
      capitalLabel: "=",
      shiftLabel: "+",
      specialLabel: "≈", // Approx
      capitalSpecialLabel: "≡", // Identical to
      value: "=",
      type: "number",
    },
    {
      label: "←",
      smallLabel: "Backspace",
      capitalLabel: "Backspace",
      value: "Backspace",
      width: "w-24",
      type: "backspace",
    },
  ],
  // --- ROW 2: QWERTY ---
  [
    {
      label: "Tab",
      smallLabel: "Tab",
      capitalLabel: "Tab",
      value: "Tab",
      width: "w-20",
      type: "tab",
    },
    {
      label: "q",
      smallLabel: "q",
      capitalLabel: "Q",
      specialLabel: "œ", // French ligature
      capitalSpecialLabel: "Œ",
      value: "q",
      type: "letter",
    },
    {
      label: "w",
      smallLabel: "w",
      capitalLabel: "W",
      specialLabel: "ω", // Omega small
      capitalSpecialLabel: "Ω", // Omega Capital (Ohms)
      value: "w",
      type: "letter",
    },
    {
      label: "e",
      smallLabel: "e",
      capitalLabel: "E",
      specialLabel: "€", // Euro (Req)
      capitalSpecialLabel: "È",
      value: "e",
      type: "letter",
    },
    {
      label: "r",
      smallLabel: "r",
      capitalLabel: "R",
      specialLabel: "₹", // Rupee (Req)
      capitalSpecialLabel: "®", // Registered
      value: "r",
      type: "letter",
    },
    {
      label: "t",
      smallLabel: "t",
      capitalLabel: "T",
      specialLabel: "™", // Trademark
      capitalSpecialLabel: "Þ", // Thorn
      value: "t",
      type: "letter",
    },
    {
      label: "y",
      smallLabel: "y",
      capitalLabel: "Y",
      specialLabel: "¥", // Yen
      capitalSpecialLabel: "Ψ", // Psi
      value: "y",
      type: "letter",
    },
    {
      label: "u",
      smallLabel: "u",
      capitalLabel: "U",
      specialLabel: "ü", // German Umlaut (Req)
      capitalSpecialLabel: "Ü",
      value: "u",
      type: "letter",
    },
    {
      label: "i",
      smallLabel: "i",
      capitalLabel: "I",
      specialLabel: "í",
      capitalSpecialLabel: "Í",
      value: "i",
      type: "letter",
    },
    {
      label: "o",
      smallLabel: "o",
      capitalLabel: "O",
      specialLabel: "ö", // German Umlaut (Req)
      capitalSpecialLabel: "Ö",
      value: "o",
      type: "letter",
    },
    {
      label: "p",
      smallLabel: "p",
      capitalLabel: "P",
      specialLabel: "π", // Pi
      capitalSpecialLabel: "Π",
      value: "p",
      type: "letter",
    },
    {
      label: "[",
      smallLabel: "[",
      capitalLabel: "[",
      shiftLabel: "{",
      specialLabel: "„", // German Opening Quote
      capitalSpecialLabel: "“", // English Opening Quote
      value: "[",
      type: "special",
    },
    {
      label: "]",
      smallLabel: "]",
      capitalLabel: "]",
      shiftLabel: "}",
      specialLabel: "“", // German Closing Quote
      capitalSpecialLabel: "”", // English Closing Quote
      value: "]",
      type: "special",
    },
    {
      label: "\\",
      smallLabel: "\\",
      capitalLabel: "\\",
      shiftLabel: "|",
      specialLabel: "«", // Guillillemot
      capitalSpecialLabel: "»",
      value: "\\",
      type: "special",
    },
  ],
  // --- ROW 3: ASDF ---
  [
    {
      label: "Caps",
      smallLabel: "Caps Lock",
      capitalLabel: "Caps Lock",
      value: "CapsLock",
      width: "w-24",
      type: "caps",
    },
    {
      label: "a",
      smallLabel: "a",
      capitalLabel: "A",
      specialLabel: "ä", // German Umlaut (Req)
      capitalSpecialLabel: "Ä",
      value: "a",
      type: "letter",
    },
    {
      label: "s",
      smallLabel: "s",
      capitalLabel: "S",
      specialLabel: "ß", // Eszett (Req)
      capitalSpecialLabel: "ẞ", // Capital Eszett
      value: "s",
      type: "letter",
    },
    {
      label: "d",
      smallLabel: "d",
      capitalLabel: "D",
      specialLabel: "°", // Degree
      capitalSpecialLabel: "Δ", // Delta
      value: "d",
      type: "letter",
    },
    {
      label: "f",
      smallLabel: "f",
      capitalLabel: "F",
      specialLabel: "ƒ", // Function
      capitalSpecialLabel: "Φ", // Phi
      value: "f",
      type: "letter",
    },
    {
      label: "g",
      smallLabel: "g",
      capitalLabel: "G",
      specialLabel: "ĝ",
      capitalSpecialLabel: "Γ", // Gamma
      value: "g",
      type: "letter",
    },
    {
      label: "h",
      smallLabel: "h",
      capitalLabel: "H",
      specialLabel: "ĥ",
      capitalSpecialLabel: "Ħ",
      value: "h",
      type: "letter",
    },
    {
      label: "j",
      smallLabel: "j",
      capitalLabel: "J",
      specialLabel: "ĵ",
      capitalSpecialLabel: "ϑ",
      value: "j",
      type: "letter",
    },
    {
      label: "k",
      smallLabel: "k",
      capitalLabel: "K",
      specialLabel: "ĸ",
      capitalSpecialLabel: "˚",
      value: "k",
      type: "letter",
    },
    {
      label: "l",
      smallLabel: "l",
      capitalLabel: "L",
      specialLabel: "ø",
      capitalSpecialLabel: "Ø",
      value: "l",
      type: "letter",
    },
    {
      label: ";",
      smallLabel: ";",
      capitalLabel: ";",
      shiftLabel: ":",
      specialLabel: "…", // Ellipsis
      capitalSpecialLabel: "¶", // Paragraph/Pilcrow
      value: ";",
      type: "special",
    },
    {
      label: "'",
      smallLabel: "'",
      capitalLabel: "'",
      shiftLabel: '"',
      specialLabel: "´", // Acute
      capitalSpecialLabel: "§", // Section Sign
      value: "'",
      type: "special",
    },
    {
      label: "Enter",
      smallLabel: "Enter",
      capitalLabel: "Enter",
      value: "Enter",
      width: "w-28",
      type: "enter",
    },
  ],
  // --- ROW 4: ZXCV ---
  [
    {
      label: "Shift",
      smallLabel: "Shift",
      capitalLabel: "Shift",
      value: "Shift",
      width: "w-32",
      type: "shift",
      code: "ShiftLeft",
    },
    {
      label: "z",
      smallLabel: "z",
      capitalLabel: "Z",
      specialLabel: "æ",
      capitalSpecialLabel: "Æ",
      value: "z",
      type: "letter",
    },
    {
      label: "x",
      smallLabel: "x",
      capitalLabel: "X",
      specialLabel: "×", // Multiplication
      capitalSpecialLabel: "Ξ",
      value: "x",
      type: "letter",
    },
    {
      label: "c",
      smallLabel: "c",
      capitalLabel: "C",
      specialLabel: "©", // Copyright (Req)
      capitalSpecialLabel: "Ç",
      value: "c",
      type: "letter",
    },
    {
      label: "v",
      smallLabel: "v",
      capitalLabel: "V",
      specialLabel: "√", // Square Root
      capitalSpecialLabel: "◊",
      value: "v",
      type: "letter",
    },
    {
      label: "b",
      smallLabel: "b",
      capitalLabel: "B",
      specialLabel: "∫", // Integral
      capitalSpecialLabel: "ß", // Fallback
      value: "b",
      type: "letter",
    },
    {
      label: "n",
      smallLabel: "n",
      capitalLabel: "N",
      specialLabel: "ñ",
      capitalSpecialLabel: "Ñ",
      value: "n",
      type: "letter",
    },
    {
      label: "m",
      smallLabel: "m",
      capitalLabel: "M",
      specialLabel: "µ", // Micro
      capitalSpecialLabel: "M",
      value: "m",
      type: "letter",
    },
    {
      label: ",",
      smallLabel: ",",
      capitalLabel: ",",
      shiftLabel: "<",
      specialLabel: "≤", // Less than or equal
      capitalSpecialLabel: "«",
      value: ",",
      type: "special",
    },
    {
      label: ".",
      smallLabel: ".",
      capitalLabel: ".",
      shiftLabel: ">",
      specialLabel: "≥", // Greater than or equal
      capitalSpecialLabel: "»",
      value: ".",
      type: "special",
    },
    {
      label: "/",
      smallLabel: "/",
      capitalLabel: "/",
      shiftLabel: "?",
      specialLabel: "÷", // Division
      capitalSpecialLabel: "¿",
      value: "/",
      type: "special",
    },
    {
      label: "Shift",
      smallLabel: "Shift",
      capitalLabel: "Shift",
      value: "Shift",
      width: "w-32",
      type: "shift",
      code: "ShiftRight",
    },
  ],
  // --- ROW 5: Bottom ---
  [
    {
      label: "Ctrl",
      smallLabel: "Ctrl",
      capitalLabel: "Ctrl",
      value: "Control",
      width: "w-16",
      type: "ctrl",
      code: "ControlLeft",
    },
    {
      label: "Win",
      smallLabel: "Win",
      capitalLabel: "Win",
      value: "Meta",
      width: "w-16",
      type: "win",
      code: "MetaLeft",
    },
    {
      label: "Alt",
      smallLabel: "Alt",
      capitalLabel: "Alt",
      value: "Alt",
      width: "w-16",
      type: "alt",
      code: "AltLeft",
    },
    {
      label: "Space",
      smallLabel: " ",
      capitalLabel: " ",
      value: " ",
      width: "w-96",
      type: "space",
      code: "Space",
    },
    {
      label: "Alt",
      smallLabel: "Alt",
      capitalLabel: "Alt",
      value: "Alt",
      width: "w-16",
      type: "alt",
      code: "AltRight",
    },
    {
      label: "Win",
      smallLabel: "Win",
      capitalLabel: "Win",
      value: "Meta",
      width: "w-16",
      type: "win",
      code: "MetaRight",
    },
    {
      label: "Ctrl",
      smallLabel: "Ctrl",
      capitalLabel: "Ctrl",
      value: "Control",
      width: "w-16",
      type: "ctrl",
      code: "ControlRight",
    },
  ],
] as const;
