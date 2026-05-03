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

const emailLink = "mailto:veritas.fuji@gmail.com?subject=VERITAS%20OS%20Inquiry";

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
            <h2 style={headingStyle}>{t("問い合わせ内容", "Inquiry types")}</h2>
            <ul>
              <li>{t("AML/KYC PoCに関する相談", "AML/KYC PoC inquiries")}</li>
              <li>{t("外部レビュー・技術評価", "External review or technical evaluation")}</li>
              <li>{t("企業導入前の検証", "Pre-adoption enterprise evaluation")}</li>
              <li>{t("共同開発・研究協力", "Collaboration or research discussions")}</li>
              <li>{t("メディア・登壇・取材に関する連絡", "Media, speaking, or interview requests")}</li>
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
            <a href={emailLink} style={{ textDecoration: "underline" }}>{t("メールを送る", "Send email")}</a>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("注意", "Important note")}</h2>
            <ul>
              <li>{t("このページは問い合わせフォームではなく、メール起動リンクです。", "This page uses email links, not a web contact form.")}</li>
              <li>{t("機密情報、個人情報、顧客データ、規制対象データは初回メールに含めないでください。", "Do not include confidential information, personal data, customer data, or regulated data in the first message.")}</li>
              <li>{t("Webサイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。", "Public website claims should be validated against the veritas_os repository evidence.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
