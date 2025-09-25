import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bn from './bn/translation.json';
import en from './en/translation.json';
import hi from './hi/translation.json';

const resources = {
  en: { translation: en },
  bn: { translation: bn },
  hi: { translation: hi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;