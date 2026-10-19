import { makeT } from "./landingText.js";

export default function AmlKycPocConversion({ lang }) {
  const t = makeT(lang);
  const signals = [
    [ "6つの例題", "6 example scenarios" ],
    [ "許可・保留・確認・停止", "Allow / hold / review / block" ],
    [ "判定理由と記録", "Reasons and audit trace" ],
  ];

  return (
    <section className="poc-conversion">
      <div className="container">
        <div className="poc-conversion-wrap">
          <div className="poc-conversion-copy">
            <div className="marker">AML/KYC POC</div>
            <h2 className="headline poc-conversion-title">{t("AML/KYC の動きを6つの例で確かめる", "Explore 6 AML/KYC evaluation cases")}</h2>
            <p className="body poc-conversion-message">
              {t(
                "AIが口座開設などを判断するとき、必要な許可や証拠がなければ止まるか。作り物のデータを使った6つの例で確認します。",
                "Use six synthetic examples to check when an AI action should proceed, pause, or be reviewed by a person."
              )}
            </p>
          </div>

          <div className="poc-signal-grid" aria-label={t("PoCで確認する短い要点", "Short PoC highlights")}>
            {signals.map(([ja, en]) => (
              <div key={en} className="poc-signal-card">{t(ja, en)}</div>
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
