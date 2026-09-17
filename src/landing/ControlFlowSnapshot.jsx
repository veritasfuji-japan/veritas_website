import { makeT } from "./landingText.js";

export default function ControlFlowSnapshot({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const steps = [
    "Decision / verified intent",
    "Policy / authority / approval",
    "Single-use authorization",
    "Current rechecks / bind",
    "Sandbox effect / reconciliation",
    "BindReceipt / Outcome",
  ];

  return (
    <section className="control-flow-snapshot">
      <div className="container">
        <div className="snapshot-shell control-flow-shell">
          <div className="snapshot-copy">
            <p className="marker">{t("実行前に通す制御フロー", "Pre-execution control flow")}</p>
            <h2 className="headline">
              {t("AI判断を、そのまま実行へ渡さない。", "Do not pass AI decisions directly to execution.")}
            </h2>
            <p className={`body ${isJa ? "lead-ja" : ""}`}>
              {t(
                "VERITAS OS は、AI判断をそのまま実行へ渡さず、証跡・権限・ポリシー・人間承認を確認します。限定サンドボックスでは、単回認可の消費と最新条件の再確認を経て実行し、結果を独立した読み取り専用経路で照合します。",
                "VERITAS OS does not pass AI decisions directly to execution. It checks evidence, authority, policy, and human approval. In the controlled sandbox, execution follows single-use consumption and fresh rechecks, then independent read-only reconciliation verifies the result."
              )}
            </p>
            <a href="/how-it-works" className="btn btn-secondary snapshot-cta">
              {t("仕組みを見る", "See How It Works")}
            </a>
          </div>
          <ol className="control-stepper" aria-label={t("実行前制御の流れ", "Pre-execution control flow")}>
            {steps.map((step, index) => (
              <li key={step} className="control-step">
                <span className="control-step-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
