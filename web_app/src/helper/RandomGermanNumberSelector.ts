import { GermanNumber } from "@/models/germanNumber";
import { numberToGerman } from "@/utils/germanNumbers";
import { numberToHindi } from "@/utils/hindiNumber";

export const RandomGermanNumberSelector = (): GermanNumber => {
  const randomIndex = Math.floor(Math.random() * 1000);
  return {
    number: randomIndex,
    germanWord: numberToGerman(randomIndex),
    hindiWord: numberToHindi(randomIndex),
  };
};
