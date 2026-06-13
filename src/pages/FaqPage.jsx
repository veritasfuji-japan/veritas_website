import { useMemo, useState } from "react";
import PageShell from "../components/PageShell.jsx";

const pageCopy = {
  heroCtas: [
    { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
    { label: { ja: "企業課題を見る", en: "View Enterprise Problem" }, href: "/enterprise" },
    { label: { ja: "用語集を見る", en: "Open Glossary" }, href: "/glossary" },
  ],
  nextCtas: [
    { label: { ja: "デモを見る", en: "View Demo" }, href: "/demo" },
    { label: { ja: "企業課題を見る", en: "View Enterprise Problem" }, href: "/enterprise" },
    { label: { ja: "仕組みを見る", en: "See How It Works" }, href: "/how-it-works" },
    { label: { ja: "用語集を見る", en: "Open Glossary" }, href: "/glossary" },
    { label: { ja: "問い合わせる", en: "Contact" }, href: "/contact" },
  ],
};

const keyAnswers = [
  {
    question: { ja: "VERITAS OSはAIモデルですか？", en: "Is VERITAS OS an AI model?" },
    answer: {
      ja: "いいえ。VERITAS OSは回答を生成するAIモデルではありません。AIエージェントの判断が実行commitされる前に、証跡、権限、ポリシー、失敗理由を確認するガバナンス層です。",
      en: "No. VERITAS OS is not an AI model that generates answers. It is a governance layer that checks evidence, authority, policy, and failure reasons before an AI-agent decision is committed to execution.",
    },
  },
  {
    question: { ja: "何を解決しますか？", en: "What problem does it solve?" },
    answer: {
      ja: "AIエージェントが判断から実行へ近づくと、企業には「誰が、何を根拠に、どこまで許可したか」を実行前に確認できる境界が必要になります。VERITAS OSは、その境界をdecision governance / bind-boundary control planeとして扱います。",
      en: "As AI agents move closer to execution, enterprises need a boundary that can verify who authorized what, based on which evidence, before action. VERITAS OS handles that boundary as a decision governance and bind-boundary control plane.",
    },
  },
  {
    question: { ja: "本番利用できますか？", en: "Can it be used in production?" },
    answer: {
      ja: "このWebサイトだけで、特定企業における本番利用可能性を証明するものではありません。現時点では、評価、PoC、外部レビューの文脈で確認するのが適切です。本番利用には環境固有の統合、セキュリティ、運用、法務・監査レビューが必要です。",
      en: "This website does not prove production readiness for a specific organization. The appropriate framing is evaluation, PoC, and external review. Production use requires environment-specific integration, security, operations, legal, and audit review.",
    },
  },
];

const faqSections = [
  {
    id: "basics",
    heading: { ja: "基本", en: "Basics" },
    items: [
      ...keyAnswers.slice(0, 2),
      {
        question: { ja: "既存のAIガードレールと何が違いますか？", en: "How is this different from ordinary AI guardrails?" },
        answer: {
          ja: "一般的なガードレールは危険な出力を減らすことに重点があります。VERITAS OSは、出力後の実行前段階で、証跡、権限、ポリシー、承認範囲、failure reasonを確認し、allow / hold / review / block に分岐させます。",
          en: "Ordinary guardrails focus on reducing unsafe outputs. VERITAS OS focuses on the pre-execution stage after a decision is produced, checking evidence, authority, policy, authorization scope, and failure reasons before routing to allow, hold, review, or block.",
        },
      },
      {
        question: { ja: "ログや説明可能性だけではなぜ足りないのですか？", en: "Why are logs and explainability not enough?" },
        answer: {
          ja: "ログは「何が起きたか」を残しますが、「なぜ実行してよかったか」を十分に示せないことがあります。説明可能性は判断理由を補助しますが、実行許可そのものではありません。",
          en: "Logs record what happened, but they may not prove why execution was authorized. Explainability helps interpret a decision, but it is not execution permission.",
        },
      },
    ],
  },
  {
    id: "technical-structure",
    heading: { ja: "技術構造", en: "Technical structure" },
    items: [
      {
        question: { ja: "FUJI gateとは何ですか？", en: "What is FUJI gate?" },
        answer: {
          ja: "FUJI gateは、不十分、不正、危険、または証跡不足の判断経路をfail-closedで止めるためのゲートです。実行前に、進めてよいか、保留すべきか、レビューすべきか、ブロックすべきかを判断します。",
          en: "FUJI gate is a gate for stopping insufficient, invalid, unsafe, or under-evidenced decision paths through fail-closed behavior. It helps determine whether to proceed, hold, review, or block before execution.",
        },
      },
      {
        question: { ja: "TrustLogとは何ですか？", en: "What is TrustLog?" },
        answer: {
          ja: "TrustLogは、意思決定、証跡、ゲート結果、failure reasonを後から確認できる記録層です。「何が起きたか」と「なぜallow / hold / review / blockになったのか」を確認しやすくします。",
          en: "TrustLog is a recording layer for decisions, evidence, gate results, and failure reasons. It helps reviewers inspect what happened and why an outcome became allow, hold, review, or block.",
        },
      },
      {
        question: { ja: "bind boundaryとは何ですか？", en: "What is bind boundary?" },
        answer: {
          ja: "bind boundaryは、承認された判断と現実世界への実行commitを分離する境界です。VERITAS OSでは「approval is not commitment」を実行前の制御境界として扱います。",
          en: "Bind boundary is the boundary separating an approved decision from real-world execution commitment. VERITAS OS treats approval is not commitment as a pre-execution control boundary.",
        },
      },
      {
        question: { ja: "allow / hold / review / block は何を意味しますか？", en: "What do allow / hold / review / block mean?" },
        answer: {
          ja: "allowは条件を満たして次に進める判断、holdは情報や証跡不足による一時停止です。reviewは人間または外部レビュアー確認、blockは実行前に止める判断を意味します。",
          en: "Allow means conditions are met and the flow can proceed; hold means the flow pauses for missing information or evidence. Review requires human or external reviewer inspection, and block stops the flow before execution.",
        },
      },
    ],
  },
  {
    id: "evaluation-poc",
    heading: { ja: "評価・PoC", en: "Evaluation and PoC" },
    items: [
      {
        question: { ja: "AML/KYC以外にも使えますか？", en: "Can it apply beyond AML/KYC?" },
        answer: {
          ja: "可能性はあります。規制対象アクション、ポリシー変更、高リスクなAI実行判断、監査・レビュー・証跡提出が必要なワークフローに応用できます。ただし、具体的な本番利用には環境固有の検証が必要です。",
          en: "Potentially, yes. The approach can apply to regulated actions, policy changes, high-risk AI execution decisions, and workflows requiring audit, review, or evidence handoff. Specific production use still requires environment-specific evaluation.",
        },
      },
      keyAnswers[2],
      {
        question: { ja: "PoCでは何を確認すべきですか？", en: "What should a PoC evaluate?" },
        answer: {
          ja: "PoCでは、証跡の十分性、権限境界、ポリシー分岐、failure reason、レビュー導線を確認するのが適切です。実データや本番接続の有無よりも、実行前に止められるかを評価します。",
          en: "A PoC should evaluate evidence sufficiency, authority boundaries, policy routing, failure reasons, and review handoff. The main question is whether the flow can stop before execution, not whether it is connected to live systems.",
        },
      },
      {
        question: { ja: "初回相談で何を送るべきですか？", en: "What should I send in the first inquiry?" },
        answer: {
          ja: "所属、関心領域、確認したい内容、想定している評価シナリオを簡潔に送ってください。機密情報、個人情報、顧客データ、規制対象データは初回メールに含めないでください。",
          en: "Briefly include your affiliation, area of interest, what you want to evaluate, and the scenario you have in mind. Do not include confidential information, personal data, customer data, or regulated data in the first message.",
        },
      },
    ],
  },
  {
    id: "non-claims",
    heading: { ja: "主張しないこと", en: "Non-claims" },
    items: [
      {
        question: { ja: "VERITAS OSは法的助言ですか？", en: "Is VERITAS OS legal advice?" },
        answer: {
          ja: "いいえ。VERITAS OSおよびこのWebサイトは法的助言ではありません。法務・規制・監査上の判断は、各組織の専門家による確認が必要です。",
          en: "No. VERITAS OS and this website are not legal advice. Legal, regulatory, and audit decisions require review by qualified professionals within each organization.",
        },
      },
      {
        question: { ja: "規制当局の承認や第三者認証を意味しますか？", en: "Does this mean regulatory approval or third-party certification?" },
        answer: {
          ja: "いいえ。VERITAS OSは、規制当局の承認や第三者認証を主張するものではありません。公開主張は、veritas_osリポジトリ上の証跡と照合して確認してください。",
          en: "No. VERITAS OS does not claim regulatory approval or third-party certification. Public claims should be validated against evidence in the veritas_os repository.",
        },
      },
      {
        question: { ja: "すべてのAIリスクを自動で消せますか？", en: "Does it automatically remove all AI risk?" },
        answer: {
          ja: "いいえ。VERITAS OSは、AI判断を実行前に検証しやすくするためのガバナンス層です。すべてのリスクを自動で消すものではなく、環境固有のセキュリティ、運用、法務、監査体制が必要です。",
          en: "No. VERITAS OS is a governance layer for making AI decisions more reviewable before execution. It does not automatically remove all risk and still requires environment-specific security, operations, legal, and audit controls.",
        },
      },
    ],
  },
];

const normalizeSearch = (value) => value.trim().toLocaleLowerCase();

const faqMatchesQuery = (item, heading, query) => {
  if (!query) return true;

  const searchableText = [
    heading.ja,
    heading.en,
    item.question.ja,
    item.question.en,
    item.answer.ja,
    item.answer.en,
  ].join(" ").toLocaleLowerCase();

  return searchableText.includes(query);
};

const filterSections = (sections, query) => sections.map((section) => ({
  ...section,
  items: section.items.filter((item) => faqMatchesQuery(item, section.heading, query)),
})).filter((section) => section.items.length > 0);

function CtaLink({ cta, lang }) {
  return (
    <a
      className="faq-button"
      href={cta.href}
      target={cta.href.startsWith("http") ? "_blank" : undefined}
      rel={cta.href.startsWith("http") ? "noreferrer noopener" : undefined}
    >
      {cta.label[lang]}
    </a>
  );
}

function SectionHeading({ description, eyebrow, title, titleId }) {
  return (
    <div className="faq-section-heading">
      <p className="faq-eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function KeyAnswers({ lang }) {
  return (
    <section className="faq-section" aria-labelledby="faq-key-answers">
      <SectionHeading
        eyebrow={lang === "ja" ? "最初に読む3問" : "Start with these three"}
        title={lang === "ja" ? "最初に読む3問" : "Start with these three"}
        titleId="faq-key-answers"
      />
      <div className="faq-key-grid">
        {keyAnswers.map((item) => (
          <article className="faq-key-card" key={item.question.en}>
            <h3>{item.question[lang]}</h3>
            <p>{item.answer[lang]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickJump({ lang }) {
  return (
    <nav className="faq-quick-jump" aria-label={lang === "ja" ? "FAQカテゴリ" : "FAQ categories"}>
      {faqSections.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          {section.heading[lang]}
        </a>
      ))}
    </nav>
  );
}

function SearchBox({ lang, searchTerm, setSearchTerm }) {
  return (
    <div className="faq-search">
      <label htmlFor="faq-search-input">
        {lang === "ja" ? "FAQを検索" : "Search FAQ"}
      </label>
      <input
        id="faq-search-input"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder={lang === "ja" ? "例: 本番利用、法的助言、TrustLog" : "Example: production, legal advice, TrustLog"}
      />
    </div>
  );
}

function FaqItem({ item, lang }) {
  return (
    <details className="faq-disclosure">
      <summary>{item.question[lang]}</summary>
      <p>{item.answer[lang]}</p>
    </details>
  );
}

function AccordionFaq({ lang, sections }) {
  return (
    <div className="faq-accordion-stack">
      {sections.map((section) => (
        <section className="faq-category" id={section.id} key={section.id}>
          <SectionHeading eyebrow={section.heading.en} title={section.heading[lang]} />
          <div className="faq-items">
            {section.items.map((item) => (
              <FaqItem item={item} key={item.question.en} lang={lang} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function NonClaimsBlock({ lang }) {
  return (
    <section className="faq-non-claims" aria-labelledby="faq-non-claims-title">
      <SectionHeading
        eyebrow={lang === "ja" ? "主張しないこと" : "Non-claims"}
        title={lang === "ja" ? "主張しないこと" : "What VERITAS OS does not claim"}
        titleId="faq-non-claims-title"
      />
      <p>
        {lang === "ja"
          ? "VERITAS OSおよびこのWebサイトは、法的助言、規制承認、第三者認証、本番適用保証を主張するものではありません。公開主張は、veritas_os リポジトリ上の証跡と照合して確認してください。"
          : "VERITAS OS and this website do not claim legal advice, regulatory approval, third-party certification, or production-readiness for a specific organization. Public claims should be validated against evidence in the veritas_os repository."}
      </p>
    </section>
  );
}

function NextSteps({ lang }) {
  return (
    <section className="faq-next-steps" aria-labelledby="faq-next-steps-title">
      <SectionHeading
        eyebrow={lang === "ja" ? "次に見るページ" : "Next pages"}
        title={lang === "ja" ? "次に見るページ" : "Next pages"}
        titleId="faq-next-steps-title"
        description={lang === "ja"
          ? "本サイト上の回答は、veritas_os リポジトリ上の証跡と照合して確認してください。"
          : "Answers on this site should be validated against evidence in the veritas_os repository."}
      />
      <div className="faq-actions">
        {pageCopy.nextCtas.map((cta) => (
          <CtaLink cta={cta} key={cta.href} lang={lang} />
        ))}
      </div>
    </section>
  );
}

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = normalizeSearch(searchTerm);
  const visibleSections = useMemo(() => filterSections(faqSections, normalizedSearch), [normalizedSearch]);

  return (
    <PageShell
      label={{ ja: "よくある質問", en: "FAQ" }}
      pageTitle={{ ja: "VERITAS OS よくある質問", en: "VERITAS OS FAQ" }}
      title={{ ja: "VERITAS OS よくある質問", en: "VERITAS OS FAQ" }}
      subtitle={{
        ja: "企業担当者、技術評価者、外部レビュアーが最初に確認すべき疑問に、過剰な主張を避けながら短く答えます。",
        en: "Short answers to the questions enterprise visitors, technical evaluators, and external reviewers usually ask first — without overclaiming.",
      }}
    >
      {(_, lang) => (
        <>
          <div className="faq-actions faq-hero-actions">
            {pageCopy.heroCtas.map((cta) => (
              <CtaLink cta={cta} key={cta.href} lang={lang} />
            ))}
          </div>
          <KeyAnswers lang={lang} />
          <section className="faq-section faq-filter-section" aria-labelledby="faq-filter-title">
            <SectionHeading
              eyebrow={lang === "ja" ? "カテゴリ" : "Categories"}
              title={lang === "ja" ? "カテゴリから探す" : "Find by category"}
              titleId="faq-filter-title"
              description={lang === "ja"
                ? "カテゴリを選ぶか、キーワードでFAQを絞り込めます。"
                : "Jump by category or filter the FAQ with a keyword."}
            />
            <QuickJump lang={lang} />
            <SearchBox lang={lang} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </section>
          {visibleSections.length > 0 ? (
            <AccordionFaq lang={lang} sections={visibleSections} />
          ) : (
            <section className="faq-empty-state">
              <p>{lang === "ja" ? "該当するFAQはありません。検索語を短くしてください。" : "No FAQ items match. Try a shorter search term."}</p>
            </section>
          )}
          <NonClaimsBlock lang={lang} />
          <NextSteps lang={lang} />
        </>
      )}
    </PageShell>
  );
}
