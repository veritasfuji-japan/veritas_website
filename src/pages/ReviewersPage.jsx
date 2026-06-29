import PageShell from "../components/PageShell.jsx";

const CORE_REPOSITORY_URL = "https://github.com/veritasfuji-japan/veritas_os";
const REVIEWER_EVIDENCE_DOCS = [
  {
    title: "Reviewer Evidence Index",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/external-reviewer-artifact-index.md",
    description: {
      ja: "外部レビュアー向けの主要証跡、検証レポート、スキーマへの入口。",
      en: "Entry point for reviewer artifacts, validation reports, and schemas.",
    },
  },
  {
    title: "Reviewer Evidence Assurance Overview",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-assurance-overview.md",
    description: {
      ja: "Evidence Chain、レビューパケット、失敗理由カタログの保証モデル概要。",
      en: "Assurance model overview for the Evidence Chain, reviewer packet, and failure reason catalog.",
    },
  },
  {
    title: "Reviewer Evidence Packet",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-packet.md",
    description: {
      ja: "レビュアーがケース結果、証跡サマリ、検証サマリを確認するためのパケット仕様。",
      en: "Packet specification for inspecting case outcomes, evidence summaries, and verification summaries.",
    },
  },
];
const REVIEWER_EVIDENCE_FLOW = [
  "AI Decision",
  "Evidence Chain",
  "Reviewer Packet",
  "Failure Reason Catalog",
  "Validation Report",
  "Assurance Overview",
];

const sectionHeader = {
  marginBottom: "1rem",
};

const sectionEyebrow = {
  color: "#2456C7",
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  marginBottom: "0.35rem",
  textTransform: "uppercase",
};

const sectionTitle = {
  color: "#0b3d5b",
  fontFamily: "'Fraunces', 'Times New Roman', serif",
  fontSize: "clamp(1.35rem, 1.1rem + 1.15vw, 2rem)",
  lineHeight: 1.18,
  margin: 0,
};

function SectionHeading({ eyebrow, title }) {
  return (
    <div style={sectionHeader}>
      <p style={sectionEyebrow}>{eyebrow}</p>
      <h2 style={sectionTitle}>{title}</h2>
    </div>
  );
}

function ExternalLink({ children, className = "reviewer-button reviewer-button-secondary", href }) {
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
}

