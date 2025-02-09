import { IBook } from '@/data/books/enitites/book/types.ts';
import { IBookList } from '@/data/books/store/types.ts';

export type TGoogleBookSearchParams = {
  query: string;
  page?: number;
  limit?: number;
};

export type TAddToCollection = {
  userId: number;
  bookId: string;
  status: number;
};

export type TAddFavorite = {
  userId: number;
  bookId: string;
};

export type TBooksService = {
  searchBooks: (params: TGoogleBookSearchParams) => Promise<IBookList>;
  addToFavorite: (params: TAddFavorite) => Promise<void>;
  removeFromFavorite: (params: TAddFavorite) => Promise<void>;
  fetchFavoriteBooks: (userId: number) => Promise<IBook[]>;
  fetchBookById: (bookId: string, userId: number) => Promise<IBook>;
};
