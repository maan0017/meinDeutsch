const fs = require("fs");

// const file = "src/data/short_stories/a1/julia-ist-krank.mdx";
const file = "./a1/julia-ist-krank.mdx";
let content = fs.readFileSync(file, "utf8");

// 1. First, collapse the multi-line WordExplainComp into a single line
// Example: <WordExplainComp\n  word="X"\n  meaning="Y"\n/>
// We want to replace it with <WordExplainComp word="X" meaning="Y" />
content = content.replace(/<WordExplainComp[\s\S]*?\/>/g, (match) => {
  // Fix typos or change properties here:
  let updatedMatch = match.replace(/theme="light-yellow"/g, 'theme="amber"');

  // You can add more replacements like this:
  // updatedMatch = updatedMatch.replace(/old_value/g, 'new_value');

  return updatedMatch.replace(/\s+/g, " ");
});

// 2. Now remove newlines before and after the tag, if they separate words
// Basically, we want `Julia \n <WordExplainComp ... /> \n sich nicht gut`
// to become `Julia <WordExplainComp ... /> sich nicht gut`
// We'll replace \s*\n\s*<WordExplainComp with " <WordExplainComp
content = content.replace(/\s*\n\s*(<WordExplainComp.*?\/>)/g, " $1");
content = content.replace(/(<WordExplainComp.*?\/>)\s*\n\s*/g, "$1 ");

// 3. Let's fix multiple spaces
content = content.replace(/ +/g, " ");

fs.writeFileSync(file, content, "utf8");
console.log("Reformatted MDX interactive story to be inline");
