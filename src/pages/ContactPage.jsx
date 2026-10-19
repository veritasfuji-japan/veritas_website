import PageShell from "../components/PageShell.jsx";

const coreRepositoryUrl = "https://github.com/veritasfuji-japan/veritas_os";

const mailBody = {
  ja: `VERITAS OS ご担当者様

所属（任意）：
評価したいAIの操作：
どのような条件で停止・承認が必要か：
相談内容：

※初回メールには機密情報、個人情報、顧客データ、規制対象データを含めないでください。
`,
  en: `Hello VERITAS OS team,

Organization (optional):
One AI action I want to evaluate:
When that action should be held or require approval:
Message:

Please do not include confidential information, personal data, customer data, or regulated data in this first message.
`,
};

const makeEmailLink = (lang, poc = false) => {
  const subject = lang === "ja"
    ? (poc ? "VERITAS OS - PoC評価のご相談" : "VERITAS OS - お問い合わせ")
    : (poc ? "VERITAS OS - Scoped PoC Inquiry" : "VERITAS OS inquiry");
  return `mailto:veritas.fuji@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody[lang])}`;
};

const heroActions = [
  { label: ["メールを送る", "Send email"], email: true, primary: true },
  { label: ["デモを見る", "View Demo"], href: "/demo" },
  { label: ["AML/KYC PoCを見る", "View AML/KYC PoC"], href: "/aml-kyc-poc" },
];

const pocDecisionItems = [
  [
    "AIに実行させたい、または止めたい判断",
    "The AI action to allow, hold, review, or block",
  ],
  ["その判断に必要な証跡", "Evidence required before execution"],
  ["誰が承認すべきか", "Who should approve the action"],
  ["どのポリシーやルールが関係するか", "Which policy or rule applies"],
  [
    "証跡不足時にどう止めたいか",
    "What should happen when evidence is missing",
  ],
  [
    "監査・レビュー時に何を残したいか",
    "What should remain for audit or review",
  ],
];

const contactTopics = [
  {
    title: "AML/KYC PoC",
    copy: [
      "1つのAI操作を対象とした評価方法、判定結果、証跡について。",
      "A scoped evaluation of one AI action, its outcome, and its evidence.",
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

const renderAction = (action, t, lang) => (
  <a
    key={action.href || "email"}
    href={action.email ? makeEmailLink(lang) : action.href}
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
        { label: { ja: "メールを送る", en: "Send email" }, href: { ja: makeEmailLink("ja"), en: makeEmailLink("en") } },
        { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
        { label: { ja: "レビュアー入口を見る", en: "View Reviewer Entrypoint" }, href: "/reviewers" },
        { label: { ja: "コアリポジトリを開く", en: "Open Core Repository" }, href: coreRepositoryUrl },
      ]}
    >
      {(t, lang) => (
        <div className="contact-page">
          <div className="contact-hero-note">
            {t(
              "このページは問い合わせフォームではなく、メール起動リンクです。",
              "This page uses an email link, not a web contact form.",
            )}
          </div>
          <div className="contact-hero-actions">
            {heroActions.map((action) => renderAction(action, t, lang))}
          </div>

          <section className="contact-primary-card" aria-labelledby="contact-primary-heading">
            <div>
              <p className="contact-kicker">Primary contact</p>
              <h2 id="contact-primary-heading" style={sectionHeadingStyle}>
                {t("相談は短いメールから", "Start with a short email")}
              </h2>
              <p style={sectionIntroStyle}>
                {t(
                  "まずは、AIに実行させたい操作と、どんなときに止めたいかだけでも大丈夫です。専門用語は不要です。",
                  "Just describe an AI action you want to evaluate and when it should be stopped. No technical terminology required.",
                )}
              </p>
            </div>
            <a
              href={makeEmailLink(lang)}
              className="contact-primary-email"
              style={primaryButtonStyle}
            >
              {t("メールを送る", "Send email")}
            </a>
          </section>

          <section className="contact-poc-card" aria-labelledby="contact-poc-heading">
            <div className="contact-poc-header">
              <div>
                <p className="contact-kicker">PoC evaluation inquiry</p>
                <h2 id="contact-poc-heading" style={sectionHeadingStyle}>
                  {t("まず1つのAI操作を選んで相談する", "Start with one AI action")}
                </h2>
                <p style={sectionIntroStyle}>
                  {t(
                    "VERITAS OS の評価は、抽象的なAIガバナンス議論よりも、1つの具体的なAIエージェント判断経路から始めると進めやすくなります。",
                    "VERITAS OS is easiest to evaluate through one concrete AI-agent decision path rather than an abstract AI governance discussion.",
                  )}
                </p>
                <p className="contact-poc-supporting">
                  {t(
                    "AIが何をしようとしているのか、その実行に必要な証跡は何か、誰が承認すべきか、どの条件なら allow / hold / review / block になるべきかを整理します。",
                    "The evaluation maps what the AI is trying to do, what evidence is required, who should authorize it, and when the action should allow, hold, review, or block.",
                  )}
                </p>
              </div>
              <a
                href={makeEmailLink(lang, true)}
                className="contact-primary-email"
                style={primaryButtonStyle}
              >
                {t("PoC評価についてメールする", "Email about PoC evaluation")}
              </a>
            </div>
            <div className="contact-poc-grid">
              {pocDecisionItems.map(([ja, en]) => (
                <div className="contact-poc-row" key={en}>
                  <span aria-hidden="true">✓</span>
                  <p>{t(ja, en)}</p>
                </div>
              ))}
            </div>
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
                "VERITAS OS は、法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。",
                "VERITAS OS does not claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration.",
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
