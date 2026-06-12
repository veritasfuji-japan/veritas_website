import { Fragment } from "react";
import PageShell from "../components/PageShell.jsx";

const styles = `
  .concepts-page {
    margin-top: 1.35rem;
  }

  .concepts-hero-copy {
    max-width: 48rem;
    color: #2A2D33;
    font-size: clamp(1rem, 0.96rem + 0.2vw, 1.12rem);
    line-height: 1.78;
    margin: 0.35rem 0 0;
  }

  .concepts-cta-row,
  .concepts-next-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 1.15rem;
  }

  .concepts-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #CFC6B1;
    border-radius: 999px;
    padding: 0.62rem 0.95rem;
    background: #FAF6EB;
    color: #15161A;
    text-decoration: none;
    font-weight: 600;
    line-height: 1.25;
  }

  .concepts-button:hover {
    border-color: #2456C7;
    color: #1B3A8F;
  }

  .concepts-section {
    margin-top: clamp(2rem, 5vw, 4rem);
  }

  .concepts-section-title {
    margin: 0 0 0.85rem;
    color: #0B3D5B;
    font-family: 'Fraunces', 'Times New Roman', serif;
    font-size: clamp(1.3rem, 1.08rem + 0.9vw, 2rem);
    line-height: 1.2;
  }

  .concepts-thesis {
    border: 1px solid #D8D0BB;
    border-radius: 20px;
    background: linear-gradient(135deg, #FFFDF7 0%, #FAF6EB 60%, #F1E9D7 100%);
    box-shadow: 0 18px 38px rgba(42, 45, 51, 0.07);
    padding: clamp(1.1rem, 3.2vw, 2rem);
  }

  .concepts-thesis-lines {
    display: grid;
    gap: 0.65rem;
    margin: 0;
  }

  .concepts-thesis-lines p {
    margin: 0;
    color: #23262C;
    font-size: clamp(1rem, 0.95rem + 0.25vw, 1.12rem);
    line-height: 1.62;
  }

  .concepts-flow {
    display: grid;
    gap: 0.65rem;
    align-items: stretch;
  }

  .concepts-flow-step {
    border: 1px solid #DDD7C5;
    border-radius: 16px;
    background: #FAF6EB;
    padding: 0.85rem 0.95rem;
    color: #1C2A2E;
    font-weight: 600;
    text-align: center;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .concepts-flow-step-final {
    border-color: #BFC8DD;
    background: #F5F8FF;
    color: #1B3A8F;
    box-shadow: inset 0 0 0 1px rgba(36, 86, 199, 0.08);
  }

  .concepts-flow-arrow {
    color: #2456C7;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-weight: 600;
    text-align: center;
    line-height: 1;
  }

  .concepts-grid {
    display: grid;
    gap: 0.9rem;
  }

  .concepts-card {
    border: 1px solid #E3DDCC;
    border-radius: 18px;
    background: #FAF6EB;
    padding: 1.05rem;
  }

  .concepts-card h3 {
    margin: 0 0 0.55rem;
    color: #1B3A8F;
    font-size: 1.05rem;
    line-height: 1.25;
  }

  .concepts-card p {
    margin: 0;
    color: #2A2D33;
    line-height: 1.62;
  }

  .concepts-why {
    border-left: 4px solid #2456C7;
    background: rgba(250, 246, 235, 0.72);
    padding: 0.95rem 0 0.95rem 1rem;
  }

  .concepts-marker-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }

  .concepts-marker-list li {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0.65rem;
    align-items: start;
    color: #2A2D33;
    line-height: 1.58;
  }

  .concepts-marker-list span {
    display: inline-flex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    background: #E8EEF9;
    color: #1B3A8F;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.78rem;
    font-weight: 600;
  }

  .concepts-disclosure {
    border: 1px solid #DDD7C5;
    border-radius: 18px;
    background: rgba(250, 246, 235, 0.66);
    padding: 0.95rem 1rem;
  }

  .concepts-disclosure summary {
    cursor: pointer;
    color: #0B3D5B;
    font-weight: 700;
  }

  .concepts-disclosure[open] summary {
    margin-bottom: 0.85rem;
  }

  .concepts-next {
    border: 1px solid #D8D0BB;
    border-radius: 20px;
    background: #FFFDF7;
    padding: clamp(1.05rem, 3vw, 1.7rem);
  }

  .concepts-next-note {
    margin: 1rem 0 0;
    color: #4A4D54;
    font-size: 0.94rem;
    line-height: 1.62;
  }

  @media (min-width: 760px) {
    .concepts-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .concepts-card {
      min-height: 11rem;
    }
  }

  @media (min-width: 900px) {
    .concepts-flow {
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 0.5rem;
    }

    .concepts-flow-arrow {
      display: none;
    }

    .concepts-flow-step {
      position: relative;
      min-height: 5.25rem;
    }

    .concepts-flow-step:not(:last-child)::after {
      content: "→";
      position: absolute;
      right: -0.48rem;
      top: 50%;
      transform: translateY(-50%);
      color: #2456C7;
      font-family: 'IBM Plex Mono', ui-monospace, monospace;
      z-index: 1;
    }
  }
`;

