import {
  TAddFavorite,
  TGoogleBookSearchParams,
} from '@/data/books/services/types.ts';
import { TGoogleBook, TGoogleBookSearch } from '@/data/books/store/types.ts';

export type TBooksRepository = {
  fetchBookById(bookId: string): Promise<TGoogleBook>;
  fetchBooks(params: TGoogleBookSearchParams): Promise<TGoogleBookSearch>;
  addToFavorite(params: TAddFavorite): Promise<void>;
  removeFromFavorite(params: TAddFavorite): Promise<void>;
  fetchFavoriteBookData(userId: number, bookId: string): Promise<string>;
  getFavoriteBooksData(userId: number): Promise<string[]>;
};
