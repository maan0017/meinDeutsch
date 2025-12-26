import { GermanTime } from "@/models/germanTime";
import { generateDayTimes } from "@/utils/germanTime";

export const RandomGermanTimeSelector = (): GermanTime => {
  const randomIndex = Math.floor(Math.random() * 60);
  return generateDayTimes()[randomIndex];
};
