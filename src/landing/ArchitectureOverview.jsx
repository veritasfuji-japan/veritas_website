import { makeT } from "./landingText.js";

const REVIEWER_EVIDENCE_DOCS = [
  {
    title: "Reviewer Evidence Index",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/external-reviewer-artifact-index.md",
  },
  {
    title: "Reviewer Evidence Assurance Overview",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-assurance-overview.md",
  },
  {
    title: "Reviewer Evidence Packet",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-packet.md",
  },
];

const FLOW_STEPS = [
  "AI / Agent Output",
  "Decision Candidate",
  "Governance Evaluation",
  "Authority / Human Approval",
  "Verified Execution Intent",
  "Native v2 Authorization / Single-use Consumption",
  "Current Rechecks / Bind Boundary",
  "Controlled Sandbox Effect",
  "Read-only Reconciliation",
  "BindReceipt / Outcome",
  "Reviewer Evidence Packet",
  "Validation Report",
];

export default function ArchitectureOverview({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: "Decision Candidate",
      body: t("実行前の構造化された decision object。", "Structured pre-execution decision object."),
    },
    {
      title: "Governance Evaluation",
      body: t("ポリシー、authority、evidence、approval の検査。", "Policy, authority, evidence, and approval checks."),
    },
    {
      title: "Bind Boundary",
      body: t("現実世界への effect の前に置く最終実行前制御点。", "Final pre-execution control point before real-world effect."),
    },
    {
      title: "Evidence Chain",
      body: t("ハッシュ連結された evidence と verification artifact。", "Hash-linked evidence and verification artifacts."),
    },
    {
      title: "Reviewer Evidence",
      body: t("レビュアー向け packet と validation report。", "Reviewer-facing packet and validation report."),
    },
  ];

  return (
    <section className="architecture-overview" id="architecture" aria-labelledby="architecture-overview-title">
      <div className="container">
        <div className="snapshot-shell architecture-shell">
          <div className="snapshot-copy architecture-copy">
            <p className="marker">{t("アーキテクチャ", "Architecture")}</p>
            <h2 className="headline" id="architecture-overview-title">
              Architecture at a Glance
            </h2>
            <p className={`body ${isJa ? "lead-ja" : ""}`}>
              {t(
                "AI出力は判断候補として扱います。以下は限定サンドボックスの実行証明を要約した流れです。判断・認可・実行を分離し、実行直前の再確認から結果照合、事後証跡までを接続します。",
                "AI output starts as a decision candidate. This is a summary of the controlled sandbox execution proof: decision, authorization, and execution remain separate, with fresh pre-effect checks, reconciliation, and retrospective evidence."
              )}
            </p>
          </div>

          <ol className="architecture-flow" aria-label="Architecture control flow">
            {FLOW_STEPS.map((step, index) => (
              <li key={step}>
                <span>{step}</span>
                {index < FLOW_STEPS.length - 1 && <strong aria-hidden="true">↓</strong>}
              </li>
            ))}
          </ol>

          <div className="architecture-card-grid">
            {cards.map((card) => (
              <article key={card.title} className="snapshot-mini-card architecture-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className="architecture-doc-links" aria-label="Reviewer Evidence documentation links">
            {REVIEWER_EVIDENCE_DOCS.map((doc) => (
              <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer noopener">
                {doc.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
