import en from './en.json';
import ru from './ru.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

export default resources;
