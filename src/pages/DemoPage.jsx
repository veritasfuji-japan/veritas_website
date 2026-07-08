import { useState } from "react";
import PageShell from "../components/PageShell.jsx";

const scenarios = [
  {
    id: "aml-kyc-authority-missing",
    scenarioName: { ja: "AML / KYC Review", en: "AML / KYC Review" },
    title: { ja: "高リスクAML/KYC判断：Authority Evidence不足", en: "High-risk AML/KYC decision: missing Authority Evidence" },
    shortLabel: { ja: "AML/KYC", en: "AML/KYC" },
    agentRequest: {
      ja: "AIエージェントが、高リスク国に関係する顧客のKYC判断を自動承認しようとしています。",
      en: "An AI agent attempts to auto-approve a KYC decision involving high-risk-country exposure.",
    },
    actionClass: "regulated_aml_kyc_action",
    riskType: "AML/KYC authority gap",
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
      fixture: "pilot_aml_kyc_anchor_high_risk_country",
    },
    reviewerSteps: [
      { ja: "Authority Evidenceの発行元と権限スコープを確認する。", en: "Check the Authority Evidence issuer and authority scope." },
      { ja: "コンプライアンス担当者の承認Receiptが必要か確認する。", en: "Confirm whether a compliance-officer approval receipt is required." },
      { ja: "不足証跡を補完するまで、AIに実行を許可しない。", en: "Do not allow AI execution until the missing evidence is supplied." },
    ],
  },
  {
    id: "payment-sanctions-manual-review",
    scenarioName: { ja: "Payment Approval", en: "Payment Approval" },
    title: { ja: "支払承認：制裁リスト部分一致で人間レビューへ", en: "Payment approval: sanctions partial match escalated to human review" },
    shortLabel: { ja: "支払承認", en: "Payment Approval" },
    agentRequest: {
      ja: "AIエージェントが、制裁リストに部分一致した顧客への支払いを進めようとしています。",
      en: "An AI agent attempts to proceed with a customer payment after a partial sanctions-list match.",
    },
    actionClass: "payment_sanctions_screening_action",
    riskType: "Sanctions payment risk",
    riskContext: "PARTIAL_SANCTIONS_MATCH + FALSE_POSITIVE_NOT_RESOLVED",
    requestedScope: "release_payment_hold",
    decision: "ESCALATED",
    decisionTone: "escalated",
    reasonCode: "HUMAN_REVIEW_REQUIRED",
    reason: {
      ja: "制裁リスクが曖昧なため、AI単独では支払いを進めず、人間レビューに回します。",
      en: "Sanctions risk is ambiguous, so VERITAS prevents silent payment release and routes to human review.",
    },
    businessImpact: {
      ja: "AIは、制裁リスクが人間レビューを必要とする状況で、支払いを静かにリリースできませんでした。",
      en: "The AI could not silently release a payment where sanctions risk required human review.",
    },
    checks: [
      { label: "Authority Evidence", status: "present", tone: "pass" },
      { label: "Human Approval Receipt", status: "required", tone: "warn" },
      { label: "Policy Admissibility", status: "manual review", tone: "warn" },
      { label: "Bind Coverage", status: "held", tone: "warn" },
    ],
    evidence: {
      decision_id: "dec_payment_sanctions_2026_014",
      execution_intent_id: "intent_payment_sanctions_partial_match_014",
      bind_receipt_id: "bind_rcpt_payment_hold_014",
      audit_path: "trustlog/payments/sanctions/partial-match/manual-review",
      fixture: "demo_payment_sanctions_partial_match_hold",
    },
    reviewerSteps: [
      { ja: "部分一致の根拠とfalse positive判定の有無を確認する。", en: "Review the partial-match basis and whether false-positive resolution exists." },
      { ja: "人間レビュー完了までpayment releaseを許可しない。", en: "Do not release the payment until human review is completed." },
      { ja: "レビュー結果をEvidence Chainに追加する。", en: "Append the review result to the Evidence Chain." },
    ],
  },
  {
    id: "access-control-scoped-read-allow",
    scenarioName: { ja: "Access Control", en: "Access Control" },
    title: { ja: "アクセス制御：十分な証跡で条件付き許可", en: "Access control: sufficient evidence allows scoped execution" },
    shortLabel: { ja: "アクセス制御", en: "Access Control" },
    agentRequest: {
      ja: "AIエージェントが、必要な証跡・承認・ポリシー条件が揃った一時アクセスを付与しようとしています。",
      en: "An AI agent attempts to grant temporary access where required evidence, approval, and policy conditions are present.",
    },
    actionClass: "scoped_access_control_action",
    riskType: "Privileged access scope",
    riskContext: "LOW_RISK + REQUIRED_EVIDENCE_PRESENT",
    requestedScope: "grant_time_limited_read_access",
    decision: "ALLOWED",
    decisionTone: "allowed",
    reasonCode: "POLICY_AND_EVIDENCE_SATISFIED",
    reason: {
      ja: "必要な証跡、承認、ポリシー条件が揃っているため、Evidence Chainを残して実行を許可します。",
      en: "Required evidence, approval, and policy conditions are satisfied, so VERITAS allows execution with an Evidence Chain.",
    },
    businessImpact: {
      ja: "AIは、権限・承認・ポリシー・bind coverageが満たされた範囲でのみアクセス付与を許可されました。",
      en: "The AI was allowed to grant access only inside the scope where authority, approval, policy, and bind coverage were satisfied.",
    },
    checks: [
      { label: "Authority Evidence", status: "present", tone: "pass" },
      { label: "Human Approval Receipt", status: "accepted", tone: "pass" },
      { label: "Policy Admissibility", status: "satisfied", tone: "pass" },
      { label: "Bind Coverage", status: "covered", tone: "pass" },
    ],
    evidence: {
      decision_id: "dec_access_control_2026_027",
      execution_intent_id: "intent_access_control_scoped_read_027",
      bind_receipt_id: "bind_rcpt_access_allow_027",
      audit_path: "trustlog/access-control/scoped-read/sufficient-evidence/proceed",
      fixture: "demo_access_control_scoped_read_allow",
    },
    reviewerSteps: [
      { ja: "Evidence ChainのID・時刻・適用ポリシーを確認する。", en: "Inspect the Evidence Chain ID, timestamp, and applied policy." },
      { ja: "実行許可が定義済みスコープ内か確認する。", en: "Confirm that allowed execution remains inside the defined scope." },
      { ja: "後続監査用に判定結果とbind receiptを保存する。", en: "Store the decision result and bind receipt for later audit." },
    ],
  },
  {
    id: "contract-review-policy-hold",
    scenarioName: { ja: "Contract Review", en: "Contract Review" },
    title: { ja: "契約レビュー：未承認条項で署名前に保留", en: "Contract review: unapproved clause held before signature" },
    shortLabel: { ja: "契約レビュー", en: "Contract Review" },
    agentRequest: {
      ja: "AIエージェントが、未承認の責任制限条項を含む契約ドラフトを署名に回そうとしています。",
      en: "An AI agent attempts to route a contract draft with an unapproved liability clause for signature.",
    },
    actionClass: "contract_signature_routing_action",
    riskType: "Contract authority and policy",
    riskContext: "UNAPPROVED_CLAUSE + LEGAL_REVIEW_REQUIRED",
    requestedScope: "route_contract_for_signature",
    decision: "ESCALATED",
    decisionTone: "escalated",
    reasonCode: "LEGAL_REVIEW_REQUIRED",
    reason: {
      ja: "未承認条項が含まれるため、署名に進む前に法務レビューへ回します。",
      en: "The draft contains an unapproved clause, so VERITAS routes it to legal review before signature.",
    },
    businessImpact: {
      ja: "AIは、法務レビューなしに契約を署名プロセスへ進めることを許可されませんでした。",
      en: "The AI was not allowed to move the contract into signature without legal review.",
    },
    checks: [
      { label: "Authority Evidence", status: "present", tone: "pass" },
      { label: "Human Approval Receipt", status: "legal required", tone: "warn" },
      { label: "Policy Admissibility", status: "manual review", tone: "warn" },
      { label: "Bind Coverage", status: "held", tone: "warn" },
    ],
    evidence: {
      decision_id: "dec_contract_2026_033",
      execution_intent_id: "intent_contract_signature_033",
      bind_receipt_id: "bind_rcpt_hold_033",
      audit_path: "trustlog/contracts/unapproved-clause/legal-review",
      fixture: "demo_contract_review_policy_hold",
    },
    reviewerSteps: [
      { ja: "未承認条項と該当する契約ポリシーを確認する。", en: "Review the unapproved clause and applicable contract policy." },
      { ja: "法務承認receiptがEvidence Chainに追加されるまで署名ルートを保留する。", en: "Hold signature routing until the legal approval receipt is added to the Evidence Chain." },
      { ja: "レビュー結果とbind receiptをレビュアー証跡に保存する。", en: "Store the review outcome and bind receipt in reviewer evidence." },
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

const reviewerDocLinks = {
  overview: {
    label: "Reviewer Evidence Overview",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-assurance-overview.md",
  },
  packet: {
    label: "Reviewer Packet",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/reviewer-evidence-packet.md",
  },
  failureCatalog: {
    label: "Failure Reason Catalog",
    href: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/demo/examples/reviewer-failure-reason-catalog-v1/reviewer-failure-reason-catalog.generated.example.md",
  },
};

const walkthroughSteps = [
  {
    label: "AI / Agent Output",
    purpose: { ja: "AIが提案した業務アクションを、まだ実行せずに捕捉します。", en: "Capture the business action proposed by the AI before any execution occurs." },
    inputs: ["agentRequest", "action_class", "requested_scope"],
    outputs: ["raw AI proposal", "governance input candidate"],
    why: { ja: "AIの出力と企業を拘束する実行を分離するためです。", en: "It separates AI output from an enterprise-binding action." },
    docs: ["overview"],
  },
  {
    label: "Decision Candidate",
    purpose: { ja: "AI提案を、検査可能な意思決定候補へ正規化します。", en: "Normalize the AI proposal into an inspectable decision candidate." },
    inputs: ["raw AI proposal", "riskContext"],
    outputs: ["decision_id", "reason_code candidate"],
    why: { ja: "レビュアーが同じ粒度で判断を追跡できるようにします。", en: "Reviewers can trace the decision at a stable level of detail." },
    docs: ["overview", "failureCatalog"],
  },
  {
    label: "Governance Evaluation",
    purpose: { ja: "権限、承認、ポリシー、bind coverageを実行前に確認します。", en: "Check authority, approval, policy, and bind coverage before execution." },
    inputs: ["decision candidate", "policy requirements", "scenario checks"],
    outputs: ["ALLOWED / ESCALATED / BLOCKED", "reason_code"],
    why: { ja: "不十分な経路をfail-closedで止めるためです。", en: "Insufficient paths can fail closed instead of silently proceeding." },
    docs: ["overview", "failureCatalog"],
  },
  {
    label: "Authority Evidence",
    purpose: { ja: "そのアクションを許可できる根拠とスコープを確認します。", en: "Verify the basis and scope for authorizing the action." },
    inputs: ["authority source", "requested_scope"],
    outputs: ["authority status", "scope match / gap"],
    why: { ja: "権限のないAIアクションを防ぐためです。", en: "It prevents AI actions without sufficient authority." },
    docs: ["overview", "packet"],
  },
  {
    label: "Human Approval",
    purpose: { ja: "必要な場合、人間の承認receiptをEvidence Chainに加えます。", en: "Add a human approval receipt to the Evidence Chain when required." },
    inputs: ["review requirement", "approval receipt"],
    outputs: ["accepted / required / not accepted"],
    why: { ja: "人間が関与すべき判断をAI単独で進めないためです。", en: "Decisions requiring a human do not proceed on AI output alone." },
    docs: ["packet"],
  },
  {
    label: "Evidence Chain",
    purpose: { ja: "判断、理由、承認、bind receiptを追跡可能な証跡として蓄積します。", en: "Accumulate the decision, rationale, approvals, and bind receipt as traceable evidence." },
    inputs: ["decision_id", "reason_code", "approval status"],
    outputs: ["audit_path", "evidence chain entries"],
    why: { ja: "後続レビューで、何がなぜ許可または停止されたかを再確認するためです。", en: "Later review can reconstruct what was allowed or stopped and why." },
    docs: ["overview", "packet"],
  },
  {
    label: "Bind Boundary",
    highlight: true,
    purpose: { ja: "AI出力と実行コミットの境界を明確にします。", en: "Make the boundary between AI output and execution commit explicit." },
    inputs: ["governance result", "bind coverage"],
    outputs: ["bind_receipt_id", "proceed / hold / block boundary"],
    why: { ja: "VERITASはAI出力を直接実行しません。実行はガバナンス検証が成功した後だけ発生します。", en: "VERITAS does not execute AI output directly. Execution occurs only after governance validation succeeds." },
    docs: ["overview", "packet"],
  },
  {
    label: "Execution Intent",
    purpose: { ja: "許可済みスコープ内の実行意図を記録します。", en: "Record the execution intent inside the authorized scope." },
    inputs: ["allowed decision", "requested_scope"],
    outputs: ["execution_intent_id"],
    why: { ja: "実行前の意図と許可範囲を結び付けるためです。", en: "It links pre-execution intent to the authorized boundary." },
    docs: ["packet"],
  },
  {
    label: "Outcome Receipt",
    purpose: { ja: "実行可能な場合も結果receiptを証跡に残します。", en: "When execution can proceed, retain the outcome receipt as evidence." },
    inputs: ["execution intent", "bind receipt"],
    outputs: ["outcome receipt"],
    why: { ja: "承認された意図と結果の対応をレビュー可能にするためです。", en: "Reviewers can compare the authorized intent with the outcome." },
    docs: ["packet"],
  },
  {
    label: "Reviewer Evidence Packet",
    purpose: { ja: "レビュアー向けに判断結果、証跡、検証サマリをまとめます。", en: "Package decision outcomes, evidence, and verification summaries for reviewers." },
    inputs: ["Evidence Chain", "checks", "reason_code"],
    outputs: ["reviewer packet"],
    why: { ja: "外部レビューで必要な情報を一箇所に集約するためです。", en: "External review gets a consolidated evidence view." },
    docs: ["packet", "failureCatalog"],
  },
  {
    label: "Validation Report",
    purpose: { ja: "パケットと証跡が期待される構造に合うか検証します。", en: "Validate that the packet and evidence match the expected structure." },
    inputs: ["reviewer packet", "failure catalog"],
    outputs: ["validation report"],
    why: { ja: "判断を説明するだけでなく、検証可能にするためです。", en: "The decision is not only explained; it is made verifiable." },
    docs: ["overview", "failureCatalog"],
  },
];

const reviewerJourneySteps = [
  {
    label: { ja: "シナリオを選択", en: "Select a scenario" },
    href: "#scenario-switcher-title",
    body: {
      ja: "レビューしたいAI判断パターンを選び、以降の証跡ビューを切り替えます。",
      en: "Choose the AI decision pattern you want to review and use it to drive the evidence views below.",
    },
  },
  {
    label: { ja: "ガバナンス結果を比較", en: "Compare governance outcomes" },
    href: "#scenario-comparison-title",
    body: {
      ja: "各シナリオが許可、保留、ブロックのどれに進むかを横並びで確認します。",
      en: "See side-by-side whether each scenario is allowed, held for review, or blocked.",
    },
  },
  {
    label: { ja: "Reviewer Evidence Packetを確認", en: "Inspect the Reviewer Evidence Packet" },
    href: "#reviewer-evidence-packet-title",
    body: {
      ja: "判断理由、証跡ID、Bind Boundaryの結果がレビュアー向けにどうまとまるかを確認します。",
      en: "Review how rationale, evidence IDs, and the Bind Boundary result are packaged for reviewers.",
    },
  },
  {
    label: { ja: "Validation Reportを見る", en: "Review the Validation Report" },
    href: "#validation-report-title",
    body: {
      ja: "証跡パケットの必須フィールドとガバナンス一貫性のサマリーを確認します。",
      en: "Check the required packet fields and governance-consistency summary.",
    },
  },
  {
    label: { ja: "実行ガバナンスパイプラインをたどる", en: "Walk through the execution governance pipeline" },
    href: "#walkthrough-title",
    body: {
      ja: "AI出力がDecision Candidateから証跡化された判断へ進む流れをステップごとに追います。",
      en: "Follow how an AI output moves from Decision Candidate to an evidence-backed decision.",
    },
  },
];

const evidenceProgression = [
  "Decision",
  "Approval",
  "Evidence Chain",
  "Reviewer Packet",
  "Validation Report",
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
  reviewerJourney: {
    marginTop: "1.3rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surfaceRaised,
    boxShadow: "0 18px 40px rgba(80, 64, 35, 0.08)",
  },
  reviewerJourneyHeader: {
    display: "grid",
    gap: "0.45rem",
    maxWidth: "62rem",
  },
  reviewerJourneyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(12.5rem, 1fr))",
    gap: "0.75rem",
    marginTop: "1rem",
  },
  reviewerJourneyCard: {
    display: "grid",
    gap: "0.5rem",
    alignContent: "start",
    padding: "0.95rem",
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.compact,
    background: colors.surface,
    color: colors.inkSoft,
    textDecoration: "none",
  },
  reviewerJourneyNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.85rem",
    height: "1.85rem",
    borderRadius: "999px",
    background: colors.darkSurface,
    color: colors.surface,
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: "0.8rem",
    fontWeight: 800,
  },
  reviewerJourneyTitle: {
    color: colors.ink,
    fontWeight: 800,
    lineHeight: 1.3,
  },
  reviewerJourneyBody: {
    margin: 0,
    fontSize: "0.9rem",
    lineHeight: 1.55,
  },
  reviewerJourneyLink: {
    color: "#1D4F91",
    fontSize: "0.85rem",
    fontWeight: 800,
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
  comparisonSection: {
    marginTop: "1.5rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surfaceRaised,
  },
  comparisonTableWrap: {
    marginTop: "1rem",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },
  comparisonTable: {
    width: "100%",
    minWidth: "58rem",
    borderCollapse: "collapse",
    fontSize: "0.88rem",
  },
  comparisonTh: {
    padding: "0.7rem 0.6rem",
    borderBottom: `2px solid ${colors.ruleStrong}`,
    color: colors.ink,
    textAlign: "left",
    verticalAlign: "bottom",
  },
  comparisonTd: (active) => ({
    padding: "0.7rem 0.6rem",
    borderBottom: `1px solid ${colors.rule}`,
    background: active ? colors.notice : "transparent",
    color: colors.inkSoft,
    verticalAlign: "top",
  }),
  comparisonCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
    gap: "0.8rem",
    marginTop: "1rem",
  },
  comparisonCard: (active) => ({
    padding: "1rem",
    border: `1px solid ${active ? colors.noticeRule : colors.rule}`,
    borderRadius: radii.compact,
    background: active ? colors.notice : colors.surface,
    textAlign: "left",
    cursor: "pointer",
    boxShadow: active ? "0 12px 24px rgba(80, 64, 35, 0.12)" : "none",
  }),
  comparisonCardTitle: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.6rem",
    alignItems: "baseline",
    marginBottom: "0.55rem",
  },
  comparisonCardMeta: {
    display: "grid",
    gap: "0.35rem",
    margin: "0.7rem 0 0",
    fontSize: "0.86rem",
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
  packetPanel: {
    marginTop: "1.5rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surface,
    boxShadow: "0 18px 40px rgba(80, 64, 35, 0.08)",
  },
  packetHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "0.8rem",
  },
  packetReadiness: {
    margin: "1rem 0 0",
    padding: "0.8rem 0.9rem",
    border: `1px solid ${colors.ruleStrong}`,
    borderRadius: radii.compact,
    background: colors.notice,
    color: colors.inkSoft,
  },
  packetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
    gap: "0.7rem 1rem",
    marginTop: "1rem",
  },
  primaryCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    width: "fit-content",
    padding: "0.7rem 0.9rem",
    borderRadius: "999px",
    background: colors.darkSurface,
    color: colors.surface,
    fontWeight: 800,
    textDecoration: "none",
  },
  reviewerSection: {
    marginTop: "1.35rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surface,
  },
  walkthroughSection: {
    marginTop: "1.5rem",
    padding: spacing.surface,
    border: `1px solid ${colors.rule}`,
    borderRadius: radii.surface,
    background: colors.surfaceRaised,
  },
  walkthroughLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(13rem, 0.85fr) minmax(18rem, 1.35fr)",
    gap: "1rem",
    marginTop: "1rem",
  },
  walkthroughSteps: { display: "grid", gap: "0.45rem" },
  walkthroughButton: (active, highlight) => ({
    padding: "0.7rem 0.8rem",
    border: `1px solid ${active ? colors.darkSurface : highlight ? colors.noticeRule : colors.rule}`,
    borderRadius: radii.compact,
    background: active ? colors.darkSurface : highlight ? colors.notice : colors.surface,
    color: active ? colors.surface : colors.ink,
    textAlign: "left",
    cursor: "pointer",
    fontWeight: active || highlight ? 800 : 700,
  }),
  walkthroughCard: (highlight) => ({
    padding: spacing.surface,
    border: `1px solid ${highlight ? colors.noticeRule : colors.rule}`,
    borderRadius: radii.surface,
    background: highlight ? colors.notice : colors.surface,
  }),
  walkthroughMeta: { display: "grid", gap: "0.75rem", marginTop: "1rem" },
  chipList: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" },
  chip: {
    padding: "0.25rem 0.5rem",
    border: `1px solid ${colors.ruleStrong}`,
    borderRadius: "999px",
    background: colors.surfaceRaised,
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    fontSize: "0.76rem",
  },
  docLinks: { display: "flex", flexWrap: "wrap", gap: "0.55rem", marginTop: "0.6rem" },
  evidenceProgression: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    alignItems: "center",
    margin: "1rem 0 0",
    padding: 0,
    listStyle: "none",
  },
  evidenceProgressionItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: colors.inkSoft,
    fontWeight: 800,
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

