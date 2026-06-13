import { useMemo, useState } from "react";

import PageShell from "../components/PageShell.jsx";

const links = {
  core: "https://github.com/veritasfuji-japan/veritas_os",
  implementationMatrix: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/validation/current-implementation-matrix.md",
  reviewerEntrypoint: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/REVIEWER_ENTRYPOINT.md",
  pocQuickstart: "https://github.com/veritasfuji-japan/veritas_os/blob/main/docs/en/guides/poc-pack-financial-quickstart.md",
  demo: "/demo",
  poc: "/aml-kyc-poc",
};

const makeText = (ja, en) => ({ ja, en });

const heroCtas = [
  { label: makeText("コアリポジトリを開く", "Open Core Repository"), href: links.core },
  { label: makeText("現在の実装マトリクスを見る", "View Current Implementation Matrix"), href: links.implementationMatrix },
  { label: makeText("デモを見る", "View Demo"), href: links.demo },
];

const quickIndex = [
  { id: "implemented-core", label: makeText("実装済み中核用語", "Implemented core terms") },
  { id: "evidence-approval", label: makeText("証跡・承認", "Evidence and approval") },
  { id: "bind-lineage", label: makeText("Bind boundary", "Bind lineage") },
  { id: "poc-reviewer", label: makeText("PoC・Reviewer", "PoC and reviewer terms") },
  { id: "governance-outcomes", label: makeText("Outcome", "Decision outcomes") },
  { id: "caution-terms", label: makeText("注意が必要な用語", "Caution terms") },
];

