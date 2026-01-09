import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale } from '@repo/i18n';

import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

const kioskLocales = ['ko', 'en', 'ja'] as const;
export type KioskLocale = (typeof kioskLocales)[number];

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  ja: { translation: ja },
} as const;

const i18nInstance = createInstance();

i18nInstance.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...kioskLocales],
  interpolation: {
    escapeValue: false,
  },
});

export function changeLanguage(locale: KioskLocale) {
  return i18nInstance.changeLanguage(locale);
}

export function getCurrentLanguage(): KioskLocale {
  return (i18nInstance.language as KioskLocale) || 'ko';
}

export { kioskLocales };
export default i18nInstance;
