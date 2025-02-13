import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '@/lib/i18n/locales';

i18next.use(initReactI18next).init({
  //TODO add language detector
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});

export default i18next;
