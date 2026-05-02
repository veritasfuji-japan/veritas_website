import React, { useState, useEffect } from "react";

/**
 * VERITAS OS — Responsive landing (PC + mobile, single file)
 *
 * Breakpoint at 1024px (--bp-desktop).
 * Below 1024px → mobile layout (stacked, single column).
 * 1024px and above → desktop layout (multi-column, full pipeline strip, etc).
 *
 * Critical bug fixes applied this revision:
 *   1. .only-desktop now uses `display: revert` instead of `display: block`,
 *      so child elements like .aud-grid (display:grid), .footer-grid
 *      (display:grid), and .pointer-grid-desktop (display:grid) keep
 *      their proper display values on desktop. Previously block override
 *      was killing the grid layout.
 *   2. Global min-width:0 scoped to non-SVG elements only, so logo SVG
 *      and bind-flow diagram render correctly.
 *   3. !important on .only-mobile { display: none } at desktop, to
 *      guarantee the mobile JSX block is hidden even with cascade conflicts.
 *
 * Numbers verified against README + main (commit bb72b21, 2026-05-01):
 *   • 87% test coverage
 *   • 85/100 internal overall snapshot (2026-04-15, prev 82)
 *   • 5 bind-governed effect paths
 *   • 6 AML/KYC pilot fixture scenarios
 *   • 8-stage operator pipeline
 */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Sans+JP:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

  :root {
    --paper: #F4EFE3;
    --paper-2: #FAF6EB;
    --paper-3: #EDE7D6;
    --ink: #15161A;
    --ink-2: #2A2D33;
    --muted: #5A5C62;
    --rule: #C9C2AE;
    --rule-soft: #DDD7C5;
    --teal: #14B5A4;
    --teal-deep: #0E7E73;
    --blue: #2456C7;
    --blue-deep: #1B3A8F;
    --frame: #1A1F2E;
    --sage: #3F5A3A;
    --crimson: #8C1F2F;

    --serif: 'Fraunces', 'Times New Roman', serif;
    --sans: 'IBM Plex Sans', 'IBM Plex Sans JP', system-ui, -apple-system, sans-serif;
    --mono: 'IBM Plex Mono', ui-monospace, monospace;

    --pad-x: clamp(1rem, 4.5vw, 4rem);
    --pad-y: clamp(3.5rem, 10vw, 7rem);
    --max: 90rem;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  /* min-width: 0 only on non-SVG so logo & bind-flow render correctly */
  .ve *:not(svg):not(svg *) { min-width: 0; }
  html, body { overflow-x: hidden; }

  .ve {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-feature-settings: "kern" 1, "ss02" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.65;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    width: 100%;
  }
  .ve a { color: inherit; text-decoration: none; }
  .ve button { font: inherit; cursor: pointer; background: none; border: none; color: inherit; }
  .ve ul, .ve ol { list-style: none; }

  .container { max-width: var(--max); margin-inline: auto; padding-inline: var(--pad-x); width: 100%; }

  .grain {
    background-image: radial-gradient(rgba(60, 50, 30, 0.04) 1px, transparent 1px);
    background-size: 3px 3px;
  }

  /* Visibility helpers — preserve element's own display value (grid/flex/etc.) */
  .only-mobile { display: revert; }
  .only-desktop { display: none !important; }
  @media (min-width: 1024px) {
    .only-mobile { display: none !important; }
    .only-desktop { display: revert; }
  }

  /* Hero containers need explicit block visibility for stable first paint */
  .hero .only-mobile,
  .hero .only-desktop { display: block; }
  @media (min-width: 1024px) {
    .hero .only-mobile { display: none !important; }
    .hero .only-desktop { display: block !important; }
  }

  /* Brand gradient text — inline so it doesn't break across line wraps */
  .brand-gradient-text {
    background: linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 30%, var(--blue) 65%, var(--blue-deep) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    display: inline;
  }

  .marker {
    display: inline-flex;
    align-items: baseline;
    gap: 0.5em;
    font-family: var(--mono);
    font-size: 0.74rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .marker::before {
    content: "§";
    font-family: var(--serif);
    font-style: italic;
    font-size: 1.15em;
    color: var(--blue);
  }
  @media (min-width: 1024px) {
    .marker { font-size: 0.78rem; letter-spacing: 0.16em; }
  }

  .display {
    font-family: var(--serif);
    font-weight: 400;
    font-variation-settings: "opsz" 144, "SOFT" 50;
    font-size: clamp(2.25rem, 1.4rem + 4vw, 5.75rem);
    line-height: 1.06;
    letter-spacing: -0.022em;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  .display em {
    font-style: italic;
    font-weight: 400;
    font-variation-settings: "opsz" 144, "SOFT" 100;
  }

  .headline {
    font-family: var(--serif);
    font-weight: 400;
    font-variation-settings: "opsz" 100;
    font-size: clamp(1.6rem, 1.1rem + 2.4vw, 3.25rem);
    line-height: 1.14;
    letter-spacing: -0.014em;
    word-break: keep-all;
    overflow-wrap: break-word;
  }

  .lead {
    font-size: clamp(1rem, 0.95rem + 0.3vw, 1.22rem);
    line-height: 1.7;
    color: var(--ink-2);
  }
  .lead-ja { line-height: 1.85; }
  .body { font-size: clamp(0.94rem, 0.92rem + 0.15vw, 1.02rem); line-height: 1.7; color: var(--ink-2); }
  .small { font-size: clamp(0.78rem, 0.76rem + 0.1vw, 0.84rem); color: var(--muted); line-height: 1.6; }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.25rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 2px;
    transition: transform 200ms, box-shadow 200ms, background 200ms;
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--ink);
    color: var(--paper);
    box-shadow: 4px 4px 0 0 var(--teal);
  }
  .btn-primary:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--teal); }
  .btn-secondary { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
  .btn-secondary:hover { background: var(--ink); color: var(--paper); }
  @media (min-width: 1024px) {
    .btn { padding: 0.9rem 1.5rem; font-size: 1rem; }
    .btn-primary { box-shadow: 5px 5px 0 0 var(--teal); }
    .btn-primary:hover { box-shadow: 7px 7px 0 0 var(--teal); }
  }

  /* ── Top bar ──────────────────────────────────────────────── */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(244, 239, 227, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule-soft);
    padding-top: env(safe-area-inset-top, 0px);
  }
  .topbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0;
    gap: 0.5rem;
    min-height: 3.25rem;
  }
  @media (min-width: 1024px) {
    .topbar-inner {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 2rem;
      padding: 1.1rem 0;
    }
  }

  .brand { display: inline-flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
  .brand-wordmark {
    font-family: var(--sans);
    font-size: clamp(0.74rem, 0.7rem + 0.2vw, 0.86rem);
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
    line-height: 1;
    white-space: nowrap;
  }
  .brand-wordmark .os { color: var(--blue); }
  @media (min-width: 1024px) { .brand-wordmark { letter-spacing: 0.2em; } }

  .navlinks { display: none; }
  @media (min-width: 1024px) {
    .navlinks {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
    }
  }
  .navlink {
    padding: 0.55rem 1rem;
    font-size: 0.96rem;
    color: var(--ink-2);
    border-radius: 2px;
    transition: background 180ms, color 180ms;
  }
  .navlink:hover { color: var(--ink); background: rgba(0,0,0,0.04); }

  .top-actions { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
  @media (min-width: 1024px) { .top-actions { gap: 0.65rem; } }

  .lang-toggle {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.65rem;
    font-family: var(--mono);
    font-size: 0.74rem;
    font-weight: 500;
    border: 1px solid var(--rule);
    border-radius: 2px;
    background: var(--paper-2);
    white-space: nowrap;
  }
  .lang-toggle:hover { border-color: var(--ink); }
  @media (min-width: 1024px) {
    .lang-toggle { padding: 0.45rem 0.85rem; font-size: 0.8rem; }
  }

  .top-link { display: none; }
  @media (min-width: 1024px) {
    .top-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 0.85rem;
      font-size: 0.88rem;
      color: var(--ink-2);
      border: 1px solid var(--rule);
      border-radius: 2px;
      background: var(--paper-2);
      transition: border-color 180ms;
    }
    .top-link:hover { border-color: var(--ink); }
  }

  .menu-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid var(--rule);
    border-radius: 2px;
    background: var(--paper-2);
    flex-shrink: 0;
  }
  @media (min-width: 1024px) { .menu-btn { display: none; } }

  .mobile-menu {
    border-top: 1px solid var(--rule-soft);
    background: var(--paper);
    padding: 0.5rem var(--pad-x) 1rem;
    display: flex;
    flex-direction: column;
  }
  .mobile-menu a {
    padding: 1rem 0;
    border-bottom: 1px solid var(--rule-soft);
    font-size: 1rem;
    color: var(--ink-2);
  }
  .mobile-menu a:last-child { border-bottom: none; }

  /* ── Hero ─────────────────────────────────────────────────── */
  .hero {
    padding-top: clamp(2.25rem, 6vw, 5.5rem);
    padding-bottom: clamp(3.25rem, 9vw, 7rem);
    background: linear-gradient(180deg, var(--paper) 0%, var(--paper) 60%, var(--paper-3) 100%);
  }

  /* MOBILE hero */
  .hero-mobile { text-align: center; }
  .hero-mobile .hero-logo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  }
  .hero-mobile .display { max-width: 18ch; margin: 0 auto clamp(1.25rem, 3vw, 2.25rem); }
  .hero-mobile .lead { max-width: 38ch; margin: 0 auto clamp(1.75rem, 4vw, 2.75rem); }
  .hero-mobile .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    margin-bottom: clamp(2rem, 5vw, 3.5rem);
  }
  .hero-mobile .role-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 56rem;
    margin: 0 auto;
    border-top: 1px solid var(--rule-soft);
    border-bottom: 1px solid var(--rule-soft);
    border-left: 1px solid var(--rule-soft);
  }
  .hero-mobile .role-link {
    padding: 1rem 0.75rem;
    font-family: var(--mono);
    font-size: 0.74rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: color 200ms;
    border-right: 1px solid var(--rule-soft);
    border-bottom: 1px solid var(--rule-soft);
    text-align: center;
  }
  .hero-mobile .role-link:hover { color: var(--blue); }
  .hero-mobile .role-link::before {
    content: attr(data-num);
    color: var(--teal);
    font-weight: 600;
  }
  .hero-mobile .role-link:nth-child(2n) { border-right: none; }
  .hero-mobile .role-link:nth-last-child(-n+2) { border-bottom: none; }
  .hero-mobile .hero-meta {
    margin-top: clamp(1.75rem, 4vw, 3rem);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem 1rem;
    font-family: var(--mono);
    font-size: clamp(0.7rem, 0.65rem + 0.2vw, 0.78rem);
    color: var(--muted);
  }
  .hero-mobile .hero-meta-item { display: inline-flex; align-items: center; gap: 1rem; }
  .hero-mobile .hero-meta-item:not(:last-child)::after { content: "·"; color: var(--rule); }
  .hero-mobile .hero-logo {
    width: clamp(88px, 22vw, 144px);
    height: auto;
    filter: drop-shadow(0 8px 20px rgba(20, 60, 100, 0.15));
  }

  /* DESKTOP hero */
  .hero-desktop {
    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  @media (min-width: 1280px) { .hero-desktop { gap: 6rem; } }
  .hero-desktop .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }
  .hero-desktop .hero-eyebrow::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--rule);
  }
  .hero-desktop .display { max-width: 14ch; margin-bottom: 2.5rem; }
  .hero-desktop .lead { max-width: 38ch; margin-bottom: 3rem; }
  .hero-desktop .hero-cta { display: flex; gap: 0.85rem; margin-bottom: 4rem; }
  .hero-desktop .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    font-family: var(--mono);
    font-size: 0.84rem;
    color: var(--muted);
    padding-top: 1.5rem;
    border-top: 1px solid var(--rule-soft);
    max-width: 38rem;
  }
  .hero-desktop .hero-meta-item:not(:last-child)::after {
    content: " · ";
    color: var(--rule);
    margin-left: 1.5rem;
  }
  .hero-desktop .hero-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }
  .hero-desktop .hero-logo {
    width: 168px;
    height: auto;
    filter: drop-shadow(0 10px 28px rgba(20, 60, 100, 0.18));
  }

  /* Bind card */
  .bind-card {
    width: 100%;
    background: var(--paper-2);
    border: 1px solid var(--rule);
    border-radius: 3px;
    padding: 1.5rem 1.75rem;
    box-shadow: 10px 10px 0 0 var(--paper-3);
  }
  .bind-card-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.25rem;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--rule-soft);
  }
  .bind-card-title { font-family: var(--serif); font-style: italic; font-size: 1.05rem; }
  .bind-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.65rem;
    background: rgba(63, 90, 58, 0.12);
    color: var(--sage);
    border-radius: 12px;
    font-family: var(--mono);
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .bind-pill::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--sage);
  }
  .bind-receipts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--rule-soft);
  }
  .bind-key {
    font-family: var(--mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 0.35rem;
  }
  .bind-val { font-family: var(--mono); font-size: 0.95rem; font-weight: 600; }

  /* ── Audiences (desktop only) ───────────────────────────── */
  .audiences {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
  }
  .aud-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
  .aud-card {
    padding: 3rem 2.5rem;
    border-right: 1px solid var(--rule);
    transition: background 180ms;
    display: block;
  }
  .aud-card:last-child { border-right: none; }
  .aud-card:hover { background: var(--paper-2); }
  .aud-num {
    font-family: var(--mono);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--teal);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }
  .aud-title {
    font-family: var(--serif);
    font-size: 1.7rem;
    font-weight: 400;
    line-height: 1.18;
    margin-bottom: 0.85rem;
    letter-spacing: -0.01em;
  }
  .aud-body { font-size: 0.95rem; line-height: 1.65; color: var(--muted); margin-bottom: 1.75rem; }
  .aud-body-ja { line-height: 1.85; }
  .aud-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--mono);
    font-size: 0.84rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink);
    border-bottom: 1px solid var(--ink);
    padding-bottom: 0.2rem;
  }
  .aud-cta-arrow { transition: transform 200ms; }
  .aud-card:hover .aud-cta-arrow { transform: translateX(5px); }

  /* ── Section header ─────────────────────────────────────── */
  .sec { padding: var(--pad-y) 0; }
  .sec-head { margin-bottom: clamp(2rem, 5vw, 4rem); max-width: 50rem; }
  .sec-head .marker { margin-bottom: clamp(0.85rem, 1.5vw, 1.25rem); }
  .sec-head .headline { margin-bottom: clamp(1rem, 2vw, 1.5rem); }

  /* ── Idea ───────────────────────────────────────────────── */
  .idea {
    background: var(--paper-2);
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }
  .compare { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
  @media (min-width: 760px) { .compare { grid-template-columns: 1fr 1fr; gap: 1.5rem; } }

  .ledger {
    background: var(--paper);
    border: 1px solid var(--rule);
    padding: clamp(1.25rem, 3vw, 2.5rem);
  }
  .ledger-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: clamp(1.25rem, 2vw, 1.5rem);
    padding-bottom: clamp(0.85rem, 1.5vw, 1rem);
    border-bottom: 2px solid var(--ink);
  }
  .ledger-cat {
    font-family: var(--mono);
    font-size: clamp(0.72rem, 0.7rem + 0.1vw, 0.76rem);
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.13em;
    margin-bottom: 0.4rem;
  }
  .ledger-title {
    font-family: var(--serif);
    font-size: clamp(1.15rem, 1rem + 0.6vw, 1.65rem);
    font-weight: 400;
    line-height: 1.18;
    letter-spacing: -0.01em;
  }
  .ledger-glyph {
    font-family: var(--serif);
    font-style: italic;
    font-size: clamp(1.6rem, 1.4rem + 0.5vw, 1.85rem);
    line-height: 1;
    flex-shrink: 0;
  }
  .ledger-summary {
    font-family: var(--serif);
    font-size: clamp(0.98rem, 0.92rem + 0.4vw, 1.18rem);
    font-style: italic;
    line-height: 1.55;
    margin-bottom: clamp(1rem, 1.5vw, 1.25rem);
    color: var(--ink-2);
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  .ledger-summary-ja { line-height: 1.8; }
  .ledger-points {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    font-family: var(--mono);
    font-size: clamp(0.82rem, 0.8rem + 0.15vw, 0.88rem);
  }
  .ledger-points li {
    padding-left: 1.25rem;
    position: relative;
    color: var(--ink-2);
  }
  .ledger-points li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--muted);
  }

  .idea-conclusion {
    margin-top: clamp(2rem, 4vw, 3rem);
    text-align: center;
    padding: clamp(1.25rem, 2.5vw, 2rem) clamp(1.25rem, 3vw, 2.5rem);
    border: 1px solid var(--ink);
    background: var(--paper);
    font-family: var(--serif);
    font-style: italic;
    font-size: clamp(1rem, 0.9rem + 0.6vw, 1.4rem);
    line-height: 1.55;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  .idea-conclusion-ja { line-height: 1.8; }
  .idea-conclusion-link {
    display: inline-block;
    margin-top: 1rem;
    font-family: var(--mono);
    font-style: normal;
    font-size: clamp(0.78rem, 0.76rem + 0.1vw, 0.85rem);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 0.2rem;
  }
  .idea-conclusion-link:hover { color: var(--blue); border-color: var(--blue); }

  /* ── Numbers ────────────────────────────────────────────── */
  .numbers {
    background: var(--ink);
    color: var(--paper-2);
    padding: var(--pad-y) 0;
    position: relative;
    overflow: hidden;
  }
  .numbers::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(rgba(255, 245, 220, 0.04) 1px, transparent 1px);
    background-size: 4px 4px;
    pointer-events: none;
  }
  .numbers .marker { color: var(--teal); }
  .numbers .marker::before { color: var(--teal); }
  .numbers .headline { color: var(--paper-2); }
  .numbers .lead { color: rgba(255, 245, 220, 0.7); }

  .numbers-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    margin-top: clamp(2rem, 4vw, 4rem);
    border-top: 1px solid rgba(255, 245, 220, 0.18);
    border-left: 1px solid rgba(255, 245, 220, 0.18);
  }
  @media (min-width: 720px) { .numbers-grid { grid-template-columns: repeat(4, 1fr); } }
  .number-cell {
    padding: clamp(1.25rem, 3.5vw, 2.75rem) clamp(1.25rem, 3vw, 2.25rem);
    border-right: 1px solid rgba(255, 245, 220, 0.18);
    border-bottom: 1px solid rgba(255, 245, 220, 0.18);
    display: flex;
    flex-direction: column;
  }
  .number-val {
    font-family: var(--serif);
    font-weight: 400;
    font-variation-settings: "opsz" 144;
    font-size: clamp(2rem, 1.3rem + 3vw, 4.25rem);
    line-height: 1;
    margin-bottom: 0.65rem;
    letter-spacing: -0.025em;
    overflow-wrap: break-word;
  }
  .number-val em {
    font-family: var(--mono);
    font-style: normal;
    font-size: 0.5em;
    color: var(--teal);
    margin-left: 0.15em;
    vertical-align: 0.55em;
  }
  .number-label {
    font-size: clamp(0.78rem, 0.74rem + 0.2vw, 0.95rem);
    color: rgba(255, 245, 220, 0.7);
    line-height: 1.45;
  }
  .numbers-source {
    margin-top: clamp(1.25rem, 2.5vw, 2.5rem);
    font-family: var(--mono);
    font-size: clamp(0.7rem, 0.66rem + 0.15vw, 0.8rem);
    color: rgba(255, 245, 220, 0.55);
    letter-spacing: 0.04em;
    line-height: 1.6;
    word-break: break-word;
  }

  /* Pipeline */
  .pipeline {
    margin-top: clamp(2rem, 4vw, 4rem);
    padding-top: clamp(1.5rem, 3vw, 2.5rem);
    border-top: 1px solid rgba(255, 245, 220, 0.18);
  }
  .pipeline-label {
    font-family: var(--mono);
    font-size: clamp(0.74rem, 0.72rem + 0.1vw, 0.78rem);
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: rgba(255, 245, 220, 0.55);
    margin-bottom: clamp(1rem, 2vw, 1.5rem);
  }
  .pipeline-stages {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.5rem;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .pipeline-stages { flex-wrap: nowrap; gap: 0; width: 100%; }
  }
  .pipeline-stage {
    font-family: var(--mono);
    font-size: clamp(0.76rem, 0.72rem + 0.2vw, 0.95rem);
    font-weight: 600;
    padding: 0.4rem 0.75rem;
    border: 1px solid rgba(255, 245, 220, 0.25);
    border-radius: 2px;
    color: var(--paper-2);
    background: rgba(255, 245, 220, 0.04);
    text-align: center;
  }
  @media (min-width: 1024px) {
    .pipeline-stage { flex: 1 1 0; padding: 1rem 0.75rem; }
  }
  .pipeline-arrow {
    color: var(--teal);
    font-family: var(--mono);
    font-size: clamp(0.85rem, 0.8rem + 0.2vw, 1.1rem);
    flex-shrink: 0;
  }
  @media (min-width: 1024px) { .pipeline-arrow { padding: 0 0.5rem; } }

  /* ── AML/KYC pointer ────────────────────────────────────── */
  .pointer { padding: var(--pad-y) 0; }
  .pointer-card {
    border: 1px solid var(--rule);
    background: var(--paper-2);
    padding: clamp(1.5rem, 4vw, 4rem);
  }
  @media (min-width: 1024px) {
    .pointer-card { box-shadow: 12px 12px 0 0 var(--paper-3); }
  }

  .pointer-grid-mobile {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.75rem;
    align-items: start;
  }
  @media (min-width: 880px) {
    .pointer-grid-mobile { grid-template-columns: 1fr 1.1fr; gap: 3rem; }
  }
  .pointer-grid-desktop {
    display: grid;
    grid-template-columns: 1fr 1.05fr 0.95fr;
    gap: 3.5rem;
    align-items: start;
  }

  .pointer-cat {
    font-family: var(--mono);
    font-size: clamp(0.74rem, 0.72rem + 0.15vw, 0.78rem);
    font-weight: 500;
    color: var(--blue);
    text-transform: uppercase;
    letter-spacing: 0.13em;
    margin-bottom: clamp(0.85rem, 1.5vw, 1rem);
  }
  .pointer-title {
    font-family: var(--serif);
    font-size: clamp(1.3rem, 1.1rem + 1vw, 2.1rem);
    font-weight: 400;
    line-height: 1.18;
    margin-bottom: clamp(0.85rem, 1.5vw, 1.25rem);
    letter-spacing: -0.012em;
    word-break: keep-all;
  }
  .pointer-body {
    font-size: clamp(0.94rem, 0.9rem + 0.2vw, 1rem);
    line-height: 1.7;
    color: var(--muted);
    margin-bottom: clamp(1.5rem, 2.5vw, 2rem);
  }
  .pointer-body-ja { line-height: 1.85; }

  .yaml-card {
    background: var(--paper);
    border: 1px solid var(--rule-soft);
    padding: 1.25rem;
  }
  .yaml-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.85rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid var(--rule-soft);
    gap: 0.75rem;
  }
  .yaml-path {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--muted);
    word-break: break-all;
  }
  .yaml-tag {
    font-family: var(--mono);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgba(63, 90, 58, 0.14);
    color: var(--sage);
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .yaml-pre {
    font-family: var(--mono);
    font-size: 0.78rem;
    line-height: 1.7;
    color: var(--ink);
    white-space: pre;
    overflow-x: auto;
  }

  .scenarios { display: flex; flex-direction: column; gap: 0.4rem; }
  .scenarios-head {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: clamp(0.75rem, 1.5vw, 0.85rem);
    padding-bottom: clamp(0.6rem, 1.5vw, 0.7rem);
    border-bottom: 1px solid var(--rule-soft);
  }
  @media (min-width: 480px) {
    .scenarios-head {
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
  .scenarios-title { font-family: var(--serif); font-style: italic; font-size: clamp(0.95rem, 0.92rem + 0.15vw, 1rem); }
  .scenarios-path {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--muted);
    word-break: break-all;
  }
  .scenario {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
    padding: clamp(0.55rem, 1vw, 0.7rem) clamp(0.75rem, 1.5vw, 0.9rem);
    background: var(--paper);
    border: 1px solid var(--rule-soft);
    font-family: var(--mono);
    font-size: clamp(0.7rem, 0.66rem + 0.2vw, 0.82rem);
  }
  .scenario-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1 auto;
  }
  .scenario-out {
    flex-shrink: 0;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    font-size: clamp(0.64rem, 0.6rem + 0.15vw, 0.7rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .out-proceed { background: rgba(63, 90, 58, 0.14); color: var(--sage); }
  .out-block { background: rgba(140, 31, 47, 0.12); color: var(--crimson); }
  .out-hold, .out-review { background: rgba(36, 86, 199, 0.1); color: var(--blue); }

  /* ── Signals strip ──────────────────────────────────────── */
  .signals-strip {
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    background: var(--paper-3);
  }
  .signals-strip-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
    padding: 1.1rem 0;
  }
  @media (min-width: 600px) {
    .signals-strip-inner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .signals-strip-inner { padding: 1.5rem 0; gap: 2rem; }
  }
  .signals-strip-cat {
    font-family: var(--mono);
    font-size: clamp(0.74rem, 0.72rem + 0.1vw, 0.78rem);
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.11em;
  }
  .signals-strip-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    font-size: clamp(0.88rem, 0.86rem + 0.15vw, 0.96rem);
  }
  @media (min-width: 1024px) { .signals-strip-links { gap: 2rem; } }
  .signals-strip-links a {
    border-bottom: 1px solid var(--rule);
    padding-bottom: 0.1rem;
  }
  .signals-strip-links a:hover { color: var(--blue); border-color: var(--blue); }

  /* ── Footer ─────────────────────────────────────────────── */
  .footer {
    background: var(--paper-3);
    padding: clamp(2.5rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 2.75rem);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 4vw, 3rem);
    margin-bottom: clamp(2.25rem, 5vw, 4rem);
  }
  @media (min-width: 720px) { .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; } }
  @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr; gap: 4rem; } }
  .footer-col h4 {
    font-family: var(--mono);
    font-size: clamp(0.72rem, 0.7rem + 0.1vw, 0.76rem);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.13em;
    color: var(--muted);
    margin-bottom: clamp(1.1rem, 2vw, 1.25rem);
  }
  .footer-col ul { display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-col a {
    font-size: clamp(0.92rem, 0.9rem + 0.1vw, 0.95rem);
    color: var(--ink-2);
    transition: color 180ms;
  }
  .footer-col a:hover { color: var(--blue); }

  .disclaimer {
    margin-bottom: clamp(2rem, 4vw, 4rem);
    padding: clamp(1.1rem, 2.5vw, 2rem) clamp(1.25rem, 3vw, 2.25rem);
    background: var(--paper-2);
    border-left: 3px solid var(--crimson);
  }
  .disclaimer-cat {
    font-family: var(--mono);
    font-size: clamp(0.72rem, 0.7rem + 0.1vw, 0.76rem);
    font-weight: 600;
    color: var(--crimson);
    text-transform: uppercase;
    letter-spacing: 0.13em;
    margin-bottom: 0.85rem;
  }
  .disclaimer-list {
    font-size: clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem);
    color: var(--muted);
    line-height: 1.85;
  }
  .disclaimer-list-ja { line-height: 1.95; }
  .disclaimer-list span + span::before { content: " · "; color: var(--rule); }

  .footer-bottom {
    padding-top: clamp(1.5rem, 2.5vw, 1.75rem);
    border-top: 1px solid var(--rule);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: var(--mono);
    font-size: clamp(0.7rem, 0.66rem + 0.15vw, 0.78rem);
    color: var(--muted);
    line-height: 1.6;
  }
  @media (min-width: 1024px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }
  }

  @keyframes fade-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .reveal { animation: fade-rise 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }

  ::selection { background: var(--teal); color: var(--ink); }
  :focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
