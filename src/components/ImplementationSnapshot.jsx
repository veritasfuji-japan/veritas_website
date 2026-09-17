import snapshot from "../data/implementationSnapshot.json";

export default function ImplementationSnapshot({ lang = "ja", compact = false }) {
  const locale = lang === "en" ? "en" : "ja";
  const t = (ja, en) => locale === "ja" ? ja : en;

  return (
    <section className="implementation-snapshot" aria-label={t("実装と検証の現在地", "Implementation and proof scope")}>
      <p className="marker">{t("実装と検証の現在地", "Implementation and proof scope")}</p>
      <h2>{t("判断から実行結果まで、証拠でつなぐ。", "Connect decisions to outcomes through evidence.")}</h2>
      <p className="implementation-source">
        <time dateTime={snapshot.reviewed_at}>{snapshot.reviewed_at}</time>
        {" · veritas_os/main · "}
        <a href={snapshot.source_url} target="_blank" rel="noreferrer noopener">{snapshot.source_commit.slice(0, 7)}</a>
        {" · "}{t("確認時点の実装", "Reviewed source snapshot")}
      </p>
      <p>{snapshot.summary[locale]}</p>
      {compact ? (
        <p><a className="btn btn-secondary" href="/reviewers">{t("証明範囲・連携状況を見る", "Review proof scope and integration status")}</a></p>
      ) : (
        <div className="implementation-grid">
          {snapshot.capabilities.map((item) => (
            <article className="implementation-card" key={item.id}>
              <p className="implementation-status">{item.status[locale]}</p>
              <h3>{item.title[locale]}</h3>
              <p>{item.body[locale]}</p>
              <p className="implementation-limit">{item.limit[locale]}</p>
              <a href={item.proof_url} target="_blank" rel="noreferrer noopener" aria-label={`${t("根拠を確認", "Inspect source evidence")}: ${item.title[locale]}`}>
                {t("根拠を確認", "Inspect source evidence")}
              </a>
            </article>
          ))}
        </div>
      )}
      <p className="implementation-boundary">{snapshot.boundary[locale]}</p>
    </section>
  );
}
