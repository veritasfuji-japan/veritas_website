import { makeT } from "./landingText.js";
import VeritasLogo from "./VeritasLogo.jsx";
import BindFlow from "./BindFlow.jsx";

export default function Hero({ lang }) {
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
