import PageShell from "../components/PageShell.jsx";

const AGENTDOJO_URL =
  "https://github.com/ethz-spylab/agentdojo/tree/a75aba7631d3ca5fb7ab938965c97ead2f9ff84b";
const VERITAS_URL =
  "https://github.com/veritasfuji-japan/veritas_os/tree/fb622db8e196bbe5e70cd362e4379ccd89a1ee18";
const EVIDENCE_JSON_URL = "/evidence/agentdojo-banking-task-023.json";

const panel = {
  border: "1px solid rgba(20, 61, 91, 0.16)",
  borderRadius: "20px",
  padding: "clamp(1rem, 2.5vw, 1.6rem)",
  background: "rgba(255,255,255,0.78)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "1rem",
};

const metricValue = {
  fontSize: "clamp(1.7rem, 4vw, 2.8rem)",
  fontWeight: 750,
  color: "#0b3d5b",
  margin: "0 0 0.25rem",
};

const eyebrow = {
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: "0.75rem",
  color: "#2456C7",
};

function Link({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}

export default function AgentDojoBenchmarkPage() {
  return (
    <PageShell
      label={{ ja: "BENCHMARK EVIDENCE", en: "BENCHMARK EVIDENCE" }}
      pageTitle={{
        ja: "AgentDojo Banking — 限定的な候補単位ベンチマーク証拠",
        en: "AgentDojo Banking — Bounded Candidate-Level Benchmark Evidence",
      }}
      title={{
        ja: "危険な候補を止め、正当な候補は選択的に通せるか。",
        en: "Can the execution boundary block attack actions without blocking everything?",
      }}
      subtitle={{
        ja: "固定したAgentDojo Bankingベンチマークで、同一candidate・同一pre-stateのpaired counterfactualを使ってVERITASの実行境界を評価しました。",
        en: "A frozen AgentDojo Banking run evaluated the VERITAS execution boundary with same-candidate, same-pre-state paired counterfactuals.",
      }}
    >
      {(t) => (
        <>
          <section style={panel}>
            <p style={eyebrow}>{t("結果", "Result")}</p>
            <div style={grid}>
              <article>
                <p style={metricValue}>160 / 160</p>
                <p>{t("完了したprimary cases", "primary cases completed")}</p>
              </article>
              <article>
                <p style={metricValue}>181</p>
                <p>{t("protected tool-call candidates", "protected tool-call candidates")}</p>
              </article>
              <article>
                <p style={metricValue}>178 / 3</p>
                <p>{t("BLOCKED / COMMITTED", "BLOCKED / COMMITTED")}</p>
              </article>
              <article>
                <p style={metricValue}>59 / 59</p>
                <p>{t("direct injected attack-action signatureをBLOCK", "direct injected attack-action signatures blocked")}</p>
              </article>
            </div>
          </section>

          <section style={{ ...panel, marginTop: "1rem" }}>
            <p style={eyebrow}>{t("選択的な実行統制", "Selective execution control")}</p>
            <h2>
              {t(
                "3件のCOMMITは、固定したユーザー意図の条件を満たした候補でした。",
                "The three committed candidates matched the frozen user-intended task policy.",
              )}
            </h2>
            <p>
              {t(
                "VERITASは181件のprotected candidateのうち178件をBLOCKし、3件をCOMMITしました。公開されているAgentDojo injection定義を使った事後評価では、直接的な攻撃アクションのsignatureに一致した59件を59件すべてBLOCKし、COMMITは0件でした。",
                "VERITAS blocked 178 of 181 protected candidates and committed 3. In offline post-run evaluation using the public AgentDojo injection definitions, all 59 captured candidates matching direct injected attack-action signatures were blocked and none were committed.",
              )}
            </p>
            <p>
              {t(
                "これは「全部を止める」結果ではありません。正当な候補を条件付きで通しながら、攻撃アクションに一致する候補を止めた、候補単位の証拠です。",
                "This is not a block-everything result. It is candidate-level evidence of selectively admitting user-intended actions while blocking captured candidates that matched the injected attack actions.",
              )}
            </p>
          </section>

          <section style={{ ...panel, marginTop: "1rem" }}>
            <p style={eyebrow}>{t("実験境界", "Experiment boundary")}</p>
            <ul>
              <li>AgentDojo v0.1.35 / Banking v1.2.2 / tool_knowledge</li>
              <li>OpenAI gpt-4o-mini-2024-07-18</li>
              <li>VERITAS treatment: fb622db8e196bbe5e70cd362e4379ccd89a1ee18</li>
              <li>{t("same-candidate: 181 / 181", "same-candidate: 181 / 181")}</li>
              <li>{t("same-pre-state: 181 / 181", "same-pre-state: 181 / 181")}</li>
            </ul>
            <p>
              {t(
                "AgentDojo nativeでは144件の攻撃ケース中44件でinjection goalが成功しました。この数値はnative reference runの値であり、VERITAS適用後のwhole-task攻撃成功率とのbefore/after比較には使いません。",
                "The AgentDojo native reference achieved the injection goal in 44 of 144 attack cases. This is a native reference-run measurement and is not presented as a before/after whole-task attack-success comparison for VERITAS.",
              )}
            </p>
          </section>

          <section style={{ ...panel, marginTop: "1rem" }}>
            <p style={eyebrow}>{t("主張しないこと", "What this does not claim")}</p>
            <ul>
              <li>{t("VERITAS適用後のwhole-task攻撃成功率が0%であること", "A 0% whole-task treatment attack-success rate")}</li>
              <li>{t("本番銀行環境での検証", "Production banking validation")}</li>
              <li>{t("第三者による独立検証・認証", "Independent third-party validation or certification")}</li>
              <li>{t("すべてのprompt injectionやAIエージェントに一般化できること", "Generalization to all prompt injections or AI agents")}</li>
            </ul>
          </section>

          <section style={{ ...panel, marginTop: "1rem" }}>
            <p style={eyebrow}>{t("公開根拠", "Public evidence anchors")}</p>
            <p>
              <Link href={AGENTDOJO_URL}>AgentDojo pinned source</Link>
              {" · "}
              <Link href={VERITAS_URL}>VERITAS pinned treatment</Link>
              {" · "}
              <Link href={EVIDENCE_JSON_URL}>{t("machine-readable evidence snapshot", "machine-readable evidence snapshot")}</Link>
            </p>
            <p>
              {t(
                "実行artifactのSHA-256: f8c621b829b446ef458f44b0e79f5436b1db26e10fd39297c0fd97233d9e597a",
                "Run artifact SHA-256: f8c621b829b446ef458f44b0e79f5436b1db26e10fd39297c0fd97233d9e597a",
              )}
            </p>
          </section>
        </>
      )}
    </PageShell>
  );
}