const links = {
  demo: "/demo",
  poc: "/aml-kyc-poc",
  enterprise: "/enterprise",
  core: "https://github.com/veritasfuji-japan/veritas_os",
};

const makeLabel = (ja, en) => ({ ja, en });

const heroCtas = [
  { label: makeLabel("デモを見る", "View Demo"), href: links.demo },
  { label: makeLabel("AML/KYC PoCを見る", "View AML/KYC PoC"), href: links.poc },
  { label: makeLabel("コアリポジトリを開く", "Open Core Repository"), href: links.core },
];

const flowSteps = [
  makeLabel("AI判断", "AI decision"),
  makeLabel("権限証跡", "Authority evidence"),
  makeLabel("人間承認 / ポリシー確認", "Human / policy approval"),
  makeLabel("Bind boundary", "Bind boundary"),
  makeLabel("許可 / 保留 / レビュー / ブロック", "Allow / hold / review / block"),
  makeLabel("Commit または fail-closed", "Commit or fail-closed"),
];

const conceptCards = [
  {
    title: "Audit log",
    body: makeLabel(
      "何が起きたかを記録する。ただし、それだけでは「なぜ実行してよかったか」は証明できない。",
      "Records what happened. But it does not by itself prove why execution was allowed.",
    ),
  },
  {
    title: "Authority evidence",
    body: makeLabel(
      "誰が、どの権限で、どの根拠に基づき、その行為を許可可能にしたかを示す。",
      "Shows who had authority, under what scope, and on what basis the action became permissible.",
    ),
  },
  {
    title: "Bind boundary",
    body: makeLabel(
      "承認された判断を、現実世界にcommitしてよいかを実行直前に判定する境界。",
      "The boundary that determines whether an approved decision may be committed to the real world.",
    ),
  },
];

const whyItems = [
  makeLabel(
    "強力なAIエージェントには、説明だけでなく実行境界が必要である。",
    "Powerful AI agents need execution boundaries, not just explanations.",
  ),
  makeLabel(
    "規制対象アクションでは、誰が何を許可したかを証明できる必要がある。",
    "Regulated actions require proof of who authorized what.",
  ),
  makeLabel(
    "事後ログだけでは、実行前の統制には足りない。",
    "After-the-fact logs are not enough for pre-execution control.",
  ),
];

const nonClaims = [
  makeLabel("法的助言ではない", "It is not legal advice"),
  makeLabel("規制当局の承認ではない", "It is not regulatory approval"),
  makeLabel("第三者認証の代替ではない", "It is not a substitute for third-party certification"),
  makeLabel("すべてのリスクを自動で消すものではない", "It does not automatically eliminate all risk"),
  makeLabel(
    "本番利用には、環境固有の統合、セキュリティ、運用、法務・監査レビューが必要である",
    "Production use requires environment-specific integration, security, operations, legal, and audit review",
  ),
];

const nextCtas = [
  { label: makeLabel("デモを見る", "View Demo"), href: links.demo },
  { label: makeLabel("AML/KYC PoCを見る", "View AML/KYC PoC"), href: links.poc },
  { label: makeLabel("企業課題を見る", "View Enterprise Problem"), href: links.enterprise },
  { label: makeLabel("コアリポジトリを開く", "Open Core Repository"), href: links.core },
];

const getText = (value, lang) => (lang === "ja" ? value.ja : value.en);

