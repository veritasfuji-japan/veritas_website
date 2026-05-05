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

const pipelineStyle = {
  display: "grid",
  gap: "0.75rem",
  marginTop: "0.75rem",
};

const pipelineStepStyle = {
  padding: "0.85rem",
  border: "1px solid #e5e0d2",
  borderRadius: "8px",
  background: "#fffaf0",
};

const stepLabelStyle = {
  margin: 0,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  color: "#0b3d5b",
};

export default function HowItWorksPage() {
  const steps = {
    ja: [
      ["AI agent decision", "AIエージェントが、業務上の判断や次のアクション候補を生成する。"],
      ["Policy / evidence check", "判断に必要なpolicy、authority evidence、入力、証跡が揃っているかを確認する。"],
      ["FUJI gate", "不十分、不正、危険、または証跡不足の経路を fail-closed で止める。"],
      ["TrustLog", "判断、証跡、ゲート結果、失敗理由を後から確認できるように記録する。"],
      ["Bind boundary", "承認された判断と、現実世界への実行commitを分離し、実行可能な範囲を確認する。"],
      ["Outcome", "結果は allow / hold / review / block のいずれかとして扱われる。"],
    ],
    en: [
      ["AI agent decision", "An AI agent produces a business decision or proposed next action."],
      ["Policy / evidence check", "The system checks whether required policy, authority evidence, input, and supporting evidence are present."],
      ["FUJI gate", "Insufficient, invalid, unsafe, or under-evidenced paths are stopped through fail-closed behavior."],
      ["TrustLog", "The decision, evidence, gate result, and failure reason are recorded for later review."],
      ["Bind boundary", "The bind boundary separates approved decision from real-world commitment and checks the admissible execution scope."],
      ["Outcome", "The result is handled as allow, hold, review, or block."],
    ],
  };

  return (
    <PageShell
      label={{ ja: "仕組み", en: "HOW IT WORKS" }}
      pageTitle={{ ja: "VERITAS OS の仕組み", en: "How VERITAS OS works" }}
      title={{ ja: "VERITAS OS の仕組み", en: "How VERITAS OS works" }}
      subtitle={{
        ja: "VERITAS OS はAIモデルではありません。AIエージェントの判断が現実世界へ実行commitされる前に、証跡、権限、ポリシー、失敗理由を確認するガバナンス層です。",
        en: "VERITAS OS is not an AI model. It is a governance layer that checks evidence, authority, policy, and failure reasons before AI-agent decisions are committed to the real world.",
      }}
      ctas={[
        { label: { ja: "企業課題を見る", en: "Read enterprise pain" }, href: "/enterprise" },
        { label: { ja: "用語集を見る", en: "Open glossary" }, href: "/glossary" },
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
        { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
      ]}
    >
      {(t, lang) => (
        <>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("AIモデルではなく、実行前の制御層", "Not an AI model, but a pre-execution control layer")}</h2>
            <ul>
              <li>{t("VERITAS OS は、回答を生成するAIモデルそのものではない。", "VERITAS OS is not the AI model that generates answers.")}</li>
              <li>{t("AIエージェントの判断が外部システムや業務処理へ進む前に、統制境界を置く。", "It places a governance boundary before AI-agent decisions reach external systems or business processes.")}</li>
              <li>{t("判断理由だけでなく、authority evidence、policy、failure reason、bind boundary を確認する。", "It checks not only rationale, but also authority evidence, policy, failure reasons, and bind boundary conditions.")}</li>
              <li>{t("目的は、AI判断をそのまま実行へ接続するのではなく、検証可能な形で allow / hold / review / block へ分岐させること。", "The goal is to route decisions into allow / hold / review / block outcomes instead of connecting AI judgment directly to execution.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("基本的な制御フロー", "Basic control flow")}</h2>
            <div style={pipelineStyle}>
              {steps[lang].map(([label, body], index) => (
                <article key={label} style={pipelineStepStyle}>
                  <p style={stepLabelStyle}>Step {index + 1}: {label}</p>
                  <p style={{ margin: "0.45rem 0 0" }}>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("各レイヤーの役割", "What each layer does")}</h2>
            <ul>
              <li>{t("Policy：何を許可し、何を止めるべきかの基準。", "Policy: the criteria for what should be allowed or stopped.")}</li>
              <li>{t("Authority evidence：なぜその行為が許可可能なのかを示す根拠。", "Authority evidence: evidence explaining why an action may be authorized.")}</li>
              <li>{t("FUJI gate：不足、不正、危険、証跡不足を fail-closed で止める判断点。", "FUJI gate: the decision point that fails closed on insufficient, invalid, unsafe, or under-evidenced paths.")}</li>
              <li>{t("TrustLog：判断と証跡を後から確認できるようにする記録層。", "TrustLog: the recording layer for later review of decisions and evidence.")}</li>
              <li>{t("Bind boundary：判断承認と実行commitを分離する境界。", "Bind boundary: the boundary separating decision approval from execution commitment.")}</li>
              <li>{t("Outcome：allow / hold / review / block として次の扱いを決める結果。", "Outcome: the result that determines whether the action is allowed, held, reviewed, or blocked.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("判断結果の種類", "Decision outcomes")}</h2>
            <ul>
              <li>{t("Allow / Proceed：必要条件を満たし、次へ進める判断。", "Allow / Proceed: required conditions are satisfied enough to move forward.")}</li>
              <li>{t("Hold：証跡や情報が不足しているため、一時的に止める判断。", "Hold: the process pauses because evidence or information is incomplete.")}</li>
              <li>{t("Review：人間または外部レビュアーの確認が必要な判断。", "Review: human or external review is required before moving forward.")}</li>
              <li>{t("Block：条件、証跡、ポリシー、権限、安全性の観点から進めるべきではない判断。", "Block: the action should not proceed because conditions, evidence, policy, authority, or safety requirements are not satisfied.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("既存システムとの接続イメージ", "How it connects to existing systems")}</h2>
            <ul>
              <li>{t("VERITAS OS は、既存のAIエージェント、業務ツール、ポリシー、監査ログを置き換える前提ではない。", "VERITAS OS does not assume replacement of existing AI agents, business tools, policies, or audit logs.")}</li>
              <li>{t("実行前の判断経路に、証跡確認と境界判定の層を追加する考え方である。", "It adds an evidence-aware boundary check to the decision path before execution.")}</li>
              <li>{t("PoCでは、fixture化されたpolicyとevidenceを使い、想定結果と実際の判断を比較できる。", "In a PoC, fixture-based policy and evidence can be used to compare expected outcomes against actual decisions.")}</li>
              <li>{t("本番利用には、環境ごとの統合、セキュリティ、運用、法務・監査レビューが必要である。", "Production use requires environment-specific integration, security, operations, legal, and audit review.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("Webサイトの技術とVERITAS OSの技術的位置づけ", "Website tech stack vs VERITAS OS technical positioning")}</h2>
            <p style={{ marginBottom: "0.35rem" }}><strong>{t("このWebサイト:", "This website:")}</strong></p>
            <ul>
              <li>Vite</li>
              <li>React</li>
              <li>{t("Vercel上の静的デプロイ", "Static deployment on Vercel")}</li>
            </ul>
            <p style={{ margin: "0.7rem 0 0.35rem" }}><strong>VERITAS OS positioning:</strong></p>
            <ul>
              <li>Decision governance layer</li>
              <li>Evidence-aware control path</li>
              <li>Fail-closed gate behavior</li>
              <li>Audit and review trace surface</li>
              <li>Bind-boundary control before commit</li>
            </ul>
            <p style={{ marginTop: "0.7rem" }}>{t("Vite / React / Vercel はこの公開Webサイトの実装要素であり、VERITAS OS の中核ガバナンス技術そのものを示すものではない。", "Vite / React / Vercel describe the website implementation, not the core governance technology positioning of VERITAS OS.")}</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("このページが主張しないこと", "What this page does not claim")}</h2>
            <ul>
              <li>{t("法的助言ではない。", "It is not legal advice.")}</li>
              <li>{t("規制当局の承認を意味しない。", "It does not mean regulatory approval.")}</li>
              <li>{t("第三者認証を意味しない。", "It does not mean third-party certification.")}</li>
              <li>{t("すべてのリスクを自動で消すものではない。", "It does not automatically remove all risk.")}</li>
              <li>{t("特定企業での本番利用可能性を単独で証明するものではない。", "It does not independently prove production readiness for a specific organization.")}</li>
              <li>{t("本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である。", "Production use requires environment-specific integration, security, operations, legal, and audit review.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("次に読むページ", "Recommended next pages")}</h2>
            <ul>
              <li>{t("企業課題：企業がなぜこの制御層を必要とするかを理解する。", "Enterprise: understand why companies need this control layer.")}</li>
              <li>{t("用語集：authority evidence、FUJI gate、TrustLog、bind boundary などの用語を確認する。", "Glossary: review terms such as authority evidence, FUJI gate, TrustLog, and bind boundary.")}</li>
              <li>{t("AML/KYC PoC：評価経路と証跡確認の流れを見る。", "AML/KYC PoC: review the evaluation path and evidence inspection flow.")}</li>
              <li>{t("レビュアー：外部評価の観点を確認する。", "Reviewers: inspect external review criteria.")}</li>
              <li>{t("お問い合わせ：具体的な検証相談を送る。", "Contact: send a concrete evaluation inquiry.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
