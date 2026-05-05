import React from "react";
import PageShell from "../components/PageShell.jsx";
import HumanApprovalWorkbench from "../components/HumanApprovalWorkbench.jsx";

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

export default function ReviewersPage() {
  return (
    <PageShell
      label={{ ja: "レビュアー", en: "REVIEWERS" }}
      pageTitle={{ ja: "外部レビュアー", en: "Reviewers" }}
      title={{ ja: "外部レビュアー", en: "External Reviewers" }}
      subtitle={{
        ja: "LLMエージェントのための監査可能な意思決定インフラとして、VERITAS OSをレビューするための入口です。",
        en: "Review VERITAS OS as auditable decision infrastructure for LLM agents.",
      }}
      ctas={[
        { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
        { label: { ja: "コアリポジトリを開く", en: "Open core repository" }, href: "https://github.com/veritasfuji-japan/veritas_os" },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("レビュー対象", "What to review")}</h2>
            <ul>
              <li>{t("意思決定パイプライン", "Decision pipeline.")}</li>
              <li>{t("FUJIゲート", "FUJI gate.")}</li>
              <li>{t("TrustLog証跡", "TrustLog evidence.")}</li>
              <li>{t("Bind管理対象パス", "Bind-governed paths.")}</li>
              <li>{t("ビルド・ドキュメント証跡", "Build and documentation evidence.")}</li>
              <li>{t("公開主張とリポジトリ証跡の整合性", "Public claims alignment with repository evidence.")}</li>
            </ul>
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("レビュー姿勢", "Review posture")}</h2>
            <ul>
              <li>{t("ロードマップではなく、実装済みの挙動を確認する。", "Check implemented behavior, not roadmap promises.")}</li>
              <li>{t("主張を veritas_os と照合する。", "Validate claims against veritas_os.")}</li>
              <li>{t("Webサイト上の主張は、証明そのものではなく public positioning として扱う。", "Treat website claims as public positioning, not proof by themselves.")}</li>
            </ul>
          </section>
          <HumanApprovalWorkbench />
        </>
      )}
    </PageShell>
  );
}
