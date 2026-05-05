import { makeT } from "./landingText.js";

export default function AmlKycPocConversion({ lang }) {
  const t = makeT(lang);

  const sections = [
    {
      title: t("Who it is for", "Who it is for"),
      items: [
        t("AML/KYC判断を伴うAIワークフローの導入前評価を担当するチーム。", "Teams evaluating AI workflows that include AML/KYC-sensitive decisions before rollout."),
        t("規制対象アクションの実行条件を明示したいコンプライアンス・リスク・監査担当。", "Compliance, risk, and audit owners who need explicit execution conditions for regulated actions."),
        t("証跡不足時にAIエージェントを止められるかを実証したい技術評価者。", "Technical evaluators validating that agents can be stopped when evidence is incomplete."),
      ],
    },
    {
      title: t("What we test", "What we test"),
      items: [
        t("evidence、authority、human approval が不足した場合の fail-closed 制御。", "Fail-closed controls when evidence, authority, or human approval is missing."),
        t("proceed / hold / review / block の判定と理由の追跡可能性。", "Traceability of proceed / hold / review / block outcomes and reasons."),
        t("評価シナリオ上での監査トレース再現性。", "Audit-trace reproducibility across evaluation scenarios."),
      ],
    },
    {
      title: t("What is out of scope", "What is out of scope"),
      items: [
        t("法的助言、規制当局承認、第三者認証の提供。", "Legal advice, regulatory approval, or third-party certification."),
        t("環境固有レビューなしの本番運用可否判断。", "Production-readiness claims without environment-specific review."),
        t("初回評価での本番顧客データ利用やライブ金融システム接続。", "Production customer data use or live financial-system connectivity in initial evaluation."),
      ],
    },
    {
      title: t("Deliverables", "Deliverables"),
      items: [
        t("PoCレポート。", "PoC report."),
        t("シナリオ別の結果サマリ。", "Scenario-by-scenario results summary."),
        t("監査トレース例と evidence gap サマリ。", "Audit trace examples and evidence-gap summary."),
      ],
    },
    {
      title: t("Success criteria", "Success criteria"),
      items: [
        t("証跡や承認が不足するケースで silent proceed が起きない。", "No silent proceed when evidence or authority is missing."),
        t("判定結果と理由をレビューアが追跡できる。", "Reviewers can trace outcomes and decision reasons."),
        t("次段階の評価に向けた gap が明示される。", "Gaps for next-stage evaluation are explicitly identified."),
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
            <article className="poc-conversion-card">
              <h3>{t("Engagement format", "Engagement format")}</h3>
              <p>
                {t(
                  "PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals.",
                  "PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals."
                )}
              </p>
            </article>
          </div>

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