function getCheckStatus(scenario, label) {
  return scenario.checks.find((check) => check.label === label)?.status || "n/a";
}

function getDecisionStatusTone(decisionTone) {
  if (decisionTone === "allowed") return "pass";
  if (decisionTone === "blocked") return "fail";
  return "warn";
}

function getPacketReadiness(decision, t) {
  if (decision === "BLOCKED") {
    return t(
      "BLOCKED → Packet explains missing or insufficient evidence",
      "BLOCKED → Packet explains missing or insufficient evidence"
    );
  }

  if (decision === "ESCALATED") {
    return t(
      "ESCALATED → Packet explains required human/manual review",
      "ESCALATED → Packet explains required human/manual review"
    );
  }

  return t(
    "ALLOWED → Packet explains satisfied authority, approval, policy, and bind coverage",
    "ALLOWED → Packet explains satisfied authority, approval, policy, and bind coverage"
  );
}

function getValidationStatus(decision) {
  if (decision === "ALLOWED") return "VALIDATION_PASSED";
  if (decision === "ESCALATED") return "VALIDATION_REQUIRES_REVIEW";
  return "VALIDATION_BLOCKED";
}

function getValidationInterpretation(decision, t) {
  if (decision === "BLOCKED") {
    return t(
      "BLOCKED: execution was prevented before the Bind Boundary. Missing or insufficient evidence remains visible in the reviewer packet so the gap can be corrected before any governed action proceeds.",
      "BLOCKED: execution was prevented before the Bind Boundary. Missing or insufficient evidence remains visible in the reviewer packet so the gap can be corrected before any governed action proceeds."
    );
  }

  if (decision === "ESCALATED") {
    return t(
      "ESCALATED: execution is held pending human/manual review. Reviewer action is required before the governed action can move beyond the hold state.",
      "ESCALATED: execution is held pending human/manual review. Reviewer action is required before the governed action can move beyond the hold state."
    );
  }

  return t(
    "ALLOWED: authority, approval, policy, and bind coverage were satisfied. The execution intent is within the governed scope represented by the selected scenario.",
    "ALLOWED: authority, approval, policy, and bind coverage were satisfied. The execution intent is within the governed scope represented by the selected scenario."
  );
}

