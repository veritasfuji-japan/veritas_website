import { makeT } from "./landingText.js";

export default function ControlFlowSnapshot({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";
  const steps = [
    t("AI判断・証跡検証", "Decision / evidence verification"),
    t("native v2認可・一回限りの消費", "Native v2 / single-use consumption"),
    t("最新条件・資格情報の確認", "Current rechecks / credentials"),
    t("固定sandboxへのTLS送信", "Pinned sandbox TLS dispatch"),
    t("結果不明の保持・読み取り照合", "EFFECT_UNKNOWN / reconciliation"),
    t("BindReceipt・Outcome・復旧", "BindReceipt / Outcome / recovery"),
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
                "限定sandboxでの実装経路です。認可発行後も、実行直前に権限・ポリシー・承認・リスクを再確認します。応答が失われた場合は結果不明を保持し、外部作用を再送せずに照合します。",
                "This is the controlled sandbox implementation path. Authority, policy, approval, and risk are rechecked after issuance and before effect. Lost responses preserve uncertainty; reconciliation does not resend the effect."
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

