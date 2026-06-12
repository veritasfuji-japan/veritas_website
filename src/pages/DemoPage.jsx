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

const styles = {
  notice: { marginTop: "1rem", padding: "0.85rem 1rem", border: "1px solid #C9C2AE", background: "#FAF6EB", color: "#2A2D33", fontSize: "0.95rem" },
  scenarioTabs: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: "0.75rem", marginTop: "1.25rem" },
  tabButton: (active) => ({ border: active ? "2px solid #15161A" : "1px solid #DDD7C5", background: active ? "#15161A" : "#FAF6EB", color: active ? "#FAF6EB" : "#15161A", padding: "0.85rem", textAlign: "left", cursor: "pointer", minHeight: "4.5rem" }),
  demoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(17rem, 1fr))", gap: "1rem", marginTop: "1rem" },
  panel: { border: "1px solid #DDD7C5", background: "#FAF6EB", padding: "1rem", minHeight: "100%" },
  panelDark: { border: "1px solid #1A1F2E", background: "#15161A", color: "#FAF6EB", padding: "1rem", minHeight: "100%" },
  eyebrow: { fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5A5C62", margin: "0 0 0.5rem" },
  darkEyebrow: { fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#BFC7D5", margin: "0 0 0.5rem" },
  h2: { fontFamily: "'Fraunces', 'Times New Roman', serif", margin: "0 0 0.65rem", lineHeight: 1.2 },
  metaGrid: { display: "grid", gap: "0.55rem", marginTop: "1rem" },
  metaItem: { borderTop: "1px solid #DDD7C5", paddingTop: "0.55rem" },
  mono: { fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "0.85rem", overflowWrap: "anywhere" },
  checks: { display: "grid", gap: "0.6rem", marginTop: "0.75rem" },
  check: { display: "flex", justifyContent: "space-between", gap: "0.75rem", border: "1px solid #DDD7C5", background: "#FFFDF7", padding: "0.65rem" },
  status: (tone) => ({ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", color: tone === "pass" ? "#0E7E73" : tone === "fail" ? "#8C1F2F" : "#8A5A00", fontSize: "0.78rem", textTransform: "uppercase", whiteSpace: "nowrap" }),
  decisionBadge: (tone) => ({ display: "inline-block", border: "1px solid currentColor", padding: "0.35rem 0.6rem", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", letterSpacing: "0.06em", color: tone === "allowed" ? "#72E0C8" : tone === "blocked" ? "#FFB0B8" : "#FFD27A", marginBottom: "0.75rem" }),
  evidenceList: { display: "grid", gap: "0.55rem", marginTop: "0.75rem" },
  evidenceItem: { borderTop: "1px solid rgba(250,246,235,0.24)", paddingTop: "0.55rem" },
  steps: { marginTop: "1rem", paddingLeft: "1.2rem" },
  section: { marginTop: "1rem", padding: "1rem", border: "1px solid #DDD7C5", background: "#FDFDFC" },
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
        { label: { ja: "GitHubで確認", en: "Validate on GitHub" }, href: "https://github.com/veritasfuji-japan/veritas_os" },
      ]}
    >
      {(t, lang) => (
        <>
          <section style={styles.notice}>
            <strong>{t("注意:", "Note:")}</strong>{" "}
            {t(
              "これはVERITAS OSのPoC fixtureおよびレビュアー向け証拠構造に基づく公開シミュレーションデモです。本番金融導入、規制認証、第三者監査承認を示すものではありません。",
              "This is a public simulation demo based on VERITAS OS PoC fixtures and reviewer evidence structure. It does not represent a production financial deployment, regulatory certification, or third-party audit approval."
            )}
          </section>

          <section style={styles.scenarioTabs} aria-label={t("デモシナリオ", "Demo scenarios")}>
            {scenarios.map((item) => {
              const active = item.id === selectedScenarioId;
              return (
                <button key={item.id} type="button" onClick={() => setSelectedScenarioId(item.id)} style={styles.tabButton(active)} aria-pressed={active}>
                  <span style={{ display: "block", ...styles.mono }}>{resolveText(item.shortLabel, lang)}</span>
                  <span style={{ display: "block", marginTop: "0.4rem" }}>{resolveText(item.title, lang)}</span>
                </button>
              );
            })}
          </section>

          <section style={styles.demoGrid}>
            <article style={styles.panel}>
              <p style={styles.eyebrow}>1 / AI Agent Request</p>
              <h2 style={styles.h2}>{resolveText(scenario.title, lang)}</h2>
              <p>{resolveText(scenario.agentRequest, lang)}</p>
              <div style={styles.metaGrid}>
                <MetaItem label="action_class" value={scenario.actionClass} />
                <MetaItem label="requested_scope" value={scenario.requestedScope} />
                <MetaItem label="customer_risk_context" value={scenario.riskContext} />
              </div>
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
              <span style={styles.decisionBadge(scenario.decisionTone)}>{scenario.decision}</span>
              <h2 style={styles.h2}>{scenario.reasonCode}</h2>
              <p>{resolveText(scenario.reason, lang)}</p>
              <div style={styles.evidenceList}>
                {Object.entries(scenario.evidence).map(([key, value]) => (
                  <div key={key} style={styles.evidenceItem}>
                    <strong>{key}</strong>
                    <div style={styles.mono}>{value}</div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section style={styles.section}>
            <p style={styles.eyebrow}>4 / Reviewer Evidence Packet</p>
            <h2 style={styles.h2}>{t("レビュアーが確認すること", "What the reviewer inspects")}</h2>
            <p>{t("このデモは、Mission Controlでレビュアーが見るべき観点を簡略化して表示しています。", "This demo simplifies the reviewer-facing points that Mission Control should make visible.")}</p>
            <ol style={styles.steps}>
              {scenario.reviewerSteps.map((step) => (
                <li key={resolveText(step, lang)}>{resolveText(step, lang)}</li>
              ))}
            </ol>
          </section>

          <section style={styles.section}>
            <p style={styles.eyebrow}>5 / Positioning</p>
            <h2 style={styles.h2}>{t("このデモで伝えるVERITASの核", "Core point this demo communicates")}</h2>
            <p>{t("VERITASはAIの返答をきれいにするガードレールではなく、AIが実行する直前に、誰が・どの権限で・どのルールに基づき許可したかを証拠化するcontrol planeです。", "VERITAS is not a guardrail for polishing AI responses. It is a control plane that records who authorized an AI action, under what authority, and under which rule before execution.")}</p>
          </section>
        </>
      )}
    </PageShell>
  );
}