function getValidationRows(scenario, t) {
  const bindBoundaryResult = getCheckStatus(scenario, "Bind Coverage");
  let normalizedBindState = "ESCALATED";

  if (bindBoundaryResult === "covered") {
    normalizedBindState = "ALLOWED";
  } else if (bindBoundaryResult === "blocked") {
    normalizedBindState = "BLOCKED";
  }

  return [
    {
      label: "decision_id present",
      passed: Boolean(scenario.evidence.decision_id),
      detail: scenario.evidence.decision_id,
    },
    {
      label: "execution_intent_id present",
      passed: Boolean(scenario.evidence.execution_intent_id),
      detail: scenario.evidence.execution_intent_id,
    },
    {
      label: "bind_receipt_id present",
      passed: Boolean(scenario.evidence.bind_receipt_id),
      detail: scenario.evidence.bind_receipt_id,
    },
    {
      label: "reason_code present",
      passed: Boolean(scenario.reasonCode),
      detail: scenario.reasonCode,
    },
    {
      label: "audit_path present",
      passed: Boolean(scenario.evidence.audit_path),
      detail: scenario.evidence.audit_path,
    },
    {
      label: "fixture present",
      passed: Boolean(scenario.evidence.fixture),
      detail: scenario.evidence.fixture,
    },
    {
      label: "governance result present",
      passed: Boolean(scenario.decision),
      detail: scenario.decision,
    },
    {
      label: "bind boundary result present",
      passed: bindBoundaryResult !== "n/a",
      detail: bindBoundaryResult,
    },
    {
      label: "decision state matches bind boundary state",
      passed: scenario.decision === normalizedBindState,
      detail: t(
        `${scenario.decision} ↔ ${bindBoundaryResult}`,
        `${scenario.decision} ↔ ${bindBoundaryResult}`
      ),
    },
    {
      label: "reviewer evidence packet fields complete",
      passed: [
        scenario.evidence.decision_id,
        scenario.evidence.execution_intent_id,
        scenario.evidence.bind_receipt_id,
        scenario.reasonCode,
        scenario.evidence.audit_path,
        scenario.evidence.fixture,
        scenario.decision,
      ].every(Boolean) && bindBoundaryResult !== "n/a",
      detail: t("required demo fields populated", "required demo fields populated"),
    },
  ];
}