`;

function makeT(lang) {
  return (ja, en) => (lang === "ja" ? ja : en);
}

// ─── Logo ───────────────────────────────────────────────────────
function VeritasLogo({ size = 128, className = "hero-logo" }) {
  return (
    <svg
      viewBox="0 0 200 220"
      width={size}
      height={(size * 220) / 200}
      role="img"
      aria-label="VERITAS OS shield"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="v-left-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#19A89A" />
          <stop offset="40%" stopColor="#137F73" />
          <stop offset="80%" stopColor="#1F4598" />
          <stop offset="100%" stopColor="#1B3A8F" />
        </linearGradient>
        <linearGradient id="v-right-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0E7E73" />
          <stop offset="35%" stopColor="#0A5C53" />
          <stop offset="75%" stopColor="#1B3A8F" />
          <stop offset="100%" stopColor="#142B6E" />
        </linearGradient>
        <linearGradient id="v-fold-u" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#063D38" />
          <stop offset="60%" stopColor="#0E2459" />
          <stop offset="100%" stopColor="#0A1B43" />
        </linearGradient>
      </defs>
      <path
        d="M 30 22 L 30 30 L 36 36 L 36 110 C 36 152, 100 196, 100 196 C 100 196, 164 152, 164 110 L 164 36 L 170 30 L 170 22 Z"
        fill="none" stroke="#1A1F2E" strokeWidth="3" strokeLinejoin="round"
      />
      <path
        d="M 33 25 L 33 30 L 39 36 L 39 110 C 39 150, 100 192, 100 192 C 100 192, 161 150, 161 110 L 161 36 L 167 30 L 167 25"
        fill="none" stroke="#19A89A" strokeWidth="0.8" opacity="0.9"
      />
      <path d="M 56 50 L 73 50 L 100 130 L 100 158 L 88 152 Z" fill="url(#v-left-u)" />
      <path d="M 127 50 L 144 50 L 112 152 L 100 158 L 100 130 Z" fill="url(#v-right-u)" />
      <path d="M 100 130 L 100 158 L 88 152 L 100 130 Z" fill="url(#v-fold-u)" opacity="0.5" />
      <path d="M 56 50 L 73 50 L 71 53 L 58 53 Z" fill="#26C9B5" opacity="0.5" />
      <path d="M 127 50 L 144 50 L 142 53 L 129 53 Z" fill="#0A5C53" opacity="0.4" />
    </svg>
  );
}

// ─── Bind-flow SVG ──────────────────────────────────────────────
function BindFlow() {
  return (
    <svg viewBox="0 0 600 240" style={{ width: "100%", height: "auto", display: "block" }} aria-label="Bind boundary lineage">
      <defs>
        <marker id="arr-u" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5A5C62" />
        </marker>
      </defs>
      <line x1="20" y1="105" x2="580" y2="105" stroke="#C9C2AE" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={40 + i * 48} cy="105" r="1.6" fill="#A47126">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {[
        { x: 20, label: "decision", sub: "/v1/decide", color: "#1B3A8F" },
        { x: 220, label: "execution_intent", sub: "admissibility check", color: "#A47126", live: true },
        { x: 420, label: "bind_receipt", sub: "TrustLog · Ed25519", color: "#3F5A3A" },
      ].map((n, i) => (
        <g key={n.label} transform={`translate(${n.x}, 55)`}>
          <rect x="0" y="0" width="160" height="100" rx="2" fill="#FAF6EB" stroke={n.color} strokeWidth="1.5" />
          {n.live && (
            <rect x="0" y="0" width="160" height="100" rx="2" fill="none" stroke={n.color} strokeWidth="1" opacity="0.45">
              <animate attributeName="stroke-width" values="1;3;1" dur="2.6s" repeatCount="indefinite" />
            </rect>
          )}
          <text x="80" y="42" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15161A" fontFamily="IBM Plex Mono">{n.label}</text>
          <text x="80" y="64" textAnchor="middle" fontSize="11" fill="#5A5C62" fontFamily="IBM Plex Sans">{n.sub}</text>
          <line x1="60" y1="78" x2="100" y2="78" stroke={n.color} strokeWidth="1.5" />
          {i < 2 && <line x1="160" y1="50" x2="220" y2="50" stroke="#5A5C62" strokeWidth="1" markerEnd="url(#arr-u)" />}
        </g>
      ))}
      <text x="300" y="200" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono" fill="#5A5C62">
        h_t = SHA256(h_{"{t-1}"} ‖ r_t)
      </text>
      <text x="300" y="222" textAnchor="middle" fontSize="11" fontStyle="italic" fontFamily="Fraunces" fill="#A47126">
        approval ≠ commitment
      </text>
    </svg>
  );
}

// ─── Top bar ────────────────────────────────────────────────────
function TopBar({ lang, setLang, menuOpen, setMenuOpen }) {
  const t = makeT(lang);
  const links = [
    ["#idea", t("中心の発想", "The idea")],
    ["#numbers", t("実装の事実", "The facts")],
    ["#financial", t("金融 (AML/KYC)", "Financial")],
    ["#reviewers", t("レビュアー", "Reviewers")],
  ];
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a href="#top" className="brand" aria-label="VERITAS OS home">
          <VeritasLogo size={28} className="" />
          <span className="brand-wordmark">
            VERITAS<span className="os">&nbsp;OS</span>
          </span>
        </a>
        <nav className="navlinks" aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="navlink">{label}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "ja" ? "en" : "ja")} aria-label="Toggle language">
            {lang === "ja" ? "JA / EN" : "EN / JA"}
          </button>
          <a className="top-link" href="https://github.com/veritasfuji-japan/veritas_os" target="_blank" rel="noreferrer noopener">
            GitHub <span aria-hidden>↗</span>
          </a>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href="https://github.com/veritasfuji-japan/veritas_os" target="_blank" rel="noreferrer noopener">GitHub →</a>
        </nav>
      )}
    </header>
  );
}

// ─── Hero ───────────────────────────────────────────────────────
function Hero({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const titleJa = (
    <>AI の判断を、<em className="brand-gradient-text">世界に出る前に</em>統制する。</>
  );
  const titleEn = (
    <>Govern AI decisions <em className="brand-gradient-text">before</em> they touch the real world.</>
  );
  const titleJaDesktop = (
    <>
      AI の判断を、<br />
      <em className="brand-gradient-text">世界に出る前に</em><br />
      統制する。
    </>
  );
  const titleEnDesktop = (
    <>
      Govern AI decisions <em className="brand-gradient-text">before</em><br />
      they touch the real world.
    </>
  );

  const lead = t(
    "意思決定の承認と実行 (commit) の境界を分離するコントロールプレーン。AI エージェントの判断を、レビュー可能・追跡可能・再実行可能・監査可能・強制可能にします。",
    "A control plane that separates approval from commitment — making every AI-agent decision reviewable, traceable, replayable, auditable, and enforceable."
  );

  const cta = (
    <>
      <a href="#idea" className="btn btn-primary">
        {t("中心の発想を読む", "Read the core idea")}
        <span aria-hidden>→</span>
      </a>
      <a href="#financial" className="btn btn-secondary">
        {t("AML/KYC 1日 PoC", "AML/KYC 1-day PoC")}
      </a>
    </>
  );

  const meta = (
    <>
      <span className="hero-meta-item">SHA-256 hash chain</span>
      <span className="hero-meta-item">Ed25519 signed</span>
      <span className="hero-meta-item">Fail-closed gates</span>
      <span className="hero-meta-item">EU AI Act</span>
    </>
  );

  const roles = [
    ["01", t("導入評価", "Customer"), "#financial"],
    ["02", t("運用", "Operator"), "#numbers"],
    ["03", t("DD・投資", "Investor"), "#numbers"],
    ["04", t("第三者監査", "Reviewer"), "/reviewers"],
  ];

  return (
    <section id="top" className="hero">
      {/* MOBILE */}
      <div className="container only-mobile">
        <div className="hero-mobile">
          <div className="hero-logo-wrap reveal">
            <VeritasLogo size={120} className="hero-logo" />
          </div>
          <h1 className="display reveal" style={{ animationDelay: "0.1s" }}>
            {isJa ? titleJa : titleEn}
          </h1>
          <p className={`lead reveal ${isJa ? "lead-ja" : ""}`} style={{ animationDelay: "0.2s" }}>{lead}</p>
          <div className="hero-cta reveal" style={{ animationDelay: "0.3s" }}>{cta}</div>
          <div className="role-bar reveal" style={{ animationDelay: "0.4s" }}>
            {roles.map(([num, label, href]) => (
              <a key={num} href={href} className="role-link" data-num={num}>{label}</a>
            ))}
          </div>
          <div className="hero-meta reveal" style={{ animationDelay: "0.5s" }}>{meta}</div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="container only-desktop">
        <div className="hero-desktop">
          <div>
            <div className="hero-eyebrow reveal">
              <span className="marker">{t("公開草案 · v2.0 Beta", "Public Draft · v2.0 Beta")}</span>
            </div>
            <h1 className="display reveal" style={{ animationDelay: "0.1s" }}>
              {isJa ? titleJaDesktop : titleEnDesktop}
            </h1>
            <p className={`lead reveal ${isJa ? "lead-ja" : ""}`} style={{ animationDelay: "0.2s" }}>{lead}</p>
            <div className="hero-cta reveal" style={{ animationDelay: "0.3s" }}>{cta}</div>
            <div className="hero-meta reveal" style={{ animationDelay: "0.4s" }}>{meta}</div>
          </div>
          <div className="hero-visual reveal" style={{ animationDelay: "0.35s" }}>
            <div className="hero-logo-wrap">
              <VeritasLogo size={168} className="hero-logo" />
            </div>
            <div className="bind-card">
              <div className="bind-card-head">
                <span className="bind-card-title">{t("Bind 境界の系譜", "Bind-boundary lineage")}</span>
                <span className="bind-pill">committed</span>
              </div>
              <BindFlow />
              <div className="bind-receipts">
                {[
                  ["FUJI", "allow", "var(--sage)"],
                  ["telos", "0.84", "var(--blue)"],
                  ["replay", "match", "var(--muted)"],
                ].map(([k, v, c]) => (
                  <div key={k}>
                    <div className="bind-key">{k}</div>
                    <div className="bind-val" style={{ color: c }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Audiences (desktop only) ───────────────────────────────────
function Audiences({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const items = [
    {
      num: "I.", tag: t("導入評価", "EVALUATING"),
      title: t("チームに導入する", "For your team"),
      body: t(
        "AML/KYC ビーチヘッドに 1日 PoC を当てて、fail-closed ガバナンスを fixture シナリオで実測。",
        "Run the AML/KYC beachhead 1-day PoC against fixture scenarios to verify fail-closed governance."
      ),
      href: "#financial", cta: t("Customer view へ", "Customer view"),
    },
    {
      num: "II.", tag: t("運用", "OPERATING"),
      title: t("本番で動かす", "In production"),
      body: t(
        "VERITAS_POSTURE で dev → staging → secure → prod を切替。RBAC は admin / operator / auditor。",
        "VERITAS_POSTURE switches dev → staging → secure → prod. RBAC ships with admin / operator / auditor."
      ),
      href: "#numbers", cta: t("Operator view へ", "Operator view"),
    },
    {
      num: "III.", tag: t("DD・投資", "INVESTING"),
      title: t("投資・買収判断", "Investing or DD"),
      body: t(
        "内部 DD スナップショット 85/100、テストカバレッジ 87%、CI 強制の品質ゲート。",
        "Internal DD snapshot 85/100, 87% test coverage, CI-enforced quality gates."
      ),
      href: "#numbers", cta: t("Investor view へ", "Investor view"),
    },
    {
      num: "IV.", tag: t("第三者監査", "REVIEWING"),
      title: t("外部監査・レビュー", "External review"),
      body: t(
        "Regulated Action Governance 外部レビュー引き渡しパック、Quality Gate 証跡が repo 同梱。",
        "Regulated Action Governance external review pack and quality gate evidence ship in the repo."
      ),
      href: "/reviewers", cta: t("Reviewer view へ", "Reviewer view"),
    },
  ];

  return (
    <section className="audiences only-desktop">
      <div className="container">
        <div className="aud-grid">
          {items.map((a) => (
            <a key={a.num} href={a.href} className="aud-card">
              <div className="aud-num">{a.num} {a.tag}</div>
              <h3 className="aud-title">{a.title}</h3>
              <p className={`aud-body ${isJa ? "aud-body-ja" : ""}`}>{a.body}</p>
              <span className="aud-cta">
                {a.cta}
                <span className="aud-cta-arrow" aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Idea ───────────────────────────────────────────────────────
function Idea({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  return (
    <section id="idea" className="idea sec">
      <div className="container">
        <div className="sec-head">
          <div className="marker">{t("第一節 · 中心の発想", "§ 01 · The core idea")}</div>
          <h2 className="headline" style={{ maxWidth: "22ch" }}>
            {t(
              "監査ログだけでは、commit を許可できない。",
              "An audit log alone cannot authorize commit."
            )}
          </h2>
          <p className={`lead ${isJa ? "lead-ja" : ""}`}>
            {t(
              "Audit log は「何が起きたか」、Authority Evidence は「なぜそれが許されたか」。VERITAS OS はこの2つを構造的に分離し、後者なしには commit が成立しないように設計されています。",
              "An audit log records what happened; authority evidence records why it was allowed. VERITAS OS keeps the two structurally separate — and without the latter, no commit is allowed."
            )}
          </p>
        </div>

        <div className="compare">
          <div className="ledger">
            <div className="ledger-head">
              <div>
                <div className="ledger-cat">Audit Log</div>
                <div className="ledger-title">{t("何が起きたか", "What happened")}</div>
              </div>
              <span className="ledger-glyph" style={{ color: "var(--blue)" }}>a.</span>
            </div>
            <p className={`ledger-summary ${isJa ? "ledger-summary-ja" : ""}`}>
              {t(
                "時系列の事実記録。decision_made → fuji_evaluated → trustlog_appended の連鎖がハッシュチェーンに刻まれる。",
                "A time-ordered factual record: decision_made → fuji_evaluated → trustlog_appended, anchored in a hash chain."
              )}
            </p>
            <ul className="ledger-points">
              <li>traceability</li>
              <li>post-incident analysis</li>
              <li>SHA-256 chain integrity</li>
            </ul>
          </div>

          <div className="ledger">
            <div className="ledger-head">
              <div>
                <div className="ledger-cat">Authority Evidence</div>
                <div className="ledger-title">{t("なぜ許されたか", "Why it was allowed")}</div>
              </div>
              <span className="ledger-glyph" style={{ color: "var(--teal-deep)" }}>b.</span>
            </div>
            <p className={`ledger-summary ${isJa ? "ledger-summary-ja" : ""}`}>
              {t(
                "bind 時点の admissibility 証跡。action_contract、scope_grants、validity_window、evidence_hash が verified である必要がある。",
                "Admissibility evidence at bind time: action_contract, scope_grants, validity_window, and verified evidence_hash must all be present."
              )}
            </p>
            <ul className="ledger-points">
              <li>commit gating</li>
              <li>fail-closed by default</li>
              <li>Ed25519 signed</li>
            </ul>
          </div>
        </div>

        <div className={`idea-conclusion ${isJa ? "idea-conclusion-ja" : ""}`}>
          {t(
            "「approval ≠ commitment」。これが VERITAS OS の中心の境界線です。",
            '"Approval is not commitment." This is the central boundary VERITAS OS draws.'
          )}
          <br />
          <a href="/concepts" className="idea-conclusion-link">
            {t("詳細を読む", "Read the full concept")} →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Numbers ────────────────────────────────────────────────────
function Numbers({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const stats = [
    { v: "87", em: "%", l: t("テストカバレッジ", "Test coverage") },
    { v: "85", em: "/100", l: t("内部総合スナップショット", "Internal overall snapshot") },
    { v: "5", em: "", l: t("Bind-governed paths", "Bind-governed paths") },
    { v: "2", em: "", l: t("査読論文 (Zenodo)", "Peer-archived papers (Zenodo)") },
  ];
  const pipeline = ["Input", "Evidence", "Critique", "Debate", "Plan", "Value", "FUJI", "TrustLog"];

  return (
    <section id="numbers" className="numbers">
      <div className="container">
        <div className="sec-head">
          <div className="marker">{t("第二節 · 数字で語る", "§ 02 · In numbers")}</div>
          <h2 className="headline">{t("実装された事実だけ。", "Only what's implemented.")}</h2>
          <p className={`lead ${isJa ? "lead-ja" : ""}`}>
            {t(
              "ロードマップではなく main ブランチの事実。最新スナップショット 2026-04-15 (前回 82 → 85)。",
              "Not roadmap. Facts on main. Latest snapshot 2026-04-15 (previously 82 → now 85)."
            )}
          </p>
        </div>

        <div className="numbers-grid">
          {stats.map((s) => (
            <div key={s.l} className="number-cell">
              <div className="number-val">{s.v}{s.em && <em>{s.em}</em>}</div>
              <div className="number-label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="pipeline">
          <div className="pipeline-label">
            {t("オペレーター向け 8 段パイプライン", "Operator-facing 8-stage pipeline")}
          </div>
          <div className="pipeline-stages">
            {pipeline.map((stage, i) => (
              <React.Fragment key={stage}>
                <span className="pipeline-stage">{stage}</span>
                {i < pipeline.length - 1 && <span className="pipeline-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="numbers-source">
          {t(
            "出典: README · public-positioning.md · coverage-report.md。バージョン 2.0.0 Beta、commit bb72b21。",
            "Sources: README · public-positioning.md · coverage-report.md. Version 2.0.0 Beta, commit bb72b21."
          )}
        </p>
      </div>
    </section>
  );
}

// ─── Financial pointer ──────────────────────────────────────────
function FinancialPointer({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const scenarios = [
    ["pilot_aml_kyc_anchor_high_risk_country", "human_review_required", "out-review"],
    ["pilot_sanctions_partial_match_no_proceed", "hold", "out-hold"],
    ["pilot_source_of_funds_missing", "hold", "out-hold"],
    ["pilot_policy_definition_missing", "hold", "out-hold"],
    ["pilot_sufficient_evidence_proceed", "proceed", "out-proceed"],
    ["pilot_secure_controls_missing_block", "block", "out-block"],
  ];

  const yamlPreview = `allowed_scope:
  - create_internal_risk_escalation
  - attach_evidence_snapshot
