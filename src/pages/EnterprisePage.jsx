import PageShell from "../components/PageShell.jsx";

const heroCtaStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.65rem",
  marginTop: "1.25rem",
};

const primaryCtaStyle = {
  border: "1px solid #15161A",
  borderRadius: "999px",
  background: "#15161A",
  color: "#FAF6EB",
  padding: "0.68rem 1rem",
  textDecoration: "none",
  fontWeight: 600,
};

const secondaryCtaStyle = {
  border: "1px solid #C8BEA7",
  borderRadius: "999px",
  background: "rgba(250, 246, 235, 0.72)",
  color: "#1C2A2E",
  padding: "0.68rem 1rem",
  textDecoration: "none",
  fontWeight: 600,
};

const sectionStyle = {
  marginTop: "clamp(2rem, 1.4rem + 2.5vw, 3.5rem)",
};

const introStyle = {
  color: "#526068",
  fontSize: "0.78rem",
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  letterSpacing: "0.1em",
  marginBottom: "0.45rem",
  textTransform: "uppercase",
};

const headingStyle = {
  margin: 0,
  color: "#163747",
  fontFamily: "'Fraunces', 'Times New Roman', serif",
  fontSize: "clamp(1.35rem, 1.08rem + 1.15vw, 2.1rem)",
  lineHeight: 1.18,
};

const sectionLeadStyle = {
  color: "#4A4D54",
  marginTop: "0.6rem",
  maxWidth: "42rem",
};

const painGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr))",
  gap: "0.85rem",
  marginTop: "1rem",
};

const painCardStyle = {
  background: "rgba(250, 246, 235, 0.68)",
  border: "1px solid #E2DAC8",
  borderRadius: "18px",
  padding: "1rem",
};

const limitListStyle = {
  display: "grid",
  gap: "0.85rem",
  margin: "1rem 0 0",
  padding: 0,
  listStyle: "none",
};

const limitItemStyle = {
  display: "grid",
  gridTemplateColumns: "2.35rem 1fr",
  gap: "0.8rem",
  alignItems: "start",
  padding: "0.95rem 0",
  borderTop: "1px solid #DED6C5",
};

const numberStyle = {
  color: "#25566C",
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  fontSize: "0.82rem",
};

const valueGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))",
  gap: "1rem",
  marginTop: "1rem",
};

const valueCardStyle = {
  background: "#FAF6EB",
  border: "1px solid #DCD3BE",
  borderRadius: "22px",
  padding: "1.15rem",
  boxShadow: "0 12px 30px rgba(35, 43, 48, 0.04)",
};

const eyebrowStyle = {
  color: "#25566C",
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  fontSize: "0.76rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const cardTitleStyle = {
  color: "#15161A",
  fontSize: "clamp(1rem, 0.96rem + 0.25vw, 1.16rem)",
  lineHeight: 1.28,
  margin: "0.35rem 0 0.45rem",
};

const cardBodyStyle = {
  color: "#4A4D54",
  lineHeight: 1.58,
  margin: 0,
};

const applicationListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.55rem",
  listStyle: "none",
  margin: "1rem 0 0",
  padding: 0,
};

const applicationItemStyle = {
  border: "1px solid #D8D0BE",
  borderRadius: "999px",
  background: "rgba(250, 246, 235, 0.58)",
  color: "#23343B",
  padding: "0.48rem 0.72rem",
};

const disclosureStyle = {
  marginTop: "1.2rem",
  borderTop: "1px solid #DED6C5",
  borderBottom: "1px solid #DED6C5",
  padding: "0.8rem 0",
};

const summaryStyle = {
  color: "#163747",
  cursor: "pointer",
  fontWeight: 700,
};

const disclosureListStyle = {
  color: "#4A4D54",
  margin: "0.8rem 0 0",
  paddingLeft: "1.2rem",
};

const nextSectionStyle = {
  marginTop: "clamp(2rem, 1.4rem + 2.5vw, 3.25rem)",
  padding: "1.2rem 0 0",
  borderTop: "1px solid #D9D0BD",
};

const nextCtaStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.65rem",
  marginTop: "0.9rem",
};

const nextNoteStyle = {
  color: "#4A4D54",
  fontSize: "0.92rem",
  marginTop: "1rem",
  maxWidth: "42rem",
};