const glossarySections = [
  {
    id: "implemented-core",
    kicker: makeText("CURRENT", "CURRENT"),
    title: makeText("Currently implemented terms", "Currently implemented terms"),
    intro: makeText(
      "現在の veritas_os で中核として扱う用語です。",
      "Terms treated as core in the current veritas_os scope.",
    ),
    terms: [
      {
        anchor: "decision-governance-bind-boundary-control-plane",
        name: makeText("Decision Governance and Bind-Boundary Control Plane", "Decision Governance and Bind-Boundary Control Plane"),
        definition: makeText(
          "AIエージェントの判断を、実行前にガバナンス境界へ通すためのVERITAS OSの現在の中心ポジショニング。",
          "The current VERITAS OS positioning: a control plane that routes AI-agent decisions through governance before execution.",
        ),
        status: ["Implemented", "Positioning"],
      },
      {
        anchor: "v1-decide",
        name: makeText("/v1/decide", "/v1/decide"),
        definition: makeText(
          "VERITASの中核判断API。AI判断を、ポリシー、証跡、FUJI gate、TrustLog連携の監査向け文脈へ通す入口。",
          "The core VERITAS decision API. It routes AI-agent decisions through policy, evidence, FUJI gate, and TrustLog-linked audit context.",
        ),
        status: ["Implemented"],
      },
      {
        anchor: "fuji-gate",
        name: makeText("FUJI gate", "FUJI gate"),
        definition: makeText(
          "不十分・不正・危険・証跡不足の判断経路を fail-closed で止めるゲート。",
          "A gate that can fail closed for insufficient, invalid, unsafe, or under-evidenced decision paths.",
        ),
        status: ["Implemented"],
      },
      {
        anchor: "trustlog",
        name: makeText("TrustLog", "TrustLog"),
        definition: makeText(
          "判断、証跡、経路を後から確認できるようにする記録層。なぜ allow / hold / review / block になったかを追跡する。",
          "A record layer for decisions, evidence, and decision paths. It helps reviewers inspect why an outcome became allow, hold, review, or block.",
        ),
        status: ["Implemented", "Audit-facing"],
      },
      {
        anchor: "mission-control",
        name: makeText("Mission Control", "Mission Control"),
        definition: makeText(
          "governance snapshot、artifact panel、audit link flow などを見せるオペレーター / レビュアー向けUI。",
          "An operator/reviewer-facing UI surface for governance snapshots, artifact panels, and audit link flows.",
        ),
        note: makeText(
          "本番顧客運用が検証済みという意味ではありません。",
          "This does not mean verified production customer operation.",
        ),
        status: ["Implemented", "Partial"],
      },
    ],
  },
  {
    id: "evidence-approval",
    kicker: makeText("EVIDENCE", "EVIDENCE"),
    title: makeText("Evidence and approval terms", "Evidence and approval terms"),
    intro: makeText(
      "local/offline の証跡とレビュアー向け検証で使う用語です。",
      "Terms used for local/offline artifacts and reviewer-facing validation.",
    ),
    terms: [
      {
        anchor: "authority-evidence",
        name: makeText("Authority Evidence", "Authority Evidence"),
        definition: makeText(
          "ある行為がなぜ許可可能なのかを示す権限証跡。local/offline adapter が payload を正規化し、scope を検証する。",
          "Evidence explaining why an action may be authorized. A local/offline adapter normalizes payloads and validates scope.",
        ),
        status: ["Implemented", "Local-offline"],
      },
      {
        anchor: "human-approval-receipt",
        name: makeText("Human Approval Receipt", "Human Approval Receipt"),
        definition: makeText(
          "誰が、どのscopeを、いつまで承認したかを示す local/offline の承認証跡。実IdP、SSO、IAM、電子署名連携を意味しない。",
          "A local/offline approval artifact showing who approved which scope and until when. It does not imply real IdP, SSO, IAM, or e-signature integration.",
        ),
        status: ["Implemented", "Local-offline"],
      },
      {
        anchor: "outcome-receipt",
        name: makeText("Outcome Receipt", "Outcome Receipt"),
        definition: makeText(
          "governed execution attempt の結果を記録する local/offline 証跡。final outcome、commit/block/rollback状態、observed effects などを扱う。",
          "A local/offline evidence artifact recording governed execution results, including final outcome, commit/block/rollback state, and observed effects.",
        ),
        status: ["Implemented", "Local-offline"],
      },
      {
        anchor: "evidence-chain-manifest",
        name: makeText("Evidence Chain Manifest", "Evidence Chain Manifest"),
        definition: makeText(
          "判断、証跡、承認、結果のつながりを後から検証できるようにまとめるmanifest。",
          "A manifest that connects decisions, evidence, approvals, and outcomes so the chain can be reviewed later.",
        ),
        status: ["Implemented", "Reviewer-facing"],
      },
      {
        anchor: "evidence-chain-verifier",
        name: makeText("Evidence Chain Verifier", "Evidence Chain Verifier"),
        definition: makeText(
          "Evidence Chain の整合性を確認する検証器。local/offline のレビュー・検証用途として扱う。",
          "A verifier for checking Evidence Chain consistency, used in local/offline review and validation flows.",
        ),
        status: ["Implemented", "Reviewer-facing"],
      },
    ],
  },
  {
    id: "bind-lineage",
    kicker: makeText("BOUNDARY", "BOUNDARY"),
    title: makeText("Bind boundary / lineage terms", "Bind boundary / lineage terms"),
    intro: makeText(
      "判断から実行commitへ向かう前の境界とlineageを分けて説明します。",
      "Terms that separate decision lineage from real-world execution commit.",
    ),
    terms: [
      {
        anchor: "bind-boundary",
        name: makeText("Bind boundary", "Bind boundary"),
        definition: makeText(
          "判断や承認が、現実世界への実行commitへ進む前に通過する境界。証跡、権限、ポリシー、失敗理由を確認する。",
          "The boundary a decision crosses before it becomes real-world execution. It checks evidence, authority, policy, and failure reasons.",
        ),
        status: ["Implemented", "Partial coverage"],
      },
      {
        anchor: "bind-receipt",
        name: makeText("Bind receipt", "Bind receipt"),
        definition: makeText(
          "bind boundary を通過した、または止められた結果を示す証跡。decision → execution_intent → bind_receipt のlineageに含まれる。",
          "An artifact representing the result of a bind-boundary decision. It belongs to the decision → execution_intent → bind_receipt lineage.",
        ),
        status: ["Implemented", "Partial coverage"],
      },
      {
        anchor: "execution-intent",
        name: makeText("Execution intent", "Execution intent"),
        definition: makeText(
          "AI判断が現実世界の実行へ進もうとする意図を表す中間artifact。commit前に検証されるべき対象。",
          "An intermediate artifact representing the intent to move from decision toward real-world execution. It should be evaluated before commit.",
        ),
        status: ["Implemented", "Bind lineage"],
      },
      {
        anchor: "commit",
        name: makeText("Commit", "Commit"),
        definition: makeText(
          "AI判断が外部システム、業務処理、規制対象アクションなど、現実世界の結果に接続される段階。",
          "The stage where an AI-agent decision connects to an external system, business process, regulated action, or real-world consequence.",
        ),
        status: ["Concept", "Governance boundary"],
      },
    ],
  },
  {
    id: "poc-reviewer",
    kicker: makeText("POC", "POC"),
    title: makeText("PoC / reviewer-facing terms", "PoC / reviewer-facing terms"),
    intro: makeText(
      "PoCやfixtureは、本番統合ではなく deterministic / fixture-backed proof path として扱います。",
      "PoC and fixture terms are treated as deterministic / fixture-backed proof paths, not live integrations.",
    ),
    compact: true,
    terms: [
      {
        anchor: "aml-kyc-beachhead-poc",
        name: makeText("AML/KYC beachhead PoC", "AML/KYC beachhead PoC"),
        definition: makeText(
          "deterministic fixture-backed なAML/KYC評価経路。実銀行統合や実制裁API接続を意味しない。",
          "A deterministic fixture-backed AML/KYC evaluation path. It does not imply live bank integration or real sanctions API connection.",
        ),
        status: ["Implemented", "PoC"],
      },
      {
        anchor: "one-day-poc-evidence-pack",
        name: makeText("One-Day PoC Evidence Pack", "One-Day PoC Evidence Pack"),
        definition: makeText(
          "外部レビュー向けに、PoCの入力、判断、証跡、結果を確認しやすくまとめた証跡パック。",
          "A reviewer-facing evidence pack organizing PoC inputs, decisions, evidence, and outcomes for inspection.",
        ),
        status: ["Reviewer-facing", "PoC"],
      },
      {
        anchor: "reviewer-evidence-packet",
        name: makeText("Reviewer Evidence Packet", "Reviewer Evidence Packet"),
        definition: makeText(
          "レビュアーが判断根拠、承認範囲、Evidence Chain、PoC境界を確認するためのパケット。",
          "A packet for reviewers to inspect rationale, approval scope, Evidence Chain, and PoC boundaries.",
        ),
        status: ["Reviewer-facing"],
      },
      {
        anchor: "policy-fixture",
        name: makeText("Policy fixture", "Policy fixture"),
        definition: makeText(
          "PoCやテストで使う、想定ポリシーを表す固定データ。",
          "Fixed test data representing expected policy in a PoC or test.",
        ),
        status: ["PoC", "Test"],
      },
      {
        anchor: "evidence-fixture",
        name: makeText("Evidence fixture", "Evidence fixture"),
        definition: makeText(
          "PoCやテストで使う、想定証跡を表す固定データ。",
          "Fixed test data representing expected evidence in a PoC or test.",
        ),
        status: ["PoC", "Test"],
      },
      {
        anchor: "failure-reason",
        name: makeText("Failure reason", "Failure reason"),
        definition: makeText(
          "hold / review / block になった理由。なぜ止まったのかを理解するための情報。",
          "The reason an outcome became hold, review, or block.",
        ),
        status: ["Reviewer-facing"],
      },
    ],
  },
  {
    id: "evaluation-governance",
    kicker: makeText("EVALUATION", "EVALUATION"),
    title: makeText("Evaluation Governance terms", "Evaluation Governance terms"),
    intro: makeText(
      "v1では非強制のレビュアー向けartifact chainとして扱います。",
      "In v1, these are non-enforcing reviewer-facing artifacts.",
    ),
    compact: true,
    terms: [
      {
        anchor: "evaluation-governance",
        name: makeText("Evaluation Governance", "Evaluation Governance"),
        definition: makeText(
          "評価関数、評価receipt、drift、trajectory、legitimacy impact などを外部レビュー可能にするartifact chain。v1では /v1/decide の挙動を自動変更しない。",
          "A reviewer-facing artifact chain for evaluation functions, receipts, drift, trajectory movement, and legitimacy impact. In v1 it does not automatically change /v1/decide behavior.",
        ),
        status: ["Reviewer-facing", "Non-enforcing v1"],
      },
      {
        anchor: "evaluation-receipt",
        name: makeText("Evaluation Receipt", "Evaluation Receipt"),
        definition: makeText(
          "評価結果を後から確認できるようにするためのレビュアー向けartifact。",
          "A reviewer-facing artifact for later inspection of evaluation results.",
        ),
        status: ["Reviewer-facing"],
      },
      {
        anchor: "evaluation-drift",
        name: makeText("Evaluation Drift", "Evaluation Drift"),
        definition: makeText(
          "評価条件や評価結果が時間とともに変化していないかを確認する観点。",
          "A review concern for whether evaluation conditions or results have shifted over time.",
        ),
        status: ["Reviewer-facing"],
      },
    ],
  },
];

