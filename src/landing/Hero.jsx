import { makeT } from "./landingText.js";
import VeritasLogo from "./VeritasLogo.jsx";
import BindFlow from "./BindFlow.jsx";

export default function Hero({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const titleJa = (
    <>
      <span>AIの操作を</span>
      <span className="brand-gradient-text hero-gradient-word">実行する前に</span>
      <span>確認する</span>
    </>
  );
  const titleEn = (
    <>
      <span>Check AI agent actions</span>
      <span>
        <span className="brand-gradient-text hero-gradient-word">before</span>
      </span>
      <span>they happen</span>
    </>
  );
  const titleJaDesktop = (
    <>
      AI の操作を<br />
      <em className="brand-gradient-text hero-gradient-word">実行する前に</em><br />
      確認する
    </>
  );
  const titleEnDesktop = (
    <>
      Check AI agent actions<br />
      <em className="brand-gradient-text hero-gradient-word">before</em><br />
      they happen
    </>
  );

  const lead = t(
    "AIが送金やアクセス権の変更などを実行する前に、誰が許可したか、ルールに合っているか、必要な証拠があるかを確認する仕組みです。条件が足りなければ止めるか、人の確認に回します。現在の実証は限定された検証環境が中心です。",
    "Before an AI agent makes a payment or changes access, VERITAS is designed to check who authorized it, whether it follows the rules, and whether evidence is present. Missing conditions can hold the action for human review. Current evidence comes primarily from bounded test environments."
  );

  const cta = (
    <>
      <div className="hero-cta-main">
        <a href="/demo" className="btn btn-primary">
          {t("動きの例を見る", "Explore an Example")}
          <span aria-hidden>→</span>
        </a>
        <a href="/enterprise" className="btn btn-secondary">
          {t("企業向けの説明", "For Enterprises")}
        </a>
      </div>
      <div className="hero-text-links">
        <a href="/aml-kyc-poc" className="hero-cta-tertiary">
          {t("PoCを見る", "View PoC")}
          <span aria-hidden>→</span>
        </a>
        <a href="/contact" className="hero-cta-tertiary">
          {t("相談する", "Contact")}
          <span aria-hidden>→</span>
        </a>
      </div>
    </>
  );

  const meta = (
    <>
      <span className="hero-meta-item">Evidence chain</span>
      <span className="hero-meta-item">Fail-closed gates</span>
      <span className="hero-meta-item">Reviewer-facing artifacts</span>
      <span className="hero-meta-item">Bind-boundary control</span>
    </>
  );

  const roles = [
    ["01", t("企業課題", "Problem"), "/enterprise"],
    ["02", t("仕組み", "Flow"), "/how-it-works"],
    ["03", "PoC", "/aml-kyc-poc"],
    ["04", t("レビュー", "Review"), "/reviewers"],
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
                <span className="bind-pill">reviewable</span>
              </div>
              <BindFlow />
              <div className="bind-receipts">
                {[
                  ["FUJI", "gate", "var(--sage)"],
                  ["TrustLog", "trace", "var(--blue)"],
                  ["bind", "boundary", "var(--muted)"],
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

