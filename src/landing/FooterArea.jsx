import { makeT } from "./landingText.js";
import VeritasLogo from "./VeritasLogo.jsx";

export default function FooterArea({ lang }) {
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
              <span>{t("特定の認証や規制当局の承認を意味しない", "Does not imply certification or regulatory approval")}</span>
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
            <span>v2.0.0 Beta · Python 3.11+ · Vite + React · Evidence links maintained via claims data</span>
          </div>
        </div>
      </footer>
    </>
  );
}