const outcomeTerms = [
  {
    name: makeText("Allow / Proceed", "Allow / Proceed"),
    definition: makeText(
      "必要な証跡と条件が満たされ、次の段階へ進める判断。無制限の実行許可ではない。",
      "Required evidence and conditions are satisfied enough to move forward. It is not unlimited permission.",
    ),
  },
  {
    name: makeText("Hold", "Hold"),
    definition: makeText(
      "情報や証跡が不足しており、一時的に進行を止める判断。",
      "A pause because information or evidence is incomplete.",
    ),
  },
  {
    name: makeText("Review", "Review"),
    definition: makeText(
      "不確実性やリスクがあり、人間または外部レビュアーの確認が必要な判断。",
      "An outcome requiring human or external review due to uncertainty or risk.",
    ),
  },
  {
    name: makeText("Block", "Block"),
    definition: makeText(
      "条件、証跡、ポリシー、権限などが満たされず、実行へ進めない判断。",
      "The action should not proceed because requirements are not satisfied.",
    ),
  },
  {
    name: makeText("Fail-closed", "Fail-closed"),
    definition: makeText(
      "曖昧、不十分、不正、危険な状態では黙って進めず、安全側に倒して止める設計。",
      "Ambiguous, insufficient, invalid, or unsafe conditions stop rather than silently proceed.",
    ),
  },
];

