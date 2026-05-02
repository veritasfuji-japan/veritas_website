import React from "react";
import PageShell from "../components/PageShell.jsx";

export default function ConceptsPage() {
  return (
    <PageShell
      label="CONCEPTS"
      title="Approval is not commitment."
      subtitle="VERITAS OS separates decision approval from real-world execution commitment."
      ctas={[
        { label: "Read the GitHub repo", href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: "Back to Home", href: "/" },
      ]}
    >
      <section>
        <h2>Core idea</h2>
        <ul>
          <li>Audit logs record what happened.</li>
          <li>Authority evidence explains why an action was allowed.</li>
          <li>Bind boundary checks whether commitment is admissible.</li>
          <li>Without sufficient evidence, commit should fail closed.</li>
        </ul>
      </section>
      <section style={{ marginTop: "1rem" }}>
        <h2>Why this matters</h2>
        <ul>
          <li>Powerful agents need more than explanations.</li>
          <li>Regulated actions need enforceable boundaries.</li>
          <li>Post-hoc logs are not enough for pre-execution control.</li>
        </ul>
      </section>
    </PageShell>
  );
}
