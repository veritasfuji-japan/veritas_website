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



  const sampleOutputItems = [
    {
      label: t("検証シナリオ", "Scenario tested"),
      value: t("海外送金の高リスク申請で、提出証跡が不足しているケース。", "High-risk cross-border transfer request with incomplete submitted evidence."),
    },
    {
      label: t("期待される判定", "Expected outcome"),
      value: t("追加証跡が揃うまで hold に遷移し、担当者レビューへ送る。", "Transition to hold until additional evidence is provided, then route to reviewer."),
    },
    {
      label: t("実際の判定", "Actual outcome"),
      value: t("hold（自動実行は停止）。", "hold (automatic execution stopped)."),
    },
    {
      label: t("停止・保留理由", "Failure or hold reason"),
      value: t("受益者確認書類の有効期限が切れており、authority条件を満たさない。", "Beneficiary verification document was expired, so authority conditions were not met."),
    },
    {
      label: t("不足していた証跡", "Evidence gap"),
      value: t("最新の本人確認書類と、送金目的を裏付ける補助資料。", "Updated identity document and supporting material for transfer purpose."),
    },
    {
      label: t("監査トレース参照", "Audit trace reference"),
      value: t("sample trace: POC-EVAL-07 / step-04 / decision-log。", "sample trace: POC-EVAL-07 / step-04 / decision-log."),
    },
    {
      label: t("次段階の統合論点", "Next integration question"),
      value: t("既存審査キューへ hold理由をどの粒度で連携するか。", "What granularity should hold reasons be synced to the existing review queue?"),
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



          <article className="poc-conversion-sample" aria-label={t("PoC成果物サンプル", "Sample PoC Output")}>
            <h3>{t("PoC成果物サンプル", "Sample PoC Output")}</h3>
            <p className="body poc-conversion-sample-copy">
              {t(
                "1日PoCでは、単なるデモではなく、評価シナリオごとに「何が許可され、何が保留・レビュー・ブロックされたのか」を証跡付きで整理します。",
                "The 1-day PoC is not just a demo. It summarizes which scenario was allowed, held, reviewed, or blocked — with supporting evidence and trace context."
              )}
            </p>
            <dl className="poc-conversion-sample-list">
              {sampleOutputItems.map((item) => (
                <div key={item.label} className="poc-conversion-sample-row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <p className="small poc-conversion-next">
            {t(
              "次のステップ: 1) PoC範囲を確認 2) 評価シナリオを確定 3) 1日検証を実施。",
              "Next: (1) confirm PoC scope, (2) finalize evaluation scenarios, (3) run the 1-day evaluation."
            )}
          </p>

          <article className="poc-conversion-scenarios" aria-label={t("6つの評価シナリオを見る", "View the 6 evaluation scenarios")}>
            <h3>{t("6つの評価シナリオを見る", "View the 6 evaluation scenarios")}</h3>
            <p className="body">
              {t(
                "詳細ページでは、AML/KYC PoCで使う6つの決定論的fixtureを確認できます。各シナリオは、期待される判定、停止・保留理由、確認すべき証跡を説明します。",
                "The detailed page shows the six deterministic fixtures used for the AML/KYC PoC. Each scenario explains the expected outcome, hold/block reason, and evidence to inspect."
              )}
            </p>
          </article>

          <div className="hero-cta">
            <a href="/aml-kyc-poc" className="btn btn-primary">
              {t("6つのシナリオを見る", "View 6 Scenarios")}
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
