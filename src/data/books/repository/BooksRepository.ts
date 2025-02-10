import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/database.types.ts';
import { cache } from '@/lib/cache/CacheService.ts';
import { cacheKeys } from '@/lib/cache/cacheKeys.ts';
import {
  TAddFavorite,
  TGoogleBookSearchParams,
} from '@/data/books/services/types.ts';
import { TBooksRepository } from '@/data/books/repository/types.ts';
import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/data/books/services/utils.ts';
import { TGoogleBook, TGoogleBookSearch } from '@/data/books/store/types.ts';
import { TFavoriteBookData } from '@/lib/cache/types.ts';

export class BooksRepository implements TBooksRepository {
  constructor(private repository: SupabaseClient<Database>) {}

  async fetchBookById(bookId: string): Promise<TGoogleBook> {
    const cacheKey = cacheKeys.books.book(bookId);
    const cachedBook = await cache.get<TGoogleBook>(cacheKey);

    if (cachedBook) {
      return cachedBook;
    }

    const url = constructGoogleBookUrl(bookId);
    const result = await fetch(url);
    const book = await result.json();
    await cache.set(cacheKey, book, { ttl: 1000 * 60 * 60 * 24 });

    return book;
  }

  async fetchBooks(
    params: TGoogleBookSearchParams,
  ): Promise<TGoogleBookSearch> {
    const { query = '', limit = 10, page = 1 } = params;
    const url = constructGoogleBooksUrl(query, limit, page);
    const result = await fetch(url.toString());
    return await result.json();
  }

  async addToFavorite(params: TAddFavorite): Promise<void> {
    await this.deleteFavoriteBooksData(params);

    await this.repository.from('favorite_books').insert({
      user_id: params.userId,
      book_provider_id: params.bookId,
    });
  }

  async removeFromFavorite(params: TAddFavorite): Promise<void> {
    await this.deleteFavoriteBooksData(params);

    await this.repository
      .from('favorite_books')
      .delete()
      .eq('user_id', params.userId)
      .eq('book_provider_id', params.bookId);
  }

  async fetchFavoriteBookData(
    userId: number,
    bookId: string,
  ): Promise<string | null> {
    const cacheKey = cacheKeys.user.favoriteBookData({ userId, bookId });
    const cachedBook = await cache.get<string>(cacheKey);

    if (cachedBook) {
      return cachedBook;
    }

    const { data, error } = await this.repository
      .from('favorite_books')
      .select('id, user_id, book_provider_id')
      .eq('user_id', userId)
      .eq('book_provider_id', bookId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const bookProviderId = data?.book_provider_id || null;

    await cache.set(cacheKey, bookProviderId, {
      ttl: 1000 * 60 * 60 * 24,
    });

    return bookProviderId;
  }

  async getFavoriteBooksData(userId: number): Promise<string[]> {
    const dbKey = 'favorite_books';
    const cacheKey = cacheKeys.user.favoriteBooksData(userId);
    const cachedBooks = await cache.get<string[]>(cacheKey);

    if (cachedBooks) {
      return cachedBooks;
    }

    const { data, error } = await this.repository
      .from(dbKey)
      .select('book_provider_id')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    const bookIds = data.map((book) => book.book_provider_id);

    await cache.set(cacheKey, bookIds, { ttl: 1000 * 60 * 60 * 24 });

    return bookIds;
  }

  private async deleteFavoriteBooksData(
    params: TFavoriteBookData,
  ): Promise<void> {
    const cacheBooksKey = cacheKeys.user.favoriteBooksData(params.userId);
    const cacheBookKey = cacheKeys.user.favoriteBookData(params);

    await cache.delete(cacheBooksKey);
    await cache.delete(cacheBookKey);
  }
}