const cautionTerms = [
  {
    name: makeText("Production path", "Production path"),
    definition: makeText(
      "PostgreSQL production path などの文書は存在しても、特定顧客環境での本番保証やSLAを意味しない。HA/DR、運用、セキュリティは環境依存です。",
      "Documentation may describe a PostgreSQL production path, but this does not imply customer-specific production guarantees or SLA. HA/DR, operations, and security depend on deployment.",
    ),
    status: ["Prepared", "Not certified"],
  },
  {
    name: makeText("Implemented / Partial", "Implemented / Partial"),
    definition: makeText(
      "リポジトリ上で実装・文書化されているが、すべての顧客環境・全経路で検証済みという意味ではない。",
      "Implemented or documented in the repository, but not necessarily validated across every customer environment or every route.",
    ),
    status: ["Implemented", "Partial"],
  },
  {
    name: makeText("PoC", "PoC"),
    definition: makeText(
      "deterministic または fixture-backed な検証経路。実外部システム統合とは区別する。",
      "A deterministic or fixture-backed proof path, distinct from live external-system integration.",
    ),
    status: ["PoC"],
  },
  {
    name: makeText("Prepared / Not certified", "Prepared / Not certified"),
    definition: makeText(
      "レビューや本番準備のための資料・構造はあるが、第三者認証や規制承認を意味しない。",
      "Materials and structures exist for review or preparation, but they do not imply third-party certification or regulatory approval.",
    ),
    status: ["Prepared", "Not certified"],
  },
];

