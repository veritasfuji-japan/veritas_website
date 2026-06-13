#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const srcRoot = path.join(repoRoot, "src");
const expectedSource = "veritas_os/sample_data/governance/aml_kyc_pilot_cases.json";

const allowedFixtureIds = new Set([
  "pilot_aml_kyc_anchor_high_risk_country",
  "pilot_sanctions_partial_match_no_proceed",
  "pilot_source_of_funds_missing",
  "pilot_policy_definition_missing",
  "pilot_sufficient_evidence_proceed",
  "pilot_secure_controls_missing_block",
]);

function toRelativePath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function isProbablyBinary(buffer) {
  return buffer.includes(0);
}

function collectSourceFiles(entryPath, files = []) {
  if (!fs.existsSync(entryPath)) {
    return files;
  }

  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    const entries = fs.readdirSync(entryPath, { withFileTypes: true });
    for (const entry of entries) {
      collectSourceFiles(path.join(entryPath, entry.name), files);
    }
    return files;
  }

  if (stat.isFile()) {
    files.push(entryPath);
  }

  return files;
}

function findFixtureReferences(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (isProbablyBinary(buffer)) {
    return [];
  }

  const content = buffer.toString("utf8");
  const lines = content.split(/\r?\n/);
  const references = [];

  lines.forEach((line, index) => {
    const matches = line.matchAll(/(?<![a-zA-Z0-9_])pilot_[a-zA-Z0-9_]+/g);
    for (const match of matches) {
      references.push({
        file: toRelativePath(filePath),
        fixtureId: match[0],
        lineNumber: index + 1,
      });
    }
  });

  return references;
}

const findings = collectSourceFiles(srcRoot)
  .flatMap((filePath) => findFixtureReferences(filePath))
  .filter((reference) => !allowedFixtureIds.has(reference.fixtureId));

if (findings.length > 0) {
  console.error("Fixture reference guardrail failed.\n");
  console.error(`Expected fixture IDs to exist in ${expectedSource}.\n`);
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.lineNumber}`);
    console.error(`  fixture_id: ${finding.fixtureId}`);
    console.error(`  expected_source: ${expectedSource}`);
  }
  process.exit(1);
}

console.log(
  `Fixture reference guardrail passed against ${expectedSource}.`,
);
