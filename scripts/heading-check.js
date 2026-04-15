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

  // Check H1 presence and count
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    issues.push("Missing H1");
  } else if (h1s.length > 1) {
    issues.push(`Multiple H1 elements found (${h1s.length})`);
  }

  // Check first heading is H1
  if (headings[0].level !== 1) {
    issues.push(`First heading is H${headings[0].level} (expected H1)`);
  }

  // Check for skipped heading levels (e.g., H2 -> H4)
  let prev = headings[0].level;
  for (let i = 1; i < headings.length; i++) {
    const cur = headings[i].level;
    if (cur > prev + 1) {
      issues.push(
        `Skipped heading level from H${prev} to H${cur} at "${headings[i].text}"`
      );
    }
    prev = cur;
  }

  // Check H3 present without any H2 in document
  const hasH3 = headings.some((h) => h.level === 3);
  const hasH2 = headings.some((h) => h.level === 2);
  if (hasH3 && !hasH2) {
    issues.push("H3(s) present but no H2 in document");
  }

  return { filePath, headings, issues };
}

const root = path.resolve(__dirname, "..");
const pattern = path.join(root, "**/*.html");

glob(
  pattern,
  { nodir: true, ignore: ["**/node_modules/**", "**/.git/**"] },
  (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const results = files.map(analyzeFile);
    let anyIssues = false;
    results.forEach((r) => {
      if (r.issues.length) anyIssues = true;
    });

    console.log("Heading check results:\n");
    results.forEach((r) => {
      console.log("FILE:", path.relative(root, r.filePath));
      const hstr = r.headings
        .map((h) => `H${h.level}:${h.text || "[no text]"}`)
        .join(" | ");
      console.log("  Headings:", hstr || "[none]");
      if (r.issues.length) {
        console.log("  Issues:");
        r.issues.forEach((i) => console.log("   -", i));
      } else {
        console.log("  Issues: none");
      }
      console.log("");
    });

    if (anyIssues) {
      process.exit(0);
    } else {
      console.log("No heading-order issues detected.");
      process.exit(0);
    }
  }
);
