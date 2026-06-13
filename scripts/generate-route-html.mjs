#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import routeMetadata from "../src/data/routeMeta.js";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const distRoot = path.join(repoRoot, "dist");
const indexPath = path.join(distRoot, "index.html");
const siteOrigin = "https://veritas-website-navy.vercel.app";
const siteName = "VERITAS OS";

const publicRoutes = [
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

const metadataByPath = new Map(
  routeMetadata.map((metadata) => [metadata.path, metadata]),
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function canonicalUrlForRoute(routePath) {
  if (routePath === "/") {
    return `${siteOrigin}/`;
  }

  return `${siteOrigin}${routePath}`;
}

function htmlFilePathForRoute(routePath) {
  if (routePath === "/") {
    return indexPath;
  }

  return path.join(distRoot, routePath.slice(1), "index.html");
}

function metadataForRoute(routePath) {
  const metadata = metadataByPath.get(routePath);

  if (!metadata) {
    throw new Error(`Missing route metadata for ${routePath}`);
  }

  return {
    title: metadata.enTitle || metadata.jaTitle,
    description: metadata.enDescription || metadata.jaDescription,
    url: canonicalUrlForRoute(routePath),
  };
}

function metadataBlock({ title, description, url }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeUrl = escapeHtml(url);

  return [
    `    <title>${safeTitle}</title>`,
    `    <meta name="description" content="${safeDescription}" />`,
    `    <link rel="canonical" href="${safeUrl}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:title" content="${safeTitle}" />`,
    `    <meta property="og:description" content="${safeDescription}" />`,
    `    <meta property="og:url" content="${safeUrl}" />`,
    `    <meta property="og:site_name" content="${siteName}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${safeTitle}" />`,
    `    <meta name="twitter:description" content="${safeDescription}" />`,
  ].join("\n");
}

function stripManagedMetadata(html) {
  return html
    .replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<meta\s+[^>]*name=["']description["'][^>]*>/gi, "")
    .replace(/\s*<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, "")
    .replace(
      /\s*<meta\s+[^>]*property=["']og:(?:type|title|description|url|site_name)["'][^>]*>/gi,
      "",
    )
    .replace(
      /\s*<meta\s+[^>]*name=["']twitter:(?:card|title|description)["'][^>]*>/gi,
      "",
    );
}

function injectMetadata(html, routePath) {
  if (!/<\/head>/i.test(html)) {
    throw new Error("dist/index.html does not contain a closing </head> tag");
  }

  const strippedHtml = stripManagedMetadata(html);
  const block = metadataBlock(metadataForRoute(routePath));
  const viewportTagPattern = /(<meta\s+[^>]*name=["']viewport["'][^>]*>)/i;

  if (viewportTagPattern.test(strippedHtml)) {
    return strippedHtml.replace(viewportTagPattern, `$1\n${block}`);
  }

  return strippedHtml.replace(/\s*<\/head>/i, `\n${block}\n  </head>`);
}

function writeRouteHtml(sourceHtml, routePath) {
  const outputPath = htmlFilePathForRoute(routePath);
  const outputHtml = injectMetadata(sourceHtml, routePath);

  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, outputHtml);
  console.log(`Generated ${path.relative(repoRoot, outputPath)}`);
}

const sourceHtml = readFileSync(indexPath, "utf8");

for (const routePath of publicRoutes) {
  writeRouteHtml(sourceHtml, routePath);
}
