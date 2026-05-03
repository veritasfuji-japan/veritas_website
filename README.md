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
- `/aml-kyc-poc` — AML/KYC 1-day PoC overview
- `/concepts` — Core VERITAS concept: approval is not commitment
- `/reviewers` — External reviewer entrypoint
- `/contact` — Email inquiry page

Social preview image:

- `/og-image.svg`

## Current Status

- Public Vercel deployment is active.
- Landing page and static CTA pages are implemented.
- Static pages currently cover AML/KYC PoC, Concepts, and Reviewers.
- Public claims should remain aligned with the veritas_os repository evidence.

## Important Note

Public metrics and claims shown on the website must stay aligned with the `veritas_os` repository evidence.
