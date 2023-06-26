export type Language = "en" | "fr";

export function setLanguage(language: Language) {
  localStorage.setItem("language", language);
}

export function getLanguage(): Language {
  const language = localStorage.getItem("language");
  if (language) {
    return language as Language;
  }
  return "en";
}
