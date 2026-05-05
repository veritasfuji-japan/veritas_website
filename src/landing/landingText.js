export function makeT(lang) {
  return (ja, en) => (lang === "ja" ? ja : en);
}