export default function ReviewersPage() {
  return (
    <PageShell
      label={{ ja: "外部レビュー", en: "EXTERNAL REVIEW" }}
      pageTitle={{ ja: "外部レビュー", en: "External Review" }}
      title={{ ja: "外部レビュー", en: "External Review" }}
      subtitle={{
        ja: "VERITAS OS を、LLMエージェントのための監査可能な意思決定インフラとして評価するための入口です。",
        en: "An entry point for evaluating VERITAS OS as an auditable decision infrastructure layer for LLM agents.",
      }}
    >
      {(t, lang) => {
        const audienceItems = [
          {
            title: t("技術レビュアー", "Technical reviewers"),
            body: t(
              "実装済みの挙動、制御境界、Evidence Chain を確認したい人。",
              "Inspect implemented behavior, control boundaries, and evidence-chain structure.",
            ),
          },
          {
            title: t("DD / 投資家", "DD / investors"),
            body: t(
              "PoC-ready と本番適用準備の境界、主張の適切さ、次段階ギャップを確認したい人。",
              "Assess the boundary between PoC-readiness and production-readiness, claims discipline, and next-step gaps.",
            ),
          },
          {
            title: t("監査・ガバナンス関係者", "Audit / governance stakeholders"),
            body: t(
              "誰が何を許可したかを、どこまで検証可能に扱っているかを見たい人。",
              "Review how the system handles who authorized what, and how verifiable that approval is.",
            ),
          },
        ];

        const reviewItems = [
          {
            title: t("意思決定パイプライン", "Decision pipeline"),
            body: t("AI判断から governance decision までの流れ。", "The path from AI judgment to governance decision."),
          },
          {
            title: t("FUJIゲート", "FUJI gate"),
            body: t("不十分・不正・危険な経路を fail-closed で止める制御点。", "Control points that fail-closed on insufficient, invalid, or unsafe paths."),
          },
          {
            title: t("TrustLog証跡", "TrustLog evidence"),
            body: t("意思決定、receipt、Evidence Chain の追跡可能性。", "Traceability for decisions, receipts, and the Evidence Chain."),
          },
          {
            title: t("Bind管理対象パス", "Bind-governed paths"),
            body: t("承認と現実世界への commit の境界。", "The boundary between authorization and real-world commit."),
          },
          {
            title: t("ビルド・ドキュメント証跡", "Build and documentation evidence"),
            body: t("実装、ドキュメント、PoC素材の整合性。", "Alignment across implementation, documentation, and PoC materials."),
          },
          {
            title: t("公開主張との整合性", "Public-claims alignment"),
            body: t("Web上の表現が、リポジトリ証跡と矛盾していないか。", "Whether website language stays consistent with repository evidence."),
          },
        ];

        const reviewSteps = [
          t("ロードマップではなく、実装済みの挙動を見る", "Review implemented behavior, not roadmap promises"),
          t("Webの主張を veritas_os の証跡と照合する", "Cross-check website claims against veritas_os evidence"),
          t("public positioning と実証済み範囲を分けて評価する", "Separate public positioning from demonstrated scope"),
        ];

        const ddItems = [
          {
            title: t("主張と証跡の整合性", "Claims-to-evidence alignment"),
            body: t("公開主張が veritas_os の実装証跡と整合しているか。", "Whether public claims align with veritas_os implementation evidence."),
          },
          {
            title: t("PoC-ready と本番準備の境界", "PoC-ready versus production-readiness"),
            body: t("PoCとして見せている範囲と、本番適用準備の範囲が明確に分かれているか。", "Whether PoC scope and production-readiness scope are clearly separated."),
          },
          {
            title: t("過剰主張の回避", "Avoidance of overclaiming"),
            body: t("第三者認証、規制承認、本番導入を過大に示していないか。", "Whether the page avoids overstating third-party certification, regulatory approval, or production deployment."),
          },
          {
            title: t("AML/KYC PoC の評価枠", "AML/KYC PoC evaluation frame"),
            body: t("データ境界、提供物、成功基準が明確か。", "Whether data boundaries, deliverables, and success criteria are clear."),
          },
          {
            title: t("次段階ギャップ", "Next-step gaps"),
            body: t("次の評価・導入判断に必要な未解決ギャップが明示されているか。", "Whether unresolved gaps for the next evaluation or adoption decision are explicit."),
          },
        ];

        const reviewerEvidenceIntro = t(
          "VERITAS は、AI実行判断を実行前に検査・検証・再現できることを示す、決定論的なレビュアー向け証跡を提供します。",
          "VERITAS provides deterministic reviewer-facing evidence demonstrating how AI execution decisions can be inspected, validated, and reproduced before execution.",
        );

        const nonClaims = [
          t("本番導入済みであることを示すものではない", "It does not claim production deployment"),
          t("規制当局の承認を示すものではない", "It does not claim regulatory approval"),
          t("第三者監査承認や第三者認証を示すものではない", "It does not claim third-party audit approval or certification"),
          t("特定企業への適用可能性を保証するものではない", "It does not guarantee applicability for a specific enterprise"),
          t("Web上の説明だけで十分な証明になることを示すものではない", "It does not claim that website text alone is sufficient proof"),
        ];

        const nextSteps = [
          { label: t("コアリポジトリを開く", "Open Core Repository"), href: CORE_REPOSITORY_URL, primary: true },
          { label: t("AML/KYC PoCを見る", "View AML/KYC PoC"), href: "/aml-kyc-poc" },
          { label: t("デモを見る", "View Demo"), href: "/demo" },
          { label: t("問い合わせる", "Contact"), href: "/contact" },
        ];

        return (
          <>
            <section className="reviewer-hero-panel" aria-label={t("外部レビューの概要", "External review overview")}>
              <p>
                {t(
                  "このページは、実装済みの挙動、PoC境界、公開主張とリポジトリ証跡の整合性を確認したい外部レビュアー向けに設計されています。",
                  "This page is designed for external reviewers who want to inspect implemented behavior, PoC boundaries, and the alignment between public claims and repository evidence.",
                )}
              </p>
              <div className="reviewer-hero-actions" aria-label={t("主要リンク", "Primary links")}>
                <ExternalLink className="reviewer-button reviewer-button-primary" href={CORE_REPOSITORY_URL}>
                  {t("コアリポジトリを開く", "Open Core Repository")}
                </ExternalLink>
                <ExternalLink href="/aml-kyc-poc">{t("AML/KYC PoCを見る", "View AML/KYC PoC")}</ExternalLink>
                <ExternalLink href="/demo">{t("デモを見る", "View Demo")}</ExternalLink>
              </div>
            </section>

            <section className="reviewer-section reviewer-audience-section">
              <SectionHeading eyebrow="01" title={t("このページの対象", "Who this is for")} />
              <div className="reviewer-audience-grid">
                {audienceItems.map((item) => (
                  <article className="reviewer-audience-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="reviewer-section">
              <SectionHeading eyebrow="02" title={t("レビュー対象", "What to review")} />
              <div className="reviewer-card-grid">
                {reviewItems.map((item) => (
                  <article className="reviewer-review-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="reviewer-section reviewer-steps-section">
              <SectionHeading eyebrow="03" title={t("どう確認するか", "How to review")} />
              <ol className="reviewer-steps-list">
                {reviewSteps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>


            <section className="reviewer-section reviewer-evidence-docs-section">
              <SectionHeading eyebrow="04" title="Reviewer Evidence" />
              <p>{reviewerEvidenceIntro}</p>
              <div className="reviewer-card-grid" aria-label={t("Reviewer Evidence ドキュメント", "Reviewer Evidence documentation")}>
                {REVIEWER_EVIDENCE_DOCS.map((doc) => (
                  <article className="reviewer-review-card" key={doc.href}>
                    <h3>{doc.title}</h3>
                    <p>{lang === "ja" ? doc.description.ja : doc.description.en}</p>
                    <ExternalLink href={doc.href}>{t("GitHubで開く", "Open on GitHub")}</ExternalLink>
                  </article>
                ))}
              </div>
              <ol className="reviewer-evidence-flow" aria-label={t("証跡保証アーキテクチャ", "Evidence assurance architecture")}>
                {REVIEWER_EVIDENCE_FLOW.map((step, index) => (
                  <li key={step}>
                    <span>{step}</span>
                    {index < REVIEWER_EVIDENCE_FLOW.length - 1 && <strong aria-hidden="true">↓</strong>}
                  </li>
                ))}
              </ol>
            </section>

            <section className="reviewer-section reviewer-checkpoints-section">
              <SectionHeading eyebrow="05" title={t("DD・投資向け確認観点", "DD / investor checkpoints")} />
              <div className="reviewer-checklist">
                {ddItems.map((item) => (
                  <article className="reviewer-check-item" key={item.title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="reviewer-section reviewer-non-claims-section">
              <details className="reviewer-disclosure">
                <summary>{t("このページが主張しないこと", "What this page does not claim")}</summary>
                <ul>
                  {nonClaims.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </section>

            <section className="reviewer-next-section">
              <div>
                <SectionHeading eyebrow="06" title={t("次に見るもの", "Next steps")} />
                <p>
                  {t(
                    "本サイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。",
                    "Public website claims should be validated against the evidence in the veritas_os repository.",
                  )}
                </p>
              </div>
              <ol className="reviewer-next-list">
                {nextSteps.map((step, index) => (
                  <li key={step.href}>
                    <span>{index + 1}</span>
                    <ExternalLink
                      className={step.primary ? "reviewer-button reviewer-button-primary" : "reviewer-button reviewer-button-secondary"}
                      href={step.href}
                    >
                      {step.label}
                    </ExternalLink>
                  </li>
                ))}
              </ol>
            </section>
          </>
        );
      }}
    </PageShell>
  );
}
