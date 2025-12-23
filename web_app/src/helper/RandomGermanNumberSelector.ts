import { germanNumbers } from "@/data/germanNumbers";
import { GermanNumber } from "@/models/germanNumber";

export const RandomGermanNumberSelector = (): GermanNumber => {
  const randomIndex = Math.floor(Math.random() * germanNumbers.length);
  return germanNumbers[randomIndex];
};
