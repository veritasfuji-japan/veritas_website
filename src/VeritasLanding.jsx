import React, { useState, useEffect } from "react";
import NumbersFromClaims from "./components/NumbersFromClaims.jsx";
import "./VeritasLanding.css";

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
    ["/enterprise", t("企業課題", "Enterprise")],
    ["/how-it-works", t("仕組み", "How it works")],
    ["/aml-kyc-poc", t("PoC", "PoC")],
    ["/concepts", t("中心概念", "Concepts")],
    ["/glossary", t("用語集", "Glossary")],
    ["/faq", "FAQ"],
    ["/reviewers", t("レビュアー", "Reviewers")],
    ["/contact", t("お問い合わせ", "Contact")],
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
    <>
      <span>AIの判断を</span>
      <span className="brand-gradient-text hero-gradient-word">世界に出る前に</span>
      <span>統制する</span>
    </>
  );
  const titleEn = (
    <>
      <span>Govern AI decisions</span>
      <span>
        <span className="brand-gradient-text hero-gradient-word">before</span>
      </span>
      <span>they touch the real world</span>
    </>
  );
  const titleJaDesktop = (
    <>
      AI の判断を<br />
      <em className="brand-gradient-text hero-gradient-word">世界に出る前に</em><br />
      統制する
    </>
  );
  const titleEnDesktop = (
    <>
      Govern AI decisions <em className="brand-gradient-text hero-gradient-word">before</em><br />
      they touch the real world.
    </>
  );

  const lead = t(
    "意思決定の承認と実行 (commit) の境界を分離するコントロールプレーン。AI エージェントの判断を、レビュー可能・追跡可能・再実行可能・監査可能・強制可能にします。",
    "A control plane that separates approval from commitment — making every AI-agent decision reviewable, traceable, replayable, auditable, and enforceable."
  );

  const cta = (
    <>
      <a href="/enterprise" className="btn btn-primary">
        {t("企業課題を見る", "See enterprise pain points")}
        <span aria-hidden>→</span>
      </a>
      <a href="/aml-kyc-poc" className="btn btn-secondary">
        {t("AML/KYC PoCを見る", "View AML/KYC PoC")}
      </a>
      <a href="/contact" className="btn btn-secondary">
        {t("問い合わせる", "Contact")}
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
          <h1 className={`display hero-title reveal ${isJa ? "hero-title-ja" : "hero-title-en"}`} style={{ animationDelay: "0.1s" }}>
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

function EnterpriseStart({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: t("企業の痛み", "Enterprise pain"),
      body: t("判断理由、証跡、承認境界がログやツールに散らばり、実行前に止める根拠が曖昧になる。", "Rationale, evidence, and approval boundaries scatter across logs and tools, making pre-execution control unclear."),
      cta: t("痛みを見る", "Read enterprise pain"),
      href: "/enterprise",
    },
    {
      title: t("評価経路", "Evaluation path"),
      body: t("AML/KYC PoCで、fail-closed挙動、証跡、failure reason、review / block の判断を確認する。", "Use the AML/KYC PoC to inspect fail-closed behavior, evidence, failure reasons, and review / block outcomes."),
      cta: t("PoCを見る", "View PoC"),
      href: "/aml-kyc-poc",
    },
    {
      title: t("外部レビュー", "External review"),
      body: t("実装済み挙動、公開主張、証跡、コアリポジトリとの整合性を確認する。", "Review implemented behavior, public claims, evidence, and alignment with the core repository."),
      cta: t("レビュー観点を見る", "View review criteria"),
      href: "/reviewers",
    },
  ];

  return (
    <section className="enterprise-start">
      <div className="container">
        <div className="enterprise-start-wrap">
          <div className="marker">ENTERPRISE START</div>
          <h2 className="enterprise-start-headline">{t("企業が止まる場所は、モデル性能ではなく「実行前の証明」です", "Enterprises stall not at model capability, but at proof before execution")}</h2>
          <p className={`body enterprise-start-body ${isJa ? "lead-ja" : ""}`}>
            {t("AIエージェントが判断から実行へ近づくほど、企業には「誰が、何を根拠に、どこまで許可したか」を実行前に確認できる境界が必要になります。VERITAS OS は、この境界を authority evidence、FUJI gate、TrustLog、bind boundary として扱います。", "As AI agents move from recommendations toward execution, enterprises need a boundary that can prove who authorized what, based on which evidence, before action. VERITAS OS treats that boundary through authority evidence, FUJI gate, TrustLog, and bind boundary.")}
          </p>
          <div className="enterprise-start-grid">
            {cards.map((card) => (
              <a key={card.title} href={card.href} className="enterprise-start-card">
                <h3 className="enterprise-start-title">{card.title}</h3>
                <p className={`body ${isJa ? "aud-body-ja" : ""}`}>{card.body}</p>
                <span className="enterprise-start-cta">{card.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteGuide({ lang }) {
  const t = makeT(lang);
  const links = [
    [t("企業担当者", "Enterprise evaluator"), "/enterprise", t("企業課題", "Enterprise")],
    [t("仕組みを知りたい人", "Want the technical flow"), "/how-it-works", t("仕組み", "How it works")],
    [t("技術評価者", "Technical evaluator"), "/aml-kyc-poc", "AML/KYC PoC"],
    [t("外部レビュアー", "External reviewer"), "/reviewers", t("レビュアー", "Reviewers")],
    [t("思想を知りたい人", "Conceptual overview"), "/concepts", t("中心概念", "Concepts")],
    [t("用語を確認したい人", "Need term definitions"), "/glossary", t("用語集", "Glossary")],
    [t("疑問を確認したい人", "Have questions"), "/faq", "FAQ"],
    [t("具体的な相談", "Concrete inquiry"), "/contact", t("お問い合わせ", "Contact")],
  ];
  return (
    <section className="route-guide">
      <div className="container route-guide-inner">
        <div className="marker">{t("どこから見るべきか", "Where to start")}</div>
        <div className="route-guide-list">
          {links.map(([role, href, target]) => (
            <div key={role} className="route-guide-item">
              {role} → <a href={href}>{target}</a>
            </div>
          ))}
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
      href: "/aml-kyc-poc", cta: t("Customer view へ", "Customer view"),
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
  return <NumbersFromClaims lang={lang} />;
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
      <a href="/aml-kyc-poc" className="btn btn-primary">
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
      [t("AML/KYC", "AML/KYC"), "/aml-kyc-poc"],
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
      [t("AML/KYC", "AML/KYC"), "/aml-kyc-poc"],
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
    document.documentElement.lang = lang === "ja" ? "ja" : "en";
  }, [lang]);

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
      <div className="ve grain">
        <TopBar lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero lang={lang} />
          <EnterpriseStart lang={lang} />
          <RouteGuide lang={lang} />
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