const nonClaims = [
  makeText("法的助言を意味しない", "They do not mean legal advice"),
  makeText("規制当局の承認を意味しない", "They do not mean regulatory approval"),
  makeText("第三者認証を意味しない", "They do not mean third-party certification"),
  makeText("すべてのリスクを自動で消すことを意味しない", "They do not automatically eliminate all risk"),
  makeText("特定企業での本番利用可能性を単独で証明するものではない", "They do not independently prove production readiness for a specific enterprise"),
  makeText(
    "実銀行、実制裁API、実IdP、実顧客システムとの接続を意味しない限り、明示されたPoCまたはlocal/offline範囲として扱う",
    "Unless explicitly stated, they do not imply live bank, sanctions API, IdP, or customer-system integration",
  ),
];

const nextCtas = [
  { label: makeText("現在の実装マトリクスを見る", "View Current Implementation Matrix"), href: links.implementationMatrix },
  { label: makeText("外部レビュー入口を見る", "View Reviewer Entrypoint"), href: links.reviewerEntrypoint },
  { label: makeText("AML/KYC PoCを見る", "View AML/KYC PoC"), href: links.pocQuickstart },
  { label: makeText("デモを見る", "View Demo"), href: links.demo },
  { label: makeText("コアリポジトリを開く", "Open Core Repository"), href: links.core },
];

const getText = (value, lang) => (lang === "ja" ? value.ja : value.en);
const normalize = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();

