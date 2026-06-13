#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const siteOrigin = "https://veritas-website-navy.vercel.app";
const contactEmail = "veritas.fuji@gmail.com";
const contactMailtoPrefix = `mailto:${contactEmail}`;

const canonicalRoutes = [
  "/",
  "/demo",
  "/enterprise",
  "/how-it-works",
  "/aml-kyc-poc",
  "/concepts",
  "/glossary",
  "/faq",
  "/reviewers",
  "/contact",
];

const allowedFixtureIds = new Set([
  "pilot_aml_kyc_anchor_high_risk_country",
  "pilot_sanctions_partial_match_no_proceed",
  "pilot_source_of_funds_missing",
  "pilot_policy_definition_missing",
  "pilot_sufficient_evidence_proceed",
  "pilot_secure_controls_missing_block",
]);

const staleFixtureIds = new Set([
  "pilot_aml_kyc_high_risk_country_wire_manual_review",
  "pilot_sanctions_partial_match_no_auto_proceed",
]);

const allowedAnchors = new Set(["#top", "#idea", "#numbers"]);
const disallowedFooterNavLabels = new Set(["Mission Control", "OpenAPI", "SDK"]);
const internalRouteAllowlist = new Set([...canonicalRoutes, "/reviewer"]);
const findings = [];

function repoPath(...segments) {
  return path.join(repoRoot, ...segments);
}

function toRelativePath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

function readText(relativePath) {
  return readFileSync(repoPath(relativePath), "utf8");
}

function addFinding(section, message) {
  findings.push({ section, message });
}

function isProbablyBinary(buffer) {
  return buffer.includes(0);
}

