import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@/lib/i18n/locales';

const lng = GET_LNG();

i18next.use(initReactI18next).init({
  lng,
  debug: true,
  resources,
});

export default i18next;
