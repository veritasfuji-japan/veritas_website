import React from "react";
import PageShell from "../components/PageShell.jsx";

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
        { label: { ja: "コアリポジトリを開く", en: "Open core repository" }, href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section>
            <h2>{t("このPoCで検証すること", "What this PoC tests")}</h2>
            <ul>
              <li>{t("AIエージェントの判断が、commit前に十分な authority evidence を持っているか。", "Whether an AI-agent decision has enough authority evidence before commit.")}</li>
              <li>{t("証跡が不足または無効な場合に、実行がブロックされるか。", "Whether missing or invalid evidence blocks execution.")}</li>
              <li>{t("bind receipt と監査証跡を、判断後にレビューできるか。", "Whether bind receipts and audit evidence can be reviewed after the decision.")}</li>
              <li>{t("fixture scenario が proceed / hold / review / block の決定的な結果を返すか。", "Whether fixture scenarios produce deterministic proceed / hold / review / block outcomes.")}</li>
            </ul>
          </section>
          <section style={{ marginTop: "1rem" }}>
            <h2>{t("PoCの流れ", "PoC flow")}</h2>
            <ol>
              <li>{t("規制対象アクションのシナリオを選択する。", "Select regulated action scenario.")}</li>
              <li>{t("policy と evidence の fixture を準備する。", "Prepare policy and evidence fixtures.")}</li>
              <li>{t("VERITAS pipeline に判断を通す。", "Run decisions through VERITAS pipeline.")}</li>
              <li>{t("FUJI / TrustLog / bind evidence を確認する。", "Inspect FUJI / TrustLog / bind evidence.")}</li>
              <li>{t("結果と failure reason をレビューする。", "Review outcomes and failure reasons.")}</li>
            </ol>
          </section>
          <section style={{ marginTop: "1rem" }}>
            <h2>{t("成果物", "Deliverables")}</h2>
            <ul>
              <li>{t("シナリオ結果の要約。", "Scenario result summary.")}</li>
              <li>{t("evidence trace。", "Evidence trace.")}</li>
              <li>{t("fail-closed挙動の確認。", "Fail-closed behavior check.")}</li>
              <li>{t("レビュー記録。", "Review notes.")}</li>
              <li>{t("次の統合ステップの提案。", "Next-step integration recommendation.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
