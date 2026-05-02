import React from "react";
import VeritasLanding from "./VeritasLanding.jsx";
import AmlKycPocPage from "./pages/AmlKycPocPage.jsx";
import ConceptsPage from "./pages/ConceptsPage.jsx";
import ReviewersPage from "./pages/ReviewersPage.jsx";

const routes = {
  "/": VeritasLanding,
  "/aml-kyc-poc": AmlKycPocPage,
  "/concepts": ConceptsPage,
  "/reviewers": ReviewersPage,
};

export default function App() {
  const path = window.location.pathname;
  const Page = routes[path] || VeritasLanding;

  return <Page />;
}
