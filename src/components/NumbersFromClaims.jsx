import React from "react";
import claimsData from "../data/claims.json";

function getLocalized(field, lang) {
  if (!field || typeof field !== "object") {
    return "";
  }

  return field[lang] || field.en || "";
}

export default function NumbersFromClaims({ lang = "ja" }) {
  const isJa = lang !== "en";
  const claims = Array.isArray(claimsData?.claims) ? claimsData.claims : [];

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
              : "Numbers should link back to repository evidence"}
          </h2>
          <p className={`lead ${isJa ? "lead-ja" : ""}`}>
            {isJa
              ? "VERITAS OS の公開上の数字は、可能な限りリポジトリ上の証跡と照合できる形で扱います。これらは認証、規制承認、本番保証を意味するものではありません。"
              : "Public VERITAS OS numbers should be handled in a way that can be checked against repository evidence where possible. These numbers do not imply certification, regulatory approval, or production guarantees."}
          </p>
        </div>

        <div className="evidenceNumbersGrid">
          {claims.map((claim) => (
            <article key={claim.id} className="evidenceNumberCard">
              <p className="evidenceNumberValue">{claim.value || ""}</p>
              <p className="evidenceNumberLabel">{getLocalized(claim.label, lang)}</p>
              <p className="evidenceNumberDescription">
                {getLocalized(claim.description, lang)}
              </p>
              <p className="evidenceNumberCaution">{getLocalized(claim.caution, lang)}</p>
              <a
                className="evidenceNumberLink"
                href={claim.proof_url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {isJa ? "証跡を見る →" : "View evidence →"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
