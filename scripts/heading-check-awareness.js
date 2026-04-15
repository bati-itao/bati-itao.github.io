const fs = require("fs");
const path = require("path");
const glob = require("glob");

function getHeadings(html) {
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [];
  let m;
  while ((m = re.exec(html))) {
    const level = Number(m[1]);
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    headings.push({ level, text, index: m.index });
  }
  return headings;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const headings = getHeadings(content);
  const issues = [];

  if (headings.length === 0) {
    issues.push("No headings found");
    return { filePath, headings, issues };
  }

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) issues.push("Missing H1");
  if (h1s.length > 1) issues.push(`Multiple H1 elements found (${h1s.length})`);
  if (headings[0].level !== 1)
    issues.push(`First heading is H${headings[0].level} (expected H1)`);

  let prev = headings[0].level;
  for (let i = 1; i < headings.length; i++) {
    const cur = headings[i].level;
    if (cur > prev + 1)
      issues.push(
        `Skipped heading level from H${prev} to H${cur} at "${headings[i].text}"`
      );
    prev = cur;
  }

  const hasH3 = headings.some((h) => h.level === 3);
  const hasH2 = headings.some((h) => h.level === 2);
  if (hasH3 && !hasH2) issues.push("H3(s) present but no H2 in document");

  return { filePath, headings, issues };
}

const awarenessDir = path.join(__dirname, "..", "awareness");
const pattern = path.join(awarenessDir, "**", "*.html");

glob(pattern, { nodir: true }, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (files.length === 0) {
    console.log("No files found in awareness folder.");
    process.exit(0);
  }

  console.log("Heading check for awareness/ folder:\n");
  let anyIssues = false;
  files.forEach((f) => {
    const r = analyzeFile(f);
    const rel = path.relative(path.join(__dirname, ".."), r.filePath);
    console.log("FILE:", rel);
    const hstr = r.headings
      .map((h) => `H${h.level}:${h.text || "[no text]"}`)
      .join(" | ");
    console.log("  Headings:", hstr || "[none]");
    if (r.issues.length) {
      anyIssues = true;
      console.log("  Issues:");
      r.issues.forEach((i) => console.log("   -", i));
    } else {
      console.log("  Issues: none");
    }
    console.log("");
  });

  if (!anyIssues)
    console.log("No heading-order issues detected in awareness/ folder.");
});
