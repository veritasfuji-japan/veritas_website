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
            <h2 style={headingStyle}>{t("DD・投資向け確認観点", "Investor / DD review points")}</h2>
            <ul>
              <li>{t("公開主張が veritas_os の実装証跡と整合しているか。", "Whether public claims align with veritas_os repository evidence.")}</li>
              <li>{t("PoC-ready と本番適用準備の境界が明確か。", "Whether the boundary between PoC-ready and deployment readiness is clear.")}</li>
              <li>{t("第三者認証、規制承認、本番導入を過大に主張していないか。", "Whether the site avoids overclaiming third-party certification, regulatory approval, or production deployment.")}</li>
              <li>{t("AML/KYC PoC のデータ境界、提供物、成功基準が明確か。", "Whether the AML/KYC PoC data boundary, deliverables, and success criteria are clear.")}</li>
              <li>{t("次段階評価に必要なギャップが明示されているか。", "Whether gaps for next-stage evaluation are explicitly identified.")}</li>
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
        </>
      )}
    </PageShell>
  );
}
