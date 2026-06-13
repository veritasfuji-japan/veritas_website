import { makeT } from "./landingText.js";

export default function AmlKycPocConversion({ lang }) {
  const t = makeT(lang);
  const signals = [
    "6 evaluation scenarios",
    "proceed / hold / review / block",
    "evidence gap + audit trace",
  ];

  return (
    <section className="poc-conversion">
      <div className="container">
        <div className="poc-conversion-wrap">
          <div className="poc-conversion-copy">
            <div className="marker">AML/KYC POC</div>
            <h2 className="headline poc-conversion-title">AML/KYC 1-Day PoC</h2>
            <p className="body poc-conversion-message">
              {t(
                "証跡・権限・人間承認が不足している規制対象アクションについて、AIエージェントが誤って実行へ進まないことを fixture-backed に検証します。",
                "A fixture-backed evaluation path for checking whether AI agents can be stopped before execution when evidence, authority, or human approval is missing."
              )}
            </p>
          </div>

          <div className="poc-signal-grid" aria-label={t("PoCで確認する短い要点", "Short PoC highlights")}>
            {signals.map((signal) => (
              <div key={signal} className="poc-signal-card">{signal}</div>
            ))}
          </div>

          <p className="small poc-conversion-boundary">
            {t(
              "このPoCは法的助言、規制当局承認、第三者認証、本番運用可否、ライブ銀行連携を主張しません。",
              "This PoC does not claim legal advice, regulatory approval, third-party certification, production readiness, or live bank integration."
            )}
          </p>

          <div className="snapshot-actions">
            <a href="/aml-kyc-poc" className="btn btn-primary">
              {t("6つのシナリオを見る", "View 6 Scenarios")}
              <span aria-hidden>→</span>
            </a>
            <a href="/contact" className="btn btn-secondary">
              {t("評価について相談する", "Contact for Evaluation")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
