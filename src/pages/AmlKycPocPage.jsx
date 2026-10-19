import PageShell from "../components/PageShell.jsx";

const sectionStyle = {
  marginTop: "1rem",
  padding: "1rem",
  border: "1px solid #d0d7de",
  borderRadius: "8px",
  background: "#fdfdfc",
};

const headingStyle = {
  marginTop: 0,
  color: "#0b3d5b",
};

const quickStartGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
  gap: "0.75rem",
  marginTop: "0.9rem",
};

const quickStartCardStyle = {
  border: "1px solid #DAD5C8",
  borderRadius: "14px",
  background: "#fff",
  padding: "1rem",
};

const quickStart = [
  {
    title: ["1. 確認したい操作を決める", "1. Choose one action to check"],
    body: ["例：AIが高リスクの口座開設を承認してよいか。", "Example: May an AI agent approve a high-risk account opening?"],
  },
  {
    title: ["2. 何を確認するか決める", "2. Define the checks"],
    body: ["誰の許可が必要で、どんなルールや証拠が要るかを整理します。", "Identify whose approval is needed and which rules and evidence apply."],
  },
  {
    title: ["3. 作り物のデータで試す", "3. Test with synthetic data"],
    body: ["条件が足りないときに止まるか、条件がそろったときに進めるかを確かめます。", "Check what is held when conditions are missing and what may proceed when they are met."],
  },
  {
    title: ["4. 結果と課題を共有する", "4. Review results and gaps"],
    body: ["操作の判定理由、残る記録、実際の環境で未検証の部分をまとめます。", "Summarize decisions, audit evidence, and remaining untested integration gaps."],
  },
];

