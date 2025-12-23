import { germanTimes } from "@/data/germanTimes";
import { GermanTime } from "@/models/germanTime";

export const RandomGermanTimeSelector = (): GermanTime => {
  const randomIndex = Math.floor(Math.random() * germanTimes.length);
  return germanTimes[randomIndex];
};
