import { makeT } from "./landingText.js";

export default function FinalContactCta({ lang }) {
  const t = makeT(lang);
  const isJa = lang === "ja";

  return (
    <section className="final-contact-cta">
      <div className="container">
        <div className="final-contact-card">
          <div>
            <p className="marker">{t("次のステップ", "Next step")}</p>
            <h2 className="headline">
              {t("評価・PoC・外部レビューを相談する", "Discuss evaluation, PoC, or external review")}
            </h2>
            <p className={`body ${isJa ? "lead-ja" : ""}`}>
              {t(
                "初回連絡では、評価したい業務領域と、AIに実行させる前に止めたい判断を簡潔に共有してください。機密情報、個人情報、顧客データ、規制対象データは含めないでください。",
                "For first contact, briefly share the workflow you want to evaluate and the AI-driven decision you want to control before execution. Do not include confidential information, personal data, customer data, or regulated data."
              )}
            </p>
          </div>
          <div className="final-contact-actions">
            <a href="/contact" className="btn btn-primary">
              {t("問い合わせる", "Contact")}
              <span aria-hidden>→</span>
            </a>
            <a href="https://github.com/veritasfuji-japan/veritas_os" className="btn btn-secondary" target="_blank" rel="noreferrer noopener">
              {t("コアリポジトリを開く", "Open Core Repository")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
