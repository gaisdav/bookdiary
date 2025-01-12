export enum ROUTE {
  HOME = '/',
  BOOKS = '/books',
  LIBRARY = '/library',
  COLLECTION_BOOK = '/collection/:bookId', // TODO remove
  LIBRARY_READ = '/library/read',
  LIBRARY_READ_BOOK = '/library/read/:bookId',
  LIBRARY_READING = '/library/reading',
  LIBRARY_READING_BOOK = '/library/reading/:bookId',
  LIBRARY_WANT_TO_READ = '/library/want-to-read',
  LIBRARY_WANT_TO_READ_BOOK = '/library/want-to-read/:bookId',
  BOOK = '/books/:bookId',
  PROFILE = '/profile',
  REVIEWS = '/reviews',
  REVIEWS_BOOK = '/reviews/:bookId',
  LOGIN = '/login',
  REGISTRATION = '/registration',
}
