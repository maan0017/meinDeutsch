require('ts-node').register();
const mdx = require('./src/lib/mdx.ts');
const stories = mdx.getAllShortStories();
console.log(JSON.stringify(stories, null, 2));
