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

const SIMPLE_STEPS = [
  ["AIが操作を提案", "AI proposes an action"],
  ["権限・ルール・人の承認を確認", "Check authority, rules, and human approval"],
  ["実行直前に条件を再確認", "Recheck conditions before execution"],
  ["許可された操作だけを実行", "Dispatch only when authorized"],
  ["結果を照合し、証跡を残す", "Reconcile outcomes and retain evidence"],
];

const FLOW_STEPS = [
  ["操作候補と検証済み証跡", "Decision Candidate / verified artifact"],
  ["ガバナンス・権限・人の承認", "Governance / Authority / Human Approval"],
  ["実行内容の固定とNative v2認可", "Exact Execution Intent / Native v2 Authorization"],
  ["一回限りの権限消費と直前再確認", "Single-use Consumption / Current Rechecks"],
  ["資格情報の解決と永続的な送信意図", "Credential Resolution / Durable Dispatch Intent"],
  ["限定TLS実行と結果不明の扱い", "Controlled TLS Effect / EFFECT_UNKNOWN"],
  ["読み取り専用の結果照合と証跡保存", "Read-only Reconciliation / Evidence Archive"],
  ["実行証明・結果・復旧", "BindReceipt / Outcome / Recovery"],
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
              {t("仕組みの全体像", "Architecture at a Glance")}
            </h2>
            <p className={`body ${isJa ? "lead-ja" : ""}`}>
              {t(
                "AI出力を候補として検証し、正確な実行意図に認可を結びつけます。以下は限定sandboxでの実装経路です。判断結果、実行許可、作用の確認、事後証跡を分けて扱います。",
                "The controlled sandbox path binds authorization to an exact execution intent. Decision results, execution permission, effect confirmation, and retrospective evidence remain distinct."
              )}
            </p>
          </div>

          <div aria-label={t("実行前の確認から結果照合までの概要", "Simplified pre-execution to reconciliation flow")}>
            <p className="marker">{t("まずは5段階で理解する", "Start with five steps")}</p>
            <ol className="architecture-flow" style={{ maxWidth: "100%", padding: "0.75rem" }}>
              {SIMPLE_STEPS.map((step, index) => (
                <li key={step[1]}>
                  <span style={{ overflowWrap: "anywhere" }}>{t(...step)}</span>
                  {index < SIMPLE_STEPS.length - 1 && <strong aria-hidden="true">↓</strong>}
                </li>
              ))}
            </ol>
          </div>

          <details style={{ marginTop: "1.25rem" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, padding: "0.75rem 0" }}>
              {t("技術者向け：詳細な8段階の実行経路を見る", "Technical detail: show the eight-stage execution path")}
            </summary>
            <p className="body">
              {t("以下は限定sandboxでの実装経路であり、すべての外部システムや本番環境での実証を意味しません。", "This describes a controlled sandbox path, not validation across all external systems or customer production environments.")}
            </p>
            <ol className="architecture-flow" aria-label={t("詳細な実行制御の流れ", "Detailed execution control flow")} style={{ maxWidth: "100%", padding: "0.75rem" }}>
              {FLOW_STEPS.map((step, index) => (
                <li key={step[1]}>
                  <span style={{ overflowWrap: "anywhere" }}>{t(...step)}</span>
                  {index < FLOW_STEPS.length - 1 && <strong aria-hidden="true">↓</strong>}
                </li>
              ))}
            </ol>
          </details>

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

