import { makeT } from "./landingText.js";

export default function EnterpriseStart({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: ["承認が見えにくい", "Approvals are scattered"],
      body: t(
        "誰が許可したか、なぜ許したかが、複数のシステムに分かれている。",
        "Approvals, evidence, and rationale scatter across tools and logs."
      ),
    },
    {
      title: ["後からでは止められない", "Logs arrive too late"],
      body: t(
        "操作が終わってから記録を見ても、その操作を止められない。",
        "Logs record what happened, but they rarely create a pre-execution boundary."
      ),
    },
    {
      title: ["操作の前に確認したい", "Check before acting"],
      body: t(
        "大切なシステムを変更する前に、許可・ルール・必要な証拠を確かめたい。",
        "Before committing to external systems, authority, evidence, and policy must be checked."
      ),
    },
  ];

  return (
    <section className="enterprise-start">
      <div className="container">
        <div className="enterprise-start-wrap">
          <div className="marker">{t("AIを仕事で使うときの問題", "The challenge of AI at work")}</div>
          <h2 className="headline enterprise-start-headline">
            {t("企業が止まる場所", "Where enterprises get stuck")}
          </h2>
          <p className={`body enterprise-start-body ${isJa ? "lead-ja" : ""}`}>
            {t(
              "AIが実際の業務を動かすとき、大切なのは答えの正しさだけではありません。その操作を本当に許可してよいか、実行する前に確認する必要があります。",
              "As AI agents move closer to execution, the enterprise question shifts from “is the model smart?” to “who authorized what, based on which evidence, before action?”"
            )}
          </p>
          <div className="enterprise-start-grid">
            {cards.map((card) => (
              <article key={card.title[1]} className="enterprise-start-card">
                <h3 className="enterprise-start-title">{t(...card.title)}</h3>
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
