import PageShell from "../components/PageShell.jsx";

const coreRepositoryUrl = "https://github.com/veritasfuji-japan/veritas_os";

const emailSubject = encodeURIComponent("VERITAS OS inquiry");
const emailBody = encodeURIComponent(`Hello VERITAS OS team,

Affiliation / Organization:
Inquiry type:
Area of interest:
Workflow or scenario to evaluate:
AI action you want to allow, hold, review, or block:
Current approval / review process:
Message:

Notes:

* Please do not include confidential information, personal data, customer data, or regulated data in this first message.
`);

const emailLink = `mailto:veritas.fuji@gmail.com?subject=${emailSubject}&body=${emailBody}`;

const heroActions = [
  { label: ["メールを送る", "Send email"], href: emailLink, primary: true },
  { label: ["コアリポジトリを開く", "Open Core Repository"], href: coreRepositoryUrl, external: true },
  { label: ["デモを見る", "View Demo"], href: "/demo" },
];

const contactTopics = [
  {
    title: "AML/KYC PoC",
    copy: [
      "1-Day PoC の範囲、評価シナリオ、証跡確認について。",
      "Scope, evaluation scenarios, and evidence review for the 1-Day PoC.",
    ],
  },
  {
    title: "AI agent governance",
    copy: [
      "AIエージェント導入前の allow / hold / review / block 条件整理。",
      "Defining allow, hold, review, and block conditions before AI-agent execution.",
    ],
  },
  {
    title: "Evidence and audit flow",
    copy: [
      "必要な証跡、ログ、既存承認フローとの接続確認。",
      "Reviewing required evidence, logs, and existing approval flows.",
    ],
  },
  {
    title: "Technical review / DD",
    copy: [
      "技術レビュー、投資DD、外部評価向けの説明整理。",
      "Preparing material for technical review, due diligence, or external assessment.",
    ],
  },
  {
    title: "Research / collaboration",
    copy: [
      "共同研究、技術レビュー、GitHubレビュー、外部フィードバック。",
      "Research collaboration, technical review, GitHub review, or external feedback.",
    ],
  },
];

const firstMessageItems = [
  ["所属", "Affiliation"],
  ["相談目的", "Inquiry type"],
  ["想定業務領域", "Target workflow or domain"],
  [
    "AIに実行させたい、または止めたい判断",
    "AI action to allow, hold, review, or block",
  ],
  ["現在の承認フロー", "Current approval or review process"],
  ["必要な証跡や監査ログ", "Required evidence or audit-log expectations"],
];

const otherInquiryItems = [
  ["共同研究", "Research collaboration"],
  ["技術レビュー", "Technical review"],
  ["メディア・登壇", "Media or speaking"],
  ["GitHubレビュー", "GitHub review"],
  ["外部フィードバック", "External feedback"],
];

const sectionHeadingStyle = {
  margin: 0,
  color: "#0B3D5B",
  fontFamily: "'Fraunces', 'Times New Roman', serif",
  fontSize: "clamp(1.35rem, 1.05rem + 1.1vw, 2rem)",
  lineHeight: 1.18,
};

const sectionIntroStyle = {
  margin: "0.55rem 0 0",
  color: "#3A3C42",
};

const buttonBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "2.9rem",
  borderRadius: "999px",
  padding: "0.78rem 1.12rem",
  textDecoration: "none",
  fontWeight: 700,
  lineHeight: 1.2,
};

const primaryButtonStyle = {
  ...buttonBaseStyle,
  background: "#15161A",
  border: "1px solid #15161A",
  color: "#FFFDF7",
  boxShadow: "0 10px 24px rgba(21, 22, 26, 0.18)",
};

const secondaryButtonStyle = {
  ...buttonBaseStyle,
  background: "#FFFDF7",
  border: "1px solid #CFC6B1",
  color: "#1C2A2E",
};

const renderAction = (action, t) => (
  <a
    key={action.href}
    href={action.href}
    className={action.primary ? "contact-action contact-action-primary" : "contact-action"}
    style={action.primary ? primaryButtonStyle : secondaryButtonStyle}
    target={action.external ? "_blank" : undefined}
    rel={action.external ? "noreferrer noopener" : undefined}
  >
    {t(...action.label)}
  </a>
);

