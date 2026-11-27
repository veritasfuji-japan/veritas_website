import { safetyPatternsUrl } from "../data/safetyPatterns.js";

export default function SafetyPatternsCard({ lang }) {
  const t = (ja, en) => lang === "ja" ? ja : en;
  return (
    <section aria-labelledby="safety-patterns-title" style={{
      background: "#FAF6EB", border: "1px solid #DDD6C5",
      borderRadius: "14px", padding: "clamp(1.15rem, 2.5vw, 2rem)",
      marginTop: "1.25rem", color: "#15161A",
    }}>
      <p className="marker" style={{ color: "#0B736F", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em" }}>
        OPEN SOURCE / INTERACTIVE LABS
      </p>
      <h2 id="safety-patterns-title" className="headline" style={{ margin: "0.5rem 0", fontSize: "clamp(1.55rem, 1.2rem + 1vw, 2.2rem)" }}>
        {t("AIの安全設計を体験する。", "Explore AI safety through hands-on examples.")}
      </h2>
      <p style={{ color: "#394850", lineHeight: 1.75 }}>
        {t(
          "AI Safety PatternsはVERITAS OSの思想に基づく独立したオープンソース教材です。実行権限、承認、取消し、プロンプトインジェクション、リプレイ攻撃、ポリシー変更、信頼境界、実行結果の証拠と結果不明時の再試行判断など、10の安全設計パターンをブラウザで比較・体験できます。",
          "AI Safety Patterns is an independent open-source learning project inspired by VERITAS OS. Compare ten safety patterns in your browser, covering execution authority, approval, revocation, prompt injection, replay attacks, policy drift, trust boundaries, outcome evidence, and retry decisions under uncertainty."
        )}
      </p>
      <a href={safetyPatternsUrl(lang)} target="_blank" rel="noopener noreferrer"
        style={{
          display: "inline-block", maxWidth: "100%", boxSizing: "border-box",
          padding: "0.8rem 1rem", marginTop: "0.9rem", background: "#15161A",
          color: "#FAF6EB", textDecoration: "none", fontWeight: 600,
          boxShadow: "4px 4px 0 #43B3A9", overflowWrap: "anywhere",
        }}>
        {t("10の教材を体験する", "Explore all 10 labs")} <span aria-hidden="true">↗</span>
        <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400 }}>
          {t("新しいタブで開く", "Opens in a new tab")}
        </span>
      </a>
      <p style={{ fontSize: "0.88rem", color: "#4A4D54", lineHeight: 1.65, margin: "1rem 0 0" }}>
        {t(
          "無料・インストール不要・日本語／英語対応。教育用の簡易シミュレーションであり、実際の外部操作や本番環境の安全性を証明するものではありません。",
          "Free, no installation required, available in Japanese and English. These are simplified educational simulations, not real external actions or evidence of safety in production systems."
        )}
      </p>
    </section>
  );
}
