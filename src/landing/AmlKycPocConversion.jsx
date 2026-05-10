import { makeT } from "./landingText.js";

export default function AmlKycPocConversion({ lang }) {
  const t = makeT(lang);

  const sections = [
    {
      title: t("対象者", "Who this is for"),
      items: [
        t("AML/KYC判断を含むAIワークフローを導入前に評価する、金融機関・決済・フィンテックの実務チーム。", "Financial institutions, payments, and fintech teams evaluating AI workflows with AML/KYC-sensitive decisions before rollout."),
        t("規制対象アクションの実行条件を明確にしたい、コンプライアンス・リスク・監査の責任者。", "Compliance, risk, and audit owners who need explicit execution conditions for regulated actions."),
        t("証跡不足時にAIエージェントを停止できるかを検証したい、技術評価・統制設計担当。", "Technical evaluators and control designers validating that agents can be stopped when evidence is incomplete."),
      ],
    },
    {
      title: t("1日PoCで検証すること", "What the 1-day PoC proves"),
      items: [
        t("evidence・authority・human approval が不足するケースで、規制対象アクションを fail-closed できること。", "Regulated actions can be fail-closed when evidence, authority, or human approval is missing."),
        t("proceed / hold / review / block 判定と理由を、評価シナリオ内で追跡できること。", "Proceed / hold / review / block outcomes and reasons are traceable within evaluation scenarios."),
        t("同一シナリオで監査トレースを再現し、evidence gap を明示できること。", "Audit traces can be reproduced for the same scenarios, with evidence gaps explicitly identified."),
      ],
    },
    {
      title: t("提供物", "What you receive"),
      items: [
        t("PoCレポート（検証範囲・前提・結果・未解決ギャップを明記）。", "A PoC report documenting scope, assumptions, outcomes, and unresolved gaps."),
        t("シナリオ別の判定結果サマリ（proceed / hold / review / block）。", "Scenario-by-scenario decision summary (proceed / hold / review / block)."),
        t("監査トレース例と、次段階評価に向けた evidence gap 一覧。", "Audit trace examples and an evidence-gap list for next-stage evaluation."),
      ],
    },
  ];

  return (
    <section className="poc-conversion">
      <div className="container">
        <div className="poc-conversion-wrap">
          <div className="marker">AML/KYC POC</div>
          <h2 className="headline poc-conversion-title">AML/KYC 1-Day PoC</h2>
          <p className="body poc-conversion-message">
            {t("証拠・権限・人間承認が不足している規制対象アクションについて、AIエージェントが誤って実行に進まないことを検証します。", "Validate whether AI agents can be prevented from proceeding with regulated actions when evidence, authority, or human approval is missing.")}
          </p>

          <p className="small poc-conversion-boundary">
            {t(
              "このPoCは法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。",
              "This PoC does not claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration."
            )}
          </p>

          <div className="poc-conversion-grid">
            {sections.map((section) => (
              <article key={section.title} className="poc-conversion-card">
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="small poc-conversion-next">
            {t(
              "次のステップ: 1) PoC範囲を確認 2) 評価シナリオを確定 3) 1日検証を実施。",
              "Next: (1) confirm PoC scope, (2) finalize evaluation scenarios, (3) run the 1-day evaluation."
            )}
          </p>

          <div className="hero-cta">
            <a href="/aml-kyc-poc" className="btn btn-primary">
              {t("PoC範囲を相談する", "Request PoC Scope")}
              <span aria-hidden>→</span>
            </a>
            <a href="/contact" className="btn btn-secondary">
              {t("評価について相談する", "Contact for Evaluation")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