function ReviewerEvidencePacketPanel({ scenario, t }) {
  const packetRows = [
    ["decision_id", scenario.evidence.decision_id],
    ["execution_intent_id", scenario.evidence.execution_intent_id],
    ["bind_receipt_id", scenario.evidence.bind_receipt_id],
    ["reason_code", scenario.reasonCode],
    ["audit_path", scenario.evidence.audit_path],
    ["fixture", scenario.evidence.fixture],
    ["governance result", scenario.decision],
    ["bind boundary result", getCheckStatus(scenario, "Bind Coverage")],
  ];

  return (
    <section style={styles.packetPanel} aria-labelledby="reviewer-evidence-packet-title">
      <div style={styles.packetHeader}>
        <div>
          <p style={styles.eyebrow}>{t("レビュアー証跡", "Reviewer Evidence")}</p>
          <h2 id="reviewer-evidence-packet-title" style={styles.h2}>
            {t("Reviewer Evidence Packet", "Reviewer Evidence Packet")}
          </h2>
        </div>
        <span style={styles.status(getDecisionStatusTone(scenario.decisionTone))}>{scenario.decision}</span>
      </div>
      <p style={styles.valueLead}>
        {t(
          "Reviewer Evidence Packetは、判断が許可・エスカレーション・ブロックされた理由と、Bind Boundaryの前に利用可能だった証跡を説明するレビュアー向けartifactです。",
          "Reviewer Evidence Packet represents the reviewer-facing artifact that explains why a decision was allowed, escalated, or blocked, and which evidence was available before the Bind Boundary."
        )}
      </p>
      <p style={styles.packetReadiness}>
        <strong>{t("Packet readiness", "Packet readiness")}:</strong> {getPacketReadiness(scenario.decision, t)}
      </p>
      <div style={styles.packetGrid}>
        {packetRows.map(([label, value]) => (
          <MetaItem key={label} label={label} value={value} />
        ))}
      </div>
      <div style={styles.docLinks}>
        <a href={reviewerDocLinks.packet.href} target="_blank" rel="noreferrer noopener" style={styles.primaryCta}>
          {t("Open Reviewer Evidence Packet", "Open Reviewer Evidence Packet")} <span aria-hidden>↗</span>
        </a>
        <a href={reviewerDocLinks.overview.href} target="_blank" rel="noreferrer noopener" style={styles.sourceLink}>
          {reviewerDocLinks.overview.label} <span aria-hidden>↗</span>
        </a>
        <a href={reviewerDocLinks.failureCatalog.href} target="_blank" rel="noreferrer noopener" style={styles.sourceLink}>
          {reviewerDocLinks.failureCatalog.label} <span aria-hidden>↗</span>
        </a>
      </div>
      <p style={styles.sourceNote}>
        {t(
          "このパネルはPoC fixturesとレビュアー向けexample artifactsを使う静的デモです。本番導入、規制認証、第三者監査承認、またはライブ顧客利用を示すものではありません。",
          "This panel is a static demo using PoC fixtures and reviewer-facing example artifacts. It does not imply production deployment, regulatory certification, third-party audit approval, or live customer use."
        )}
      </p>
    </section>
  );
}

