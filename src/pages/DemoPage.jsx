import { useState } from "react";
import PageShell from "../components/PageShell.jsx";

const scenarios = [
  {
    id: "aml-kyc-authority-missing",
    title: { ja: "高リスクAML/KYC判断：Authority Evidence不足", en: "High-risk AML/KYC decision: missing Authority Evidence" },
    shortLabel: { ja: "証跡不足でブロック", en: "Blocked: missing evidence" },
    agentRequest: {
      ja: "AIエージェントが、高リスク国に関係する顧客のKYC判断を自動承認しようとしています。",
      en: "An AI agent attempts to auto-approve a KYC decision involving high-risk-country exposure.",
    },
    actionClass: "regulated_aml_kyc_action",
    riskContext: "HIGH_RISK_COUNTRY + ENHANCED_DUE_DILIGENCE_REQUIRED",
    requestedScope: "approve_customer_onboarding",
    decision: "BLOCKED",
    decisionTone: "blocked",
    reasonCode: "AUTHORITY_EVIDENCE_MISSING",
    reason: {
      ja: "必要なAuthority Evidenceが存在しないため、実行前に停止します。",
      en: "Required Authority Evidence is unavailable, so VERITAS blocks before execution.",
    },
    businessImpact: {
      ja: "AIは、権限証跡なしに高リスクKYCアクションを承認できませんでした。",
      en: "The AI could not approve a high-risk KYC action without authority evidence.",
    },
    checks: [
      { label: "Authority Evidence", status: "missing", tone: "fail" },
      { label: "Human Approval Receipt", status: "not accepted", tone: "warn" },
      { label: "Policy Admissibility", status: "requires review", tone: "warn" },
      { label: "Bind Coverage", status: "blocked", tone: "fail" },
    ],
    evidence: {
      decision_id: "dec_aml_kyc_2026_001",
      execution_intent_id: "intent_aml_kyc_high_risk_001",
      bind_receipt_id: "bind_rcpt_block_001",
      audit_path: "trustlog/aml-kyc/high-risk/manual-review/authority-missing",
      fixture: "pilot_aml_kyc_high_risk_country_wire_manual_review",
    },
    reviewerSteps: [
      { ja: "Authority Evidenceの発行元と権限スコープを確認する。", en: "Check the Authority Evidence issuer and authority scope." },
      { ja: "コンプライアンス担当者の承認Receiptが必要か確認する。", en: "Confirm whether a compliance-officer approval receipt is required." },
      { ja: "不足証跡を補完するまで、AIに実行を許可しない。", en: "Do not allow AI execution until the missing evidence is supplied." },
    ],
  },
  {
    id: "aml-kyc-manual-review",
    title: { ja: "制裁リスト部分一致：人間レビューへエスカレーション", en: "Sanctions partial match: escalate to human review" },
    shortLabel: { ja: "曖昧リスクで保留", en: "Held: ambiguous risk" },
    agentRequest: {
      ja: "AIエージェントが、制裁リストに部分一致した顧客の取引を進めようとしています。",
      en: "An AI agent attempts to proceed with a customer transaction after a partial sanctions-list match.",
    },
    actionClass: "sanctions_screening_action",
    riskContext: "PARTIAL_SANCTIONS_MATCH + FALSE_POSITIVE_NOT_RESOLVED",
    requestedScope: "release_transaction_hold",
    decision: "ESCALATED",
    decisionTone: "escalated",
    reasonCode: "HUMAN_REVIEW_REQUIRED",
    reason: {
      ja: "制裁リスクが曖昧なため、AI単独では進めず、人間レビューに回します。",
      en: "Sanctions risk is ambiguous, so VERITAS prevents silent proceed and routes to human review.",
    },
    businessImpact: {
      ja: "AIは、制裁リスクが人間レビューを必要とする状況で、静かに処理を進めることができませんでした。",
      en: "The AI could not silently proceed where sanctions risk required human review.",
    },
    checks: [
      { label: "Authority Evidence", status: "present", tone: "pass" },
      { label: "Human Approval Receipt", status: "required", tone: "warn" },
      { label: "Policy Admissibility", status: "manual review", tone: "warn" },
      { label: "Bind Coverage", status: "held", tone: "warn" },
    ],
    evidence: {
      decision_id: "dec_sanctions_2026_014",
      execution_intent_id: "intent_sanctions_partial_match_014",
      bind_receipt_id: "bind_rcpt_hold_014",
      audit_path: "trustlog/aml-kyc/sanctions/partial-match/manual-review",
      fixture: "pilot_sanctions_partial_match_no_auto_proceed",
    },
    reviewerSteps: [
      { ja: "部分一致の根拠とfalse positive判定の有無を確認する。", en: "Review the partial-match basis and whether false-positive resolution exists." },
      { ja: "人間レビュー完了までtransaction releaseを許可しない。", en: "Do not release the transaction until human review is completed." },
      { ja: "レビュー結果をEvidence Chainに追加する。", en: "Append the review result to the Evidence Chain." },
    ],
  },
  {
    id: "aml-kyc-sufficient-evidence",
    title: { ja: "十分な証跡：条件付きで実行許可", en: "Sufficient evidence: allow execution with evidence" },
    shortLabel: { ja: "証跡ありで許可", en: "Allowed: evidence present" },
    agentRequest: {
      ja: "AIエージェントが、必要な証跡・承認・ポリシー条件が揃った低リスク取引を進めようとしています。",
      en: "An AI agent attempts to proceed with a lower-risk action where required evidence, approval, and policy conditions are present.",
    },
    actionClass: "low_risk_aml_kyc_action",
    riskContext: "LOW_RISK + REQUIRED_EVIDENCE_PRESENT",
    requestedScope: "approve_low_risk_transaction",
    decision: "ALLOWED",
    decisionTone: "allowed",
    reasonCode: "POLICY_AND_EVIDENCE_SATISFIED",
    reason: {
      ja: "必要な証跡、承認、ポリシー条件が揃っているため、Evidence Chainを残して実行を許可します。",
      en: "Required evidence, approval, and policy conditions are satisfied, so VERITAS allows execution with an Evidence Chain.",
    },
    businessImpact: {
      ja: "AIは、権限・承認・ポリシー・bind coverageが満たされた場合にのみ実行を許可されました。",
      en: "The AI was allowed to proceed only because authority, approval, policy, and bind coverage were satisfied.",
    },
    checks: [
      { label: "Authority Evidence", status: "present", tone: "pass" },
      { label: "Human Approval Receipt", status: "accepted", tone: "pass" },
      { label: "Policy Admissibility", status: "satisfied", tone: "pass" },
      { label: "Bind Coverage", status: "covered", tone: "pass" },
    ],
    evidence: {
      decision_id: "dec_aml_kyc_2026_027",
      execution_intent_id: "intent_aml_kyc_low_risk_027",
      bind_receipt_id: "bind_rcpt_allow_027",
      audit_path: "trustlog/aml-kyc/low-risk/sufficient-evidence/proceed",
      fixture: "pilot_sufficient_evidence_proceed",
    },
    reviewerSteps: [
      { ja: "Evidence ChainのID・時刻・適用ポリシーを確認する。", en: "Inspect the Evidence Chain ID, timestamp, and applied policy." },
      { ja: "実行許可が定義済みスコープ内か確認する。", en: "Confirm that allowed execution remains inside the defined scope." },
      { ja: "後続監査用に判定結果とbind receiptを保存する。", en: "Store the decision result and bind receipt for later audit." },
    ],
  },
];

