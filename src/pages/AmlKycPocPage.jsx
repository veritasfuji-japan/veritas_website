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
      title={{ ja: "AML/KYC 1日 PoC", en: "AML/KYC 1-day PoC" }}
      subtitle={{
        ja: "規制対象となるAIエージェントの意思決定に対して、fail-closed型ガバナンスを1日で評価します。",
        en: "Evaluate fail-closed governance for regulated AI-agent decisions in one day.",
      }}
      ctas={[
        {
          label: { ja: "コアリポジトリを開く", en: "Open core repository" },
          href: "https://github.com/veritasfuji-japan/veritas_os",
        },
        {
          label: { ja: "AML/KYC PoC quickstart を開く", en: "Open AML/KYC PoC quickstart" },
          href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/guides/poc-pack-financial-quickstart.md",
          target: "_blank",
          rel: "noreferrer noopener",
        },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("このPoCの対象者", "Who this PoC is for")}</h2>
            <ul>
              <li>{t("AI支援型のAML/KYC判断に対するガバナンスを評価したいチーム。", "Teams evaluating governance for AI-assisted AML/KYC decisions.")}</li>
              <li>{t("実行前の証跡を必要とするコンプライアンス、リスク、監査担当者。", "Compliance, risk, and audit reviewers who need evidence before execution.")}</li>
              <li>{t("fail-closed挙動と再実行可能な意思決定トレースを確認したい技術評価者。", "Technical evaluators checking fail-closed behavior and replayable decision traces.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("準備するもの", "What to prepare")}</h2>
            <ul>
              <li>{t("規制対象アクションのシナリオ。", "A regulated action scenario.")}</li>
              <li>{t("policy と evidence の fixture。", "Policy and evidence fixtures.")}</li>
              <li>{t("期待される authority evidence。", "Expected authority evidence.")}</li>
              <li>{t("proceed / hold / review / block の期待結果。", "Expected proceed / hold / review / block outcomes.")}</li>
              <li>{t("レビュアーの確認項目または受け入れ基準。", "Reviewer questions or acceptance criteria.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("評価の流れ", "Evaluation flow")}</h2>
            <ol>
              <li>{t("AML/KYC判断シナリオを1つ選択する。", "Select one AML/KYC decision scenario.")}</li>
              <li>{t("policy と必要証跡を定義する。", "Define the policy and required evidence.")}</li>
              <li>{t("VERITAS decision pipeline にシナリオを通す。", "Run the scenario through the VERITAS decision pipeline.")}</li>
              <li>{t("FUJI、TrustLog、bind evidence、failure reason を確認する。", "Inspect FUJI, TrustLog, bind evidence, and failure reasons.")}</li>
              <li>{t("実際の結果と期待結果を比較する。", "Compare actual outcomes against expected outcomes.")}</li>
              <li>{t("findings と次の統合確認事項を記録する。", "Record findings and follow-up integration questions.")}</li>
            </ol>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("確認する証跡", "Evidence to inspect")}</h2>
            <ul>
              <li>{t("decision output。", "Decision output.")}</li>
              <li>{t("FUJI gate outcome。", "FUJI gate outcome.")}</li>
              <li>{t("TrustLog evidence。", "TrustLog evidence.")}</li>
              <li>{t("利用可能な場合の bind receipt または bind summary。", "Bind receipt or bind summary where available.")}</li>
              <li>{t("block / hold 判断における failure reason。", "Failure reason for blocked or held decisions.")}</li>
              <li>{t("利用可能な場合の replay または trace consistency。", "Replay or trace consistency where available.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("成功基準", "Success criteria")}</h2>
            <ul>
              <li>{t("authority evidence が不足している場合に、黙って proceed しない。", "Missing authority evidence does not silently proceed.")}</li>
              <li>{t("無効または不十分な証跡に対して、明確な hold / review / block 理由が返る。", "Invalid or insufficient evidence produces a clear hold / review / block reason.")}</li>
              <li>{t("レビュアーが、なぜ allow / hold / review / block されたかを追跡できる。", "Reviewers can trace why a decision was allowed, held, reviewed, or blocked.")}</li>
              <li>{t("公開主張が veritas_os リポジトリ上の証跡と整合している。", "Public claims remain consistent with the veritas_os repository evidence.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("本PoCの境界", "Boundaries")}</h2>
            <ul>
              <li>{t("本PoCは評価経路であり、法的助言ではない。", "This PoC is an evaluation path, not legal advice.")}</li>
              <li>{t("規制当局の承認や第三者認証を主張するものではない。", "It does not claim regulatory approval or third-party certification.")}</li>
              <li>{t("これ単体で特定組織における本番利用可能性を証明するものではない。", "It does not prove production readiness for a specific organization by itself.")}</li>
              <li>{t("本番利用には、環境固有のレビュー、統合、セキュリティ、運用統制が必要である。", "Production use still requires environment-specific review, integration, security, and operational controls.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
