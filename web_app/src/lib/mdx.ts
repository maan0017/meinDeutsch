import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { StoryLevel, StoryQuestion, ShortStory } from "@/data/shortStories";

const shortStoriesDirectory = path.join(
  process.cwd(),
  "src/data/short_stories"
);

export function getAllShortStories(): ShortStory[] {
  const stories: ShortStory[] = [];

  // Recursively find all .mdx files
  function readDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        readDir(fullPath);
      } else if (fullPath.endsWith(".mdx")) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const parsed = parseMDXStory(fileContents);
        if (parsed) stories.push(parsed);
      }
    }
  }

  readDir(shortStoriesDirectory);
  return stories;
}

function parseMDXStory(fileContents: string): ShortStory | null {
  const { data, content } = matter(fileContents);

  // Extract sections using regex
  const originalStoryMatch = content.match(
    /## Original Story\s+([\s\S]*?)(?=\s+---\s+## Display Interactive Story)/i
  );
  const interactiveStoryMatch = content.match(
    /## Display Interactive Story\s+([\s\S]*?)(?=\s+---\s+## Questions)/i
  );
  const questionsMatch = content.match(/## Questions\s+([\s\S]*)/i);

  if (!originalStoryMatch || !interactiveStoryMatch || !questionsMatch) {
    console.error(
      "Failed to parse MDX sections. Make sure the file has '## Original Story', '## Display Interactive Story', and '## Questions'."
    );
    return null;
  }

  const originalText = originalStoryMatch[1].trim();
  const interactiveContent = interactiveStoryMatch[1].trim();
  const questionsRaw = questionsMatch[1].trim();

  // Parse questions
  const questions: StoryQuestion[] = [];
  const questionBlocks = questionsRaw.split(/---\s+/);

  for (let i = 0; i < questionBlocks.length; i++) {
    const block = questionBlocks[i].trim();
    if (!block) continue;

    // Example block:
    // ### 1. Was hat Julia für eine Krankheit?
    // - Sie hat Kopfschmerzen
    // - Sie hat Fieber ✅
    // 💡 Die Geschichte sagt...

    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l);
    if (lines.length === 0) continue;

    const questionLine = lines.find((l) => l.startsWith("###"));
    const questionText = questionLine
      ? questionLine.replace(/^###\s*\d*\.?\s*/, "").trim()
      : "";

    const options: string[] = [];
    let correctAnswer = "";
    let explanation = "";

    for (const line of lines) {
      if (line.startsWith("-")) {
        let optText = line.substring(1).trim();
        if (optText.includes("✅")) {
          optText = optText.replace("✅", "").trim();
          correctAnswer = optText;
        }
        options.push(optText);
      } else if (line.startsWith("💡")) {
        explanation = line.substring(1).trim();
      }
    }

    if (questionText && options.length > 0) {
      questions.push({
        id: `q${i + 1}`,
        question: questionText,
        options,
        correctAnswer,
        explanation,
      });
    }
  }

  return {
    id: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
    level: data.level as StoryLevel,
    title: data.title,
    imageUrl: data["banner-image"] || data.imageUrl,
    tags: data.tags || [],
    originalText,
    interactiveContent,
    questions,
  };
}