const heroCtas = [
  { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo", primary: true },
  { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
  { label: { ja: "中心概念を見る", en: "View Concepts" }, href: "/concepts" },
];

const nextCtas = [
  ...heroCtas,
  { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
];

const painPoints = [
  {
    title: {
      ja: "AI判断が承認なしに実行へ近づく",
      en: "AI decisions move toward execution without clear authority",
    },
    body: {
      ja: "AIエージェントが業務アクションを実行する前に、誰が許可したかが曖昧になる。",
      en: "Before an AI agent acts, it becomes unclear who authorized the action.",
    },
  },
  {
    title: {
      ja: "証跡と責任境界が分散する",
      en: "Evidence and responsibility become scattered",
    },
    body: {
      ja: "判断理由、承認、ポリシー、ログが別々の場所に残り、後から説明しづらくなる。",
      en: "Rationale, approvals, policy, and logs sit in separate systems, making review difficult.",
    },
  },
  {
    title: {
      ja: "事後ログだけでは実行前に止められない",
      en: "Logs do not create a pre-execution boundary",
    },
    body: {
      ja: "ログは「何が起きたか」を残すが、「なぜ実行してよかったか」を事前に保証しない。",
      en: "Logs show what happened after the fact. They do not prove why execution was allowed beforehand.",
    },
  },
];

const existingLimits = [
  {
    title: {
      ja: "ログは事後記録であり、実行許可の根拠ではない",
      en: "Logs are after-the-fact records, not proof of authorization",
    },
    body: {
      ja: "ログは後から確認できても、実行前に許可条件を満たした証明にはならない。",
      en: "They show what happened, but not why execution was allowed beforehand.",
    },
  },
  {
    title: {
      ja: "ガードレールは出力制御であり、組織承認の証跡ではない",
      en: "Guardrails control outputs, not organizational authority",
    },
    body: {
      ja: "危険な出力を減らせても、誰が何を許可したかは残らない。",
      en: "They reduce unsafe responses but do not prove who authorized the action.",
    },
  },
  {
    title: {
      ja: "人間承認だけでは監査に弱い",
      en: "Human approval alone is weak without evidence",
    },
    body: {
      ja: "承認があっても、どの証跡と権限に基づいて許可したかが残らなければ説明できない。",
      en: "Approval must be tied to authority, policy, and evidence to be audit-ready.",
    },
  },
];

const valueCards = [
  {
    label: "Pre-execution governance",
    title: {
      ja: "AI判断を実行前にガバナンス境界へ通す。",
      en: "Routes AI decisions through a governance boundary before execution.",
    },
    body: {
      ja: "AIが企業を結果に拘束する前に、許可・保留・レビュー・ブロックを判定する。",
      en: "VERITAS determines whether to allow, hold, review, or block before the enterprise is bound to a consequence.",
    },
  },
  {
    label: "Authority evidence",
    title: {
      ja: "なぜその行為が許可可能かを証拠化する。",
      en: "Captures why the action was allowed.",
    },
    body: {
      ja: "権限、承認、ポリシー、判断根拠を後から確認できる形で残す。",
      en: "Authority, approval, policy, and rationale remain reviewable after the decision.",
    },
  },
  {
    label: "Bind boundary control",
    title: {
      ja: "承認と現実世界へのcommitを分離する。",
      en: "Separates approval from real-world commitment.",
    },
    body: {
      ja: "不十分・不正・危険な経路は fail-closed で止める。",
      en: "Insufficient, invalid, or risky paths can fail closed before execution.",
    },
  },
];

const applications = [
  { ja: "AML/KYC判断", en: "AML/KYC decisions" },
  { ja: "規制対象アクションのエスカレーション", en: "Escalation of regulated actions" },
  { ja: "ポリシー変更や設定変更", en: "Policy or configuration changes" },
  { ja: "監査・レビュー・証跡提出が必要なワークフロー", en: "Workflows requiring review, audit, or evidence submission" },
];

const nonClaims = [
  { ja: "法的助言ではない", en: "It is not legal advice" },
  { ja: "規制当局の承認ではない", en: "It is not regulatory approval" },
  { ja: "第三者認証の代替ではない", en: "It is not a substitute for third-party certification" },
  { ja: "すべてのリスクを自動で消すものではない", en: "It does not automatically eliminate all risk" },
  {
    ja: "これ単体で特定企業の本番利用可能性を証明するものではない",
    en: "It does not by itself prove production readiness for a specific enterprise",
  },
  {
    ja: "本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である",
    en: "Production use requires environment-specific integration, security, operations, legal, and audit review",
  },
];

const resolveText = (value, lang) => (lang === "ja" ? value.ja : value.en);

export default function EnterprisePage() {
  return (
    <PageShell
      label={{ ja: "企業課題", en: "ENTERPRISE" }}
      pageTitle={{ ja: "企業課題", en: "Enterprise" }}
      title={{
        ja: "AIエージェント導入で企業が直面する本当の課題",
        en: "The real enterprise problem behind AI agent adoption",
      }}
      subtitle={{
        ja: "モデルの性能より先に問われるのは、誰が・何を根拠に・どこまで許可したかを、実行前に証明できるかです。",
        en: "Before model performance becomes the issue, enterprises need to prove who authorized what, on what basis, and how far the AI was allowed to act before execution.",
      }}
    >
      {(t, lang) => (
        <>
          <div style={heroCtaStyle} aria-label={t("主要リンク", "Primary links")}>
            {heroCtas.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                style={cta.primary ? primaryCtaStyle : secondaryCtaStyle}
              >
                {resolveText(cta.label, lang)}
              </a>
            ))}
          </div>

          <section style={sectionStyle}>
            <p style={introStyle}>01 / Pain</p>
            <h2 style={headingStyle}>{t("企業が抱える痛み", "The pain companies face")}</h2>
            <div style={painGridStyle}>
              {painPoints.map((item) => (
                <article key={item.title.en} style={painCardStyle}>
                  <h3 style={cardTitleStyle}>{resolveText(item.title, lang)}</h3>
                  <p style={cardBodyStyle}>{resolveText(item.body, lang)}</p>
                </article>
              ))}
            </div>
          </section>

          <section style={sectionStyle}>
            <p style={introStyle}>02 / Existing controls</p>
            <h2 style={headingStyle}>{t("なぜ既存対策だけでは足りないか", "Why existing controls are not enough")}</h2>
            <p style={sectionLeadStyle}>
              {t(
                "ログ、ガードレール、人間承認は必要です。しかし、それだけでは実行前の許可境界を証明しきれません。",
                "Logs, guardrails, and human approval are necessary. By themselves, they do not prove the pre-execution authorization boundary.",
              )}
            </p>
            <ol style={limitListStyle}>
              {existingLimits.map((item, index) => (
                <li key={item.title.en} style={limitItemStyle}>
                  <span style={numberStyle}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 style={cardTitleStyle}>{resolveText(item.title, lang)}</h3>
                    <p style={cardBodyStyle}>{resolveText(item.body, lang)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section style={sectionStyle}>
            <p style={introStyle}>03 / VERITAS OS</p>
            <h2 style={headingStyle}>{t("VERITAS OSが加えるもの", "What VERITAS OS adds")}</h2>
            <div style={valueGridStyle}>
              {valueCards.map((item) => (
                <article key={item.label} style={valueCardStyle}>
                  <p style={eyebrowStyle}>{item.label}</p>
                  <h3 style={cardTitleStyle}>{resolveText(item.title, lang)}</h3>
                  <p style={cardBodyStyle}>{resolveText(item.body, lang)}</p>
                </article>
              ))}
            </div>
          </section>

          <section style={sectionStyle}>
            <p style={introStyle}>04 / Where it matters</p>
            <h2 style={headingStyle}>{t("どこで効くか", "Where this matters")}</h2>
            <ul style={applicationListStyle}>
              {applications.map((item) => (
                <li key={item.en} style={applicationItemStyle}>{resolveText(item, lang)}</li>
              ))}
            </ul>
            <details style={disclosureStyle}>
              <summary style={summaryStyle}>{t("VERITAS OSが主張しないこと", "What VERITAS OS does not claim")}</summary>
              <ul style={disclosureListStyle}>
                {nonClaims.map((item) => (
                  <li key={item.en}>{resolveText(item, lang)}</li>
                ))}
              </ul>
            </details>
          </section>

          <section style={nextSectionStyle}>
            <p style={introStyle}>05 / Next</p>
            <h2 style={headingStyle}>{t("次に見るべきもの", "Recommended next steps")}</h2>
            <div style={nextCtaStyle}>
              {nextCtas.map((cta) => (
                <a
                  key={cta.href}
                  href={cta.href}
                  style={cta.primary ? primaryCtaStyle : secondaryCtaStyle}
                >
                  {resolveText(cta.label, lang)}
                </a>
              ))}
            </div>
            <p style={nextNoteStyle}>
              {t(
                "本サイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。",
                "Public website claims should be validated against the evidence in the veritas_os repository.",
              )}
            </p>
          </section>
        </>
      )}
    </PageShell>
  );
}
