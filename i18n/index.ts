import 'server-only';

const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
};

export type Locale = typeof dictionaries;

export const getDictionary = async (locale: keyof Locale) =>
  dictionaries[locale]();
