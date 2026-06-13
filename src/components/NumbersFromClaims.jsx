import claimsData from "../data/claims.json";

function getLocalized(field, lang) {
  if (!field || typeof field !== "object") {
    return "";
  }

  return field[lang] || field.en || "";
}

const preferredClaimIds = ["coverage", "aml_kyc_scenarios", "bind_governed_paths"];
const fallbackLabels = ["coverage", "scenario", "bind"];

function selectTeaserClaims(claims) {
  const preferred = preferredClaimIds
    .map((id) => claims.find((claim) => claim.id === id))
    .filter(Boolean);

  if (preferred.length === preferredClaimIds.length) {
    return preferred;
  }

  const byLabel = claims.filter((claim) => {
    const haystack = `${claim.id || ""} ${claim.value || ""} ${claim.label?.en || ""}`.toLowerCase();
    return fallbackLabels.some((label) => haystack.includes(label));
  });

  return [...preferred, ...byLabel, ...claims]
    .filter((claim, index, array) => array.findIndex((item) => item.id === claim.id) === index)
    .slice(0, 3);
}

export default function NumbersFromClaims({ lang = "ja" }) {
  const isJa = lang !== "en";
  const claims = Array.isArray(claimsData?.claims) ? claimsData.claims : [];
  const teaserClaims = selectTeaserClaims(claims);

  return (
    <section id="numbers" className="evidenceNumbers" aria-labelledby="evidence-numbers-title">
      <div className="container">
        <div className="evidenceNumbersHeader">
          <p className="marker">
            {isJa ? "証跡付きの数字" : "Evidence-backed numbers"}
          </p>
          <h2 id="evidence-numbers-title" className="headline">
            {isJa
              ? "数字は、公開リポジトリの証跡と結びつける"
              : "Numbers should map back to public repository evidence"}
          </h2>
          <p className={`body ${isJa ? "lead-ja" : ""}`}>
            {isJa
              ? "これらの数字は、第三者認証、規制承認、本番保証を意味しません。"
              : "These numbers do not imply third-party certification, regulatory approval, or production guarantees."}
          </p>
        </div>

        <div className="evidenceNumbersGrid">
          {teaserClaims.map((claim) => (
            <article key={claim.id} className="evidenceNumberCard evidenceNumberCardTeaser">
              <p className="evidenceNumberValue">{claim.value || ""}</p>
              <p className="evidenceNumberLabel">{getLocalized(claim.label, lang)}</p>
            </article>
          ))}
        </div>
        <a href="/reviewers" className="btn btn-secondary evidenceNumbersAction">
          {isJa ? "レビュアー入口を見る" : "View Reviewer Entrypoint"}
        </a>
      </div>
    </section>
  );
}
