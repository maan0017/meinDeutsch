const fs = require("fs");
const file = "src/data/short_stories/a1/julia-ist-krank.mdx";
let content = fs.readFileSync(file, "utf8");
content = content.replace(/thema="slate"/g, 'theme="slate"');
content = content.replace(/tema="slate"/g, 'theme="slate"');
fs.writeFileSync(file, content);
console.log("Fixed typos in MDX");
