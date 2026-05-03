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

export default function EnterprisePage() {
  return (
    <PageShell
      label={{ ja: "企業課題", en: "ENTERPRISE" }}
      pageTitle={{ ja: "企業課題", en: "Enterprise" }}
      title={{
        ja: "AIエージェント導入で企業が直面する痛み",
        en: "The enterprise pain behind AI-agent adoption",
      }}
      subtitle={{
        ja: "AIエージェントが判断から実行へ近づくほど、企業の課題は「モデルが賢いか」ではなく、「実行前に誰が、何を根拠に、どこまで許可したかを証明できるか」に移ります。",
        en: "As AI agents move from recommendations toward real-world execution, the enterprise problem shifts from model capability to proving who authorized what, based on which evidence, before action.",
      }}
      ctas={[
        { label: { ja: "中心概念を見る", en: "Read the core concept" }, href: "/concepts" },
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
        { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
        { label: { ja: "コアリポジトリを開く", en: "Open core repository" }, href: "https://github.com/veritasfuji-japan/veritas_os" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("企業が抱える痛み", "The pain companies face")}</h2>
            <ul>
              <li>{t("AIエージェントの判断が、承認なしに実行へ近づく。", "AI-agent decisions move closer to execution without clear authorization boundaries.")}</li>
              <li>{t("判断理由、証跡、承認境界がツールやログに散らばる。", "Rationale, evidence, and approval context are scattered across tools and logs.")}</li>
              <li>{t("事後ログは残っていても、実行前に止める境界が弱い。", "Post-hoc logs may exist, but pre-execution control remains weak.")}</li>
              <li>{t("説明はあっても、それが実行許可を意味するのかが曖昧になる。", "Explanations do not clearly determine whether execution was actually authorized.")}</li>
              <li>{t("リスク、法務、監査、現場の責任分界が不明確になる。", "Risk, legal, audit, and operations teams lack a shared responsibility boundary.")}</li>
              <li>{t("規制対象業務では「モデルがそう言った」だけでは通らない。", "Regulated workflows cannot rely on “the model said so.”")}</li>
              <li>{t("PoCは進んでも、本番前に証跡・統制・監査可能性で止まりやすい。", "AI pilots often stall before production because evidence, control, and auditability are not reviewable enough.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("なぜ既存の対策だけでは足りないか", "Why existing approaches are not enough")}</h2>
            <ul>
              <li>{t("通常のログは「何が起きたか」を残すが、「なぜ実行してよかったか」は別問題である。", "Ordinary logs record what happened, but not necessarily why execution was authorized.")}</li>
              <li>{t("説明可能性は判断理由を補助するが、実行許可そのものではない。", "Explainability helps interpret a decision, but it is not execution permission.")}</li>
              <li>{t("ガードレールは危険な出力を減らすが、組織上の承認・証跡・責任境界を十分に表現しない。", "Guardrails reduce unsafe outputs, but they do not fully encode organizational approval, evidence, and responsibility boundaries.")}</li>
              <li>{t("人間承認も、どの証跡を根拠に何を許可したのかが残らなければ監査に弱い。", "Human approval is weak if the evidence and scope of authorization are not preserved.")}</li>
              <li>{t("企業には、判断と実行commitの間に、検証可能な境界が必要である。", "Enterprises need a verifiable boundary between decision approval and execution commitment.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("VERITAS OSが加えるもの", "What VERITAS OS adds")}</h2>
            <ul>
              <li>{t("AI判断を実行前にガバナンス境界へ通す。", "Route AI decisions through a governance boundary before execution.")}</li>
              <li>{t("authority evidence によって「なぜその行為が許可可能か」を残す。", "Preserve authority evidence explaining why an action may be allowed.")}</li>
              <li>{t("FUJI gate により、不十分・不正・危険な経路を fail-closed で止める。", "Use FUJI gate behavior to fail closed on insufficient, invalid, or unsafe paths.")}</li>
              <li>{t("TrustLog により、意思決定と証跡の追跡可能性を高める。", "Use TrustLog to improve decision and evidence traceability.")}</li>
              <li>{t("bind boundary により、承認と現実世界へのcommitを分離する。", "Separate approval from real-world commitment through a bind boundary.")}</li>
              <li>{t("レビュアーが、allow / hold / review / block の理由を確認できる形にする。", "Help reviewers inspect why a decision was allowed, held, reviewed, or blocked.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("どこで効くか", "Where this matters")}</h2>
            <ul>
              <li>{t("AML/KYC判断", "AML/KYC decisions")}</li>
              <li>{t("規制対象アクションのエスカレーション", "Regulated action escalation")}</li>
              <li>{t("ポリシー変更や設定変更", "Policy or configuration changes")}</li>
              <li>{t("AIエージェントによる高リスクな実行判断", "High-risk execution decisions by AI agents")}</li>
              <li>{t("監査・レビュー・証跡提出が必要なワークフロー", "Workflows requiring audit, review, or evidence handoff")}</li>
              <li>{t("本番前のPoC、技術検証、外部レビュー", "Pre-production PoCs, technical evaluation, and external review")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("VERITAS OSが主張しないこと", "What VERITAS OS does not claim")}</h2>
            <ul>
              <li>{t("法的助言ではない。", "It is not legal advice.")}</li>
              <li>{t("規制当局の承認ではない。", "It is not regulatory approval.")}</li>
              <li>{t("第三者認証の代替ではない。", "It is not a substitute for third-party certification.")}</li>
              <li>{t("すべてのリスクを自動で消すものではない。", "It does not automatically remove all risk.")}</li>
              <li>{t("これ単体で特定企業の本番利用可能性を証明するものではない。", "It does not prove production readiness for a specific organization by itself.")}</li>
              <li>{t("本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である。", "Production use still requires environment-specific integration, security, operations, legal, and audit review.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("次に見るべきもの", "Recommended next steps")}</h2>
            <ul>
              <li>{t("まず中心概念で「approval is not commitment」を確認する。", "Start with the core concept: approval is not commitment.")}</li>
              <li>{t("AML/KYC PoCで評価経路を確認する。", "Review the AML/KYC PoC evaluation path.")}</li>
              <li>{t("外部レビュアーページで確認観点を見る。", "Use the reviewers page to inspect evaluation criteria.")}</li>
              <li>{t("具体的な検証相談は問い合わせページから連絡する。", "Use the contact page for concrete evaluation or collaboration inquiries.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
