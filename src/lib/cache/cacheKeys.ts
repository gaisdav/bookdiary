import { TFavoriteBookData } from '@/lib/cache/types.ts';

export const cacheKeys = {
  books: {
    list: 'books-list',
    book: (id: string) => `book-${id}`,
  },
  user: {
    favoriteBooksData: (userId: number) => `favorite-books-${userId}`,
    favoriteBookData: ({ userId, bookId }: TFavoriteBookData) =>
      `favorite-book-${userId}-${bookId}`,
  },
};
