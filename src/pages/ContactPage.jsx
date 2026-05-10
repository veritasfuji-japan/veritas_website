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

const discussItems = [
  ["AML/KYC 1-Day PoCの範囲確認", "AML/KYC 1-Day PoC scope review"],
  [
    "6つの評価シナリオの自社業務への当てはめ",
    "Mapping the six evaluation scenarios to your workflow",
  ],
  [
    "AIエージェント導入前の停止・保留・レビュー条件の整理",
    "Defining allow, hold, review, and block conditions before AI-agent execution",
  ],
  [
    "必要な証跡、ログ、既存審査フローの確認",
    "Reviewing required evidence, logs, and existing approval flows",
  ],
  [
    "技術レビュー、投資DD、外部評価向けの説明整理",
    "Preparing materials for technical review, investor due diligence, or external evaluation",
  ],
];

const firstMessageItems = [
  ["想定している業務領域", "Target workflow or domain"],
  [
    "AIエージェントに実行させたい、または止めたい判断",
    "AI-agent actions you want to allow, hold, review, or block",
  ],
  ["現在の承認フローやレビュー体制", "Current approval or review process"],
  ["必要な証跡や監査ログの種類", "Required evidence or audit-log expectations"],
  [
    "PoC、技術レビュー、投資DD、共同研究などの相談目的",
    "Whether the request is for PoC, technical review, due diligence, or research discussion",
  ],
];

const noteItems = [
  [
    "このページは問い合わせフォームではなく、メール起動リンクです。",
    "This page uses email links, not a web contact form.",
  ],
  [
    "機密情報、個人情報、顧客データ、規制対象データは初回メールに含めないでください。",
    "Do not include confidential information, personal data, customer data, or regulated data in the first message.",
  ],
  [
    "Webサイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。",
    "Public website claims should be validated against the veritas_os repository evidence.",
  ],
];

const emailSubject = encodeURIComponent("VERITAS OS Inquiry");
const emailBody = encodeURIComponent(`Hello VERITAS OS team,

Affiliation / Organization:
Inquiry type:
Area of interest:
What I would like to evaluate or discuss:

Message:

Notes:
- Please do not include confidential information, personal data, customer data, or regulated data in this first message.
`);

const emailLink = `mailto:veritas.fuji@gmail.com?subject=${emailSubject}&body=${emailBody}`;

export default function ContactPage() {
  return (
    <PageShell
      label={{ ja: "お問い合わせ", en: "CONTACT" }}
      pageTitle={{ ja: "お問い合わせ", en: "Contact" }}
      title={{ ja: "お問い合わせ", en: "Contact" }}
      subtitle={{
        ja: "VERITAS OSへのレビュー、PoC、技術検証、共同開発に関する問い合わせはこちらからお願いします。",
        en: "For VERITAS OS review, PoC, technical evaluation, or collaboration inquiries, please contact us by email.",
      }}
      ctas={[
        { label: { ja: "メールを送る", en: "Send email" }, href: emailLink },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("相談できる内容", "What you can discuss")}</h2>
            <ul>
              {discussItems.map(([ja, en]) => (
                <li key={en}>{t(ja, en)}</li>
              ))}
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>
              {t("初回連絡に含めるとよい情報", "Helpful context for the first message")}
            </h2>
            <ul>
              {firstMessageItems.map(([ja, en]) => (
                <li key={en}>{t(ja, en)}</li>
              ))}
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("メールで連絡する", "Contact by email")}</h2>
            <p>
              {t(
                "以下のメールリンクからご連絡ください。初回連絡では、所属、関心領域、確認したい内容を簡潔に記載してください。",
                "Please use the email link below. In the first message, briefly include your affiliation, area of interest, and what you would like to evaluate or discuss.",
              )}
            </p>
            <a href={emailLink} style={{ textDecoration: "underline" }}>
              {t("メールを送る", "Send email")}
            </a>
            <p>
              {t(
                "上記の内容をすべて揃える必要はありません。まずは、評価したい業務と、AIに実行させる前に止めたい判断を共有してください。",
                "You do not need to prepare all of the above. Start by sharing the workflow you want to evaluate and the AI-driven decision you want to control before execution.",
              )}
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("注意", "Important note")}</h2>
            <ul>
              {noteItems.map(([ja, en]) => (
                <li key={en}>{t(ja, en)}</li>
              ))}
            </ul>
            <p>
              {t(
                "VERITAS OSは、現時点では法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。初回相談では、PoCまたは評価範囲として安全に確認できる内容から整理します。",
                "VERITAS OS does not currently claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration. The first discussion should focus on what can be safely evaluated as a PoC or assessment scope.",
              )}
            </p>
          </section>
        </>
      )}
    </PageShell>
  );
}
