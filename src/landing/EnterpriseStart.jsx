import { makeT } from "./landingText.js";

export default function EnterpriseStart({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: "Approval is scattered",
      body: t(
        "承認、証跡、判断理由がツールやログに分散する。",
        "Approvals, evidence, and rationale scatter across tools and logs."
      ),
    },
    {
      title: "Logs arrive too late",
      body: t(
        "ログは事後に残るが、実行前に止める境界にはなりにくい。",
        "Logs record what happened, but they rarely create a pre-execution boundary."
      ),
    },
    {
      title: "Commit needs proof",
      body: t(
        "外部システムへcommitする前に、権限・証跡・ポリシーを確認する必要がある。",
        "Before committing to external systems, authority, evidence, and policy must be checked."
      ),
    },
  ];

  return (
    <section className="enterprise-start">
      <div className="container">
        <div className="enterprise-start-wrap">
          <div className="marker">{t("企業が止まる場所", "Where enterprises get stuck")}</div>
          <h2 className="headline enterprise-start-headline">
            {t("企業が止まる場所", "Where enterprises get stuck")}
          </h2>
          <p className={`body enterprise-start-body ${isJa ? "lead-ja" : ""}`}>
            {t(
              "AIエージェントが判断から実行へ近づくほど、企業の課題は「モデルが賢いか」ではなく、「誰が、何を根拠に、どこまで許可したかを実行前に確認できるか」に移ります。",
              "As AI agents move closer to execution, the enterprise question shifts from “is the model smart?” to “who authorized what, based on which evidence, before action?”"
            )}
          </p>
          <div className="enterprise-start-grid">
            {cards.map((card) => (
              <article key={card.title} className="enterprise-start-card">
                <h3 className="enterprise-start-title">{card.title}</h3>
                <p className={`body ${isJa ? "aud-body-ja" : ""}`}>{card.body}</p>
              </article>
            ))}
          </div>
          <a href="/enterprise" className="btn btn-secondary enterprise-start-action">
            {t("企業課題を見る", "View Enterprise Problem")}
          </a>
        </div>
      </div>
    </section>
  );
}
