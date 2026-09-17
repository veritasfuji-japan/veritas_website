const routeMetadata = [
  {
    path: "/",
    jaTitle: "VERITAS OS — AIエージェントのための判断ガバナンス",
    enTitle: "VERITAS OS — Decision Governance for AI Agents",
    jaDescription:
      "VERITAS OSは、AIエージェントの実行前ガバナンス、証跡を踏まえた制御、レビュアー向けの監査可能性に焦点を当てたDecision GovernanceとBind-Boundary Control Planeです。",
    enDescription:
      "VERITAS OS is a Decision Governance and Bind-Boundary Control Plane for AI agents, focused on pre-execution governance, evidence-aware control, and reviewer-facing auditability.",
  },
  {
    path: "/demo",
    jaTitle: "VERITAS OS Demo — 実行前ガバナンスの公開シミュレーション",
    enTitle: "VERITAS OS Demo — Public Simulation of Pre-Execution Governance",
    jaDescription:
      "AIエージェントの判断が実行に進む前に、Authority Evidence、Human Approval、Policy、Bind Coverageを確認し、allow / hold / review / block に分岐する流れを示す公開デモです。",
    enDescription:
      "A public simulation showing how VERITAS checks Authority Evidence, Human Approval, Policy, and Bind Coverage before an AI action proceeds.",
  },
  {
    path: "/enterprise",
    jaTitle: "VERITAS OS Enterprise — AI実行前の判断境界",
    enTitle: "VERITAS OS Enterprise — Decision Boundaries Before AI Execution",
    jaDescription:
      "AIエージェントが業務上の結果に近づく前に、権限、証跡、承認、ポリシーを確認するための企業向け判断ガバナンスの考え方を示します。",
    enDescription:
      "An enterprise-oriented overview of checking authority, evidence, approval, and policy before AI-agent actions approach business consequences.",
  },
  {
    path: "/how-it-works",
    jaTitle: "VERITAS OS — 仕組みと判断フロー",
    enTitle: "VERITAS OS — How the Decision Flow Works",
    jaDescription:
      "判断、native v2認可、一回限りの消費、実行直前確認、限定sandboxでのTLS送信・照合・事後証跡の流れと検証範囲を説明します。",
    enDescription:
      "Follow the controlled sandbox path from decision and native v2 authorization through single-use consumption, current checks, TLS dispatch, reconciliation, and receipts.",
  },
  {
    path: "/aml-kyc-poc",
    jaTitle: "VERITAS OS AML/KYC PoC — 実行前ガバナンスの評価入口",
    enTitle: "VERITAS OS AML/KYC PoC — Evaluation Entry for Pre-Execution Governance",
    jaDescription:
      "AML/KYCに近い判断場面を題材に、AIエージェントの実行前確認、保留、レビュー、ブロックの流れを安全に評価するためのPoC概要です。",
    enDescription:
      "A PoC overview for safely evaluating pre-execution checks, holds, reviews, and blocks in AML/KYC-adjacent AI-agent decision scenarios.",
  },
  {
    path: "/concepts",
    jaTitle: "VERITAS OS Concepts — 承認はコミットではない",
    enTitle: "VERITAS OS Concepts — Approval Is Not Commitment",
    jaDescription:
      "AIエージェントの承認、実行意図、外部システムへのコミットを分けて扱うVERITAS OSの中心概念を説明します。",
    enDescription:
      "A concise explanation of the VERITAS OS concept that separates approval, execution intent, and commitment to external systems.",
  },
  {
    path: "/glossary",
    jaTitle: "VERITAS OS Glossary — 判断ガバナンス用語集",
    enTitle: "VERITAS OS Glossary — Decision Governance Terms",
    jaDescription:
      "Authority Evidence、Bind Coverage、Decision Packetなど、VERITAS OSの判断ガバナンスで使う用語を平易に整理します。",
    enDescription:
      "Plain-language definitions for VERITAS OS terms such as Authority Evidence, Bind Coverage, and Decision Packet.",
  },
  {
    path: "/faq",
    jaTitle: "VERITAS OS FAQ — 評価前によくある質問",
    enTitle: "VERITAS OS FAQ — Questions Before Evaluation",
    jaDescription:
      "VERITAS OSの位置づけ、評価方法、公開リポジトリで確認できる証跡、法務・規制上の非主張についてのFAQです。",
    enDescription:
      "Frequently asked questions about VERITAS OS positioning, evaluation, public repository evidence, and legal or regulatory non-claims.",
  },
  {
    path: "/reviewers",
    jaTitle: "VERITAS OS Reviewers — 外部レビューの入口",
    enTitle: "VERITAS OS Reviewers — External Review Entry Point",
    jaDescription:
      "VERITAS OSの実装時点と根拠を確認。限定E2E、TrustLog一次保存、外部時刻、NeoMundi・CAGE連携の検証範囲と未解決事項を示します。",
    enDescription:
      "Review source-pinned implementation evidence and limits for controlled E2E, TrustLog publication, external clock evidence, and NeoMundi / CAGE interoperability.",
  },
  {
    path: "/contact",
    jaTitle: "VERITAS OS お問い合わせ — PoC評価・レビュー相談",
    enTitle: "VERITAS OS Contact — PoC Evaluation and Review Inquiry",
    jaDescription:
      "VERITAS OS のPoC評価、技術レビュー、外部評価、共同研究に関する初回連絡ページです。1つのAI判断経路をもとに、証跡、権限、ポリシー、allow / hold / review / block の分岐を相談できます。",
    enDescription:
      "Contact VERITAS OS for PoC evaluation, technical review, external assessment, or research collaboration. Start with one AI-agent decision path and map evidence, authority, policy, and allow / hold / review / block behavior.",
  },
];

const routeMetadataByPath = new Map(
  routeMetadata.map((metadata) => [metadata.path, metadata]),
);

routeMetadataByPath.set("/reviewer", routeMetadataByPath.get("/reviewers"));

export const defaultRouteMeta = routeMetadataByPath.get("/");

export function normalizeRoutePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export function getRouteMeta(pathname) {
  return (
    routeMetadataByPath.get(normalizeRoutePath(pathname)) || defaultRouteMeta
  );
}

export default routeMetadata;

