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

export default function ConceptsPage() {
  return (
    <PageShell
      label={{ ja: "中心概念", en: "CONCEPTS" }}
      pageTitle={{ ja: "中心概念", en: "Concepts" }}
      title={{ ja: "Approval is not commitment.", en: "Approval is not commitment." }}
      subtitle={{
        ja: "VERITAS OS は、意思決定の承認と現実世界への実行commitを分離します。",
        en: "VERITAS OS separates decision approval from real-world execution commitment.",
      }}
      ctas={[
        { label: { ja: "コアリポジトリを開く", en: "Open core repository" }, href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("中心概念", "Core idea")}</h2>
            <ul>
              <li>{t("Audit log は「何が起きたか」を記録する。", "Audit logs record what happened.")}</li>
              <li>{t("Authority evidence は「なぜその行為が許可されたか」を説明する。", "Authority evidence explains why an action was allowed.")}</li>
              <li>{t("Bind boundary は、commit が許容可能かを確認する。", "Bind boundary checks whether commitment is admissible.")}</li>
              <li>{t("十分な証跡がなければ、commit は fail-closed で止まるべきである。", "Without sufficient evidence, commit should fail closed.")}</li>
            </ul>
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("なぜ重要か", "Why this matters")}</h2>
            <ul>
              <li>{t("強力なエージェントには、説明だけでは不十分である。", "Powerful agents need more than explanations.")}</li>
              <li>{t("規制対象アクションには、強制可能な境界が必要である。", "Regulated actions need enforceable boundaries.")}</li>
              <li>{t("事後ログだけでは、実行前の統制には足りない。", "Post-hoc logs are not enough for pre-execution control.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
