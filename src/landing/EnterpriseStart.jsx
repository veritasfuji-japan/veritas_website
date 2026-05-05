import { makeT } from "./landingText.js";

export default function EnterpriseStart({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: t("企業の痛み", "Enterprise pain"),
      body: t("判断理由、証跡、承認境界がログやツールに散らばり、実行前に止める根拠が曖昧になる。", "Rationale, evidence, and approval boundaries scatter across logs and tools, making pre-execution control unclear."),
      cta: t("痛みを見る", "Read enterprise pain"),
      href: "/enterprise",
    },
    {
      title: t("評価経路", "Evaluation path"),
      body: t("AML/KYC PoCで、fail-closed挙動、証跡、failure reason、review / block の判断を確認する。", "Use the AML/KYC PoC to inspect fail-closed behavior, evidence, failure reasons, and review / block outcomes."),
      cta: t("PoCを見る", "View PoC"),
      href: "/aml-kyc-poc",
    },
    {
      title: t("外部レビュー", "External review"),
      body: t("実装済み挙動、公開主張、証跡、コアリポジトリとの整合性を確認する。", "Review implemented behavior, public claims, evidence, and alignment with the core repository."),
      cta: t("レビュー観点を見る", "View review criteria"),
      href: "/reviewers",
    },
  ];

  return (
    <section className="enterprise-start">
      <div className="container">
        <div className="enterprise-start-wrap">
          <div className="marker">ENTERPRISE START</div>
          <h2 className="headline enterprise-start-headline">
            {isJa ? (
              <>
                企業がAI導入につまずく理由は、
                <br />
                モデル性能ではなく「実行前に説明・停止できる仕組み」がないことです
              </>
            ) : (
              "Enterprises stall not at model capability, but at proof before execution"
            )}
          </h2>
          <p className={`body enterprise-start-body ${isJa ? "lead-ja" : ""}`}>
            {t("AIエージェントが判断から実行へ近づくほど、企業には「誰が、何を根拠に、どこまで許可したか」を実行前に確認できる境界が必要になります。VERITAS OS は、この境界を authority evidence、FUJI gate、TrustLog、bind boundary として扱います。", "As AI agents move from recommendations toward execution, enterprises need a boundary that can prove who authorized what, based on which evidence, before action. VERITAS OS treats that boundary through authority evidence, FUJI gate, TrustLog, and bind boundary.")}
          </p>
          <div className="enterprise-start-grid">
            {cards.map((card) => (
              <a key={card.title} href={card.href} className="enterprise-start-card">
                <h3 className="enterprise-start-title">{card.title}</h3>
                <p className={`body ${isJa ? "aud-body-ja" : ""}`}>{card.body}</p>
                <span className="enterprise-start-cta">{card.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
