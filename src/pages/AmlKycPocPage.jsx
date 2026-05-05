import PageShell from "../components/PageShell.jsx";

const sectionStyle = {
  marginTop: "1rem",
  padding: "1rem",
  border: "1px solid #d0d7de",
  borderRadius: "8px",
  background: "#fdfdfc",
};

const headingStyle = {
  marginTop: 0,
  color: "#0b3d5b",
};

export default function AmlKycPocPage() {
  return (
    <PageShell
      label={{ ja: "PoC", en: "POC" }}
      title={{ ja: "AML/KYC 1日 PoC", en: "AML/KYC 1-Day PoC" }}
      subtitle={{
        ja: "証跡・権限・人手承認が不足する場合に、規制対象アクションをAIエージェントが進めないことを検証します。",
        en: "Validate that AI agents do not proceed with regulated actions when evidence, authority, or human approval is missing.",
      }}
      ctas={[
        { label: { ja: "PoC範囲を相談する", en: "Request PoC Scope" }, href: "/contact" },
        { label: { ja: "評価について相談する", en: "Contact for Evaluation" }, href: "/contact" },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("対象者", "Who this PoC is for")}</h2>
            <ul>
              <li>{t("AML/KYC判断を伴うAIワークフローの導入前評価チーム。", "Teams evaluating AI workflows that include AML/KYC-sensitive decisions before rollout.")}</li>
              <li>{t("規制対象アクションの実行条件を明確化したいコンプライアンス・リスク・監査担当。", "Compliance, risk, and audit owners who need explicit execution conditions for regulated actions.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("実施期間オプション", "Duration options")}</h2>
            <ul>
              <li>{t("1日技術検証", "1-day technical validation")}</li>
              <li>{t("1〜2週間の拡張評価", "1–2 week extended evaluation")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("データ境界", "Data boundary")}</h2>
            <ul>
              <li>{t("初回評価は synthetic / fixture data のみ。", "Synthetic / fixture data only for the first evaluation.")}</li>
              <li>{t("本番顧客データはデフォルトで使用しない。", "No production customer data by default.")}</li>
              <li>{t("ライブ金融システム接続はデフォルトで行わない。", "No live financial-system access by default.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("検証内容 / 評価フロー", "What we test / Evaluation flow")}</h2>
            <ul>
              <li>{t("evidence・authority・human approval 欠落時の fail-closed 制御。", "Fail-closed controls when evidence, authority, or human approval is missing.")}</li>
              <li>{t("proceed / hold / review / block 判定と理由の追跡可能性。", "Traceability of proceed / hold / review / block outcomes and reasons.")}</li>
              <li>{t("シナリオ実行、結果レビュー、ギャップ整理までを一連で確認。", "Run scenario evaluations, review outcomes, and consolidate implementation gaps.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("提供物", "Deliverables")}</h2>
            <ul>
              <li>{t("PoCレポート", "PoC report")}</li>
              <li>{t("シナリオ結果", "Scenario results")}</li>
              <li>{t("監査トレース例", "Audit trace examples")}</li>
              <li>{t("evidence gap サマリ", "Evidence gap summary")}</li>
              <li>{t("本番移行 readiness gap リスト", "Production-readiness gap list")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("確認する証跡", "Evidence to inspect")}</h2>
            <ul>
              <li>{t("判定ごとの入力証跡と判断理由。", "Input evidence and decision reasons for each gate outcome.")}</li>
              <li>{t("承認経路・権限境界・人間承認イベントの記録。", "Approval paths, authority boundaries, and human-approval event logs.")}</li>
              <li>{t("監査トレースの再現性と欠落箇所。", "Audit-trace reproducibility and missing evidence points.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("エンゲージメント形式", "Engagement format")}</h2>
            <p>
              {t(
                "PoCスコープとエンゲージメント形式は、対象ワークフロー・リスク境界・評価ゴールの初期レビュー後に定義します。",
                "PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals."
              )}
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("成功基準", "Success criteria")}</h2>
            <ul>
              <li>{t("証跡・権限・承認不足時に silent proceed が発生しない。", "No silent proceed when evidence, authority, or approval is missing.")}</li>
              <li>{t("判定結果と理由をレビューアが追跡できる。", "Reviewers can trace outcomes and decision reasons.")}</li>
              <li>{t("次段階評価に必要なギャップが明示される。", "Gaps required for next-stage evaluation are clearly identified.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("成功PoC後の次ステップ", "Next step after successful PoC")}</h2>
            <ul>
              <li>{t("拡張評価", "Extended evaluation")}</li>
              <li>{t("統合計画", "Integration planning")}</li>
              <li>{t("外部レビュー", "External review")}</li>
              <li>{t("パートナー/顧客別シナリオ対応", "Partner/customer-specific scenario mapping")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("主張の境界", "Conservative claim boundaries")}</h2>
            <ul>
              <li>{t("Beta / PoC-ready の範囲で提供する。", "Provided as Beta / PoC-ready.")}</li>
              <li>{t("法的助言ではない。", "Not legal advice.")}</li>
              <li>{t("規制当局承認ではない。", "Not regulatory approval.")}</li>
              <li>{t("第三者認証ではない。", "Not third-party certification.")}</li>
              <li>{t("環境固有レビューなしに本番適用可能性を主張しない。", "No production-readiness claim without environment-specific review.")}</li>
              <li>{t("明示的に実装・検証されない限り、ライブ銀行連携は主張しない。", "No live bank integration claim unless explicitly implemented and verified.")}</li>
              <li>{t("初回評価は synthetic / fixture data のみ。", "Synthetic / fixture data only for the first evaluation.")}</li>
              <li>{t("本番顧客データはデフォルトで使用しない。", "No production customer data by default.")}</li>
              <li>{t("ライブ金融システム接続はデフォルトで行わない。", "No live financial-system access by default.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
