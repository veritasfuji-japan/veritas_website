import { makeT } from "./landingText.js";

export default function Idea({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  return (
    <section id="idea" className="idea sec">
      <div className="container">
        <div className="sec-head">
          <div className="marker">{t("第一節 · 中心の発想", "§ 01 · The core idea")}</div>
          <h2 className="headline" style={{ maxWidth: "22ch" }}>
            {t(
              "監査ログだけでは、commit を許可できない。",
              "An audit log alone cannot authorize commit."
            )}
          </h2>
          <p className={`lead ${isJa ? "lead-ja" : ""}`}>
            {t(
              "Audit log は「何が起きたか」、Authority Evidence は「なぜそれが許されたか」。VERITAS OS はこの2つを構造的に分離し、後者なしには commit が成立しないように設計されています。",
              "An audit log records what happened; authority evidence records why it was allowed. VERITAS OS keeps the two structurally separate — and without the latter, no commit is allowed."
            )}
          </p>
        </div>

        <div className="compare">
          <div className="ledger">
            <div className="ledger-head">
              <div>
                <div className="ledger-cat">Audit Log</div>
                <div className="ledger-title">{t("何が起きたか", "What happened")}</div>
              </div>
              <span className="ledger-glyph" style={{ color: "var(--blue)" }}>a.</span>
            </div>
            <p className={`ledger-summary ${isJa ? "ledger-summary-ja" : ""}`}>
              {t(
                "時系列の事実記録。decision_made → fuji_evaluated → trustlog_appended の連鎖がハッシュチェーンに刻まれる。",
                "A time-ordered factual record: decision_made → fuji_evaluated → trustlog_appended, anchored in a hash chain."
              )}
            </p>
            <ul className="ledger-points">
              <li>traceability</li>
              <li>post-incident analysis</li>
              <li>SHA-256 chain integrity</li>
            </ul>
          </div>

          <div className="ledger">
            <div className="ledger-head">
              <div>
                <div className="ledger-cat">Authority Evidence</div>
                <div className="ledger-title">{t("なぜ許されたか", "Why it was allowed")}</div>
              </div>
              <span className="ledger-glyph" style={{ color: "var(--teal-deep)" }}>b.</span>
            </div>
            <p className={`ledger-summary ${isJa ? "ledger-summary-ja" : ""}`}>
              {t(
                "bind 時点の admissibility 証跡。action_contract、scope_grants、validity_window、evidence_hash が verified である必要がある。",
                "Admissibility evidence at bind time: action_contract, scope_grants, validity_window, and verified evidence_hash must all be present."
              )}
            </p>
            <ul className="ledger-points">
              <li>commit gating</li>
              <li>fail-closed by default</li>
              <li>Ed25519 signed</li>
            </ul>
          </div>
        </div>

        <div className={`idea-conclusion ${isJa ? "idea-conclusion-ja" : ""}`}>
          {t(
            "「approval ≠ commitment」。これが VERITAS OS の中心の境界線です。",
            '"Approval is not commitment." This is the central boundary VERITAS OS draws.'
          )}
          <br />
          <a href="/concepts" className="idea-conclusion-link">
            {t("詳細を読む", "Read the full concept")} →
          </a>
        </div>
      </div>
    </section>
  );
}
