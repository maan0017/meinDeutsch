import { germanWords } from "@/data/germanWords";
import { GermanWord } from "@/models/germanWord";

export const RandomGermanWordSelector = (): GermanWord => {
  const randomIndex = Math.floor(Math.random() * GetGermanWordsLenght());
  return germanWords[randomIndex];
};

export const RandomGermanWordSelectorWithinRange = (
  start: number,
  end: number,
): GermanWord => {
  // saftey check if end is outside of array range.--
  end = Math.min(end, GetGermanWordsLenght() - 1);

  const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
  return germanWords[randomIndex];
};

export const GetGermanWordsLenght = (): number => {
  return germanWords.length;
};

export const GetGermanWordsGroupLength = (size: number): number => {
  return Math.ceil(GetGermanWordsLenght() / size);
};
