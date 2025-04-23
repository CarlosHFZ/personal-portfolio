import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@/data/translations/en.json';
import ptTranslation from '@/data/translations/pt.json';

const resources = {
  en: {
    translation: enTranslation
  },
  pt: {
    translation: ptTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
