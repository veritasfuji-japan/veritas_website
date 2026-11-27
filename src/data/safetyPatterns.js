const baseUrl = "https://veritasfuji-japan.github.io/ai-safety-patterns/";

export function safetyPatternsUrl(lang) {
  return lang === "ja" ? baseUrl + "?lang=ja" : baseUrl;
}
