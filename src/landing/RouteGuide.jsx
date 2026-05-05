import { makeT } from "./landingText.js";

export default function RouteGuide({ lang }) {
  const t = makeT(lang);
  const links = [
    [t("企業担当者", "Enterprise evaluator"), "/enterprise", t("企業課題", "Enterprise")],
    [t("仕組みを知りたい人", "Want the technical flow"), "/how-it-works", t("仕組み", "How it works")],
    [t("技術評価者", "Technical evaluator"), "/aml-kyc-poc", "AML/KYC PoC"],
    [t("外部レビュアー", "External reviewer"), "/reviewers", t("レビュアー", "Reviewers")],
    [t("思想を知りたい人", "Conceptual overview"), "/concepts", t("中心概念", "Concepts")],
    [t("用語を確認したい人", "Need term definitions"), "/glossary", t("用語集", "Glossary")],
    [t("疑問を確認したい人", "Have questions"), "/faq", "FAQ"],
    [t("具体的な相談", "Concrete inquiry"), "/contact", t("お問い合わせ", "Contact")],
  ];
  return (
    <section className="route-guide">
      <div className="container route-guide-inner">
        <div className="marker">{t("どこから見るべきか", "Where to start")}</div>
        <div className="route-guide-list">
          {links.map(([role, href, target]) => (
            <div key={role} className="route-guide-item">
              {role} → <a href={href}>{target}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
