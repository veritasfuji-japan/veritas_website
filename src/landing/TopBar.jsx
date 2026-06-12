import { makeT } from "./landingText.js";
import VeritasLogo from "./VeritasLogo.jsx";

export default function TopBar({ lang, setLang, menuOpen, setMenuOpen }) {
  const t = makeT(lang);
  const links = [
    ["/enterprise", t("企業課題", "Enterprise")],
    ["/how-it-works", t("仕組み", "How it works")],
    ["/demo", t("デモ", "Demo")],
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
