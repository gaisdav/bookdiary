export const ROUTE = {
  HOME: { ROOT: '/' },

  SEARCH: { ROOT: '/search', BOOK: '/search/:bookId' },

  DIARY: { ROOT: '/diary' },

  MY_LIBRARY: {
    MY_BOOKS: {
      ROOT: '/my-books',
      BOOK: '/my-books/:bookId',
    },
    WANT_TO_READ: {
      ROOT: '/want-to-read',
      BOOK: '/want-to-read/:bookId',
    },
    FAVORITES: {
      ROOT: '/favorites',
      BOOK: '/favorites/:bookId',
    },
  },

  REVIEWS: { ROOT: '/reviews', BOOK: '/reviews/:bookId' },

  PROFILE: {
    ROOT: '/profile',
    SETTINGS: '/profile/settings',
  },

  AUTH: {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    FORGOT_PASSWORD: '/forgot-password',
    UPDATE_PASSWORD: '/update-password',
  },
} as const;

export const dynamicRoute = (route: string, params: Record<string, string>) => {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(`:${key}`, params[key]);
  }, route);
};