const evidenceSourceLinks = [
  {
    label: "One-Day PoC Walkthrough",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/poc/one-day-poc-walkthrough.md",
  },
  {
    label: "Reviewer Pack",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/poc/one-day-poc-reviewer-pack.md",
  },
  {
    label: "Evidence Pack",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/poc/one-day-poc-evidence-pack.md",
  },
  {
    label: "Fixture Runner",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/scripts/run_aml_kyc_poc_fixture.py",
  },
];

const technicalEvidenceKeys = [
  "reason_code",
  "decision_id",
  "execution_intent_id",
  "bind_receipt_id",
  "audit_path",
  "fixture",
];

function formatReasonCode(reasonCode) {
  return reasonCode
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const colors = {
  surface: "#FAF6EB",
  surfaceRaised: "#FFF9EC",
  darkSurface: "#20232B",
  ink: "#15161A",
  inkSoft: "#2A2D33",
  muted: "#5A5C62",
  rule: "#E3DDCC",
  ruleStrong: "#CFC6B1",
  notice: "#FFF2D9",
  noticeRule: "#D99A2B",
  allowed: "#72E0C8",
  blocked: "#FFB0B8",
  escalated: "#FFD27A",
};

const radii = {
  surface: "14px",
  compact: "10px",
};

const spacing = {
  surface: "clamp(1.15rem, 0.9rem + 1vw, 1.75rem)",
};

const styles = {
  notice: {
    marginTop: "1.2rem",
    padding: "0.95rem 1rem 0.95rem 1.15rem",
    border: `1px solid ${colors.rule}`,
    borderLeft: `4px solid ${colors.noticeRule}`,
    borderRadius: radii.compact,
    background: colors.notice,
    color: colors.inkSoft,
    fontSize: "0.95rem",
  },
  valueSummary: {
    marginTop: "1.35rem",
    padding: "clamp(1.25rem, 1rem + 1.2vw, 2rem)",
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surface,
    boxShadow: "0 18px 40px rgba(80, 64, 35, 0.08)",
  },
  valueLead: {
    margin: "0.55rem 0 0",
    maxWidth: "58rem",
    fontSize: "1.08rem",
    lineHeight: 1.75,
    color: colors.inkSoft,
  },
  scenarioSwitcher: {
    marginTop: "1.6rem",
  },
  scenarioSwitcherHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "0.4rem 0.8rem",
    marginBottom: "0.65rem",
  },
  scenarioSwitcherTitle: {
    margin: 0,
    color: colors.ink,
    fontSize: "1rem",
    lineHeight: 1.35,
  },
  scenarioSwitcherHelp: {
    margin: 0,
    color: colors.muted,
    fontSize: "0.88rem",
    lineHeight: 1.45,
  },
  scenarioTabs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
    gap: "0.65rem",
  },
  demoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))",
    gap: "1rem",
    marginTop: "1.25rem",
  },
  panel: {
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surface,
    padding: spacing.surface,
    minHeight: "100%",
  },
  panelDark: {
    border: "1px solid rgba(250, 246, 235, 0.16)",
    borderRadius: radii.surface,
    background: colors.darkSurface,
    color: colors.surface,
    padding: spacing.surface,
    minHeight: "100%",
    boxShadow: "0 22px 46px rgba(21, 22, 26, 0.24)",
  },
  eyebrow: {
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: colors.muted,
    margin: "0 0 0.55rem",
  },
  darkEyebrow: {
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#BFC7D5",
    margin: "0 0 0.55rem",
  },
  h2: {
    fontFamily: "'Fraunces', 'Times New Roman', serif",
    fontSize: "clamp(1.35rem, 1.1rem + 1.4vw, 2rem)",
    margin: "0 0 0.65rem",
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: "'Fraunces', 'Times New Roman', serif",
    fontSize: "clamp(1.2rem, 1rem + 1vw, 1.65rem)",
    margin: "0 0 0.65rem",
    lineHeight: 1.25,
  },
  metaGrid: { display: "grid", gap: "0.55rem", marginTop: "1rem" },
  metaItem: { borderTop: `1px solid ${colors.rule}`, paddingTop: "0.55rem" },
  mono: {
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: "0.85rem",
    overflowWrap: "anywhere",
  },
  checks: { display: "grid", gap: "0.55rem", marginTop: "0.85rem" },
  check: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.75rem",
    borderBottom: `1px solid ${colors.rule}`,
    padding: "0.55rem 0",
  },
  status: (tone) => ({
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    color: tone === "pass" ? "#0E7E73" : tone === "fail" ? "#8C1F2F" : "#8A5A00",
    fontSize: "0.78rem",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }),
  decisionBadge: (tone) => ({
    display: "inline-block",
    border: "1px solid currentColor",
    borderRadius: "999px",
    padding: "0.35rem 0.65rem",
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    letterSpacing: "0.06em",
    color: colors[tone],
    marginBottom: "0.75rem",
  }),
  decisionSection: {
    marginTop: "1rem",
    paddingTop: "0.85rem",
    borderTop: "1px solid rgba(250, 246, 235, 0.16)",
  },
  decisionSectionTitle: { display: "block", marginBottom: "0.35rem", color: "#D9E0EA" },
  evidenceList: { display: "grid", gap: "0.35rem", marginTop: "0.85rem", padding: 0, listStyle: "none" },
  evidenceItem: {
    display: "grid",
    gap: "0.2rem",
    borderTop: "1px solid rgba(250, 246, 235, 0.16)",
    paddingTop: "0.45rem",
  },
  evidenceLabel: { color: "#BFC7D5", fontSize: "0.78rem" },
  detail: {
    marginTop: "0.8rem",
    borderTop: "1px solid rgba(250, 246, 235, 0.16)",
    paddingTop: "0.65rem",
  },
  lightDetail: { marginTop: "0.95rem", borderTop: `1px solid ${colors.rule}`, paddingTop: "0.7rem" },
  detailSummary: { cursor: "pointer", color: "#D9E0EA", fontSize: "0.85rem", fontWeight: 700 },
  lightDetailSummary: { cursor: "pointer", color: colors.ink, fontSize: "0.9rem", fontWeight: 700 },
  steps: { marginTop: "1rem", paddingLeft: "1.2rem" },
  sourceCard: {
    marginTop: "1.2rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surfaceRaised,
  },
  sourceLinks: { display: "grid", gap: "0.65rem", margin: "1rem 0 0", padding: 0, listStyle: "none" },
  sourceLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    width: "fit-content",
    color: "#1D4F91",
    fontWeight: 700,
    textDecoration: "none",
    borderBottom: "1px solid currentColor",
    overflowWrap: "anywhere",
  },
  sourceNote: { marginTop: "1rem", color: colors.muted, fontSize: "0.92rem" },
  reviewerSection: {
    marginTop: "1.35rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surface,
  },
  positioningSection: {
    marginTop: "1.5rem",
    padding: "0.35rem 0.25rem 0.35rem 1rem",
    borderLeft: `2px solid ${colors.ruleStrong}`,
    color: colors.inkSoft,
  },
};

