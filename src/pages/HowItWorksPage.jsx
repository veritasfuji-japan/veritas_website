import PageShell from "../components/PageShell.jsx";

const heroActions = [
  { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
  { label: { ja: "用語集を見る", en: "Open Glossary" }, href: "/glossary" },
  { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
];

const steps = {
  ja: [
    ["Decision / verified artifact", "/v1/decideの結果を検証し、選択したsandbox動作に正確な実行意図を結びつける。判断結果だけでは外部作用を許可しない。"],
    ["Native v2 / single-use consumption", "権限・ポリシー・必要な人間承認に基づく認可を発行し、実行試行前にPostgreSQLで一回限り消費する。"],
    ["Current rechecks / credentials", "実行直前の権限・承認・ポリシー・リスクを再確認し、固定した動作・送信先・資格情報の範囲を照合する。"],
    ["TLS effect / EFFECT_UNKNOWN", "送信意図を永続化し、証明書を検証したTLSで一度だけ送信。HTTP成功応答だけでは作用確定にしない。"],
    ["Read-only reconciliation", "別の読み取り経路で保存済みイベントを照合し、証拠を保存する。404や照合障害は作用がなかった証明にならない。"],
    ["BindReceipt / Outcome / recovery", "照合済みの結果を元の判断・意図に結ぶ事後証跡として公開。復旧処理は外部作用を再送せず、新たな実行権限も作らない。"],
  ],
  en: [
    ["Decision / verified artifact", "Verify /v1/decide output and bind an exact execution intent to the selected sandbox action. A decision alone does not permit an external effect."],
    ["Native v2 / single-use consumption", "Issue authorization based on authority, policy, and required human approval; consume it once in PostgreSQL before the execution attempt."],
    ["Current rechecks / credentials", "Recheck current authority, approval, policy, and risk; match the exact action, endpoint, and credential scope before effect."],
    ["TLS effect / EFFECT_UNKNOWN", "Persist dispatch intent, then send once over certificate-validated TLS. An HTTP success response alone does not confirm effect."],
    ["Read-only reconciliation", "Use a separate read-only path to verify the persisted event and archive evidence. A 404 or lookup outage is not proof of no effect."],
    ["BindReceipt / Outcome / recovery", "Publish retrospective evidence linking the reconciled result to the original decision and intent. Recovery never resends the effect or creates new authority."],
  ],
};

const layers = {
  ja: [
    ["Policy", "何を許可し、何を止めるべきかの基準。"],
    ["Authority evidence", "なぜその行為が許可可能なのかを示す根拠。"],
    ["FUJI gate", "不足・不正・危険・証跡不足を fail-closed で止める判断点。"],
    ["TrustLog", "判断と証跡を後から確認できるようにする記録層。"],
    ["Bind boundary", "判断承認と実行commitを分離する境界。"],
    ["Outcome Receipt", "観測・照合された実行結果の事後証跡。判断結果や新たな実行許可とは異なる。"],
  ],
  en: [
    ["Policy", "Criteria for what should be allowed or stopped."],
    ["Authority evidence", "Evidence showing why the action may be authorized."],
    ["FUJI gate", "A fail-closed checkpoint for missing, invalid, risky, or under-evidenced paths."],
    ["TrustLog", "A record layer for reviewing decisions and evidence later."],
    ["Bind boundary", "The boundary that separates decision approval from execution commit."],
    ["Outcome Receipt", "Retrospective evidence of observed/reconciled execution results; distinct from a governance decision or new permission."],
  ],
};

const outcomes = {
  ja: [
    ["Allow / Proceed", "次の評価段階に進める判断。外部実行には別途、認可の消費と実行直前のbind検査が必要。"],
    ["Hold", "証跡や情報が不足しているため、一時的に止める判断。"],
    ["Review", "人間または外部レビュアーの確認が必要な判断。"],
    ["Block", "条件、証跡、ポリシー、権限、安全性の観点から進めるべきではない判断。"],
  ],
  en: [
    ["Allow / Proceed", "A governance decision permits the next evaluation step. External execution still requires authorization consumption and current bind checks."],
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
                "AIの判断と実行権限を分離し、実行直前の条件を再確認します。限定sandboxでは、作用の読み取り照合から事後証跡・復旧までを接続しています。",
                "VERITAS separates AI decisions from execution authority and rechecks current conditions before effect. The controlled sandbox connects read-only reconciliation to retrospective receipts and recovery.",
              )}
            </h2>
          </section>

          <section className="hiw-section" aria-labelledby="flow-heading">
            <div className="hiw-section-heading">
              <p className="hiw-kicker">Control flow</p>
              <h2 id="flow-heading">{t("限定sandboxでの実装フロー", "Controlled sandbox implementation flow")}</h2>
            </div>
            <p className="hiw-section-copy">{t("以下は合成イベントを使うTLS・PostgreSQL環境での証明範囲です。本番検証や外部UTC時刻の信頼、TrustLogの外部配送保証を含みません。", "This proof scope uses synthetic events in a controlled TLS/PostgreSQL environment. It does not include production validation, external UTC clock trust, or TrustLog external-delivery guarantees.")}</p>
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

