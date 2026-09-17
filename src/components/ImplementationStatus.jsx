import { makeT } from "../landing/landingText.js";

const SOURCE_SHA = "1c7a95ffedd4f500d12b0e0ad40babd8d6fd1f30";
const SOURCE = `https://github.com/veritasfuji-japan/veritas_os/blob/${SOURCE_SHA}/`;
const evidence = [
  {
    title: "Controlled Decision-to-Effect proof",
    ja: "実際のTLS通信とPostgreSQLを使う限定サンドボックスの証明経路を実装。判断から合成イベント保存、独立した読み取り専用照合、BindReceipt / Outcome、障害復旧までを接続します。顧客環境の本番実証ではありません。",
    en: "A controlled sandbox proof path uses real TLS and PostgreSQL, connecting the decision to synthetic event persistence, independent read-only reconciliation, BindReceipt / Outcome, and crash recovery. This is not customer production validation.",
    path: "docs/en/architecture/controlled-execution-proof-architecture-freeze-v1.md",
  },
  {
    title: "Native v2 execution boundary",
    ja: "認可発行と実行許可を分離。単回消費、最新条件の再確認、対象・資格情報の固定、送信意図の永続化を経て実行します。結果不明は EFFECT_UNKNOWN として保持し、確認なしの再送を禁止します。",
    en: "Authorization issuance is separate from execution permission. Single-use consumption, fresh rechecks, exact target and credential binding, and durable dispatch intent precede execution. Uncertain results remain EFFECT_UNKNOWN; blind redispatch is prohibited.",
    path: "veritas_os/policy/sandbox_bind_execution.py",
  },
  {
    title: "External measurement / NeoMundi RGC v0.2",
    ja: "外部計測証跡の共通境界とNeoMundiアダプターを実装。ペイロードハッシュ、Ed25519/JWS署名、VERITAS側の信頼鍵設定を検証します。計測証跡は権限・人間承認・実行許可にはなりません。",
    en: "A provider-neutral evidence boundary and NeoMundi adapter verify payload hashes, Ed25519/JWS signatures, and VERITAS-controlled trusted keys. Measurement evidence does not become authority, human approval, or execution permission.",
    path: "docs/en/architecture/neomundi-rgc-v02-adapter.md",
  },
  {
    title: "CAGE Phase 3 fixture proof",
    ja: "7件の合成AML/KYCシナリオでProvider03契約への変換、決定論的再現、改ざん・拒否ケースを検証する経路を実装。ライブCAGE接続、商用統合、Googleによる採用・推奨を意味しません。",
    en: "Seven synthetic AML/KYC scenarios exercise Provider03 projection, deterministic replay, and tamper/refusal checks. This does not establish a live CAGE connection, commercial integration, or Google adoption or endorsement.",
    path: "docs/en/validation/veritas-cage-phase3-deterministic-fixture-proof.md",
  },
  {
    title: "TrustLog primary publication",
    ja: "明示的なv1 publication APIでは、同じ論理ID・同じ内容をPostgreSQL上の同一行へ解決し、内容の衝突を拒否します。ミラー・外部配送のexactly-onceや、全TrustLog経路への適用を主張しません。",
    en: "The explicit v1 publication API resolves the same logical identity and payload to one PostgreSQL row and rejects content collisions. It does not establish exactly-once mirror or external delivery, or apply to every TrustLog path.",
    path: "docs/en/validation/trustlog-primary-publication-postgresql-proof.md",
  },
  {
    title: "Live-adapter readiness evidence",
    ja: "外部アダプター向けのdry-runと最終Bind認可の準備証跡を実装。準備完了の判定自体は、実際の認可発行、資格情報の取得、外部送信を行いません。限定サンドボックスの実行経路とは別の範囲です。",
    en: "Dry-run and final Bind authorization readiness evidence is implemented for live adapters. Readiness does not issue authorization, retrieve credentials, or dispatch a request. This scope is separate from the controlled sandbox execution path.",
    path: "docs/en/architecture/live-adapter-dry-run-final-bind-authorization-readiness-v1.md",
  },
];

export default function ImplementationStatus({ lang = "ja", compact = false }) {
  const t = makeT(lang);
  return (
    <section className="implementation-status" aria-labelledby="implementation-status-title">
      <p className="marker">{t("実装スナップショット · 2026-09-17", "Implementation snapshot · 2026-09-17")}</p>
      <h2 id="implementation-status-title" className="headline">{t("実行前統制から、結果の照合まで", "From pre-execution governance to reconciliation")}</h2>
      <p className="body">{t(
        "現在の実装には、限定サンドボックスで判断・認可・実行・結果照合をつなぐ証明経路があります。外部計測や相互運用の検証は、それぞれの証跡範囲に分けて確認できます。",
        "The implementation includes a controlled sandbox proof path connecting decision, authorization, execution, and reconciliation. External measurement and interoperability can be reviewed within their separate evidence scopes."
      )}</p>
      <p className="implementation-source">{t("確認したmain", "Reviewed main")}: <a href={`https://github.com/veritasfuji-japan/veritas_os/commit/${SOURCE_SHA}`} target="_blank" rel="noreferrer noopener">{SOURCE_SHA.slice(0, 7)}</a></p>
      <div className="implementation-grid">
        {(compact ? evidence.slice(0, 2) : evidence).map((item) => (
          <article className="snapshot-mini-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{t(item.ja, item.en)}</p>
            <a href={`${SOURCE}${item.path}`} target="_blank" rel="noreferrer noopener">{t("この実装の根拠を見る", "Inspect the implementation evidence")}</a>
          </article>
        ))}
      </div>
      <p className="body implementation-boundary">{t(
        "範囲：合成データ・テスト用資格情報・限定サンドボックス。本番顧客環境、独立運用の外部インフラ、外部UTC時刻の信頼、第三者認証は、この実行証明に含まれません。実行証明の合否は、対象コミットに対応する専用CIのreport.json / evidence.jsonで確認してください。",
        "Scope: synthetic data, test credentials, and a controlled sandbox. Customer production environments, independently operated external infrastructure, external UTC clock trust, and third-party certification are outside this execution proof. Verify execution-proof results in the dedicated CI report.json / evidence.json tied to the source commit being evaluated."
      )}</p>
      <a className="btn btn-secondary" href={compact ? "/reviewers" : `${SOURCE}.github/workflows/reproducible-decision-to-effect-e2e.yml`}>{compact ? t("実装範囲と根拠を見る", "Explore scope and evidence") : t("実行証明の検証手順を見る", "Inspect the execution-proof workflow")}</a>
    </section>
  );
}
