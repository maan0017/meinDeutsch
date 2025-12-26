import { GermanNumber } from "@/models/germanNumber";
import { numberToGerman } from "@/utils/germanNumbers";

export const RandomGermanNumberSelector = (): GermanNumber => {
  const randomIndex = Math.floor(Math.random() * 1000);
  return numberToGerman(randomIndex);
};
