import React from "react";
import PageShell from "../components/PageShell.jsx";

export default function AmlKycPocPage() {
  return (
    <PageShell
      label="POC"
      title="AML/KYC 1-day PoC"
      subtitle="Evaluate fail-closed governance for regulated AI-agent decisions in one day."
      ctas={[
        { label: "Back to GitHub", href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: "Back to Home", href: "/" },
      ]}
    >
      <section>
        <h2>What this PoC tests</h2>
        <ul>
          <li>Whether an AI-agent decision has enough authority evidence before commit.</li>
          <li>Whether missing or invalid evidence blocks execution.</li>
          <li>Whether bind receipts and audit evidence can be reviewed after the decision.</li>
          <li>Whether fixture scenarios produce deterministic proceed / hold / review / block outcomes.</li>
        </ul>
      </section>
      <section style={{ marginTop: "1rem" }}>
        <h2>PoC flow</h2>
        <ol>
          <li>Select regulated action scenario.</li>
          <li>Prepare policy and evidence fixtures.</li>
          <li>Run decisions through VERITAS pipeline.</li>
          <li>Inspect FUJI / TrustLog / bind evidence.</li>
          <li>Review outcomes and failure reasons.</li>
        </ol>
      </section>
      <section style={{ marginTop: "1rem" }}>
        <h2>Deliverables</h2>
        <ul>
          <li>Scenario result summary.</li>
          <li>Evidence trace.</li>
          <li>Fail-closed behavior check.</li>
          <li>Review notes.</li>
          <li>Next-step integration recommendation.</li>
        </ul>
      </section>
    </PageShell>
  );
}
