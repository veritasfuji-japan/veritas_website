import React from "react";
import VeritasLanding from "./VeritasLanding.jsx";
import AmlKycPocPage from "./pages/AmlKycPocPage.jsx";
import ConceptsPage from "./pages/ConceptsPage.jsx";
import ReviewersPage from "./pages/ReviewersPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import EnterprisePage from "./pages/EnterprisePage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";

const routes = {
  "/": VeritasLanding,
  "/enterprise": EnterprisePage,
  "/aml-kyc-poc": AmlKycPocPage,
  "/concepts": ConceptsPage,
  "/glossary": GlossaryPage,
  "/reviewers": ReviewersPage,
  "/contact": ContactPage,
};

export default function App() {
  const path = window.location.pathname;
  const Page = routes[path] || VeritasLanding;

  return <Page />;
}
