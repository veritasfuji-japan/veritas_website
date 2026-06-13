import { makeT } from "./landingText.js";

export default function Idea({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  return (
    <section id="idea" className="idea sec">
      <div className="container">
        <div className="idea-teaser">
          <div>
            <div className="marker">{t("中心概念", "Core concept")}</div>
            <h2 className="headline">
              {t("監査ログだけでは、commitを許可できない。", "Approval is not commitment.")}
            </h2>
            <p className={`lead ${isJa ? "lead-ja" : ""}`}>
              {t(
                "Audit log は「何が起きたか」を残します。Authority Evidence は「なぜそれが許されたか」を示します。VERITAS OS はこの2つを分離し、後者なしに commit が成立しない境界を設計します。",
                "Audit logs record what happened. Authority evidence explains why an action was allowed. VERITAS OS separates the two so commitment does not proceed without the right evidence."
              )}
            </p>
          </div>
          <a href="/concepts" className="btn btn-secondary">
            {t("中心概念を見る", "Read the Core Concept")}
          </a>
        </div>
      </div>
    </section>
  );
}
