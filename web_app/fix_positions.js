const fs = require("fs");
const path = require("path");

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;
  content = content.replace(/position="UP"/g, 'position="TOP"');
  content = content.replace(/position="DOWN"/g, 'position="BOTTOM"');
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".mdx")) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, "src"));
