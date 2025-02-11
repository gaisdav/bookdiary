export enum ROUTE {
  HOME = '/',
  BOOKS = '/books',
  BOOK = '/books/:bookId',
  DIARY = '/diary',
  MY_BOOKS = '/my-books',
  FAVORITES = '/favorites',
  WANT_TO_READ = '/want-to-read',
  LIBRARY_READ_BOOK = '/library/read/:bookId',
  LIBRARY_READING = '/library/reading',
  LIBRARY_READING_BOOK = '/library/reading/:bookId',
  LIBRARY_WANT_TO_READ_BOOK = '/library/want-to-read/:bookId',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  REVIEWS = '/reviews',
  REVIEWS_BOOK = '/reviews/:bookId',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  FORGOT_PASSWORD = '/forgot-password',
  UPDATE_PASSWORD = '/update-password',
}

export const dynamicRoute = (route: ROUTE, params: Record<string, string>) => {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(`:${key}`, params[key]);
  }, route);
};
