import React from "react";
import WordExplainComp from "@/components/WordExplainComp";

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
  content: React.ReactNode;
  questions: StoryQuestion[];
}

export const shortStories: ShortStory[] = [
  {
    id: "der-verlorene-hund",
    level: "A1",
    title: "Der verlorene Hund",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
    tags: ["Tiere", "Alltag", "Freundschaft"],
    content: (
      <div className="space-y-4 leading-relaxed text-lg">
        <p>
          Es war ein sonniger Tag im{" "}
          <WordExplainComp word="Park" meaning="park" position="TOP_RIGHT_TOP" theme="slate" />. 
          Anna ging spazieren und sah einen kleinen, braunen{" "}
          <WordExplainComp word="Hund" meaning="dog" position="TOP_RIGHT_TOP" theme="slate" />.
        </p>
        <p>
          Der Hund war allein und sah sehr{" "}
          <WordExplainComp word="traurig" meaning="sad" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          aus. Anna ging zu dem Hund und sagte: "Hallo, kleiner{" "}
          <WordExplainComp word="Freund" meaning="friend" position="TOP_RIGHT_TOP" theme="slate" />. 
          Wo ist deine Familie?"
        </p>
        <p>
          Der Hund wedelte mit dem{" "}
          <WordExplainComp word="Schwanz" meaning="tail" position="TOP_RIGHT_TOP" theme="slate" />. 
          Plötzlich hörten sie einen lauten{" "}
          <WordExplainComp word="Ruf" meaning="call/shout" position="TOP_RIGHT_TOP" theme="slate" />: 
          "Bello! Bello!" Ein kleiner{" "}
          <WordExplainComp word="Junge" meaning="boy" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          rannte auf sie zu.
        </p>
        <p>
          "Das ist mein Hund!", rief der Junge glücklich. Er bedankte sich bei Anna. 
          Anna lächelte. Es war ein schöner{" "}
          <WordExplainComp word="Tag" meaning="day" position="TOP_RIGHT_TOP" theme="slate" />.
        </p>
      </div>
    ),
    questions: [
      {
        id: "q1",
        question: "Wo war Anna?",
        options: ["Im Haus", "Im Park", "In der Schule", "Im Auto"],
        correctAnswer: "Im Park",
        explanation: "Die Geschichte sagt: 'Es war ein sonniger Tag im Park.'"
      },
      {
        id: "q2",
        question: "Welche Farbe hatte der Hund?",
        options: ["Schwarz", "Weiß", "Braun", "Grau"],
        correctAnswer: "Braun",
        explanation: "Die Geschichte sagt, dass sie einen 'kleinen, braunen Hund' sah."
      },
      {
        id: "q3",
        question: "Wie hieß der Hund?",
        options: ["Max", "Bello", "Rex", "Hasso"],
        correctAnswer: "Bello",
        explanation: "Der Junge rief: 'Bello! Bello!'"
      }
    ]
  },
  {
    id: "der-morgen-von-karl",
    level: "A1",
    title: "Der Morgen von Karl",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    tags: ["Alltag", "Morgenroutine", "Kaffee"],
    content: (
      <div className="space-y-4 leading-relaxed text-lg">
        <p>
          Karl steht jeden Morgen um sieben{" "}
          <WordExplainComp word="Uhr" meaning="o'clock" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          auf. Er geht in die{" "}
          <WordExplainComp word="Küche" meaning="kitchen" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          und kocht Kaffee. Der{" "}
          <WordExplainComp word="Kaffee" meaning="coffee" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          riecht sehr gut.
        </p>
        <p>
          Danach isst er ein{" "}
          <WordExplainComp word="Brötchen" meaning="bread roll" position="TOP_RIGHT_TOP" theme="slate" />{" "}
          mit Käse und liest die{" "}
          <WordExplainComp word="Zeitung" meaning="newspaper" position="TOP_RIGHT_TOP" theme="slate" />. 
          Um acht Uhr putzt er seine{" "}
          <WordExplainComp word="Zähne" meaning="teeth" position="TOP_RIGHT_TOP" theme="slate" />.
        </p>
        <p>
          Dann zieht er seine Jacke an und geht zur{" "}
          <WordExplainComp word="Arbeit" meaning="work" position="TOP_RIGHT_TOP" theme="slate" />. 
          Karl fährt immer mit dem{" "}
          <WordExplainComp word="Fahrrad" meaning="bicycle" position="TOP_RIGHT_TOP" theme="slate" />.
        </p>
      </div>
    ),
    questions: [
      {
        id: "q1",
        question: "Um wie viel Uhr steht Karl auf?",
        options: ["Sechs Uhr", "Sieben Uhr", "Acht Uhr", "Neun Uhr"],
        correctAnswer: "Sieben Uhr",
        explanation: "Der Text sagt: 'Karl steht jeden Morgen um sieben Uhr auf.'"
      },
      {
        id: "q2",
        question: "Was isst Karl zum Frühstück?",
        options: ["Einen Apfel", "Ein Ei", "Ein Brötchen mit Käse", "Müsli"],
        correctAnswer: "Ein Brötchen mit Käse",
        explanation: "Der Text sagt: 'Danach isst er ein Brötchen mit Käse...'"
      },
      {
        id: "q3",
        question: "Wie fährt Karl zur Arbeit?",
        options: ["Mit dem Auto", "Mit dem Bus", "Mit dem Zug", "Mit dem Fahrrad"],
        correctAnswer: "Mit dem Fahrrad",
        explanation: "Der Text sagt: 'Karl fährt immer mit dem Fahrrad.'"
      }
    ]
  }
];
