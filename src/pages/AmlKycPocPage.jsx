import React from "react";
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
            <h2 style={headingStyle}>{t("実施期間オプション", "Duration options")}</h2>
            <ul>
              <li>{t("1日技術検証", "1-day technical validation")}</li>
              <li>{t("1〜2週間の拡張評価", "1–2 week extended evaluation")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("データ境界", "Data boundary")}</h2>
            <ul>
              <li>{t("初回評価は synthetic / fixture data のみ。", "Synthetic / fixture data only for first evaluation.")}</li>
              <li>{t("本番顧客データはデフォルトで使用しない。", "No production customer data by default.")}</li>
              <li>{t("ライブ金融システム接続はデフォルトで行わない。", "No live financial-system access by default.")}</li>
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
            <h2 style={headingStyle}>{t("エンゲージメント形式", "Engagement format")}</h2>
            <ul>
              <li>{t("スコープは初回ディスカッション後に定義する。", "Scope is defined after initial discussion.")}</li>
              <li>{t("まず target workflow・risk boundary・evaluation goals を確認する。", "Target workflow, risk boundary, and evaluation goals are reviewed first.")}</li>
              <li>{t("PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals。", "PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals.")}</li>
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
              <li>{t("明示的に実装・検証されない限り、ライブ銀行連携は主張しない。", "No claim of live bank integration unless explicitly implemented and verified.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
