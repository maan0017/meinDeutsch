import { germanSentences } from "@/data/germanSentences";
import { GermanSentenceModel } from "@/models/germanSentences";

export const RandomGermanSentenceSelector = (): GermanSentenceModel => {
  const randomIndex = Math.floor(Math.random() * GetGermanSentencesLength());
  return germanSentences[randomIndex];
};

export const RandomGermanSentenceSelectorWithinRange = (
  start: number,
  end: number
): GermanSentenceModel => {
  // safety check
  end = Math.min(end, GetGermanSentencesLength() - 1);

  const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
  return germanSentences[randomIndex];
};

export const GetGermanSentencesLength = (): number => {
  return germanSentences.length;
};

export const GetGermanSentencesGroupLength = (size: number): number => {
  return Math.ceil(GetGermanSentencesLength() / size);
};
