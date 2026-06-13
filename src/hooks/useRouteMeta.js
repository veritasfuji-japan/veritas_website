import { useEffect, useState } from "react";
import { getRouteMeta, normalizeRoutePath } from "../data/routeMeta.js";

const ROUTE_CHANGE_EVENT = "veritas-route-change";
const DEFAULT_LANG = "ja";

function ensureMetaElement(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
    document.head.appendChild(element);
  }

  return element;
}

function setMetaContent(selector, attributes, content) {
  const element = ensureMetaElement(selector, attributes);
  element.setAttribute("content", content);
}

function getDocumentLanguage() {
  const lang = document.documentElement.lang || DEFAULT_LANG;
  return lang.toLowerCase().startsWith("en") ? "en" : "ja";
}

function getCurrentPath() {
  return normalizeRoutePath(window.location.pathname);
}

function getLocalizedMetadata(metadata, lang) {
  if (lang === "en") {
    return {
      title: metadata.enTitle,
      description: metadata.enDescription,
    };
  }

  return {
    title: metadata.jaTitle,
    description: metadata.jaDescription,
  };
}

function updateDocumentMetadata(pathname, lang) {
  const metadata = getRouteMeta(pathname);
  const { title, description } = getLocalizedMetadata(metadata, lang);

  document.title = title;
  setMetaContent(
    'meta[name="description"]',
    { name: "description" },
    description,
  );
  setMetaContent('meta[property="og:title"]', { property: "og:title" }, title);
  setMetaContent(
    'meta[property="og:description"]',
    { property: "og:description" },
    description,
  );
  setMetaContent('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  setMetaContent(
    'meta[name="twitter:description"]',
    { name: "twitter:description" },
    description,
  );
}

function notifyRouteChange() {
  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
}

function installHistoryListener() {
  if (window.__veritasRouteMetaHistoryListenerInstalled) {
    return;
  }

  ["pushState", "replaceState"].forEach((methodName) => {
    const originalMethod = window.history[methodName];
    window.history[methodName] = function patchedHistoryMethod(...args) {
      const result = originalMethod.apply(this, args);
      notifyRouteChange();
      return result;
    };
  });

  window.__veritasRouteMetaHistoryListenerInstalled = true;
}

export default function useRouteMeta() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    installHistoryListener();

    const handleRouteChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const applyMetadata = () => {
      updateDocumentMetadata(path, getDocumentLanguage());
    };

    applyMetadata();

    const observer = new MutationObserver(applyMetadata);
    observer.observe(document.documentElement, {
      attributeFilter: ["lang"],
      attributes: true,
    });

    return () => observer.disconnect();
  }, [path]);

  return path;
}