function resolveText(value, lang) {
  if (typeof value === "string") return value;
  return lang === "ja" ? value.ja : value.en;
}

function MetaItem({ label, value }) {
  return (
    <div style={styles.metaItem}>
      <strong>{label}</strong>
      <div style={styles.mono}>{value}</div>
    </div>
  );
}

function EvidenceSources({ t }) {
  return (
    <section style={styles.sourceCard} aria-label={t("PoCソースリンク", "PoC source links")}>
      <p style={styles.eyebrow}>{t("公開証跡", "Public proof")}</p>
      <h3 style={styles.h3}>{t("必要な人だけがPoCソースを開ける", "PoC sources stay available without dominating the demo")}</h3>
      <p>{t("初見では価値と判断結果を優先し、GitHub上の実装・PoCリンクは折りたたんで表示します。", "First-time readers see value and outcomes first; GitHub implementation and PoC links remain available inside the disclosure below.")}</p>
      <details style={styles.lightDetail}>
        <summary style={styles.lightDetailSummary}>{t("PoC source links", "PoC source links")}</summary>
        <ul style={styles.sourceLinks}>
          {evidenceSourceLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer noopener" style={styles.sourceLink}>
                {link.label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p style={styles.sourceNote}>
          {t(
            "これらのリンクは実装およびPoC文脈を示すものです。本番導入、規制認証、第三者監査承認を示すものではありません。",
            "These links provide implementation and PoC context. They do not imply production deployment, regulatory certification, or third-party audit approval."
          )}
        </p>
      </details>
    </section>
  );
}

export default function DemoPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find((item) => item.id === selectedScenarioId) || scenarios[0];

  return (
    <PageShell
      label={{ ja: "PUBLIC DEMO", en: "PUBLIC DEMO" }}
      title={{ ja: "VERITAS Mission Control Demo", en: "VERITAS Mission Control Demo" }}
      subtitle={{
        ja: "1day PoCとMission Controlの考え方をもとに、AIエージェントの実行前ガバナンスを外向けに体験できる静的デモです。",
        en: "A public static demo based on the 1-Day PoC and Mission Control flow, showing pre-execution governance for AI agents.",
      }}
      ctas={[
        { label: { ja: "AML/KYC PoCを見る", en: "View AML/KYC PoC" }, href: "/aml-kyc-poc" },
        { label: { ja: "仕組みを見る", en: "How it works" }, href: "/how-it-works" },
      ]}
    >
      {(t, lang) => (
        <>
          <section style={styles.valueSummary}>
            <p style={styles.eyebrow}>{t("価値サマリー", "Value summary")}</p>
            <h2 style={styles.h2}>
              {t("AIの実行が企業の結果になる前に止まる", "AI action stopped before business consequence")}
            </h2>
            <p style={styles.valueLead}>
              {t(
                "VERITASは、AIエージェントが規制・金融・業務上の結果に企業を拘束する前に、その実行が許可されているかを判定します。",
                "VERITAS shows whether an AI agent is allowed to act before it can bind the enterprise to a regulated, financial, or operational consequence."
              )}
            </p>
          </section>

          <section style={styles.notice}>
            <strong>{t("注意:", "Note:")}</strong>{" "}
            {t(
              "これはVERITAS OSのPoC fixtureおよびレビュアー向け証拠構造に基づく公開シミュレーションデモです。本番金融導入、規制認証、第三者監査承認を示すものではありません。",
              "This is a public simulation demo based on VERITAS OS PoC fixtures and reviewer evidence structure. It does not represent a production financial deployment, regulatory certification, or third-party audit approval."
            )}
          </section>

          <section style={styles.scenarioSwitcher} aria-labelledby="scenario-switcher-title">
            <div style={styles.scenarioSwitcherHeader}>
              <h2 id="scenario-switcher-title" style={styles.scenarioSwitcherTitle}>
                {t("シナリオを選択", "Select a scenario")}
              </h2>
              <p style={styles.scenarioSwitcherHelp}>
                {t("タップして判定例を切り替え", "Tap to switch decision examples")}
              </p>
            </div>
            <div
              className="demo-scenario-tabs"
              role="group"
              aria-label={t("デモシナリオ", "Demo scenarios")}
              style={styles.scenarioTabs}
            >
              {scenarios.map((item) => {
                const active = item.id === selectedScenarioId;
                const statusText = active
                  ? t("選択中", "Selected")
                  : t("表示する", "Show");

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`demo-scenario-tab${active ? " is-active" : ""}`}
                    onClick={() => setSelectedScenarioId(item.id)}
                    aria-pressed={active}
                  >
                    <span className="demo-scenario-tab-copy">
                      <span className="demo-scenario-tab-label">
                        {resolveText(item.shortLabel, lang)}
                      </span>
                      <span className="demo-scenario-tab-description">
                        {resolveText(item.title, lang)}
                      </span>
                    </span>
                    <span className="demo-scenario-tab-status" aria-hidden="true">
                      {statusText}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section style={styles.demoGrid}>
            <article style={styles.panel}>
              <p style={styles.eyebrow}>1 / AI Agent Request</p>
              <h2 style={styles.h2}>{resolveText(scenario.title, lang)}</h2>
              <p>{resolveText(scenario.agentRequest, lang)}</p>
              <details style={styles.lightDetail}>
                <summary style={styles.lightDetailSummary}>
                  {t("Request technical context", "Request technical context")}
                </summary>
                <div style={styles.metaGrid}>
                  <MetaItem label="action_class" value={scenario.actionClass} />
                  <MetaItem label="requested_scope" value={scenario.requestedScope} />
                  <MetaItem label="customer_risk_context" value={scenario.riskContext} />
                </div>
              </details>
            </article>

            <article style={styles.panel}>
              <p style={styles.eyebrow}>2 / VERITAS Governance Check</p>
              <h2 style={styles.h2}>{t("実行前チェック", "Pre-execution checks")}</h2>
              <p>{t("VERITASは、AIが実行する前に、権限・承認・ポリシー・bind範囲を確認します。", "VERITAS checks authority, approval, policy, and bind coverage before the AI action executes.")}</p>
              <div style={styles.checks}>
                {scenario.checks.map((check) => (
                  <div key={check.label} style={styles.check}>
                    <strong>{check.label}</strong>
                    <span style={styles.status(check.tone)}>{check.status}</span>
                  </div>
                ))}
              </div>
            </article>

            <article style={styles.panelDark}>
              <p style={styles.darkEyebrow}>3 / Decision + Evidence Chain</p>
              <section style={{ marginTop: 0 }}>
                <strong style={styles.decisionSectionTitle}>{t("Result", "Result")}</strong>
                <span style={styles.decisionBadge(scenario.decisionTone)}>{scenario.decision}</span>
              </section>
              <section style={styles.decisionSection}>
                <strong style={styles.decisionSectionTitle}>
                  {t("VERITASがこう判定した理由", "Why VERITAS decided this")}
                </strong>
                <h2 style={styles.h2}>{formatReasonCode(scenario.reasonCode)}</h2>
                <p>{resolveText(scenario.reason, lang)}</p>
              </section>
              <section style={styles.decisionSection}>
                <strong style={styles.decisionSectionTitle}>
                  {t("何が防止または許可されたか", "What was prevented or allowed")}
                </strong>
                <p>{resolveText(scenario.businessImpact, lang)}</p>
              </section>
              <section style={styles.decisionSection}>
                <strong style={styles.decisionSectionTitle}>
                  {t("生成された監査証跡", "Audit proof generated")}
                </strong>
                <p>
                  {t(
                    "判定、実行意図、bind receiptをEvidence Chainとして保存し、後続監査で追跡できるようにします。",
                    "VERITAS stores the decision, execution intent, and bind receipt as an Evidence Chain for later audit."
                  )}
                </p>
              </section>
              <details style={styles.detail}>
                <summary style={styles.detailSummary}>
                  {t("Technical evidence details", "Technical evidence details")}
                </summary>
                <ul style={styles.evidenceList}>
                  {technicalEvidenceKeys.map((key) => (
                    <li key={key} style={styles.evidenceItem}>
                      <strong style={styles.evidenceLabel}>{key}</strong>
                      <span style={styles.mono}>
                        {key === "reason_code" ? scenario.reasonCode : scenario.evidence[key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          </section>

          <section style={styles.reviewerSection}>
            <p style={styles.eyebrow}>4 / Reviewer Evidence Packet</p>
            <h2 style={styles.h2}>{t("レビュアーが確認すること", "What the reviewer inspects")}</h2>
            <p>{t("このデモは、Mission Controlでレビュアーが見るべき観点を簡略化して表示しています。", "This demo simplifies the reviewer-facing points that Mission Control should make visible.")}</p>
            <ol style={styles.steps}>
              {scenario.reviewerSteps.map((step) => (
                <li key={resolveText(step, lang)}>{resolveText(step, lang)}</li>
              ))}
            </ol>
            <EvidenceSources t={t} />
          </section>

          <section style={styles.positioningSection}>
            <p style={styles.eyebrow}>5 / Positioning</p>
            <h2 style={styles.h2}>{t("このデモで伝えるVERITASの核", "Core point this demo communicates")}</h2>
            <p>{t("VERITASはAIの返答をきれいにするガードレールではなく、AIが実行する直前に、誰が・どの権限で・どのルールに基づき許可したかを証拠化するcontrol planeです。", "VERITAS is not a guardrail for polishing AI responses. It is a control plane that records who authorized an AI action, under what authority, and under which rule before execution.")}</p>
          </section>
        </>
      )}
    </PageShell>
  );
}
