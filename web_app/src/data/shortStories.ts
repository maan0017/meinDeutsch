import React from "react";

export type StoryLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export interface StoryQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ShortStory {
  id: string;
  level: StoryLevel;
  title: string;
  imageUrl?: string;
  tags: string[];
  originalText: string;
  interactiveContent: string;
  questions: StoryQuestion[];
}