function ValidationReportPanel({ scenario, t }) {
  const validationRows = getValidationRows(scenario, t);
  const validationStatus = getValidationStatus(scenario.decision);
  let validationTone = "warn";

  if (validationStatus === "VALIDATION_PASSED") {
    validationTone = "pass";
  } else if (validationStatus === "VALIDATION_BLOCKED") {
    validationTone = "fail";
  }

  return (
    <section style={styles.packetPanel} aria-labelledby="validation-report-title">
      <div style={styles.packetHeader}>
        <div>
          <p style={styles.eyebrow}>{t("検証サマリー", "Validation summary")}</p>
          <h2 id="validation-report-title" style={styles.h2}>
            {t("Validation Report", "Validation Report")}
          </h2>
        </div>
        <span style={styles.status(validationTone)}>{validationStatus}</span>
      </div>
      <p style={styles.valueLead}>
        {t(
          "選択中のシナリオについて、レビュアー向け証跡パケットが完全性とガバナンス一貫性の観点でどう評価されるかを示します。",
          "For the selected scenario, this shows how the reviewer-facing evidence packet is evaluated for completeness and governance consistency."
        )}
      </p>
      <p style={styles.packetReadiness}>
        <strong>{t("Scenario interpretation", "Scenario interpretation")}:</strong>{" "}
        {getValidationInterpretation(scenario.decision, t)}
      </p>
      <div style={styles.comparisonTableWrap}>
        <table className="demo-validation-table" style={styles.comparisonTable}>
          <thead>
            <tr>
              <th style={styles.comparisonTh}>{t("Check", "Check")}</th>
              <th style={styles.comparisonTh}>{t("Result", "Result")}</th>
              <th style={styles.comparisonTh}>{t("Evidence", "Evidence")}</th>
            </tr>
          </thead>
          <tbody>
            {validationRows.map((row) => (
              <tr key={row.label}>
                <td style={styles.comparisonTd(false)}><strong>{row.label}</strong></td>
                <td style={styles.comparisonTd(false)}>
                  <span style={styles.status(row.passed ? "pass" : "fail")}>
                    {row.passed ? "PASS" : "FAIL"}
                  </span>
                </td>
                <td style={styles.comparisonTd(false)}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={styles.sourceNote}>
        {t(
          "This validation summary is derived from static PoC fixtures for demonstration purposes. It does not represent production certification, regulatory approval, third-party audit approval, or live customer use.",
          "This validation summary is derived from static PoC fixtures for demonstration purposes. It does not represent production certification, regulatory approval, third-party audit approval, or live customer use."
        )}
      </p>
    </section>
  );
}

function ScenarioComparison({ lang, selectedScenarioId, setSelectedScenarioId, t }) {
  const columns = [
    t("Scenario", "Scenario"),
    t("AI / Agent Output", "AI / Agent Output"),
    t("Risk Type", "Risk Type"),
    t("Governance Result", "Governance Result"),
    t("Authority Evidence", "Authority Evidence"),
    t("Human Approval", "Human Approval"),
    t("Bind Boundary Result", "Bind Boundary Result"),
    t("Reviewer Evidence", "Reviewer Evidence"),
  ];

  return (
    <section style={styles.comparisonSection} aria-labelledby="scenario-comparison-title">
      <p style={styles.eyebrow}>{t("比較モード", "Comparison mode")}</p>
      <h2 id="scenario-comparison-title" style={styles.h2}>
        {t("Scenario Comparison", "Scenario Comparison")}
      </h2>
      <p style={styles.valueLead}>
        {t(
          "同じガバナンスモデルを、金融・アクセス・契約など複数の企業アクションに適用する例です。",
          "Examples of the same governance model applied across financial, access, and contract enterprise actions."
        )}
      </p>
      <p style={styles.notice}>
        {t(
          "これらのシナリオは同じガバナンスパターンを使います。AI出力はまずDecision Candidateとして扱われ、Bind Boundaryの前に評価され、レビュアー向け証跡にパッケージ化されます。",
          "These scenarios use the same governance pattern: AI output is first treated as a Decision Candidate, evaluated before the Bind Boundary, and then packaged into reviewer-facing evidence."
        )}
      </p>
      <div style={styles.comparisonTableWrap}>
        <table className="demo-comparison-table" style={styles.comparisonTable}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} style={styles.comparisonTh}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scenarios.map((item) => {
              const active = item.id === selectedScenarioId;
              return (
                <tr key={item.id}>
                  <td style={styles.comparisonTd(active)}><strong>{resolveText(item.scenarioName, lang)}</strong></td>
                  <td style={styles.comparisonTd(active)}>{resolveText(item.title, lang)}</td>
                  <td style={styles.comparisonTd(active)}>{item.riskType}</td>
                  <td style={styles.comparisonTd(active)}>{item.decision}</td>
                  <td style={styles.comparisonTd(active)}>{getCheckStatus(item, "Authority Evidence")}</td>
                  <td style={styles.comparisonTd(active)}>{getCheckStatus(item, "Human Approval Receipt")}</td>
                  <td style={styles.comparisonTd(active)}>{getCheckStatus(item, "Bind Coverage")}</td>
                  <td style={styles.comparisonTd(active)}>{item.evidence.audit_path}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={styles.comparisonCards}>
        {scenarios.map((item) => {
          const active = item.id === selectedScenarioId;
          return (
            <button
              key={item.id}
              type="button"
              style={styles.comparisonCard(active)}
              onClick={() => setSelectedScenarioId(item.id)}
              aria-pressed={active}
            >
              <span style={styles.comparisonCardTitle}>
                <strong>{resolveText(item.scenarioName, lang)}</strong>
                <span style={styles.status(getDecisionStatusTone(item.decisionTone))}>{item.decision}</span>
              </span>
              <span>{resolveText(item.agentRequest, lang)}</span>
              <span style={styles.comparisonCardMeta}>
                <span><strong>{t("Reason code", "Reason code")}:</strong> {item.reasonCode}</span>
                <span><strong>{t("Allowed / blocked", "Allowed / blocked")}:</strong> {resolveText(item.businessImpact, lang)}</span>
                <span><strong>{t("Evidence generated", "Evidence generated")}:</strong> {item.evidence.bind_receipt_id}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function WalkthroughDetail({ activeStep, lang, scenario, t }) {
  const step = walkthroughSteps[activeStep];
  const currentEvidence = [
    ["decision", scenario.decision],
    ["reason_code", scenario.reasonCode],
    ["decision_id", scenario.evidence.decision_id],
    ["execution_intent_id", scenario.evidence.execution_intent_id],
    ["bind_receipt_id", scenario.evidence.bind_receipt_id],
  ];

  return (
    <article style={styles.walkthroughCard(step.highlight)}>
      <p style={styles.eyebrow}>{`${t("ステップ", "Step")} ${activeStep + 1}`}</p>
      <h3 style={styles.h3}>{step.label}</h3>
      {step.highlight && (
        <p style={styles.notice}>
          <strong>{t("Bind Boundary:", "Bind Boundary:")}</strong>{" "}
          {t(
            "VERITASはAI出力を直接実行しません。実行はガバナンス検証が成功した後だけ発生します。",
            "VERITAS does not execute AI output directly. Execution occurs only after governance validation succeeds."
          )}
        </p>
      )}
      <div style={styles.walkthroughMeta}>
        <div>
          <strong>{t("目的", "Purpose")}</strong>
          <p>{resolveText(step.purpose, lang)}</p>
        </div>
        <div>
          <strong>{t("入力", "Inputs")}</strong>
          <div style={styles.chipList}>
            {step.inputs.map((item) => <span key={item} style={styles.chip}>{item}</span>)}
          </div>
        </div>
        <div>
          <strong>{t("出力", "Outputs")}</strong>
          <div style={styles.chipList}>
            {step.outputs.map((item) => <span key={item} style={styles.chip}>{item}</span>)}
          </div>
        </div>
        <div>
          <strong>{t("存在理由", "Why it exists")}</strong>
          <p>{resolveText(step.why, lang)}</p>
        </div>
        <div>
          <strong>{t("現在のシナリオ証跡", "Current scenario evidence")}</strong>
          <div style={styles.chipList}>
            {currentEvidence.map(([label, value]) => (
              <span key={label} style={styles.chip}>{`${label}: ${value}`}</span>
            ))}
          </div>
        </div>
        {step.docs.length > 0 && (
          <div>
            <strong>{t("関連ドキュメント", "Related documentation")}</strong>
            <div style={styles.docLinks}>
              {step.docs.map((docKey) => {
                const doc = reviewerDocLinks[docKey];
                return (
                  <a key={doc.href} href={doc.href} target="_blank" rel="noreferrer noopener" style={styles.sourceLink}>
                    {doc.label} <span aria-hidden>↗</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function ReviewerJourney({ lang, t }) {
  return (
    <section style={styles.reviewerJourney} aria-labelledby="reviewer-journey-title">
      <div style={styles.reviewerJourneyHeader}>
        <p style={styles.eyebrow}>{t("レビュアージャーニー", "Reviewer Journey")}</p>
        <h2 id="reviewer-journey-title" style={styles.h2}>
          {t("おすすめのレビュー順序", "Recommended review path")}
        </h2>
        <p style={styles.valueLead}>
          {t(
            "まずシナリオを選択し、VERITASがAI出力をガバナンスされた判断、レビュアー向け証跡、検証サマリーへ変換する流れを追ってください。",
            "Start by selecting a scenario, then follow how VERITAS turns an AI output into a governed decision, reviewer-facing evidence, and a validation summary."
          )}
        </p>
      </div>
      <div style={styles.reviewerJourneyGrid}>
        {reviewerJourneySteps.map((step, index) => (
          <a key={step.href} href={step.href} style={styles.reviewerJourneyCard}>
            <span style={styles.reviewerJourneyNumber}>{index + 1}</span>
            <span style={styles.reviewerJourneyTitle}>{resolveText(step.label, lang)}</span>
            <p style={styles.reviewerJourneyBody}>{resolveText(step.body, lang)}</p>
            <span style={styles.reviewerJourneyLink}>
              {t("セクションへ移動", "Jump to section")} <span aria-hidden="true">↓</span>
            </span>
          </a>
        ))}
      </div>
    </section>
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
  const [activeWalkthroughStep, setActiveWalkthroughStep] = useState(0);
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

          <ReviewerJourney lang={lang} t={t} />

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

          <ScenarioComparison
            lang={lang}
            selectedScenarioId={selectedScenarioId}
            setSelectedScenarioId={setSelectedScenarioId}
            t={t}
          />

          <ReviewerEvidencePacketPanel scenario={scenario} t={t} />

          <ValidationReportPanel scenario={scenario} t={t} />

          <section style={styles.walkthroughSection} aria-labelledby="walkthrough-title">
            <p style={styles.eyebrow}>{t("ウォークスルーモード", "Walkthrough mode")}</p>
            <h2 id="walkthrough-title" style={styles.h2}>
              {t("1つのAI判断がガバナンスパイプラインを進む流れ", "How one AI decision moves through the governance pipeline")}
            </h2>
            <p style={styles.valueLead}>
              {t(
                "各ステップを選択すると、目的、入力、出力、存在理由、関連ドキュメントを確認できます。データは現在選択中のMission Controlデモシナリオを再利用しています。",
                "Select each step to inspect its purpose, inputs, outputs, rationale, and related documentation. The walkthrough reuses the currently selected Mission Control demo scenario data."
              )}
            </p>
            <ol style={styles.evidenceProgression} aria-label={t("証跡の進行", "Evidence progression")}>
              {evidenceProgression.map((item, index) => (
                <li key={item} style={styles.evidenceProgressionItem}>
                  <span>{item}</span>
                  {index < evidenceProgression.length - 1 && <span aria-hidden="true">↓</span>}
                </li>
              ))}
            </ol>
            <div className="demo-walkthrough-layout" style={styles.walkthroughLayout}>
              <div style={styles.walkthroughSteps} role="list" aria-label={t("ウォークスルーステップ", "Walkthrough steps")}>
                {walkthroughSteps.map((step, index) => {
                  const active = index === activeWalkthroughStep;
                  return (
                    <button
                      key={step.label}
                      type="button"
                      style={styles.walkthroughButton(active, step.highlight)}
                      onClick={() => setActiveWalkthroughStep(index)}
                      aria-pressed={active}
                    >
                      {`${index + 1}. ${step.label}`}
                    </button>
                  );
                })}
              </div>
              <WalkthroughDetail activeStep={activeWalkthroughStep} lang={lang} scenario={scenario} t={t} />
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
