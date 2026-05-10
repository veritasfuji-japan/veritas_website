import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const targetExtensions = new Set([".js", ".jsx", ".json", ".mjs"]);
const explicitFiles = new Set(["package.json"]);

const prohibitedCodePoints = new Set([
  0x00A0, 0x061C, 0x180E,
  0x200B, 0x200C, 0x200D, 0x200E, 0x200F,
  0x202A, 0x202B, 0x202C, 0x202D, 0x202E,
  0x2060, 0x2061, 0x2062, 0x2063, 0x2064,
  0x2066, 0x2067, 0x2068, 0x2069,
  0x206A, 0x206B, 0x206C, 0x206D, 0x206E, 0x206F,
  0xFEFF, 0xFE0E, 0xFE0F,
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
