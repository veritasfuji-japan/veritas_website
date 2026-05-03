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

const faqItemStyle = {
  padding: "0.9rem 0",
  borderTop: "1px solid #e5e0d2",
};

const firstFaqItemStyle = {
  ...faqItemStyle,
  borderTop: "none",
};

const questionStyle = {
  margin: 0,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  color: "#15161A",
};

const answerStyle = {
  marginTop: "0.35rem",
};

const renderFaqItems = (items, lang) => items.map((item, index) => (
  <div key={item.question.en} style={index === 0 ? firstFaqItemStyle : faqItemStyle}>
    <h3 style={questionStyle}>{item.question[lang]}</h3>
    <p style={answerStyle}>{item.answer[lang]}</p>
  </div>
));

export default function FaqPage() {
  const sections = [
    {
      heading: { ja: "基本", en: "Basics" },
      items: [
        { question: { ja: "VERITAS OSはAIモデルですか？", en: "Is VERITAS OS an AI model?" }, answer: { ja: "いいえ。VERITAS OSは回答を生成するAIモデルそのものではありません。AIエージェントの判断が現実世界へ実行commitされる前に、証跡、権限、ポリシー、失敗理由を確認するガバナンス層です。", en: "No. VERITAS OS is not the AI model that generates answers. It is a governance layer that checks evidence, authority, policy, and failure reasons before AI-agent decisions are committed to the real world." } },
        { question: { ja: "VERITAS OSは何を解決しますか？", en: "What problem does VERITAS OS solve?" }, answer: { ja: "AIエージェントが判断から実行へ近づくと、企業には「誰が、何を根拠に、どこまで許可したか」を実行前に確認できる境界が必要になります。VERITAS OSは、その境界を証跡・ゲート・記録・bind boundaryとして扱います。", en: "As AI agents move closer to execution, enterprises need a boundary that can prove who authorized what, based on which evidence, before action. VERITAS OS treats that boundary through evidence, gates, records, and bind boundary control." } },
        { question: { ja: "既存のAIガードレールと何が違いますか？", en: "How is this different from ordinary AI guardrails?" }, answer: { ja: "一般的なガードレールは危険な出力を減らすことに重点を置きます。VERITAS OSは、出力後の実行前段階で、証跡、権限、ポリシー、承認範囲、failure reasonを確認し、allow / hold / review / block に分岐させる点に重点があります。", en: "Ordinary guardrails often focus on reducing unsafe outputs. VERITAS OS focuses on the pre-execution stage after a decision is produced, checking evidence, authority, policy, authorization scope, and failure reasons before routing the outcome to allow, hold, review, or block." } },
        { question: { ja: "ログや説明可能性だけではなぜ足りないのですか？", en: "Why are logs and explainability not enough?" }, answer: { ja: "ログは「何が起きたか」を残しますが、「なぜ実行してよかったか」までは十分に示せないことがあります。説明可能性は判断理由を補助しますが、実行許可そのものではありません。企業には、判断と実行commitの間に検証可能な境界が必要です。", en: "Logs record what happened, but they may not prove why execution was authorized. Explainability helps interpret a decision, but it is not execution permission. Enterprises need a verifiable boundary between decision approval and execution commitment." } },
      ],
    },
    {
      heading: { ja: "技術構造", en: "Technical structure" },
      items: [
        { question: { ja: "FUJI gateとは何ですか？", en: "What is FUJI gate?" }, answer: { ja: "FUJI gateは、不十分、不正、危険、または証跡不足の判断経路をfail-closedで止めるためのゲートです。実行前に、進めてよいか、保留すべきか、レビューすべきか、ブロックすべきかを判断する役割を持ちます。", en: "FUJI gate is a gate for stopping insufficient, invalid, unsafe, or under-evidenced decision paths through fail-closed behavior. It helps determine whether to proceed, hold, review, or block before execution." } },
        { question: { ja: "TrustLogとは何ですか？", en: "What is TrustLog?" }, answer: { ja: "TrustLogは、意思決定、証跡、ゲート結果、failure reasonを後から確認できるようにする記録層です。「何が起きたか」だけでなく、「なぜallow / hold / review / blockになったのか」を確認しやすくします。", en: "TrustLog is a recording layer for decisions, evidence, gate results, and failure reasons. It helps reviewers inspect not only what happened, but why an outcome became allow, hold, review, or block." } },
        { question: { ja: "bind boundaryとは何ですか？", en: "What is bind boundary?" }, answer: { ja: "bind boundaryは、承認された判断と現実世界への実行commitを分離する境界です。VERITAS OSの中心概念である「approval is not commitment」を、実行前の制御境界として扱います。", en: "Bind boundary is the boundary separating approved decision from real-world execution commitment. It operationalizes the core VERITAS OS idea that approval is not commitment." } },
        { question: { ja: "allow / hold / review / block は何を意味しますか？", en: "What do allow / hold / review / block mean?" }, answer: { ja: "allowは条件を満たして次に進める判断、holdは情報や証跡不足による一時停止、reviewは人間または外部レビュアーの確認が必要な状態、blockは条件・証跡・ポリシー・権限・安全性の観点から進めるべきではない判断です。", en: "Allow means conditions are satisfied enough to move forward. Hold means the process pauses because evidence or information is incomplete. Review means human or external review is needed. Block means the action should not proceed because conditions, evidence, policy, authority, or safety requirements are not satisfied." } },
      ],
    },
    {
      heading: { ja: "評価・PoC", en: "Evaluation and PoC" },
      items: [
        { question: { ja: "企業はどう評価すればいいですか？", en: "How should a company evaluate VERITAS OS?" }, answer: { ja: "まず企業課題ページで自社の痛みに近い領域を確認し、仕組みページで制御フローを理解し、AML/KYC PoCページで評価経路を確認してください。具体的には、policy fixture、evidence fixture、期待されるallow / hold / review / block結果、failure reasonを比較します。", en: "Start with the Enterprise page to map the pain, then use How it works to understand the control flow, and review the AML/KYC PoC page for an evaluation path. In practice, compare policy fixtures, evidence fixtures, expected allow / hold / review / block outcomes, and failure reasons." } },
        { question: { ja: "AML/KYC以外にも使えますか？", en: "Can it apply beyond AML/KYC?" }, answer: { ja: "可能性はあります。VERITAS OSの考え方は、規制対象アクション、ポリシー変更、AIエージェントによる高リスクな実行判断、監査・レビュー・証跡提出が必要なワークフローに適用可能です。ただし、具体的な本番利用には環境固有の検証が必要です。", en: "Potentially, yes. The VERITAS OS approach can apply to regulated action escalation, policy changes, high-risk execution decisions by AI agents, and workflows requiring audit, review, or evidence handoff. Specific production use still requires environment-specific evaluation." } },
        { question: { ja: "本番利用できますか？", en: "Is it production-ready?" }, answer: { ja: "このWebサイトだけで、特定企業における本番利用可能性を証明するものではありません。本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要です。現時点では、評価・PoC・外部レビューの文脈で確認するのが適切です。", en: "This website does not prove production readiness for a specific organization. Production use requires environment-specific integration, security, operations, legal, and audit review. The appropriate framing is evaluation, PoC, and external review." } },
        { question: { ja: "初回相談で何を送るべきですか？", en: "What should I send in the first inquiry?" }, answer: { ja: "所属、関心領域、確認したい内容、想定している評価シナリオを簡潔に送ってください。機密情報、個人情報、顧客データ、規制対象データは初回メールに含めないでください。", en: "Briefly include your affiliation, area of interest, what you want to evaluate, and the scenario you have in mind. Do not include confidential information, personal data, customer data, or regulated data in the first message." } },
      ],
    },
    {
      heading: { ja: "主張しないこと", en: "Non-claims" },
      items: [
        { question: { ja: "VERITAS OSは法的助言ですか？", en: "Is VERITAS OS legal advice?" }, answer: { ja: "いいえ。VERITAS OSおよびこのWebサイトは法的助言ではありません。法務・規制・監査上の判断は、各組織の専門家による確認が必要です。", en: "No. VERITAS OS and this website are not legal advice. Legal, regulatory, and audit decisions require review by qualified professionals within each organization." } },
        { question: { ja: "規制当局の承認や第三者認証を意味しますか？", en: "Does this mean regulatory approval or third-party certification?" }, answer: { ja: "いいえ。VERITAS OSは、規制当局の承認や第三者認証を主張するものではありません。公開主張は、veritas_osリポジトリ上の証跡と照合して確認する必要があります。", en: "No. VERITAS OS does not claim regulatory approval or third-party certification. Public claims should be validated against evidence in the veritas_os repository." } },
        { question: { ja: "すべてのAIリスクを自動で消せますか？", en: "Does it automatically remove all AI risk?" }, answer: { ja: "いいえ。VERITAS OSは、AI判断を実行前に検証しやすくするためのガバナンス層です。すべてのリスクを自動で消すものではなく、環境固有のセキュリティ、運用、法務、監査体制が必要です。", en: "No. VERITAS OS is a governance layer for making AI decisions more reviewable before execution. It does not automatically remove all risk, and it still requires environment-specific security, operations, legal, and audit controls." } },
      ],
    },
  ];

  return (
    <PageShell
      label={{ ja: "よくある質問", en: "FAQ" }}
      pageTitle={{ ja: "VERITAS OS よくある質問", en: "VERITAS OS FAQ" }}
      title={{ ja: "VERITAS OS よくある質問", en: "VERITAS OS FAQ" }}
      subtitle={{ ja: "VERITAS OSについて企業担当者、技術評価者、外部レビュアーが持ちやすい疑問に、過剰な主張を避けながら簡潔に答えます。", en: "Concise answers to common questions from enterprise visitors, technical evaluators, and external reviewers, without making unsupported claims." }}
      ctas={[
        { label: { ja: "企業課題を見る", en: "Read enterprise pain" }, href: "/enterprise" },
        { label: { ja: "仕組みを見る", en: "See how it works" }, href: "/how-it-works" },
        { label: { ja: "用語集を見る", en: "Open glossary" }, href: "/glossary" },
        { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
      ]}
    >
      {(_, lang) => (
        <>
          {sections.map((section) => (
            <section key={section.heading.en} style={sectionStyle}>
              <h2 style={headingStyle}>{section.heading[lang]}</h2>
              {renderFaqItems(section.items, lang)}
            </section>
          ))}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "次に読むページ" : "Recommended next pages"}</h2>
            <ul>
              <li>{lang === "ja" ? "企業課題：企業がなぜこの制御層を必要とするかを理解する。" : "Enterprise: understand why companies need this control layer."}</li>
              <li>{lang === "ja" ? "仕組み：AI判断から実行前統制までの流れを見る。" : "How it works: review the flow from AI decision to pre-execution control."}</li>
              <li>{lang === "ja" ? "用語集：authority evidence、FUJI gate、TrustLog、bind boundary などの用語を確認する。" : "Glossary: review terms such as authority evidence, FUJI gate, TrustLog, and bind boundary."}</li>
              <li>{lang === "ja" ? "AML/KYC PoC：評価経路と証跡確認の流れを見る。" : "AML/KYC PoC: review the evaluation path and evidence inspection flow."}</li>
              <li>{lang === "ja" ? "お問い合わせ：具体的な検証相談を送る。" : "Contact: send a concrete evaluation inquiry."}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
