#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distRoot = path.join(rootDir, "dist");
const routeFiles = [
  "index.html",
  "demo/index.html",
  "enterprise/index.html",
  "how-it-works/index.html",
  "aml-kyc-poc/index.html",
  "concepts/index.html",
  "glossary/index.html",
  "faq/index.html",
  "reviewers/index.html",
  "contact/index.html",
];

const requiredSingleTags = [
  ["title", /<title\b[^>]*>[\s\S]*?<\/title>/gi],
  ["meta description", /<meta\s+[^>]*name=["']description["'][^>]*>/gi],
  ["canonical URL", /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi],
  ["og:title", /<meta\s+[^>]*property=["']og:title["'][^>]*>/gi],
  ["og:description", /<meta\s+[^>]*property=["']og:description["'][^>]*>/gi],
  ["og:url", /<meta\s+[^>]*property=["']og:url["'][^>]*>/gi],
  ["twitter:title", /<meta\s+[^>]*name=["']twitter:title["'][^>]*>/gi],
  [
    "twitter:description",
    /<meta\s+[^>]*name=["']twitter:description["'][^>]*>/gi,
  ],
];

const findings = [];

function countMatches(html, pattern) {
  return html.match(pattern)?.length ?? 0;
}

for (const routeFile of routeFiles) {
  const filePath = path.join(distRoot, routeFile);

  if (!existsSync(filePath)) {
    findings.push(`${routeFile}: file is missing`);
    continue;
  }

  const html = readFileSync(filePath, "utf8");

  for (const [label, pattern] of requiredSingleTags) {
    const count = countMatches(html, pattern);
    if (count !== 1) {
      findings.push(`${routeFile}: expected one ${label}, found ${count}`);
    }
  }
}

if (findings.length > 0) {
  console.error("Route HTML check failed.");
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.log("Route HTML check passed.");
