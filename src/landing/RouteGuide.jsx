import { makeT } from "./landingText.js";

export default function RouteGuide({ lang }) {
  const t = makeT(lang);
  const routes = [
    [t("企業担当者", "Enterprise evaluator"), "/enterprise", t("企業課題", "Enterprise Problem")],
    [t("仕組みを知りたい人", "Want the technical flow"), "/how-it-works", t("仕組み", "How It Works")],
    [t("技術評価者", "Technical evaluator"), "/aml-kyc-poc", "AML/KYC PoC"],
    [t("外部レビュアー", "External reviewer"), "/reviewers", t("レビュアー", "Reviewers")],
    [t("思想を知りたい人", "Conceptual overview"), "/concepts", t("中心概念", "Core Concept")],
    [t("用語を確認したい人", "Need term definitions"), "/glossary", t("用語集", "Glossary")],
    [t("疑問を確認したい人", "Have questions"), "/faq", "FAQ"],
    [t("具体的な相談", "Concrete inquiry"), "/contact", t("お問い合わせ", "Contact")],
  ];

  return (
    <section className="route-guide">
      <div className="container route-guide-inner">
        <div className="route-guide-head">
          <div className="marker">{t("どこから見るべきか", "Where to start")}</div>
          <h2 className="headline">{t("どこから見るべきか", "Where to start")}</h2>
        </div>
        <div className="route-guide-list">
          {routes.map(([role, href, target]) => (
            <a key={role} className="route-guide-item" href={href}>
              <span className="route-guide-role">{role}</span>
              <span className="route-guide-target">{target}</span>
              <span className="route-guide-arrow" aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
