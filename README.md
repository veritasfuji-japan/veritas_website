# VERITAS OS Website

Official website for VERITAS OS — Auditable Decision Infrastructure for LLM Agents.

## Repository Purpose

This repository contains the public website / landing page for VERITAS OS.

The core VERITAS OS implementation lives in:

https://github.com/veritasfuji-japan/veritas_os

## Tech Stack

- Vite
- React
- JavaScript

## Local Development

Use these commands:

    npm install
    npm run dev

## Production Build

Use these commands:

    npm run build
    npm run preview

## Deployment

This website is deployed on Vercel.

Recommended Vercel settings:

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm ci

Production URL:

- https://veritas-website-navy.vercel.app/

## Website Routes

- `/` — Landing page
- `/enterprise` — Enterprise pain points and governance value
- `/how-it-works` — Technical structure and decision governance flow
- `/aml-kyc-poc` — AML/KYC 1-day PoC overview
- `/demo` — Public Mission Control-style demo for pre-execution governance
- `/concepts` — Core VERITAS concept: approval is not commitment
- `/glossary` — VERITAS OS terminology and plain-language definitions
- `/faq` — Frequently asked questions and safe evaluation guidance
- `/reviewers` — External reviewer entrypoint
- `/contact` — Email inquiry page for PoC evaluation and external review

Social preview image:

- `/og-image.svg`

Route-specific client-side metadata is maintained for major public pages. After `npm run build`, the Vite SPA also generates static per-route HTML files for major public URLs so social crawlers and link previews can read route-specific title, description, canonical, Open Graph, and Twitter metadata from the initial HTML.

Verify generated route metadata with:

    npm run check:route-html

## Public Website Integrity Checks

Use these commands before publishing public website changes:

    npm run check:claims
    npm run check:unicode
    npm run check:fixtures
    npm run check:proof-urls
    npm run build
    npm run check:route-html
    npm run check:site-integrity

These checks keep public routes, metadata, proof URLs, fixture IDs, and public claims aligned with reviewer-facing repository evidence. Run `npm run check:site-integrity` after `npm run build` because it verifies the generated `dist/` route HTML. Deterministic offline guardrails run in Website CI for pull requests and pushes to `main`; proof URL reachability runs on a scheduled/manual workflow because it depends on external network access.

## Current Status

- Public Vercel deployment is active.
- Landing page, static CTA pages, and the public demo page are implemented.
- Static pages currently cover AML/KYC PoC, Concepts, and Reviewers.
- Public claims should remain aligned with the veritas_os repository evidence.

## Important Note

Public metrics and claims shown on the website must stay aligned with the `veritas_os` repository evidence.