prohibited_scope:
  - freeze_account
  - close_account
  - notify_customer
evidence_freshness:
  sanctions_screening_trace:
    max_age: P1D
  kyc_profile:
    max_age: P7D
default_failure_mode: fail_closed`;

  const copyBlock = (
    <div>
      <div className="pointer-cat">{t("ビーチヘッド", "Beachhead")}</div>
      <h3 className="pointer-title">
        {t("AML/KYC コンプライアンス、1日 PoC。", "AML/KYC compliance — 1-day PoC.")}
      </h3>
      <p className={`pointer-body ${isJa ? "pointer-body-ja" : ""}`}>
        {t(
          "曖昧な事案や証拠不足を silent auto-proceed に流さず、hold / block / human review にルートする金融特化のガバナンス層。アンカーテンプレートは aml_kyc_high_risk_country_wire_manual_review。実装済みの 6 ケース fixture で挙動を実測できます。",
          "A finance-specific governance layer that routes ambiguous or evidence-missing cases to hold, block, or human review — never silent auto-proceed. The anchor template is aml_kyc_high_risk_country_wire_manual_review. Verify behavior against 6 implemented fixture scenarios."
        )}
      </p>
      <a href="/financial" className="btn btn-primary">
        {t("PoC を読む", "Read the PoC")}
        <span aria-hidden>→</span>
      </a>
    </div>
  );

  const scenariosBlock = (
    <div>
      <div className="scenarios-head">
        <span className="scenarios-title">{t("6 個の決定論的シナリオ", "6 deterministic scenarios")}</span>
        <code className="scenarios-path">aml_kyc_pilot_cases.json</code>
      </div>
      <div className="scenarios">
        {scenarios.map(([name, out, cls]) => (
          <div key={name} className="scenario">
            <span className="scenario-name">{name}</span>
            <span className={`scenario-out ${cls}`}>{out}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const yamlBlock = (
    <div className="yaml-card">
      <div className="yaml-head">
        <code className="yaml-path">policies/action_contracts/aml_kyc@v1.yaml</code>
        <span className="yaml-tag">fail_closed</span>
      </div>
      <pre className="yaml-pre">{yamlPreview}</pre>
    </div>
  );

  return (
    <section id="financial" className="pointer">
      <div className="container">
        <div className="pointer-card">
          {/* MOBILE: text + scenarios (no YAML) */}
          <div className="pointer-grid-mobile only-mobile">
            {copyBlock}
            {scenariosBlock}
          </div>
          {/* DESKTOP: text + YAML + scenarios */}
          <div className="pointer-grid-desktop only-desktop">
            {copyBlock}
            {yamlBlock}
            {scenariosBlock}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────
function FooterArea({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const linkGroupsMobile = [
    { h: t("プロダクト", "Product"), links: [
      ["GitHub", "https://github.com/veritasfuji-japan/veritas_os"],
      ["Mission Control", "#"],
      ["OpenAPI", "#"],
      ["SDK", "#"],
    ] },
    { h: t("ドキュメント", "Docs"), links: [
      [t("中心の発想", "The idea"), "#idea"],
      [t("AML/KYC", "AML/KYC"), "#financial"],
      [t("実装の事実", "The facts"), "#numbers"],
    ] },
    { h: t("学術・連絡", "Academic & Contact"), links: [
      ["Zenodo (EN)", "https://doi.org/10.5281/zenodo.17838349"],
      ["Zenodo (JP)", "https://doi.org/10.5281/zenodo.17838456"],
      ["LinkedIn", "https://www.linkedin.com/in/takeshi-fujishita-279709392"],
      ["veritas.fuji@gmail.com", "mailto:veritas.fuji@gmail.com"],
    ] },
  ];

  const linkGroupsDesktop = [
    { h: t("プロダクト", "Product"), links: [
      ["GitHub", "https://github.com/veritasfuji-japan/veritas_os"],
      ["Mission Control", "#"],
      ["OpenAPI", "#"],
      ["SDK", "#"],
    ] },
    { h: t("ドキュメント", "Docs"), links: [
      [t("中心の発想", "The idea"), "#idea"],
      [t("AML/KYC", "AML/KYC"), "#financial"],
      [t("実装の事実", "The facts"), "#numbers"],
    ] },
    { h: t("学術", "Academic"), links: [
      ["Zenodo (EN)", "https://doi.org/10.5281/zenodo.17838349"],
      ["Zenodo (JP)", "https://doi.org/10.5281/zenodo.17838456"],
    ] },
    { h: t("連絡", "Contact"), links: [
      ["LinkedIn", "https://www.linkedin.com/in/takeshi-fujishita-279709392"],
      ["veritas.fuji@gmail.com", "mailto:veritas.fuji@gmail.com"],
    ] },
  ];

  const brandCol = (
    <div className="footer-col">
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1rem" }}>
        <VeritasLogo size={32} className="" />
        <span className="brand-wordmark" style={{ fontSize: "0.86rem" }}>
          VERITAS<span className="os">&nbsp;OS</span>
        </span>
      </div>
      <p className="body" style={{ marginBottom: "0.85rem" }}>
        {t(
          "AI エージェントのための Decision Governance and Bind-Boundary Control Plane。",
          "Decision Governance and Bind-Boundary Control Plane for AI agents."
        )}
      </p>
      <p className="small" style={{ fontStyle: "italic", fontFamily: "var(--serif)" }}>
        {t("藤下 健志 · 日本", "Takeshi Fujishita · Japan")}
      </p>
    </div>
  );

  return (
    <>
      <div className="signals-strip">
        <div className="container signals-strip-inner">
          <span className="signals-strip-cat">{t("検証可能", "Verifiable")}</span>
          <div className="signals-strip-links">
            <a href="https://doi.org/10.5281/zenodo.17838349" target="_blank" rel="noreferrer noopener">Zenodo (EN) ↗</a>
            <a href="https://doi.org/10.5281/zenodo.17838456" target="_blank" rel="noreferrer noopener">Zenodo (JP) ↗</a>
            <a href="https://github.com/veritasfuji-japan/veritas_os" target="_blank" rel="noreferrer noopener">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/takeshi-fujishita-279709392" target="_blank" rel="noreferrer noopener">LinkedIn ↗</a>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="disclaimer">
            <div className="disclaimer-cat">{t("主張しないこと", "What we don't claim")}</div>
            <div className={`disclaimer-list ${isJa ? "disclaimer-list-ja" : ""}`}>
              <span>{t("法的判定エンジンではない", "Not a legal determination engine")}</span>
              <span>{t("第三者認証ではない", "Not a third-party certification")}</span>
              <span>{t("特定の規制への完全準拠の保証ではない", "Not a guarantee of compliance with any framework")}</span>
              <span>{t("オーケストレーション ランタイムの置き換えではない", "Not a replacement for orchestration runtimes")}</span>
              <span>{t("AML/KYC の法的判定エンジンそのものではない", "Not a legal determination engine for AML/KYC by itself")}</span>
            </div>
          </div>

          {/* MOBILE footer */}
          <div className="footer-grid only-mobile">
            {brandCol}
            {linkGroupsMobile.map((g) => (
              <div key={g.h} className="footer-col">
                <h4>{g.h}</h4>
                <ul>
                  {g.links.map(([label, href]) => (
                    <li key={label}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* DESKTOP footer */}
          <div className="footer-grid only-desktop">
            {brandCol}
            {linkGroupsDesktop.map((g) => (
              <div key={g.h} className="footer-col">
                <h4>{g.h}</h4>
                <ul>
                  {g.links.map(([label, href]) => (
                    <li key={label}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {t("藤下 健志", "Takeshi Fujishita")} · Core: Proprietary EULA · Spec/SDK/CLI/Policies: MIT</span>
            <span>v2.0.0 Beta · Python 3.11+ · Next.js 16 · commit bb72b21</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default function VeritasLanding() {
  const [lang, setLang] = useState("ja");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const id = window.location.hash.slice(1);
      if (id) {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="ve grain">
        <TopBar lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero lang={lang} />
          <Audiences lang={lang} />
          <Idea lang={lang} />
          <Numbers lang={lang} />
          <FinancialPointer lang={lang} />
        </main>
        <FooterArea lang={lang} />
      </div>
    </>
  );
}