import React from "react";
import PageShell from "../components/PageShell.jsx";

export default function ReviewersPage() {
  return (
    <PageShell
      label="REVIEWERS"
      title="External Reviewers"
      subtitle="Review VERITAS OS as auditable decision infrastructure for LLM agents."
      ctas={[
        { label: "Open core repository", href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: "Back to Home", href: "/" },
      ]}
    >
      <section>
        <h2>What to review</h2>
        <ul>
          <li>Decision pipeline.</li>
          <li>FUJI gate.</li>
          <li>TrustLog evidence.</li>
          <li>Bind-governed paths.</li>
          <li>Build and documentation evidence.</li>
          <li>Public claims alignment with repository evidence.</li>
        </ul>
      </section>
      <section style={{ marginTop: "1rem" }}>
        <h2>Review posture</h2>
        <ul>
          <li>Check implemented behavior, not roadmap promises.</li>
          <li>Validate claims against veritas_os.</li>
          <li>Treat website claims as public positioning, not proof by themselves.</li>
        </ul>
      </section>
    </PageShell>
  );
}
