import React, { useEffect } from "react";

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
  background: "#FAF6EB",
  border: "1px solid #DDD7C5",
  padding: "1.25rem",
  marginTop: "1rem",
};

const linkButtonStyles = {
  display: "inline-block",
  border: "1px solid #15161A",
  padding: "0.55rem 0.95rem",
  marginRight: "0.75rem",
  marginTop: "0.6rem",
  textDecoration: "none",
};

export default function PageShell({ label, title, pageTitle, subtitle, children, ctas }) {
  useEffect(() => {
    const resolvedTitle = pageTitle || title;
    if (resolvedTitle) {
      document.title = `${resolvedTitle} | VERITAS OS`;
    }
  }, [pageTitle, title]);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "AML/KYC PoC", href: "/aml-kyc-poc" },
    { label: "Concepts", href: "/concepts" },
    { label: "Reviewers", href: "/reviewers" },
    { label: "GitHub", href: "https://github.com/veritasfuji-japan/veritas_os", external: true },
  ];

  return (
    <main style={shellStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <a href="/" style={{ textDecoration: "none", color: "#15161A", fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "1.2rem" }}>
            VERITAS OS
          </a>
          <nav aria-label="Primary" style={navStyles}>
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
        </header>
        <p style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", letterSpacing: "0.08em", color: "#5A5C62" }}>{label}</p>
        <h1 style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", lineHeight: 1.12, marginTop: "0.35rem" }}>{title}</h1>
        <p style={{ color: "#2A2D33", maxWidth: "50rem", marginTop: "0.8rem" }}>{subtitle}</p>
        {children}
        <section style={cardStyles}>
          <h2 style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", marginBottom: "0.5rem" }}>Next</h2>
          {ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              style={linkButtonStyles}
              target={cta.href.startsWith("http") ? "_blank" : undefined}
              rel={cta.href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              {cta.label}
            </a>
          ))}
          <p style={{ marginTop: "1rem", color: "#4A4D54", fontSize: "0.92rem" }}>
            Public website claims should be validated against the veritas_os repository evidence.
          </p>
        </section>
      </div>
    </main>
  );
}
