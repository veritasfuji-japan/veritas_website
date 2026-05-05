import React, { useState, useEffect } from "react";
import NumbersFromClaims from "./components/NumbersFromClaims.jsx";
import { makeT } from "./landing/landingText.js";
import TopBar from "./landing/TopBar.jsx";
import Hero from "./landing/Hero.jsx";
import EnterpriseStart from "./landing/EnterpriseStart.jsx";
import RouteGuide from "./landing/RouteGuide.jsx";
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
