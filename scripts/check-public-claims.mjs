#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");

const scanRoots = ["src", "index.html", "public"];
const excludedNames = new Set([
  "node_modules",
  "dist",
  ".git",
  "scripts",
  "package-lock.json",
  "package.json",
]);

const disallowedPhrases = [
  ["85", "/100"].join(""),
  ["internal", " overall snapshot"].join(""),
  ["Internal", " DD snapshot"].join(""),
  ["内部", " DD スナップショット"].join(""),
  ["commit", " bb72b21"].join(""),
  ["bb72", "b21"].join(""),
  ["Next.js", " 16"].join(""),
  ["peer", "-reviewed"].join(""),
  ["peer", " reviewed"].join(""),
  ["査読", "論文"].join(""),
  ["査読済み", "認証"].join(""),
  ["peer", "-reviewed certification"].join(""),
  ["production", "-ready"].join(""),
  ["production", " ready"].join(""),
  ["guaranteed", " compliance"].join(""),
  ["guarantee", " compliance"].join(""),
  ["market", "-leading"].join(""),
  ["customer", "-proven"].join(""),
  ["regulatory", "-approved"].join(""),
  ["regulator", "-approved"].join(""),
  ["certified", " compliant"].join(""),
];

// Keep narrow exceptions for existing non-claim copy that explicitly frames
// these words as limitations or questions rather than public claims.
const allowedContextsByPhrase = new Map([
  [
    ["peer", "-reviewed"].join(""),
    [["does not imply", " peer-reviewed certification"].join("")],
  ],
  [
    ["peer", "-reviewed certification"].join(""),
    [["does not imply", " peer-reviewed certification"].join("")],
  ],
  [
    ["査読済み", "認証"].join(""),
    [["査読済み認証", "や規制承認を意味しません"].join("")],
  ],
  [
    ["production", "-ready"].join(""),
    [["Is it", " production-ready?"].join("")],
  ],
]);

function toRelativePath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function isExcluded(filePath) {
  return toRelativePath(filePath)
    .split("/")
    .some((part) => excludedNames.has(part));
}

function isProbablyBinary(buffer) {
  return buffer.includes(0);
}

function collectFiles(entryPath, files = []) {
  if (!fs.existsSync(entryPath) || isExcluded(entryPath)) {
    return files;
  }

  const stat = fs.statSync(entryPath);

  if (stat.isDirectory()) {
    const entries = fs.readdirSync(entryPath, { withFileTypes: true });
    for (const entry of entries) {
      collectFiles(path.join(entryPath, entry.name), files);
    }
    return files;
  }

  if (stat.isFile()) {
    files.push(entryPath);
  }

  return files;
}

function isAllowedContext(line, phrase) {
  const allowedContexts = allowedContextsByPhrase.get(phrase) ?? [];
  const normalizedLine = line.toLowerCase();
  return allowedContexts.some((context) =>
    normalizedLine.includes(context.toLowerCase()),
  );
}

function findMatches(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (isProbablyBinary(buffer)) {
    return [];
  }

  const content = buffer.toString("utf8");
  const lines = content.split(/\r?\n/);
  const matches = [];

  lines.forEach((line, index) => {
    const normalizedLine = line.toLowerCase();
    for (const phrase of disallowedPhrases) {
      if (
        normalizedLine.includes(phrase.toLowerCase()) &&
        !isAllowedContext(line, phrase)
      ) {
        matches.push({
          file: toRelativePath(filePath),
          phrase,
          lineNumber: index + 1,
          excerpt: line.trim(),
        });
      }
    }
  });

  return matches;
}

const filesToScan = scanRoots.flatMap((root) =>
  collectFiles(path.join(repoRoot, root)),
);
const findings = filesToScan.flatMap((filePath) => findMatches(filePath));

if (findings.length > 0) {
  console.error("Public claims guardrail failed.\n");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.lineNumber}`);
    console.error(`  phrase: ${finding.phrase}`);
    console.error(`  excerpt: ${finding.excerpt}`);
  }
  process.exit(1);
}

console.log("Public claims guardrail passed.");