export default function ContactPage() {
  return (
    <PageShell
      label={{ ja: "お問い合わせ", en: "CONTACT" }}
      pageTitle={{ ja: "お問い合わせ", en: "Contact" }}
      title={{ ja: "お問い合わせ", en: "Contact" }}
      subtitle={{
        ja: "VERITAS OS のレビュー、PoC、技術検証、共同研究、外部評価に関する初回連絡はこちらからお願いします。",
        en: "Use this page for first contact about VERITAS OS review, PoC, technical evaluation, research collaboration, or external assessment.",
      }}
      ctas={[
        { label: { ja: "メールを送る", en: "Send email" }, href: emailLink },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
        { label: { ja: "コアリポジトリを開く", en: "Open Core Repository" }, href: coreRepositoryUrl },
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
      ]}
    >
      {(t) => (
        <div className="contact-page">
          <div className="contact-hero-note">
            {t(
              "このページは問い合わせフォームではなく、メール起動リンクです。",
              "This page uses an email link, not a web contact form.",
            )}
          </div>
          <div className="contact-hero-actions">
            {heroActions.map((action) => renderAction(action, t))}
          </div>

          <section className="contact-primary-card" aria-labelledby="contact-primary-heading">
            <div>
              <p className="contact-kicker">Primary contact</p>
              <h2 id="contact-primary-heading" style={sectionHeadingStyle}>
                {t("まずはメールで連絡", "Start by email")}
              </h2>
              <p style={sectionIntroStyle}>
                {t(
                  "初回メールでは、所属、関心領域、確認したい内容を短く送ってください。すべての情報を揃える必要はありません。",
                  "For the first message, briefly include your affiliation, area of interest, and what you would like to evaluate. You do not need to prepare everything.",
                )}
              </p>
            </div>
            <a
              href={emailLink}
              className="contact-primary-email"
              style={primaryButtonStyle}
            >
              {t("メールを送る", "Send email")}
            </a>
          </section>

          <section aria-labelledby="contact-topics-heading">
            <h2 id="contact-topics-heading" style={sectionHeadingStyle}>
              {t("相談できる内容", "What you can contact about")}
            </h2>
            <div className="contact-topic-grid">
              {contactTopics.map((item) => (
                <article className="contact-topic-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{t(...item.copy)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="contact-template-card" aria-labelledby="contact-template-heading">
            <div className="contact-template-header">
              <div>
                <p className="contact-kicker">Email template</p>
                <h2 id="contact-template-heading" style={sectionHeadingStyle}>
                  {t("初回メールに書くとよいこと", "What to include in the first message")}
                </h2>
                <p style={sectionIntroStyle}>
                  {t("次のうち、分かる範囲だけで十分です。", "Include only what you already know.")}
                </p>
              </div>
              <span className="contact-soft-badge">
                {t("全部必要ではありません", "Not all required")}
              </span>
            </div>
            <div className="contact-checklist-grid">
              {firstMessageItems.map(([ja, en]) => (
                <div className="contact-check-row" key={en}>
                  <span aria-hidden="true">✓</span>
                  <p>{t(ja, en)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="contact-notice" aria-labelledby="contact-notice-heading">
            <h2 id="contact-notice-heading" style={sectionHeadingStyle}>
              {t("初回メールでは送らないでください", "Do not include in the first message")}
            </h2>
            <p>
              {t(
                "機密情報、個人情報、顧客データ、規制対象データは初回メールに含めないでください。まずは、PoCまたは評価範囲として安全に確認できる内容から整理します。",
                "Do not include confidential information, personal data, customer data, or regulated data in the first message. Start with information that can be safely discussed as PoC or evaluation scope.",
              )}
            </p>
            <p>
              {t(
                "VERITAS OSは、現時点では法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。",
                "VERITAS OS does not currently claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration.",
              )}
            </p>
          </section>

          <section className="contact-other-section" aria-labelledby="contact-other-heading">
            <h2 id="contact-other-heading" style={sectionHeadingStyle}>
              {t("その他の連絡", "Other inquiries")}
            </h2>
            <p style={sectionIntroStyle}>
              {t(
                "PoCや評価相談以外にも、共同研究、技術レビュー、メディア・登壇、GitHubレビュー、外部フィードバックについて連絡できます。",
                "Beyond PoC or evaluation discussions, you can also reach out about research collaboration, technical review, media or speaking opportunities, GitHub review, or external feedback.",
              )}
            </p>
            <div className="contact-chip-row">
              {otherInquiryItems.map(([ja, en]) => (
                <span className="contact-chip" key={en}>{t(ja, en)}</span>
              ))}
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
