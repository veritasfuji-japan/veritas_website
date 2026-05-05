import { makeT } from "./landingText.js";

export default function FinancialPointer({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  const scenarios = [
    ["pilot_aml_kyc_anchor_high_risk_country", "human_review_required", "out-review"],
    ["pilot_sanctions_partial_match_no_proceed", "hold", "out-hold"],
    ["pilot_source_of_funds_missing", "hold", "out-hold"],
    ["pilot_policy_definition_missing", "hold", "out-hold"],
    ["pilot_sufficient_evidence_proceed", "proceed", "out-proceed"],
    ["pilot_secure_controls_missing_block", "block", "out-block"],
  ];

  const yamlPreview = `allowed_scope:
  - create_internal_risk_escalation
  - attach_evidence_snapshot
prohibited_scope:
  - freeze_account
  - close_account
  - notify_customer
evidence_freshness:
  sanctions_screening_trace:
    max_age: P1D
  kyc_profile:
    max_age: P7D
default_failure_mode: fail_closed`;

  const copyBlock = (
    <div>
      <div className="pointer-cat">{t("ビーチヘッド", "Beachhead")}</div>
      <h3 className="pointer-title">
        {t("AML/KYC コンプライアンス、1日 PoC。", "AML/KYC compliance — 1-day PoC.")}
      </h3>
      <p className={`pointer-body ${isJa ? "pointer-body-ja" : ""}`}>
        {t(
          "曖昧な事案や証拠不足を silent auto-proceed に流さず、hold / block / human review にルートする金融特化のガバナンス層。アンカーテンプレートは aml_kyc_high_risk_country_wire_manual_review。実装済みの 6 ケース fixture で挙動を実測できます。",
          "A finance-specific governance layer that routes ambiguous or evidence-missing cases to hold, block, or human review — never silent auto-proceed. The anchor template is aml_kyc_high_risk_country_wire_manual_review. Verify behavior against 6 implemented fixture scenarios."
        )}
      </p>
      <a href="/aml-kyc-poc" className="btn btn-primary">
        {t("PoC を読む", "Read the PoC")}
        <span aria-hidden>→</span>
      </a>
    </div>
  );

  const scenariosBlock = (
    <div>
      <div className="scenarios-head">
        <span className="scenarios-title">{t("6 個の決定論的シナリオ", "6 deterministic scenarios")}</span>
        <code className="scenarios-path">aml_kyc_pilot_cases.json</code>
      </div>
      <div className="scenarios">
        {scenarios.map(([name, out, cls]) => (
          <div key={name} className="scenario">
            <span className="scenario-name">{name}</span>
            <span className={`scenario-out ${cls}`}>{out}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const yamlBlock = (
    <div className="yaml-card">
      <div className="yaml-head">
        <code className="yaml-path">policies/action_contracts/aml_kyc@v1.yaml</code>
        <span className="yaml-tag">fail_closed</span>
      </div>
      <pre className="yaml-pre">{yamlPreview}</pre>
    </div>
  );

  return (
    <section id="financial" className="pointer">
      <div className="container">
        <div className="pointer-card">
          {/* MOBILE: text + scenarios (no YAML) */}
          <div className="pointer-grid-mobile only-mobile">
            {copyBlock}
            {scenariosBlock}
          </div>
          {/* DESKTOP: text + YAML + scenarios */}
          <div className="pointer-grid-desktop only-desktop">
            {copyBlock}
            {yamlBlock}
            {scenariosBlock}
          </div>
        </div>
      </div>
    </section>
  );
}
