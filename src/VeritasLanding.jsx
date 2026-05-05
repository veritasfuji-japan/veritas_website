import { useState, useEffect } from "react";
import NumbersFromClaims from "./components/NumbersFromClaims.jsx";
import TopBar from "./landing/TopBar.jsx";
import Hero from "./landing/Hero.jsx";
import EnterpriseStart from "./landing/EnterpriseStart.jsx";
import AmlKycPocConversion from "./landing/AmlKycPocConversion.jsx";
import RouteGuide from "./landing/RouteGuide.jsx";
import Audiences from "./landing/Audiences.jsx";
import Idea from "./landing/Idea.jsx";
import FinancialPointer from "./landing/FinancialPointer.jsx";
import FooterArea from "./landing/FooterArea.jsx";
import "./VeritasLanding.css";

export default function VeritasLanding() {
  const [lang, setLang] = useState("ja");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang === "ja" ? "ja" : "en";
  }, [lang]);

  useEffect(() => {
    const handler = () => {
      const id = window.location.hash.slice(1);
      if (id) {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <>
      <div className="ve grain">
        <TopBar lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero lang={lang} />
          <AmlKycPocConversion lang={lang} />
          <EnterpriseStart lang={lang} />
          <RouteGuide lang={lang} />
          <Audiences lang={lang} />
          <Idea lang={lang} />
          <NumbersFromClaims lang={lang} />
          <FinancialPointer lang={lang} />
        </main>
        <FooterArea lang={lang} />
      </div>
    </>
  );
}
