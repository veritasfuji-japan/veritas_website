import { makeT } from "./landingText.js";
import VeritasLogo from "./VeritasLogo.jsx";

export default function FooterArea({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const linkGroups = [
    { h: t("プロダクト", "Product"), links: [
      ["GitHub", "https://github.com/veritasfuji-japan/veritas_os", true],
      ["Demo", "/demo"],
      ["AML/KYC PoC", "/aml-kyc-poc"],
      [t("レビュアー", "Reviewers"), "/reviewers"],
    ] },
    { h: t("ドキュメント", "Docs"), links: [
      [t("企業課題", "Enterprise Problem"), "/enterprise"],
      [t("仕組み", "How It Works"), "/how-it-works"],
      [t("中心概念", "Core Concept"), "/concepts"],
      [t("用語集", "Glossary"), "/glossary"],
      ["FAQ", "/faq"],
    ] },
    { h: t("学術・連絡", "Academic & Contact"), links: [
      ["Zenodo (EN)", "https://doi.org/10.5281/zenodo.17838349", true],
      ["Zenodo (JP)", "https://doi.org/10.5281/zenodo.17838456", true],
      ["LinkedIn", "https://www.linkedin.com/in/takeshi-fujishita-279709392", true],
      ["Email", "mailto:veritas.fuji@gmail.com"],
    ] },
  ];

  const brandCol = (
    <div className="footer-col footer-brand-col">
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1rem" }}>
        <VeritasLogo size={32} className="" />
        <span className="brand-wordmark" style={{ fontSize: "0.86rem" }}>
          VERITAS<span className="os">&nbsp;OS</span>
        </span>
      </div>
      <p className="body" style={{ marginBottom: "0.85rem" }}>
        {t(
          "AIエージェントのための Decision Governance and Bind-Boundary Control Plane。",
          "Decision Governance and Bind-Boundary Control Plane for AI agents."
        )}
      </p>
      <p className="small" style={{ fontStyle: "italic", fontFamily: "var(--serif)" }}>
        {t("藤下 健志 · 日本", "Takeshi Fujishita · Japan")}
      </p>
    </div>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {brandCol}
          {linkGroups.map((group) => (
            <div key={group.h} className="footer-col">
              <h4>{group.h}</h4>
              <ul>
                {group.links.map(([label, href, external]) => (
                  <li key={label}>
                    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}>
                      {label}{external ? " ↗" : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <div className="disclaimer-cat">{t("主張しないこと", "What we don't claim")}</div>
          <p className={`disclaimer-text ${isJa ? "disclaimer-list-ja" : ""}`}>
            {t(
              "VERITAS OS は、法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。",
              "VERITAS OS does not claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration."
            )}
          </p>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {t("藤下 健志", "Takeshi Fujishita")}</span>
          <span>v2.0.0 Beta · Public website · Evidence links maintained via repository claims data</span>
        </div>
      </div>
    </footer>
  );
}
