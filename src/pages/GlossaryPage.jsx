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

const termStyle = {
  padding: "0.85rem 0",
  borderTop: "1px solid #e5e0d2",
};

const firstTermStyle = {
  ...termStyle,
  borderTop: "none",
};

const termNameStyle = {
  margin: 0,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  color: "#15161A",
};

const termBodyStyle = {
  marginTop: "0.35rem",
};

const renderTerms = (terms, lang) => terms.map((term, index) => (
  <div key={term.name.en} style={index === 0 ? firstTermStyle : termStyle}>
    <h3 style={termNameStyle}>{term.name[lang]}</h3>
    <p style={termBodyStyle}>{term.definition[lang]}</p>
  </div>
));

export default function GlossaryPage() {
  const coreGovernanceTerms = [
    {
      name: { ja: "Approval is not commitment", en: "Approval is not commitment" },
      definition: {
        ja: "承認された判断と、現実世界への実行commitは同じではない、というVERITAS OSの中心概念。人間やAIが「よい」と判断しても、それだけでは外部システムへの実行を許可したことにはならない。",
        en: "The core VERITAS OS idea that approval of a decision is not the same as committing that decision to the real world. A human or AI may approve a decision, but that does not automatically authorize execution against external systems.",
      },
    },
    {
      name: { ja: "Bind boundary", en: "Bind boundary" },
      definition: {
        ja: "判断や承認が、現実世界への実行commitへ進む前に通過する境界。ここで証跡、権限、ポリシー、失敗理由を確認し、許可できない場合は実行を止める。",
        en: "The boundary a decision crosses before it becomes real-world execution. It checks evidence, authority, policy, and failure reasons, and prevents execution when the action should not proceed.",
      },
    },
    {
      name: { ja: "Commit", en: "Commit" },
      definition: {
        ja: "AIエージェントの判断が、外部システム、業務処理、規制対象アクションなど、現実世界の結果に接続される段階。VERITASでは、commit前の統制を重視する。",
        en: "The stage where an AI-agent decision connects to an external system, business process, regulated action, or other real-world consequence. VERITAS focuses on control before commit.",
      },
    },
    {
      name: { ja: "Fail-closed", en: "Fail-closed" },
      definition: {
        ja: "証跡、権限、ポリシー、入力が不十分または不正な場合に、黙って実行へ進まず、安全側に倒して止める設計。企業利用では、曖昧なまま進めないことが重要になる。",
        en: "A design principle where insufficient, invalid, or unsafe evidence, authority, policy, or input does not silently proceed. The system defaults to stopping rather than allowing ambiguous execution.",
      },
    },
  ];

  const evidenceAuditTerms = [
    {
      name: { ja: "Authority evidence", en: "Authority evidence" },
      definition: {
        ja: "ある行為がなぜ許可可能なのかを示す根拠情報。単なるログではなく、実行前に「誰が、何を根拠に、どこまで許可したか」を確認するための材料として扱う。",
        en: "Evidence explaining why an action may be authorized. It is not merely a log; it helps determine who authorized what, based on which evidence, and within what scope before execution.",
      },
    },
    {
      name: { ja: "TrustLog", en: "TrustLog" },
      definition: {
        ja: "意思決定、証跡、判断経路を後から確認できるようにする記録層。何が起きたかだけでなく、なぜ allow / hold / review / block になったのかを追跡するために使う。",
        en: "A recording layer for decisions, evidence, and decision paths. It supports later review of not only what happened, but why an outcome became allow, hold, review, or block.",
      },
    },
    {
      name: { ja: "Audit evidence", en: "Audit evidence" },
      definition: {
        ja: "監査者やレビュアーが、判断の根拠、承認範囲、失敗理由、実行境界を確認するための証跡。VERITASでは、公開主張もリポジトリ上の証跡と整合している必要がある。",
        en: "Evidence used by auditors or reviewers to inspect decision rationale, authorization scope, failure reasons, and execution boundaries. In VERITAS, public claims should remain aligned with repository evidence.",
      },
    },
    {
      name: { ja: "Replay / trace", en: "Replay / trace" },
      definition: {
        ja: "過去の判断やテストシナリオをたどり、同じ入力・証跡・ポリシーに対してどのような判断が出たかを確認する考え方。評価や監査で重要になる。",
        en: "The ability to follow a previous decision or test scenario and inspect what outcome was produced for a given input, evidence set, and policy. This matters for evaluation and audit.",
      },
    },
  ];

  const decisionPipelineTerms = [
    {
      name: { ja: "Decision pipeline", en: "Decision pipeline" },
      definition: {
        ja: "AIエージェントの判断を、入力、ポリシー、証跡、ゲート、記録、実行境界へ順に通す流れ。VERITASでは、判断がそのまま実行に直結しないようにする。",
        en: "The flow that routes an AI-agent decision through input, policy, evidence, gates, records, and execution boundaries. In VERITAS, decisions should not directly become execution.",
      },
    },
    {
      name: { ja: "FUJI gate", en: "FUJI gate" },
      definition: {
        ja: "不十分、不正、危険、または証跡不足の判断経路を fail-closed で止めるためのゲート。実行前に、進めてよいか、保留すべきか、レビューすべきか、ブロックすべきかを判断する。",
        en: "A gate for stopping insufficient, invalid, unsafe, or under-evidenced decision paths through fail-closed behavior. It helps determine whether to proceed, hold, review, or block before execution.",
      },
    },
    {
      name: { ja: "Allow / Proceed", en: "Allow / Proceed" },
      definition: {
        ja: "必要な証跡と条件が満たされ、次の段階へ進める判断。ただし、allow は常に無制限の実行許可を意味するわけではなく、境界と条件の範囲内で扱う。",
        en: "An outcome where required evidence and conditions are satisfied enough to move forward. It does not always mean unlimited execution permission; it should be understood within defined boundaries and conditions.",
      },
    },
    {
      name: { ja: "Hold", en: "Hold" },
      definition: {
        ja: "情報や証跡が不足しているため、一時的に進行を止める判断。追加確認や補足証跡が必要な状態。",
        en: "An outcome where the process pauses because information or evidence is incomplete. Additional review or supporting evidence is needed.",
      },
    },
    {
      name: { ja: "Review", en: "Review" },
      definition: {
        ja: "自動で進めるには不確実性やリスクがあり、人間または外部レビュアーの確認が必要な判断。",
        en: "An outcome where uncertainty or risk is high enough that human or external review is required before moving forward.",
      },
    },
    {
      name: { ja: "Block", en: "Block" },
      definition: {
        ja: "条件、証跡、ポリシー、権限などの観点から、実行へ進めるべきではないと判断して止めること。",
        en: "An outcome where the action should not proceed because conditions, evidence, policy, authority, or safety requirements are not satisfied.",
      },
    },
  ];

  const pocFixtureTerms = [
    {
      name: { ja: "Policy fixture", en: "Policy fixture" },
      definition: {
        ja: "PoCやテストで使う、想定ポリシーを表す固定データ。判断がどのルールに照らして評価されるかを確認するために使う。",
        en: "Fixed test data representing the expected policy in a PoC or test. It helps evaluate which rule a decision is checked against.",
      },
    },
    {
      name: { ja: "Evidence fixture", en: "Evidence fixture" },
      definition: {
        ja: "PoCやテストで使う、想定証跡を表す固定データ。証跡が十分な場合、不十分な場合、不正な場合にどう判断されるかを確認するために使う。",
        en: "Fixed test data representing expected evidence in a PoC or test. It helps evaluate what happens when evidence is sufficient, insufficient, or invalid.",
      },
    },
    {
      name: { ja: "Failure reason", en: "Failure reason" },
      definition: {
        ja: "hold / review / block になった理由。企業やレビュアーが「なぜ止まったのか」を理解するために重要な情報。",
        en: "The reason an outcome became hold, review, or block. It helps enterprises and reviewers understand why the process stopped or escalated.",
      },
    },
  ];

  return (
    <PageShell
      label={{ ja: "用語集", en: "GLOSSARY" }}
      pageTitle={{ ja: "VERITAS OS 用語集", en: "VERITAS OS Glossary" }}
      title={{ ja: "VERITAS OS 用語集", en: "VERITAS OS Glossary" }}
      subtitle={{ ja: "VERITAS OSで使われるガバナンス、証跡、実行境界に関する言葉を、企業担当者と技術評価者向けに整理します。", en: "Plain-language explanations of VERITAS OS terms related to governance, evidence, and execution boundaries for enterprise and technical evaluators." }}
      ctas={[
        { label: { ja: "企業課題を見る", en: "Read enterprise pain" }, href: "/enterprise" },
        { label: { ja: "中心概念を見る", en: "Read the core concept" }, href: "/concepts" },
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
        { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
      ]}
    >
      {(_, lang) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "中核となるガバナンス用語" : "Core governance terms"}</h2>
            {renderTerms(coreGovernanceTerms, lang)}
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "証跡・監査に関する用語" : "Evidence and audit terms"}</h2>
            {renderTerms(evidenceAuditTerms, lang)}
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "判断・パイプラインに関する用語" : "Decision and pipeline terms"}</h2>
            {renderTerms(decisionPipelineTerms, lang)}
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "PoC・fixtureに関する用語" : "PoC and fixture terms"}</h2>
            {renderTerms(pocFixtureTerms, lang)}
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "これらの用語が意味しないこと" : "What these terms do not mean"}</h2>
            <ul>
              <li>{lang === "ja" ? "法的助言を意味しない。" : "They do not mean legal advice."}</li>
              <li>{lang === "ja" ? "規制当局の承認を意味しない。" : "They do not mean regulatory approval."}</li>
              <li>{lang === "ja" ? "第三者認証を意味しない。" : "They do not mean third-party certification."}</li>
              <li>{lang === "ja" ? "すべてのリスクを自動で消すことを意味しない。" : "They do not mean all risk is automatically removed."}</li>
              <li>{lang === "ja" ? "特定企業での本番利用可能性を単独で証明するものではない。" : "They do not independently prove production readiness for a specific organization."}</li>
              <li>{lang === "ja" ? "実際の本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である。" : "Production use still requires environment-specific integration, security, operations, legal, and audit review."}</li>
            </ul>
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{lang === "ja" ? "次に読むページ" : "Recommended next pages"}</h2>
            <ul>
              <li>{lang === "ja" ? "企業課題：企業が直面する痛みを理解する。" : "Enterprise: understand the pain companies face."}</li>
              <li>{lang === "ja" ? "中心概念：approval is not commitment を理解する。" : "Concepts: understand approval is not commitment."}</li>
              <li>{lang === "ja" ? "AML/KYC PoC：評価経路を確認する。" : "AML/KYC PoC: review the evaluation path."}</li>
              <li>{lang === "ja" ? "レビュアー：外部評価の観点を確認する。" : "Reviewers: inspect external review criteria."}</li>
              <li>{lang === "ja" ? "お問い合わせ：具体的な検証相談を送る。" : "Contact: send a concrete evaluation inquiry."}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
