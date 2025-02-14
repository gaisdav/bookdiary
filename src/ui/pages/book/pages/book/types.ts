import { ROUTE } from '@/ui/routes/routes.ts';

export type TMyBookPage =
  | typeof ROUTE.MY_LIBRARY.MY_BOOKS.ROOT
  | typeof ROUTE.MY_LIBRARY.FAVORITES.ROOT
  | typeof ROUTE.MY_LIBRARY.WANT_TO_READ.ROOT
  | typeof ROUTE.SEARCH.ROOT;
