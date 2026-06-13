import { makeT } from "./landingText.js";

export default function ReviewEvidenceSnapshot({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const cards = [
    {
      title: "Implementation evidence",
      body: t("実装済み挙動とドキュメントを確認する。", "Check implemented behavior and documentation."),
    },
    {
      title: "PoC fixtures",
      body: t("deterministic fixture による評価経路を確認する。", "Inspect deterministic fixture-backed evaluation paths."),
    },
    {
      title: "Reviewer artifacts",
      body: t("外部レビュー向けの証跡と非主張を確認する。", "Review evidence artifacts and non-claims."),
    },
  ];

  return (
    <section className="review-evidence-snapshot">
      <div className="container">
        <div className="snapshot-shell">
          <div className="snapshot-copy">
            <p className="marker">{t("リポジトリ証跡", "Repository evidence")}</p>
            <h2 className="headline">
              {t("公開主張は、リポジトリ証跡と照合する", "Public claims should map back to repository evidence")}
            </h2>
            <p className={`body ${isJa ? "lead-ja" : ""}`}>
              {t(
                "VERITAS OS の公開上の数字・PoC・主張は、可能な限り veritas_os リポジトリ上の実装、fixture、ドキュメント、レビュー証跡と照合できる形で扱います。",
                "Public claims, PoC statements, and metrics should be cross-checked against implementation, fixtures, documentation, and reviewer-facing evidence in the veritas_os repository."
              )}
            </p>
          </div>
          <div className="snapshot-card-grid">
            {cards.map((card) => (
              <article key={card.title} className="snapshot-mini-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <div className="snapshot-actions">
            <a href="/reviewers" className="btn btn-primary">
              {t("レビュアー入口を見る", "View Reviewer Entrypoint")}
              <span aria-hidden>→</span>
            </a>
            <a href="https://github.com/veritasfuji-japan/veritas_os" className="btn btn-secondary" target="_blank" rel="noreferrer noopener">
              {t("コアリポジトリを開く", "Open Core Repository")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