function CtaLink({ cta, lang }) {
  const external = cta.href.startsWith("http");

  return (
    <a
      className="concepts-button"
      href={cta.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {getText(cta.label, lang)}
    </a>
  );
}

export default function ConceptsPage() {
  return (
    <PageShell
      label={{ ja: "中心概念", en: "CONCEPTS" }}
      pageTitle={{ ja: "中心概念", en: "Concepts" }}
      title={{ ja: "Approval is not commitment.", en: "Approval is not commitment." }}
      subtitle={{
        ja: "VERITAS OS は、意思決定の承認と現実世界への実行commitを分離します。",
        en: "VERITAS OS separates decision approval from real-world execution commitment.",
      }}
    >
      {(t, lang) => (
        <div className="concepts-page">
          <style>{styles}</style>
          <p className="concepts-hero-copy">
            {t(
              "AIが「よさそうな判断」を出すことと、企業がその判断に拘束されることは同じではありません。VERITASは、その間に検証可能なガバナンス境界を置きます。",
              "An AI producing a reasonable decision is not the same as the enterprise being bound by that decision. VERITAS places a verifiable governance boundary between approval and commitment.",
            )}
          </p>
          <div className="concepts-cta-row" aria-label={t("主要リンク", "Primary links")}>
            {heroCtas.map((cta) => (
              <CtaLink key={cta.href} cta={cta} lang={lang} />
            ))}
          </div>

          <section className="concepts-section concepts-thesis" aria-labelledby="concepts-thesis-title">
            <h2 className="concepts-section-title" id="concepts-thesis-title">
              {t("中心概念", "Core thesis")}
            </h2>
            <div className="concepts-thesis-lines">
              <p>{t("ログは「何が起きたか」を記録します。", "Logs record what happened.")}</p>
              <p>{t("Authority evidence は「なぜその行為が許可可能か」を説明します。", "Authority evidence explains why an action was permitted.")}</p>
              <p>{t("Bind boundary は「その判断を現実世界にcommitしてよいか」を判定します。", "The bind boundary determines whether that decision may be committed to the real world.")}</p>
            </div>
          </section>

          <section className="concepts-section" aria-labelledby="concepts-flow-title">
            <h2 className="concepts-section-title" id="concepts-flow-title">
              {t("概念フロー", "Concept flow")}
            </h2>
            <div className="concepts-flow">
              {flowSteps.map((step, index) => (
                <Fragment key={getText(step, "en")}>
                  <div className={`concepts-flow-step${index === flowSteps.length - 1 ? " concepts-flow-step-final" : ""}`}>
                    {getText(step, lang)}
                  </div>
                  {index < flowSteps.length - 1 && <div className="concepts-flow-arrow" aria-hidden="true">↓</div>}
                </Fragment>
              ))}
            </div>
          </section>

          <section className="concepts-section" aria-labelledby="concepts-three-title">
            <h2 className="concepts-section-title" id="concepts-three-title">
              {t("3つの中心概念", "Three core concepts")}
            </h2>
            <div className="concepts-grid">
              {conceptCards.map((card) => (
                <article className="concepts-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{getText(card.body, lang)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="concepts-section concepts-why" aria-labelledby="concepts-why-title">
            <h2 className="concepts-section-title" id="concepts-why-title">
              {t("なぜ重要か", "Why it matters")}
            </h2>
            <ul className="concepts-marker-list">
              {whyItems.map((item, index) => (
                <li key={getText(item, "en")}>
                  <span aria-hidden="true">{index + 1}</span>
                  {getText(item, lang)}
                </li>
              ))}
            </ul>
          </section>

          <section className="concepts-section" aria-labelledby="concepts-non-claims-title">
            <details className="concepts-disclosure">
              <summary id="concepts-non-claims-title">
                {t("VERITAS OSが主張しないこと", "What VERITAS OS does not claim")}
              </summary>
              <ul className="concepts-marker-list">
                {nonClaims.map((item, index) => (
                  <li key={getText(item, "en")}>
                    <span aria-hidden="true">{index + 1}</span>
                    {getText(item, lang)}
                  </li>
                ))}
              </ul>
            </details>
          </section>

          <section className="concepts-section concepts-next" aria-labelledby="concepts-next-title">
            <h2 className="concepts-section-title" id="concepts-next-title">
              {t("次に見るべきもの", "Next steps")}
            </h2>
            <div className="concepts-next-actions">
              {nextCtas.map((cta) => (
                <CtaLink key={cta.href} cta={cta} lang={lang} />
              ))}
            </div>
            <p className="concepts-next-note">
              {t(
                "本サイト上の主張は、veritas_os リポジトリ上の証跡と照合して確認してください。",
                "Public website claims should be validated against the evidence in the veritas_os repository.",
              )}
            </p>
          </section>
        </div>
      )}
    </PageShell>
  );
}