function collectFiles(entryPath, files = []) {
  if (!existsSync(entryPath)) {
    return files;
  }

  const stat = statSync(entryPath);
  if (stat.isDirectory()) {
    const entries = readdirSync(entryPath, { withFileTypes: true });
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

function linesWith(content, needle) {
  return content
    .split(/\r?\n/)
    .map((line, index) => ({ line, lineNumber: index + 1 }))
    .filter(({ line }) => line.includes(needle));
}

function routeFileFor(routePath) {
  return routePath === "/" ? "index.html" : `${routePath.slice(1)}/index.html`;
}

function sitemapUrlFor(routePath) {
  return routePath === "/" ? `${siteOrigin}/` : `${siteOrigin}${routePath}`;
}

function routeLiteral(routePath) {
  return `"${routePath}"`;
}

function assertFileContainsRoute(fileLabel, content, routePath, matcher) {
  if (!matcher(content, routePath)) {
    addFinding(
      "route registry consistency",
      `${routePath} is missing from ${fileLabel}`,
    );
  }
}

async function checkRouteRegistryConsistency() {
  const appContent = readText("src/App.jsx");
  const sitemapContent = readText("public/sitemap.xml");
  const readmeContent = readText("README.md");
  const generateContent = readText("scripts/generate-route-html.mjs");
  const routeHtmlContent = readText("scripts/check-route-html.mjs");
  const routeMetadata = await import(
    pathToFileURL(repoPath("src/data/routeMeta.js")).href
  );
  const metadataPaths = new Set(
    routeMetadata.default.map((metadata) => metadata.path),
  );

  for (const routePath of canonicalRoutes) {
    assertFileContainsRoute("src/App.jsx", appContent, routePath, (content) =>
      content.includes(routeLiteral(routePath)),
    );
    if (!metadataPaths.has(routePath)) {
      addFinding(
        "route registry consistency",
        `${routePath} is missing from src/data/routeMeta.js`,
      );
    }
    assertFileContainsRoute(
      "public/sitemap.xml",
      sitemapContent,
      routePath,
      (content) => content.includes(`<loc>${sitemapUrlFor(routePath)}</loc>`),
    );
    assertFileContainsRoute("README.md Website Routes", readmeContent, routePath, (content) =>
      content.includes(`- \`${routePath}\``),
    );
    assertFileContainsRoute(
      "scripts/generate-route-html.mjs",
      generateContent,
      routePath,
      (content) => content.includes(routeLiteral(routePath)),
    );
    assertFileContainsRoute(
      "scripts/check-route-html.mjs",
      routeHtmlContent,
      routePath,
      (content) => content.includes(`"${routeFileFor(routePath)}"`),
    );
  }
}

function scanPublicFacingFiles() {
  return [
    ...collectFiles(repoPath("src")),
    ...collectFiles(repoPath("public")),
    repoPath("index.html"),
    repoPath("README.md"),
  ];
}

function checkPlaceholderLinks() {
  const directPatterns = [
    ["empty href", /href\s*=\s*["']["']/gi],
    ["empty to", /to\s*=\s*["']["']/gi],
    ["javascript void link", /javascript:void\(0\)/gi],
    ["TODO link", /TODO\s+link/gi],
  ];
  const anchorPattern = /(?:href|to)\s*=\s*["'](#[^"']*)["']/gi;
  const activeComingSoonPattern = /<a\b[^>]*>[^<]*coming soon[^<]*<\/a>/gi;

  for (const filePath of scanPublicFacingFiles()) {
    const buffer = readFileSync(filePath);
    if (isProbablyBinary(buffer)) {
      continue;
    }

    const relativePath = toRelativePath(filePath);
    const content = buffer.toString("utf8");
    for (const [label, pattern] of directPatterns) {
      for (const match of content.matchAll(pattern)) {
        addFinding("placeholder link check", `${relativePath} contains ${label}: ${match[0]}`);
      }
    }

    for (const match of content.matchAll(anchorPattern)) {
      const anchor = match[1];
      if (!allowedAnchors.has(anchor)) {
        addFinding(
          "placeholder link check",
          `${relativePath} contains non-allowlisted anchor link: ${anchor}`,
        );
      }
    }

    for (const match of content.matchAll(activeComingSoonPattern)) {
      addFinding(
        "placeholder link check",
        `${relativePath} contains an active coming soon link: ${match[0]}`,
      );
    }
  }

  const sourceText = scanPublicFacingFiles()
    .map((filePath) => readFileSync(filePath))
    .filter((buffer) => !isProbablyBinary(buffer))
    .map((buffer) => buffer.toString("utf8"))
    .join("\n");

  for (const anchor of allowedAnchors) {
    const anchorId = anchor.slice(1);
    if (!new RegExp(`id=["']${anchorId}["']`).test(sourceText)) {
      addFinding(
        "placeholder link check",
        `${anchor} is allowlisted but no matching id="${anchorId}" anchor was found`,
      );
    }
  }
}

function checkFixtureReferences() {
  const fixturePattern = /(?<![a-zA-Z0-9_])pilot_[a-zA-Z0-9_]+/g;
  for (const filePath of collectFiles(repoPath("src"))) {
    const buffer = readFileSync(filePath);
    if (isProbablyBinary(buffer)) {
      continue;
    }

    const content = buffer.toString("utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const match of line.matchAll(fixturePattern)) {
        const fixtureId = match[0];
        if (staleFixtureIds.has(fixtureId) || !allowedFixtureIds.has(fixtureId)) {
          addFinding(
            "fixture reference check",
            `${toRelativePath(filePath)}:${index + 1} uses stale or unapproved fixture ID ${fixtureId}`,
          );
        }
      }
    });
  }
}

function isPlaceholderUrl(url) {
  return (
    url.includes("example.com") ||
    url.includes("placeholder") ||
    url.endsWith("/#") ||
    url === "https://github.com/veritasfuji-japan/veritas_os"
  );
}

function checkProofUrlShape() {
  const claims = JSON.parse(readText("src/data/claims.json")).claims ?? [];
  for (const claim of claims) {
    const url = claim.proof_url;
    if (!url || typeof url !== "string" || url.trim() === "") {
      addFinding("proof URL check", `${claim.id} has an empty or missing proof_url`);
      continue;
    }

    if (!url.startsWith("https://")) {
      addFinding("proof URL check", `${claim.id} proof_url is not HTTPS: ${url}`);
    }
    if (isPlaceholderUrl(url)) {
      addFinding("proof URL check", `${claim.id} proof_url is placeholder or too generic: ${url}`);
    }
    if (url.includes("github.com/") && !url.includes("/blob/") && !url.includes("/tree/")) {
      addFinding(
        "proof URL check",
        `${claim.id} proof_url should point to a specific repository artifact: ${url}`,
      );
    }
  }
}

function extractLiteralLinks(content) {
  const links = [];
  const patterns = [
    /href\s*=\s*["']([^"']*)["']/gi,
    /href:\s*["']([^"']*)["']/gi,
    /\[\s*["'][^"']+["']\s*,\s*["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      links.push(match[1]);
    }
  }

  return links;
}

function checkFooterAndNavigationSafety() {
  const navFiles = [
    "src/landing/TopBar.jsx",
    "src/landing/FooterArea.jsx",
    "src/components/PageShell.jsx",
  ];

  for (const relativePath of navFiles) {
    const content = readText(relativePath);
    for (const label of disallowedFooterNavLabels) {
      for (const { lineNumber, line } of linesWith(content, label)) {
        if (line.includes("#")) {
          addFinding(
            "footer and navigation safety",
            `${relativePath}:${lineNumber} links old placeholder label ${label} with #`,
          );
        }
      }
    }

    for (const link of extractLiteralLinks(content)) {
      if (link === "#" || link === "" || link === "javascript:void(0)") {
        addFinding(
          "footer and navigation safety",
          `${relativePath} contains placeholder nav/footer link: ${link || "(empty)"}`,
        );
        continue;
      }

      if (link.startsWith("#") && !allowedAnchors.has(link)) {
        addFinding(
          "footer and navigation safety",
          `${relativePath} contains non-allowlisted nav/footer anchor: ${link}`,
        );
      }

      if (link.startsWith("/") && !internalRouteAllowlist.has(link)) {
        addFinding(
          "footer and navigation safety",
          `${relativePath} links to nonexistent internal route: ${link}`,
        );
      }
    }
  }
}

function checkMailtoSafety() {
  const mailtoPattern = /mailto:[^"'\s)]+/gi;
  const contactContent = readText("src/pages/ContactPage.jsx");
  const contactLower = contactContent.toLowerCase();
  const warningTerms = [
    "confidential information",
    "personal data",
    "customer data",
    "regulated data",
  ];

  for (const filePath of scanPublicFacingFiles()) {
    const buffer = readFileSync(filePath);
    if (isProbablyBinary(buffer)) {
      continue;
    }

    const content = buffer.toString("utf8");
    for (const match of content.matchAll(mailtoPattern)) {
      const mailto = match[0];
      if (!mailto.startsWith(contactMailtoPrefix)) {
        addFinding(
          "mailto safety",
          `${toRelativePath(filePath)} uses unexpected public mailto link: ${mailto}`,
        );
      }
      if (!mailto.includes("subject=") && !content.includes("subject=${")) {
        addFinding(
          "mailto safety",
          `${toRelativePath(filePath)} mailto link should include a safe subject: ${mailto}`,
        );
      }
      if (/confidential|personal|customer|regulated/i.test(mailto)) {
        addFinding(
          "mailto safety",
          `${toRelativePath(filePath)} mailto prefill appears to request sensitive data: ${mailto}`,
        );
      }
    }
  }

  for (const term of warningTerms) {
    if (!contactLower.includes(term)) {
      addFinding(
        "mailto safety",
        `/contact is missing the warning term "${term}" for first-message safety`,
      );
    }
  }
}

function runCommand(command, args) {
  const display = [command, ...args].join(" ");
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    addFinding(
      "sub-checks",
      `${display} failed\n${result.stdout}${result.stderr}`.trim(),
    );
    return;
  }

  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
}

await checkRouteRegistryConsistency();
checkPlaceholderLinks();
checkFixtureReferences();
checkProofUrlShape();
checkFooterAndNavigationSafety();
checkMailtoSafety();

runCommand("npm", ["run", "check:claims"]);
runCommand("npm", ["run", "check:unicode"]);
runCommand("npm", ["run", "check:fixtures"]);
runCommand("npm", ["run", "check:route-html"]);

if (findings.length > 0) {
  console.error("Public site integrity check failed.\n");
  for (const { section, message } of findings) {
    console.error(`- [${section}] ${message}`);
  }
  process.exit(1);
}

console.log("Public site integrity check passed.");