export default function AmlKycPocPage() {
  return (
    <PageShell
      label={{ ja: "PoC", en: "POC" }}
      title={{ ja: "AML/KYC 評価PoC", en: "AML/KYC Evaluation PoC" }}
      subtitle={{
        ja: "証跡・権限・人手承認が不足する場合に、規制対象アクションをAIエージェントが進めないことを検証します。",
        en: "Validate that AI agents do not proceed with regulated actions when evidence, authority, or human approval is missing.",
      }}
      ctas={[
        { label: { ja: "評価について相談する", en: "Discuss an evaluation" }, href: "/contact" },
        { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
        { label: { ja: "ホームへ戻る", en: "Back to Home" }, href: "/" },
      ]}
    >
      {(t) => (
        <>
          <section style={{ ...sectionStyle, borderRadius: "18px", background: "#FAF6EB", padding: "clamp(1rem, 3vw, 1.5rem)" }}>
            <p style={{ color: "#25566C", fontWeight: 700, marginTop: 0 }}>{t("初めての方向け", "Start here")}</p>
            <h2 style={headingStyle}>
              {t("AIの重要な操作を、安全に試して確かめる。", "Start by testing one important AI action.")}
            </h2>
            <p>
              {t(
                "いきなり本番に接続するのではなく、まず1つの操作を選び、必要な許可と証拠を決め、作り物のデータで動きを確認する評価方法です。",
                "This is an evaluation approach, not a direct connection to a live system: select one action, define the required approval and evidence, and check behavior with synthetic data."
              )}
            </p>
            <div style={quickStartGridStyle}>
              {quickStart.map((step) => (
                <article key={step.title[1]} style={quickStartCardStyle}>
                  <h3 style={{ margin: "0 0 0.4rem", color: "#163747", fontSize: "1rem" }}>{t(...step.title)}</h3>
                  <p style={{ margin: 0 }}>{t(...step.body)}</p>
                </article>
              ))}
            </div>
            <p style={{ color: "#4A4D54", marginTop: "1rem", fontSize: "0.95rem" }}>
              {t(
                "ここで示すのは評価の進め方です。日程・料金・対象業務・成果物は事前相談で決めます。実際の顧客環境での安全性は、別途検証が必要です。",
                "This is a proposed evaluation process. Timing, fees, scope and deliverables are agreed before any engagement. Safety in customer production systems requires separate validation."
              )}
            </p>
            <a href="/contact" style={{ display: "inline-block", padding: "0.75rem 1rem", background: "#15161A", borderRadius: "999px", color: "#fff", textDecoration: "none", fontWeight: 700 }}>
              {t("1つの操作から相談する →", "Discuss one action to evaluate →")}
            </a>
          </section>
          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("対象者", "Who this PoC is for")}</h2>
            <ul>
              <li>{t("AI支援AML/KYC判断のガバナンスを評価するチーム。", "Teams evaluating governance for AI-assisted AML/KYC decisions.")}</li>
              <li>{t("実行前に証跡確認を必要とするコンプライアンス・リスク・監査レビュー担当。", "Compliance, risk, and audit reviewers who need evidence before execution.")}</li>
              <li>{t("fail-closed（安全側停止）挙動と再実行可能な判定トレースを確認する技術評価者。", "Technical evaluators checking fail-closed behavior and replayable decision traces.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("相談できる評価期間の例", "Possible evaluation durations")}</h2>
            <ul>
              <li>{t("1日技術検証", "1-day technical validation")}</li>
              <li>{t("1〜2週間の拡張評価", "1–2 week extended evaluation")}</li>
            </ul>
            <p>{t("上記は相談時に検討する期間例であり、実施・納期を確約するものではありません。開始前に対象・日程・料金を個別に合意します。", "These are possible evaluation formats, not availability or delivery commitments. Scope, timing, and fees are agreed before any engagement.")}</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("データ境界", "Data boundary")}</h2>
            <ul>
              <li>{t("初回評価は synthetic / fixture data のみ。", "Synthetic / fixture data only for the first evaluation.")}</li>
              <li>{t("本番顧客データはデフォルトで使用しない。", "No production customer data by default.")}</li>
              <li>{t("ライブ金融システム接続はデフォルトで行わない。", "No live financial-system access by default.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("検証内容 / 評価フロー", "What we test / Evaluation flow")}</h2>
            <ul>
              <li>{t("AML/KYC判定シナリオを1件選定する。", "Select one AML/KYC decision scenario.")}</li>
              <li>{t("ポリシーと必要証跡を定義する。", "Define the policy and required evidence.")}</li>
              <li>{t("シナリオをVERITAS判定パイプラインで実行する。", "Run the scenario through the VERITAS decision pipeline.")}</li>
              <li>{t("利用可能な範囲でFUJI・TrustLog・bind証跡・失敗理由を確認する。", "Inspect FUJI, TrustLog, bind evidence, and failure reasons where available.")}</li>
              <li>{t("実際の結果と期待結果を比較する。", "Compare actual outcomes against expected outcomes.")}</li>
              <li>{t("所見と次の統合検討事項を記録する。", "Record findings and next integration questions.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("想定する成果物", "Possible deliverables")}</h2>
            <p>{t("評価範囲を合意した場合に作成する資料の例です。すべてを必ず提供するという意味ではありません。", "Examples of materials to agree on for a scoped evaluation; these are not guaranteed deliverables for every engagement.")}</p>
            <ul>
              <li>{t("PoCレポート", "PoC report")}</li>
              <li>{t("シナリオ結果", "Scenario results")}</li>
              <li>{t("監査トレース例", "Audit trace examples")}</li>
              <li>{t("証跡ギャップサマリ", "Evidence gap summary")}</li>
              <li>{t("本番移行に向けたギャップリスト", "Production-readiness gap list")}</li>
            </ul>
          </section>


          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("合成データで確かめる6つの例", "Six synthetic test examples")}</h2>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("高リスク国へのAML/KYC送金判断", "High-risk country AML/KYC wire decision")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> HUMAN_REVIEW_REQUIRED</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("高リスク判断をAIだけで進めず、人間レビューに回せること。", "High-risk decisions are routed to human review instead of proceeding automatically.")}</p>
                <p className="poc-fixture-line" style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_aml_kyc_anchor_high_risk_country</p>
              </article>

              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("制裁リスト部分一致", "Sanctions partial match")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> HOLD</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("制裁リスクが曖昧な場合に silent proceed しないこと。", "Ambiguous sanctions risk does not silently proceed.")}</p>
                <p className="poc-fixture-line" style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_sanctions_partial_match_no_proceed</p>
              </article>

              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("資金源証跡の不足", "Missing source-of-funds evidence")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> HOLD</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("必要証跡が不足する場合に判断を保留できること。", "Decisions are held when required evidence is missing.")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_source_of_funds_missing</p>
              </article>

              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("ポリシー定義の不足", "Missing policy definition")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> HOLD</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("判断基準が未定義な場合に無理に進めないこと。", "The system does not proceed when the required policy definition is missing.")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_policy_definition_missing</p>
              </article>

              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("十分な証跡があるケース", "Sufficient evidence provided")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> PROCEED</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("条件が揃っている場合は正しく進められること。", "The system can proceed when evidence and policy requirements are satisfied.")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_sufficient_evidence_proceed</p>
              </article>

              <article style={{ border: "1px solid #d0d7de", borderRadius: "6px", padding: "0.75rem", background: "#ffffff" }}>
                <h3 style={{ margin: "0 0 0.5rem" }}>{t("セキュア制御不足", "Missing secure controls")}</h3>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("想定する判定：", "Expected outcome:")}</strong> BLOCK</p>
                <p style={{ margin: "0 0 0.35rem" }}><strong>{t("この例で確かめること：", "What this example checks:")}</strong> {t("本番・銀行連携前提の安全条件が不足する場合にブロックできること。", "The system blocks when required secure controls are missing.")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#57606a" }}><strong>{t("テストデータID：", "Fixture ID:")}</strong> pilot_secure_controls_missing_block</p>
              </article>
            </div>
            <p style={{ marginTop: "0.85rem", fontSize: "0.95rem", color: "#57606a" }}>
              {t(
                "この6つは合成データを使った再現可能なテスト例です。実際の金融機関の全AML/KYC要件を網羅するものではなく、実運用の安全性を証明するものでもありません。PoC評価の出発点として使います。",
                "These are reproducible synthetic test examples, not comprehensive AML/KYC coverage or evidence of safety in a live financial system. They are starting points for a scoped PoC evaluation."
              )}
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("確認する証跡", "Evidence to inspect")}</h2>
            <ul>
              <li>{t("判定アウトプット。", "Decision output.")}</li>
              <li>{t("FUJIゲート判定結果。", "FUJI gate outcome.")}</li>
              <li>{t("TrustLog証跡。", "TrustLog evidence.")}</li>
              <li>{t("利用可能な範囲でbindレシートまたはbindサマリー。", "Bind receipt or bind summary where available.")}</li>
              <li>{t("block / hold 判定時の失敗理由。", "Failure reason for blocked or held decisions.")}</li>
              <li>{t("利用可能な範囲でリプレイまたはトレース整合性。", "Replay or trace consistency where available.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("エンゲージメント形式", "Engagement format")}</h2>
            <p>
              {t(
                "PoCスコープとエンゲージメント形式は、対象ワークフロー・リスク境界・評価ゴールの初期レビュー後に定義します。",
                "PoC scope and engagement format are defined after an initial review of the target workflow, risk boundary, and evaluation goals."
              )}
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("成功基準", "Success criteria")}</h2>
            <ul>
              <li>{t("権限証跡が不足する場合にサイレント進行しない。", "Missing authority evidence does not silently proceed.")}</li>
              <li>{t("無効または不十分な証跡で明確な hold / review / block の理由が出る。", "Invalid or insufficient evidence produces a clear hold / review / block reason.")}</li>
              <li>{t("許可・保留・レビュー・ブロックの理由をレビューアが追跡できる。", "Reviewers can trace why a decision was allowed, held, reviewed, or blocked.")}</li>
              <li>{t("公開主張がveritas_osリポジトリ証跡と整合する。", "Public claims remain consistent with veritas_os repository evidence.")}</li>
              <li>{t("次段階評価に向けたギャップが明示される。", "Gaps for next-stage evaluation are explicitly identified.")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("成功PoC後の次ステップ", "Next step after successful PoC")}</h2>
            <ul>
              <li>{t("拡張評価", "Extended evaluation")}</li>
              <li>{t("統合計画", "Integration planning")}</li>
              <li>{t("外部レビュー", "External review")}</li>
              <li>{t("パートナー/顧客別シナリオ対応", "Partner/customer-specific scenario mapping")}</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>{t("主張の境界", "Conservative claim boundaries")}</h2>
            <ul>
              <li>{t("Beta / PoC-ready の範囲で提供する。", "Provided as Beta / PoC-ready.")}</li>
              <li>{t("法的助言ではない。", "Not legal advice.")}</li>
              <li>{t("規制当局承認ではない。", "Not regulatory approval.")}</li>
              <li>{t("第三者認証ではない。", "Not third-party certification.")}</li>
              <li>{t("環境固有レビューなしに本番適用可能性を主張しない。", "No production-readiness claim without environment-specific review.")}</li>
              <li>{t("明示的に実装・検証されない限り、ライブ銀行連携は主張しない。", "No live bank integration claim unless explicitly implemented and verified.")}</li>
              <li>{t("初回評価は synthetic / fixture data のみ。", "Synthetic / fixture data only for the first evaluation.")}</li>
              <li>{t("本番顧客データはデフォルトで使用しない。", "No production customer data by default.")}</li>
              <li>{t("ライブ金融システム接続はデフォルトで行わない。", "No live financial-system access by default.")}</li>
            </ul>
          </section>
        </>
      )}
    </PageShell>
  );
}
