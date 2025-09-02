const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'learning/document-accessibility-course/src';
const LAYOUT_PATTERN = /layout:\s*_includes\/module\.njk/g;
const NEW_LAYOUT = 'layout: module.njk';

function updateFrontMatter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (LAYOUT_PATTERN.test(content)) {
    const updatedContent = content.replace(LAYOUT_PATTERN, NEW_LAYOUT);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated layout in: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.md')) {
      updateFrontMatter(fullPath);
    }
  });
}

walk(SOURCE_DIR);
console.log('Layout reference update complete!');