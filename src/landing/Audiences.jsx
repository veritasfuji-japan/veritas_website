import { makeT } from "./landingText.js";

export default function Audiences({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const items = [
    {
      num: "I.", tag: t("導入評価", "EVALUATING"),
      title: t("チームに導入する", "For your team"),
      body: t(
        "AML/KYC ビーチヘッドに 1日 PoC を当てて、fail-closed ガバナンスを fixture シナリオで実測。",
        "Run the AML/KYC beachhead 1-day PoC against fixture scenarios to verify fail-closed governance."
      ),
      href: "/aml-kyc-poc", cta: t("Customer view へ", "Customer view"),
    },
    {
      num: "II.", tag: t("運用", "OPERATING"),
      title: t("本番で動かす", "In production"),
      body: t(
        "VERITAS_POSTURE で dev → staging → secure → prod を切替。RBAC は admin / operator / auditor。",
        "VERITAS_POSTURE switches dev → staging → secure → prod. RBAC ships with admin / operator / auditor."
      ),
      href: "#numbers", cta: t("Operator view へ", "Operator view"),
    },
    {
      num: "III.", tag: t("DD・投資", "INVESTING"),
      title: t("投資・買収判断", "Investing or DD"),
      body: t(
        "公開リポジトリ上の証跡、テストカバレッジ、PoCシナリオ、bind-governed paths を確認する。",
        "Review repository evidence, test coverage, PoC scenarios, and bind-governed paths."
      ),
      href: "#numbers", cta: t("Investor view へ", "Investor view"),
    },
    {
      num: "IV.", tag: t("第三者監査", "REVIEWING"),
      title: t("外部監査・レビュー", "External review"),
      body: t(
        "Regulated Action Governance 外部レビュー引き渡しパック、Quality Gate 証跡が repo 同梱。",
        "Regulated Action Governance external review pack and quality gate evidence ship in the repo."
      ),
      href: "/reviewers", cta: t("Reviewer view へ", "Reviewer view"),
    },
  ];

  return (
    <section className="audiences only-desktop">
      <div className="container">
        <div className="aud-grid">
          {items.map((a) => (
            <a key={a.num} href={a.href} className="aud-card">
              <div className="aud-num">{a.num} {a.tag}</div>
              <h3 className="aud-title">{a.title}</h3>
              <p className={`aud-body ${isJa ? "aud-body-ja" : ""}`}>{a.body}</p>
              <span className="aud-cta">
                {a.cta}
                <span className="aud-cta-arrow" aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