function GlossaryLink({ cta, lang, className = "glossary-button" }) {
  const external = cta.href.startsWith("http");

  return (
    <a
      className={className}
      href={cta.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {getText(cta.label, lang)}
    </a>
  );
}

function StatusTags({ status }) {
  return (
    <div className="glossary-status-row" aria-label="Status tags">
      {status.map((tag) => (
        <span className="glossary-status" key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function TermCard({ term, lang, compact = false }) {
  return (
    <article className={`glossary-term-card${compact ? " glossary-term-card-compact" : ""}`} id={term.anchor}>
      <div>
        <h3>{getText(term.name, lang)}</h3>
        <p>{getText(term.definition, lang)}</p>
        {term.note && <p className="glossary-note">{getText(term.note, lang)}</p>}
      </div>
      <StatusTags status={term.status} />
    </article>
  );
}

function filterTerms(terms, query, sectionTitle) {
  if (!query) {
    return terms;
  }

  return terms.filter((term) => {
    const searchable = [
      term.name.ja,
      term.name.en,
      term.definition.ja,
      term.definition.en,
      sectionTitle.ja,
      sectionTitle.en,
      ...(term.status || []),
      term.note?.ja || "",
      term.note?.en || "",
    ].join(" ");

    return normalize(searchable).includes(query);
  });
}

const styles = `
  .glossary-page {
    padding-bottom: 2.5rem;
  }

  .glossary-hero-note,
  .glossary-section-intro,
  .glossary-next-note {
    color: #4A4D54;
    max-width: 54rem;
  }

  .glossary-hero-note {
    margin: 0.6rem 0 0;
  }

  .glossary-cta-row,
  .glossary-next-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .glossary-button,
  .glossary-index-link {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    border: 1px solid #CFC6B1;
    border-radius: 999px;
    background: #FFFDF7;
    color: #15161A;
    text-decoration: none;
  }

  .glossary-button {
    padding: 0.45rem 0.85rem;
  }

  .glossary-search-panel,
  .glossary-section,
  .glossary-outcomes,
  .glossary-caution,
  .glossary-non-claims,
  .glossary-next {
    margin-top: 1.25rem;
    border: 1px solid #DDD7C5;
    border-radius: 18px;
    background: rgba(250, 246, 235, 0.72);
  }

  .glossary-search-panel {
    padding: 1rem;
  }

  .glossary-search-label {
    display: block;
    margin-bottom: 0.35rem;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5A5C62;
  }

  .glossary-search-input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #CFC6B1;
    border-radius: 14px;
    background: #FFFDF7;
    color: #15161A;
    font: inherit;
    padding: 0.72rem 0.85rem;
  }

  .glossary-search-input:focus {
    outline: 3px solid rgba(36, 86, 199, 0.18);
    border-color: #2456C7;
  }

  .glossary-index {
    display: flex;
    gap: 0.55rem;
    margin-top: 0.9rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
  }

  .glossary-index-link {
    flex: 0 0 auto;
    padding: 0.4rem 0.75rem;
    font-size: 0.92rem;
    white-space: nowrap;
  }

  .glossary-section,
  .glossary-outcomes,
  .glossary-caution,
  .glossary-non-claims,
  .glossary-next {
    padding: 1rem;
  }

  .glossary-section-header {
    display: grid;
    gap: 0.2rem;
    margin-bottom: 0.85rem;
  }

  .glossary-kicker {
    margin: 0;
    color: #5A5C62;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.72rem;
    letter-spacing: 0.11em;
  }

  .glossary-section h2,
  .glossary-outcomes h2,
  .glossary-caution h2,
  .glossary-next h2 {
    margin: 0;
    color: #0B3D5B;
    font-family: 'Fraunces', 'Times New Roman', serif;
    font-size: clamp(1.15rem, 1rem + 0.8vw, 1.6rem);
    line-height: 1.2;
  }

  .glossary-section-intro {
    margin: 0.25rem 0 0;
  }

  .glossary-term-grid,
  .glossary-outcome-grid,
  .glossary-caution-grid {
    display: grid;
    gap: 0.7rem;
  }

  .glossary-term-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  }

  .glossary-term-card,
  .glossary-outcome-card,
  .glossary-caution-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.65rem;
    border: 1px solid #E3DDCC;
    border-radius: 14px;
    background: #FFFDF7;
    padding: 0.85rem;
  }

  .glossary-term-card h3,
  .glossary-outcome-card h3,
  .glossary-caution-card h3 {
    margin: 0;
    color: #15161A;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.96rem;
    line-height: 1.35;
  }

  .glossary-term-card p,
  .glossary-outcome-card p,
  .glossary-caution-card p {
    margin: 0.38rem 0 0;
    color: #2A2D33;
    font-size: 0.94rem;
    line-height: 1.58;
  }

  .glossary-term-card-compact {
    padding: 0.78rem;
  }

  .glossary-note {
    color: #6D4E00 !important;
    font-size: 0.9rem !important;
  }

  .glossary-status-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .glossary-status {
    border: 1px solid #D8D0BD;
    border-radius: 999px;
    background: #F4EFE3;
    color: #44474E;
    font-family: 'IBM Plex Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    line-height: 1;
    padding: 0.24rem 0.42rem;
  }

  .glossary-outcome-grid,
  .glossary-caution-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 13.5rem), 1fr));
    margin-top: 0.85rem;
  }

  .glossary-caution {
    border-color: #D5B15A;
    background: #FCF5E3;
  }

  .glossary-caution-card {
    background: #FFF9EA;
  }

  .glossary-non-claims {
    padding: 0;
    overflow: hidden;
  }

  .glossary-non-claims summary {
    cursor: pointer;
    padding: 1rem;
    color: #0B3D5B;
    font-family: 'Fraunces', 'Times New Roman', serif;
    font-size: clamp(1.1rem, 1rem + 0.7vw, 1.45rem);
  }

  .glossary-non-claims ul {
    margin: 0;
    padding: 0 1rem 1rem 2.2rem;
  }

  .glossary-empty {
    border: 1px dashed #CFC6B1;
    border-radius: 14px;
    padding: 0.85rem;
    background: #FFFDF7;
    color: #4A4D54;
  }

  @media (max-width: 720px) {
    .glossary-page {
      padding-bottom: 5.5rem;
    }

    .glossary-cta-row,
    .glossary-next-actions {
      display: grid;
    }

    .glossary-button {
      justify-content: center;
      min-height: 2.75rem;
      text-align: center;
    }

    .glossary-section,
    .glossary-outcomes,
    .glossary-caution,
    .glossary-next,
    .glossary-search-panel {
      border-radius: 14px;
      padding: 0.85rem;
    }

    .glossary-term-grid,
    .glossary-outcome-grid,
    .glossary-caution-grid {
      gap: 0.6rem;
    }

    .glossary-term-card h3,
    .glossary-outcome-card h3,
    .glossary-caution-card h3 {
      font-size: 0.92rem;
    }
  }
`;

export default function GlossaryPage() {
  const [searchValue, setSearchValue] = useState("");

  const normalizedQuery = useMemo(() => normalize(searchValue), [searchValue]);
  const visibleSections = glossarySections
    .map((section) => ({
      ...section,
      terms: filterTerms(section.terms, normalizedQuery, section.title),
    }))
    .filter((section) => !normalizedQuery || section.terms.length > 0);
  const visibleOutcomes = filterTerms(
    outcomeTerms.map((term) => ({ ...term, status: ["Outcome"] })),
    normalizedQuery,
    makeText("Governance outcome terms", "Governance outcome terms"),
  );
  const visibleCautions = filterTerms(
    cautionTerms,
    normalizedQuery,
    makeText("注意が必要な用語", "Terms that require caution"),
  );
  const hasResults = visibleSections.length > 0 || visibleOutcomes.length > 0 || visibleCautions.length > 0;

  return (
    <PageShell
      label={{ ja: "用語集", en: "GLOSSARY" }}
      pageTitle={{ ja: "VERITAS OS 用語集", en: "VERITAS OS Glossary" }}
      title={{ ja: "VERITAS OS 用語集", en: "VERITAS OS Glossary" }}
      subtitle={{
        ja: "VERITAS OS の現在の実装、PoC、レビュー証跡に関係する用語を、短く確認できるように整理します。",
        en: "A concise glossary of terms used across the current VERITAS OS implementation, PoC flows, and reviewer-facing evidence.",
      }}
    >
      {(_, lang) => (
        <div className="glossary-page">
          <style>{styles}</style>
          <p className="glossary-hero-note">
            {getText(
              makeText(
                "この用語集は、現在の veritas_os リポジトリ上の実装・PoC・レビュー資料に合わせて整理されています。",
                "This glossary is aligned with the current implementation, PoC scope, and reviewer materials in the veritas_os repository.",
              ),
              lang,
            )}
          </p>
          <div className="glossary-cta-row" aria-label={lang === "ja" ? "主要リンク" : "Primary links"}>
            {heroCtas.map((cta) => <GlossaryLink cta={cta} key={cta.href} lang={lang} />)}
          </div>

          <section className="glossary-search-panel" aria-labelledby="glossary-search-title">
            <label className="glossary-search-label" htmlFor="glossary-search" id="glossary-search-title">
              {lang === "ja" ? "用語を検索" : "Search terms"}
            </label>
            <input
              className="glossary-search-input"
              id="glossary-search"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={lang === "ja" ? "例: FUJI, approval, PoC, 証跡" : "Try: FUJI, approval, PoC, evidence"}
              type="search"
              value={searchValue}
            />
            <nav className="glossary-index" aria-label={lang === "ja" ? "カテゴリ索引" : "Category index"}>
              {quickIndex.map((item) => (
                <a className="glossary-index-link" href={`#${item.id}`} key={item.id}>
                  {getText(item.label, lang)}
                </a>
              ))}
            </nav>
          </section>

          {visibleSections.map((section) => (
            <section className="glossary-section" id={section.id} key={section.id}>
              <header className="glossary-section-header">
                <p className="glossary-kicker">{getText(section.kicker, lang)}</p>
                <h2>{getText(section.title, lang)}</h2>
                <p className="glossary-section-intro">{getText(section.intro, lang)}</p>
              </header>
              <div className="glossary-term-grid">
                {section.terms.map((term) => (
                  <TermCard compact={section.compact} key={term.anchor} lang={lang} term={term} />
                ))}
              </div>
            </section>
          ))}

          {!hasResults && normalizedQuery && (
            <p className="glossary-empty">
              {lang === "ja" ? "一致する用語がありません。検索語を短くして再度確認してください。" : "No matching terms. Try a shorter search term."}
            </p>
          )}

          {visibleOutcomes.length > 0 && (
            <section className="glossary-outcomes" id="governance-outcomes">
              <header className="glossary-section-header">
                <p className="glossary-kicker">OUTCOMES</p>
                <h2>{lang === "ja" ? "Governance outcome terms" : "Governance outcome terms"}</h2>
                <p className="glossary-section-intro">
                  {lang === "ja" ? "判断結果は短く読み、無制限の実行許可と混同しないようにします。" : "Decision outcomes are kept concise and should not be confused with unlimited execution permission."}
                </p>
              </header>
              <div className="glossary-outcome-grid">
                {visibleOutcomes.map((term) => (
                  <article className="glossary-outcome-card" key={term.name.en}>
                    <h3>{getText(term.name, lang)}</h3>
                    <p>{getText(term.definition, lang)}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {visibleCautions.length > 0 && (
            <section className="glossary-caution" id="caution-terms">
              <header className="glossary-section-header">
                <p className="glossary-kicker">CAUTION</p>
                <h2>{lang === "ja" ? "注意が必要な用語" : "Terms that require caution"}</h2>
                <p className="glossary-section-intro">
                  {lang === "ja" ? "実装、PoC、準備資料、認証の境界を混同しないための補足です。" : "Notes to avoid confusing implementation, PoC, preparation material, and certification boundaries."}
                </p>
              </header>
              <div className="glossary-caution-grid">
                {visibleCautions.map((term) => (
                  <article className="glossary-caution-card" key={term.name.en}>
                    <div>
                      <h3>{getText(term.name, lang)}</h3>
                      <p>{getText(term.definition, lang)}</p>
                    </div>
                    <StatusTags status={term.status} />
                  </article>
                ))}
              </div>
            </section>
          )}

          <details className="glossary-non-claims">
            <summary>{lang === "ja" ? "これらの用語が意味しないこと" : "What these terms do not mean"}</summary>
            <ul>
              {nonClaims.map((claim) => <li key={claim.en}>{getText(claim, lang)}</li>)}
            </ul>
          </details>

          <section className="glossary-next">
            <header className="glossary-section-header">
              <p className="glossary-kicker">NEXT</p>
              <h2>{lang === "ja" ? "次に読むページ" : "Next pages"}</h2>
              <p className="glossary-next-note">
                {lang === "ja"
                  ? "本サイト上の用語説明は、veritas_os リポジトリ上の実装・PoC・レビュー資料と照合して確認してください。"
                  : "Glossary definitions on this site should be cross-checked against implementation, PoC, and reviewer materials in the veritas_os repository."}
              </p>
            </header>
            <div className="glossary-next-actions">
              {nextCtas.map((cta) => <GlossaryLink cta={cta} key={cta.href} lang={lang} />)}
            </div>
          </section>
        </div>
      )}
    </PageShell>
  );
}
