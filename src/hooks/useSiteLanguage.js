import { useEffect, useState } from "react";

export const LANGUAGE_STORAGE_KEY = "veritas-site-language-v1";

export function readLanguagePreference(storage) {
  try {
    return storage?.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "ja";
  } catch {
    return "ja";
  }
}

export function saveLanguagePreference(storage, lang) {
  try {
    storage?.setItem(LANGUAGE_STORAGE_KEY, lang === "en" ? "en" : "ja");
    return true;
  } catch {
    return false;
  }
}

function initialLanguage() {
  if (typeof window === "undefined") return "ja";

  try {
    return readLanguagePreference(window.localStorage);
  } catch {
    return "ja";
  }
}

export default function useSiteLanguage() {
  const [lang, setLang] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      saveLanguagePreference(window.localStorage, lang);
    } catch {
      // Language switching must still work if storage access is blocked.
    }
  }, [lang]);

  return [lang, setLang];
}
