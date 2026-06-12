import VeritasLanding from "./VeritasLanding.jsx";
import AmlKycPocPage from "./pages/AmlKycPocPage.jsx";
import ConceptsPage from "./pages/ConceptsPage.jsx";
import ReviewersPage from "./pages/ReviewersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DemoPage from "./pages/DemoPage.jsx";
import EnterprisePage from "./pages/EnterprisePage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";

const routes = {
  "/": VeritasLanding,
  "/enterprise": EnterprisePage,
  "/how-it-works": HowItWorksPage,
  "/demo": DemoPage,
  "/aml-kyc-poc": AmlKycPocPage,
  "/concepts": ConceptsPage,
  "/glossary": GlossaryPage,
  "/faq": FaqPage,
  "/reviewers": ReviewersPage,
  "/contact": ContactPage,
};

export default function App() {
  const path = window.location.pathname;
  const Page = routes[path] || VeritasLanding;

  return <Page />;
}
