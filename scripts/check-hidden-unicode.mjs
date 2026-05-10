import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const targetExtensions = new Set([".js", ".jsx", ".json", ".mjs"]);
const explicitFiles = new Set(["package.json"]);

const prohibitedCodePoints = new Set([
  160,
  1564,
  6158,
  8203,
  8204,
  8205,
  8206,
  8207,
  8234,
  8235,
  8236,
  8237,
  8238,
  8288,
  8289,
  8290,
  8291,
  8292,
  8294,
  8295,
  8296,
  8297,
  8298,
  8299,
  8300,
  8301,
  8302,
  8303,
  65279,
  65038,
  65039,
]);

const scanRoots = ["src", "scripts"];
const findings = [];

function walk(dirPath) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const absPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(absPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!targetExtensions.has(ext)) {
      continue;
    }

    const relativePath = path.relative(rootDir, absPath);
    scanFile(relativePath);
  }
}

function scanFile(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  const content = readFileSync(absolutePath, "utf8");

  let line = 1;
  let column = 1;

  for (const char of content) {
    const codePoint = char.codePointAt(0);
    if (prohibitedCodePoints.has(codePoint)) {
      findings.push({
        file: relativePath,
        line,
        column,
        codePoint: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
      });
    }

    if (char === "\n") {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }
}

for (const relativeRoot of scanRoots) {
  const absoluteRoot = path.join(rootDir, relativeRoot);
  if (statSync(absoluteRoot, { throwIfNoEntry: false })?.isDirectory()) {
    walk(absoluteRoot);
  }
}

for (const relativeFile of explicitFiles) {
  const absolutePath = path.join(rootDir, relativeFile);
  if (statSync(absolutePath, { throwIfNoEntry: false })?.isFile()) {
    scanFile(relativeFile);
  }
}

if (findings.length > 0) {
  console.error("Hidden/bidirectional Unicode characters detected:");
  for (const finding of findings) {
    console.error(
      `${finding.file}:${finding.line}:${finding.column} ${finding.codePoint}`,
    );
  }
  process.exit(1);
}

console.log("Unicode check passed: no prohibited hidden/bidirectional characters found.");
