import { makeT } from "./landingText.js";

const cases = [
  {
    title: ["アクセス権の変更", "Changing access rights"],
    example: ["AIが社員に重要なシステムのアクセス権を付けようとする。", "An AI agent attempts to grant access to a sensitive system."],
    check: ["本人の権限、対象、期限、必要な承認を確かめる。", "Check authority, target, expiry, and required approval."],
  },
  {
    title: ["お金に関わる操作", "Financial actions"],
    example: ["AIが支払い・返金などの操作を進めようとする。", "An AI agent attempts a payment or refund."],
    check: ["金額や相手先、許可条件が合わなければ先へ進ませない。", "Hold the action when the amount, recipient, or permission does not match."],
  },
  {
    title: ["AI同士の依頼", "Requests between agents"],
    example: ["別のAIから『この作業を実行して』と依頼される。", "One agent asks another to perform an action."],
    check: ["依頼が届いたことと、実行してよいことを別々に確かめる。", "Treat receiving a request separately from permission to execute it."],
  },
];

const shell = {
  background: "#FAF6EB",
  border: "1px solid #DDD6C5",
  borderRadius: "22px",
  padding: "clamp(1.15rem, 2.5vw, 2rem)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 17rem), 1fr))",
  gap: "0.9rem",
  marginTop: "1.25rem",
};

const caseStyle = {
  border: "1px solid #E1D9CA",
  background: "#FFFFFF",
  borderRadius: "15px",
  padding: "1.2rem",
};

const body = { color: "#394850", lineHeight: 1.75 };
const links = { display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" };

export default function PlainLanguageGuide({ lang }) {
  const t = makeT(lang);
  return (
    <section aria-labelledby="plain-guide-title" style={{ padding: "clamp(2.5rem, 5vw, 4.5rem) 0" }}>
      <div className="container">
        <div style={shell}>
          <p className="marker">{t("何に使うのか", "What is it for?")}</p>
          <h2 id="plain-guide-title" className="headline">
            {t("たとえば、こんなAIの操作を確認します。", "Examples of actions to check before AI acts.")}
          </h2>
          <p style={body}>
            {t(
              "AIが『やりたい』と判断しても、それだけで実行を許可しない。VERITASが目指すのは、実行前に許可・ルール・証拠を確かめ、必要なら人の確認に回す仕組みです。",
              "An AI deciding to act is not permission to act. VERITAS is designed to check authority, rules, and evidence before execution, and route actions for human review when needed."
            )}
          </p>
          <div style={grid}>
            {cases.map((item) => (
              <article key={item.title[1]} style={caseStyle}>
                <h3 style={{ margin: "0 0 0.5rem", color: "#163747", fontSize: "1.15rem" }}>{t(...item.title)}</h3>
                <p style={body}>{t(...item.example)}</p>
                <p style={{ ...body, marginBottom: 0 }}><strong>{t("確かめること：", "What to check: ")}</strong>{t(...item.check)}</p>
              </article>
            ))}
          </div>
          <p style={{ ...body, fontSize: "0.92rem", marginTop: "1rem" }}>
            {t(
              "上の3つは用途を説明する例です。すべての業務で実装・実証済みという意味ではありません。",
              "These are examples of possible use cases, not claims that all three have been implemented or validated in customer systems."
            )}
          </p>
          <div style={links}>
            <a href="/demo" className="btn btn-primary">{t("画面で動きの例を見る", "Explore the illustrative demo")} →</a>
            <a href="/contact" className="btn btn-secondary">{t("1つの操作から相談する", "Discuss one action to evaluate")}</a>
          </div>
        </div>

        <div style={{ ...shell, marginTop: "1.25rem" }}>
          <p className="marker">{t("どこまで確認できたか · 2026年10月19日時点", "What is evidenced · as of October 19, 2026")}</p>
          <h2 className="headline">{t("実証したことと、研究中のことを分けています。", "What has been tested, and what has not.")}</h2>
          <div style={grid}>
            <article style={caseStyle}>
              <h3 style={{ marginTop: 0, color: "#163747" }}>{t("確認できた限定的な結果", "Bounded results available to inspect")}</h3>
              <p style={body}>
                {t(
                  "9月に公開した固定ベンチマークでは、AIが提案した181件の操作候補を比較しました。別の合成テスト環境では、判断から操作・結果確認までの一部の経路を検証しています。",
                  "A September frozen benchmark compared 181 proposed protected actions. A separate synthetic test environment checks a bounded path from decision to action and outcome verification."
                )}
              </p>
              <a href="/benchmark/agentdojo-banking">{t("結果と条件を見る →", "See the results and limits →")}</a>
            </article>
            <article style={caseStyle}>
              <h3 style={{ marginTop: 0, color: "#163747" }}>{t("いま研究中のこと", "Current research — not yet proven")}</h3>
              <p style={body}>
                {t(
                  "10月19日にマージされたRCC/REVAS PR #469では、AI用SDKが作った要求に対し、ローカルの模擬応答を受け取る前に一回限りの権限を消費し、応答原文を暗号化して保存する流れを検証しました。応答はすべて台本どおりの模擬データで、実際のAIサービスへの送信・現実の銀行操作は0件です。実モデルの有用性評価と本番送信の許可は未達です。",
                  "Merged October 19 RCC/REVAS PR #469 tested an offline SDK transport boundary: one-time local authorization consumption before accepting scripted mock responses, encrypted original-response custody, and Native continuation. All responses were scripted; real provider posts and real bank effects were zero. Genuine model utility remains unscored and live dispatch remains NO-GO."
                )}
              </p>
              <a href="https://github.com/veritasfuji-japan/rcc-revas-veritas-benchmark/pull/469" target="_blank" rel="noreferrer noopener">
                {t("研究内容を見る →", "Review the research PR →")}
              </a>
            </article>
          </div>
          <p style={{ ...body, marginTop: "1rem", marginBottom: 0 }}>
            <strong>{t("まだ主張していないこと：", "Not claimed: ")}</strong>
            {t(
              "実際の企業環境での安全性、外部機関による独立した検証、規制当局の承認、あらゆる攻撃を防げるという保証。最新のPRがマージされても、これらが証明されたことにはなりません。",
              "Safety in customer production systems, independent external validation, regulatory approval, or protection against every attack. Merged research PRs do not establish these claims."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
