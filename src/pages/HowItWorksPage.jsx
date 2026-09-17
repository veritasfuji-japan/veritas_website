import PageShell from "../components/PageShell.jsx";

const heroActions = [
  { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
  { label: { ja: "用語集を見る", en: "Open Glossary" }, href: "/glossary" },
  { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
];

const steps = {
  ja: [
    ["Decision / intent", "判断証跡を検証し、選択したサンドボックス操作を正確なExecution Intentへ決定論的に変換する。"],
    ["Authorization / consumption", "権限・ポリシー・人間承認の根拠を結び、native v2認可を発行。PostgreSQL上で単回消費する。"],
    ["Current rechecks", "実行前に最新の権限・承認・リスク等を再確認し、操作・送信先・資格情報を固定する。"],
    ["Durable dispatch / effect", "送信意図を永続化してから証明書検証付きTLSで送信し、合成イベントをサンドボックスへ保存する。"],
    ["Read-only reconciliation", "結果不明はEFFECT_UNKNOWNとして保持。確認なしに再送せず、独立した読み取り専用経路で保存結果を照合する。"],
    ["BindReceipt / Outcome / recovery", "判断から実行結果までを事後証跡で結び、障害復旧時も外部作用を再送しない。"],
  ],
  en: [
    ["Decision / intent", "Verify decision evidence and deterministically promote the selected sandbox action to an exact Execution Intent."],
    ["Authorization / consumption", "Bind authority, policy, and human approval evidence; issue native v2 authorization and consume it once in PostgreSQL."],
    ["Current rechecks", "Recheck current authority, approval, risk, and other conditions before effect; bind the exact action, endpoint, and credentials."],
    ["Durable dispatch / effect", "Persist dispatch intent before certificate-validated TLS transport stores a synthetic event in the sandbox."],
    ["Read-only reconciliation", "Preserve uncertain results as EFFECT_UNKNOWN. Do not blindly redispatch; independently reconcile persisted state through a read-only path."],
    ["BindReceipt / Outcome / recovery", "Link the decision to the result with retrospective evidence. Crash recovery never resends the external effect."],
  ],
};

const layers = {
  ja: [
    ["Policy", "何を許可し、何を止めるべきかの基準。"],
    ["Authority evidence", "なぜその行為が許可可能なのかを示す根拠。"],
    ["FUJI gate", "不足・不正・危険・証跡不足を fail-closed で止める判断点。"],
    ["TrustLog", "判断と証跡を後から確認できるようにする記録層。"],
    ["Bind boundary", "判断承認と実行commitを分離する境界。"],
    ["Outcome", "統制された実行試行の結果を記録する事後証跡。判断時のallow / hold / review / blockとは別で、実行権限を生まない。"],
  ],
  en: [
    ["Policy", "Criteria for what should be allowed or stopped."],
    ["Authority evidence", "Evidence showing why the action may be authorized."],
    ["FUJI gate", "A fail-closed checkpoint for missing, invalid, risky, or under-evidenced paths."],
    ["TrustLog", "A record layer for reviewing decisions and evidence later."],
    ["Bind boundary", "The boundary that separates decision approval from execution commit."],
    ["Outcome", "Retrospective evidence of a governed execution attempt, separate from allow / hold / review / block decision routing. It creates no execution authority."],
  ],
};

const outcomes = {
  ja: [
    ["Allow / Proceed", "必要条件を満たし、次へ進める判断。ただし無制限の実行許可ではない。"],
    ["Hold", "証跡や情報が不足しているため、一時的に止める判断。"],
    ["Review", "人間または外部レビュアーの確認が必要な判断。"],
    ["Block", "条件、証跡、ポリシー、権限、安全性の観点から進めるべきではない判断。"],
  ],
  en: [
    ["Allow / Proceed", "Required conditions are satisfied enough to move forward. This is not unlimited permission."],
    ["Hold", "The process pauses because evidence or information is incomplete."],
    ["Review", "Human or external review is required before moving forward."],
    ["Block", "The action should not proceed because conditions, evidence, policy, authority, or safety requirements are not satisfied."],
  ],
};

const integrationCards = {
  ja: [
    ["Before execution", "AI判断が外部システムへ進む前に確認する。"],
    ["Evidence-aware", "policy fixture や evidence fixture を使い、想定結果と実際の判断を比較できる。"],
    ["Environment-specific", "本番利用には、環境ごとの統合、セキュリティ、運用、法務・監査レビューが必要。"],
  ],
  en: [
    ["Before execution", "Checks happen before AI decisions move into external systems."],
    ["Evidence-aware", "Policy fixtures and evidence fixtures can compare expected and actual decisions."],
    ["Environment-specific", "Production use requires environment-specific integration, security, operations, legal, and audit review."],
  ],
};

const nextPages = [
  { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
  { label: { ja: "企業課題を見る", en: "View Enterprise Problem" }, href: "/enterprise" },
  { label: { ja: "用語集を見る", en: "Open Glossary" }, href: "/glossary" },
  { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
  { label: { ja: "レビュアーを見る", en: "View Reviewer Entrypoint" }, href: "/reviewers" },
  { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
];

const nonClaims = {
  ja: [
    "法的助言ではない",
    "規制当局の承認を意味しない",
    "第三者認証を意味しない",
    "すべてのリスクを自動で消すものではない",
    "特定企業での本番利用可能性を単独で証明するものではない",
    "本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である",
  ],
  en: [
    "It is not legal advice",
    "It does not mean regulatory approval",
    "It does not mean third-party certification",
    "It does not automatically remove all risk",
    "It does not independently prove production readiness for a specific organization",
    "Production use requires environment-specific integration, security, operations, legal, and audit review",
  ],
};

export default function HowItWorksPage() {
  return (
    <PageShell
      label={{ ja: "仕組み", en: "HOW IT WORKS" }}
      pageTitle={{ ja: "VERITAS OS の仕組み", en: "How VERITAS OS works" }}
      title={{ ja: "VERITAS OS の仕組み", en: "How VERITAS OS works" }}
      subtitle={{
        ja: "VERITAS OS は AIモデルではありません。AIエージェントの判断が現実世界へ実行commitされる前に、証跡、権限、ポリシー、失敗理由を確認する実行前ガバナンス層です。",
        en: "VERITAS OS is not an AI model. It is a pre-execution governance layer that checks evidence, authority, policy, and failure reasons before AI-agent decisions are committed to the real world.",
      }}
    >
      {(t, lang) => (
        <div className="how-it-works-page">
          <nav className="hiw-hero-actions" aria-label={t("主要リンク", "Primary links")}>
            {heroActions.map((action) => (
              <a key={action.href} href={action.href}>{t(action.label.ja, action.label.en)}</a>
            ))}
          </nav>

          <section className="hiw-mechanism-card" aria-labelledby="mechanism-heading">
            <p className="hiw-kicker">{t("一文でいうと", "In one sentence")}</p>
            <h2 id="mechanism-heading">
              {t(
                "認可の発行は実行許可ではありません。以下は、最新条件の再確認、限定サンドボックスでの実行、結果照合までを含む実装済み証明経路の要約です。",
                "Authorization issuance is not execution permission. The following summarizes the implemented controlled sandbox proof path, including fresh rechecks, execution, and reconciliation.",
              )}
            </h2>
          </section>

          <section className="hiw-section" aria-labelledby="flow-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Control flow</p>
              <h2 id="flow-heading">{t("制御フロー", "Visual control flow")}</h2>
            </div>
            <div className="hiw-flow" aria-label={t("VERITAS OS の制御フロー", "VERITAS OS control flow")}>
              {steps[lang].map(([label, body], index) => {
                const isOutcome = index === steps[lang].length - 1;
                return (
                  <article className={`hiw-flow-card${isOutcome ? " hiw-flow-card-outcome" : ""}`} key={label}>
                    <div className="hiw-step-topline">
                      <span className="hiw-step-number">{index + 1}</span>
                      <span className="hiw-step-arrow" aria-hidden="true">↓</span>
                    </div>
                    <h3>{label}</h3>
                    <p>{body}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="hiw-section" aria-labelledby="layers-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Layers</p>
              <h2 id="layers-heading">{t("各レイヤーの役割", "What each layer does")}</h2>
            </div>
            <div className="hiw-card-grid hiw-layer-grid">
              {layers[lang].map(([term, role]) => (
                <article className="hiw-compact-card" key={term}>
                  <p className="hiw-card-term">{term}</p>
                  <p>{role}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="hiw-section" aria-labelledby="outcomes-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Routing</p>
              <h2 id="outcomes-heading">{t("判断結果の種類", "Decision outcomes")}</h2>
            </div>
            <div className="hiw-card-grid hiw-outcome-grid">
              {outcomes[lang].map(([name, body]) => (
                <article className="hiw-outcome-card" key={name}>
                  <span className={`hiw-outcome-badge hiw-outcome-${name.split(" ")[0].toLowerCase()}`}>{name}</span>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="hiw-section hiw-integration-section" aria-labelledby="integration-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Integration</p>
              <h2 id="integration-heading">{t("既存システムとの接続イメージ", "How it connects to existing systems")}</h2>
            </div>
            <p className="hiw-section-copy">
              {t(
                "VERITAS OS は、既存のAIエージェント、業務ツール、ポリシー、監査ログを置き換える前提ではありません。実行前の判断経路に、証跡確認と境界判定の層を追加する考え方です。",
                "VERITAS OS does not assume replacement of existing AI agents, business tools, policies, or audit logs. It adds an evidence-aware boundary check to the decision path before execution.",
              )}
            </p>
            <div className="hiw-card-grid hiw-integration-grid">
              {integrationCards[lang].map(([title, body]) => (
                <article className="hiw-compact-card" key={title}>
                  <p className="hiw-card-term">{title}</p>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="hiw-disclosure-stack">
            <details className="hiw-disclosure">
              <summary>{t("Webサイト技術とVERITAS OSの違い", "Website tech vs VERITAS OS positioning")}</summary>
              <p>
                {t(
                  "このWebサイトは Vite / React / Vercel による静的サイトです。これは公開Webサイトの実装要素であり、VERITAS OS の中核ガバナンス技術そのものを示すものではありません。VERITAS OS の位置づけは、decision governance layer、evidence-aware control path、fail-closed gate behavior、audit/review trace surface、bind-boundary control before commit です。",
                  "This website is a static site built with Vite, React, and Vercel. That describes the public website implementation, not the core governance technology of VERITAS OS. VERITAS OS is positioned as a decision governance layer, evidence-aware control path, fail-closed gate behavior, audit/review trace surface, and bind-boundary control before commit.",
                )}
              </p>
            </details>

            <details className="hiw-disclosure hiw-caution-disclosure">
              <summary>{t("このページが主張しないこと", "What this page does not claim")}</summary>
              <ul>
                {nonClaims[lang].map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
            </details>
          </div>

          <section className="hiw-next-section" aria-labelledby="next-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Next</p>
              <h2 id="next-heading">{t("次に読むページ", "Next pages")}</h2>
            </div>
            <div className="hiw-next-grid">
              {nextPages.map((page) => (
                <a key={page.href} href={page.href}>{t(page.label.ja, page.label.en)}</a>
              ))}
            </div>
            <p className="hiw-evidence-note">
              {t(
                "本サイト上の説明は、veritas_os リポジトリ上の証跡と照合して確認してください。",
                "Explanations on this site should be cross-checked against evidence in the veritas_os repository.",
              )}
            </p>
          </section>
        </div>
      )}
    </PageShell>
  );
}
