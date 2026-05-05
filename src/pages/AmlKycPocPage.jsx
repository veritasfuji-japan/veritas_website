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
              <li>{t("AI支援AML/KYC判断のガバナンスを評価するチーム。", "Teams evaluating governance for AI-assisted AML/KYC decisions.")}</li>
              <li>{t("実行前に証跡確認を必要とするコンプライアンス・リスク・監査レビュー担当。", "Compliance, risk, and audit reviewers who need evidence before execution.")}</li>
              <li>{t("fail-closed挙動と再実行可能な判定トレースを確認する技術評価者。", "Technical evaluators checking fail-closed behavior and replayable decision traces.")}</li>
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
              <li>{t("AML/KYC判定シナリオを1件選定する。", "Select one AML/KYC decision scenario.")}</li>
              <li>{t("ポリシーと必要証跡を定義する。", "Define the policy and required evidence.")}</li>
              <li>{t("シナリオをVERITAS判定パイプラインで実行する。", "Run the scenario through the VERITAS decision pipeline.")}</li>
              <li>{t("利用可能な範囲でFUJI・TrustLog・bind証跡・失敗理由を確認する。", "Inspect FUJI, TrustLog, bind evidence, and failure reasons where available.")}</li>
              <li>{t("実際の結果と期待結果を比較する。", "Compare actual outcomes against expected outcomes.")}</li>
              <li>{t("所見と次の統合検討事項を記録する。", "Record findings and next integration questions.")}</li>
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
              <li>{t("判定アウトプット。", "Decision output.")}</li>
              <li>{t("FUJIゲート判定結果。", "FUJI gate outcome.")}</li>
              <li>{t("TrustLog証跡。", "TrustLog evidence.")}</li>
              <li>{t("利用可能な範囲でbindレシートまたはbindサマリー。", "Bind receipt or bind summary where available.")}</li>
              <li>{t("block / hold 判定時の失敗理由。", "Failure reason for blocked or held decisions.")}</li>
              <li>{t("利用可能な範囲でリプレイまたはトレース整合性。", "Replay or trace consistency where available.")}</li>
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
              <li>{t("権限証跡が不足する場合にサイレント進行しない。", "Missing authority evidence does not silently proceed.")}</li>
              <li>{t("無効または不十分な証跡で明確なhold / review / block理由が出る。", "Invalid or insufficient evidence produces a clear hold / review / block reason.")}</li>
              <li>{t("許可・保留・レビュー・ブロックの理由をレビューアが追跡できる。", "Reviewers can trace why a decision was allowed, held, reviewed, or blocked.")}</li>
              <li>{t("公開主張がveritas_osリポジトリ証跡と整合する。", "Public claims remain consistent with veritas_os repository evidence.")}</li>
              <li>{t("次段階評価に向けたギャップが明示される。", "Gaps for next-stage evaluation are explicitly identified.")}</li>
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
