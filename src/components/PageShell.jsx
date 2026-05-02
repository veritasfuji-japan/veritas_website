import React from "react";

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
  padding: "2.5rem 1.25rem 4rem",
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

export default function PageShell({ label, title, subtitle, children, ctas }) {
  return (
    <main style={shellStyles}>
      <div style={containerStyles}>
        <p style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", letterSpacing: "0.08em", color: "#5A5C62" }}>{label}</p>
        <h1 style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", fontSize: "clamp(2rem, 3vw, 3.5rem)", lineHeight: 1.12, marginTop: "0.35rem" }}>{title}</h1>
        <p style={{ color: "#2A2D33", maxWidth: "50rem", marginTop: "0.8rem" }}>{subtitle}</p>
        {children}
        <section style={cardStyles}>
          <h2 style={{ fontFamily: "'Fraunces', 'Times New Roman', serif", marginBottom: "0.5rem" }}>Next</h2>
          {ctas.map((cta) => (
            <a key={cta.href} href={cta.href} style={linkButtonStyles}>
              {cta.label}
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
