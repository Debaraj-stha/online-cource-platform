import enTranslation from './locales/en/translation.json';
import npTranslation from './locales/np/translation.json';
import frTranslation from './locales/fr/translation.json';
import hiTranslation from './locales/hi/translation.json';
import esTranslation from './locales/es/translation.json';

import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // Bind react-i18next to React
  .init({
    debug: true,
    fallbackLng: 'en_US',
    interpolation: { escapeValue: false },
       resources: {
      en_US: { translation: enTranslation },
      np_Nep: { translation: npTranslation },
      fr_FR: { translation: frTranslation },
      hi_IN: { translation: hiTranslation },
      es_ES: { translation: esTranslation },
    },
  });

export default i18n;
