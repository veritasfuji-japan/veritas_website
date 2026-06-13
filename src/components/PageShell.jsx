import { useEffect, useState } from "react";

const shellStyles = {
  minHeight: "100vh",
  background: "#F4EFE3",
  color: "#15161A",
  fontFamily: "'IBM Plex Sans', 'IBM Plex Sans JP', system-ui, sans-serif",
  lineHeight: 1.65,
};

const containerStyles = {
  maxWidth: "72rem",
  margin: "0 auto",
  padding: "1.25rem 1.25rem 4rem",
};

const headerStyles = {
  border: "1px solid #DDD7C5",
  background: "#FAF6EB",
  padding: "0.9rem 1rem",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
};

const navStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.65rem",
  alignItems: "center",
};

const navLinkStyles = {
  textDecoration: "none",
  color: "#1C2A2E",
  borderBottom: "1px solid transparent",
  paddingBottom: "0.1rem",
};

const cardStyles = {
  background: "rgba(250, 246, 235, 0.58)",
  border: "1px solid #E3DDCC",
  borderRadius: "14px",
  padding: "1.1rem 1.25rem",
  marginTop: "1.5rem",
};

const linkButtonStyles = {
  display: "inline-block",
  border: "1px solid #CFC6B1",
  borderRadius: "999px",
  padding: "0.55rem 0.95rem",
  marginRight: "0.75rem",
  marginTop: "0.6rem",
  textDecoration: "none",
  background: "#FAF6EB",
};

const languageToggleStyles = {
  border: "1px solid #BBB39D",
  background: "#F7F2E6",
  borderRadius: "999px",
  padding: "0.2rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.2rem",
};

const languageButtonStyles = (active) => ({
  border: "none",
  borderRadius: "999px",
  padding: "0.2rem 0.5rem",
  fontSize: "0.78rem",
  cursor: "pointer",
  background: active ? "#15161A" : "transparent",
  color: active ? "#FAF6EB" : "#15161A",
});

const resolveText = (value, lang) => {
  if (typeof value === "string") {
    return value;
  }

  if (!value) {
    return "";
  }

  return lang === "ja" ? value.ja : value.en;
};

export default function PageShell({ label, title, subtitle, children, ctas = [] }) {
  const [lang, setLang] = useState("ja");
  const t = (ja, en) => (lang === "ja" ? ja : en);

  const resolvedLabel = resolveText(label, lang);
  const resolvedTitle = resolveText(title, lang);
  const resolvedSubtitle = resolveText(subtitle, lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const coreNavigationItems = [
    { label: t("ホーム", "Home"), href: "/" },
    { label: t("デモ", "Demo"), href: "/demo" },
    { label: "PoC", href: "/aml-kyc-poc" },
    { label: "GitHub", href: "https://github.com/veritasfuji-japan/veritas_os", external: true },
  ];
  const secondaryNavigationItems = [
    { label: t("企業課題", "Enterprise"), href: "/enterprise" },
    { label: t("仕組み", "How it works"), href: "/how-it-works" },
    { label: t("中心概念", "Concepts"), href: "/concepts" },
    { label: t("用語集", "Glossary"), href: "/glossary" },
    { label: "FAQ", href: "/faq" },
    { label: t("レビュアー", "Reviewers"), href: "/reviewers" },
    { label: t("お問い合わせ", "Contact"), href: "/contact" },
  ];
  const navigationItems = [...coreNavigationItems, ...secondaryNavigationItems];

  const renderedChildren = typeof children === "function" ? children(t, lang) : children;

  return (
    <main style={shellStyles}>
      <div style={containerStyles}>
        <header className="page-shell-header" style={headerStyles}>
          <a href="/" style={{ textDecoration: "none", color: "#15161A", fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "1.2rem" }}>
            VERITAS OS
          </a>
          <nav className="page-shell-nav page-shell-nav-desktop" aria-label="Primary" style={navStyles}>
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={navLinkStyles}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="page-shell-nav page-shell-nav-mobile" aria-label="Mobile primary" style={navStyles}>
            {coreNavigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={navLinkStyles}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
              >
                {item.label}
              </a>
            ))}
            <details className="page-shell-more">
              <summary>{t("その他", "More")}</summary>
              <div>
                {secondaryNavigationItems.map((item) => (
                  <a key={item.href} href={item.href} style={navLinkStyles}>
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
          </nav>
          <div style={languageToggleStyles} aria-label="Language toggle">
            <button type="button" style={languageButtonStyles(lang === "ja")} onClick={() => setLang("ja")}>JA</button>
            <button type="button" style={languageButtonStyles(lang === "en")} onClick={() => setLang("en")}>EN</button>
          </div>
        </header>
        <p style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", letterSpacing: "0.08em", color: "#5A5C62" }}>{resolvedLabel}</p>
        <h1 className="page-shell-title" style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "clamp(1.9rem, 1.35rem + 2.4vw, 3.5rem)", lineHeight: 1.12, marginTop: "0.35rem" }}>{resolvedTitle}</h1>
        <p style={{ color: "#2A2D33", maxWidth: "50rem", marginTop: "0.8rem" }}>{resolvedSubtitle}</p>
        {renderedChildren}
        {ctas.length > 0 && (
          <section style={cardStyles}>
            <h2 style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "clamp(1.3rem, 1.05rem + 1vw, 1.9rem)", marginBottom: "0.5rem" }}>{t("次へ", "Next")}</h2>
            {ctas.map((cta) => {
              const resolvedCtaLabel = resolveText(cta.label, lang);
              return (
                <a
                  key={cta.href}
                  href={cta.href}
                  style={linkButtonStyles}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={cta.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  {resolvedCtaLabel}
                </a>
              );
            })}
            <p style={{ marginTop: "1rem", color: "#4A4D54", fontSize: "0.92rem" }}>
              {t(
                "本サイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。",
                "Public website claims should be validated against the veritas_os repository evidence.",
              )}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
